#!/usr/bin/env node
// Snapshot-backed migration of a project's local AP adoption into an external
// adapter (Agent-Profiles#85), with resolve-equivalence checks and byte rollback.
//
//   node scripts/adapter-migration.mjs snapshot <project> <snapshot> --ap <AP checkout or package>
//   node scripts/adapter-migration.mjs migrate  <project> <snapshot> <adapter> --ap <AP checkout>
//   node scripts/adapter-migration.mjs rollback <project> <snapshot> --ap <AP checkout>
//   node scripts/adapter-migration.mjs verify   <project> <snapshot> --ap <AP checkout>
//
// --ap names the AP that resolves: a source checkout or an installed package. Use the
// live version for the snapshot, `verify` with the new version to isolate the upgrade,
// then `migrate` with an adapter-aware version (0.20.0 or later). Nothing here
// signs, publishes or changes trust: approval files are copied byte for byte.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parse, stringify } from "yaml";

const AP_DIR = ".agent-profiles";
const LOCAL = `${AP_DIR}/agents.local.yaml`;
const CONFIG = `${AP_DIR}/agents.yaml`;
const LOCK = `${AP_DIR}/agent-profiles.lock`;
// Host-owned files: snapshotted for the record, never changed here.
const HOST_FILES = [
	".mcp.json",
	".codex/config.toml",
	".claude/settings.json",
	".claude/settings.local.json",
	"AGENTS.md",
	"CLAUDE.md",
];
const HOSTS = [undefined, "claude", "codex"];
// Project policy an adapter may not carry; it must equal the committed values.
const PROJECT_ONLY = [
	"default_profile",
	"default_role",
	"models",
	"families",
	"profiles",
	"assignments",
	"workflow_links",
];

const args = process.argv.slice(2);
const option = (name) => {
	const index = args.indexOf(`--${name}`);
	if (index < 0) return undefined;
	const [, value] = args.splice(index, 2);
	return value;
};
const ap = option("ap");
const [command, projectArg, snapshotArg, adapterArg] = args;
if (!ap || !command || !projectArg || !snapshotArg)
	throw new Error("usage: see the header of scripts/adapter-migration.mjs");
const project = fs.realpathSync(projectArg);
const snapshot = path.resolve(snapshotArg);
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const posix = (file) => file.split(path.sep).join("/");
const git = (...rest) =>
	execFileSync("git", ["-C", project, ...rest], { encoding: "utf8" });
// --ap is a source checkout (src/*.ts) or an installed package (dist/src/*.js).
const apRoot = fs.realpathSync(ap);
const source = fs.existsSync(path.join(apRoot, "src/resolve.ts"));
const module = (name) =>
	path.join(apRoot, source ? `src/${name}.ts` : `dist/src/${name}.js`);
const cli = path.join(apRoot, source ? "bin/agent-profiles.ts" : "dist/bin/agent-profiles.js");
const load = (name) => import(pathToFileURL(module(name)).href);
const { resolveInstructions } = await load("resolve");
const { approvalStatus } = await load("approvals");
const { loadTrustPolicy } = await load("trust");
const apVersion = JSON.parse(fs.readFileSync(path.join(apRoot, "package.json"), "utf8")).version;

function files(root, dir) {
	const out = [];
	const walk = (current) => {
		if (!fs.existsSync(current)) return;
		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			const full = path.join(current, entry.name);
			if (entry.isDirectory()) walk(full);
			else if (!entry.name.startsWith(".dependency-writer"))
				out.push(posix(path.relative(root, full)));
		}
	};
	walk(path.join(root, dir));
	return out.sort();
}

/** Every role x declared model (and none) x host, normalized for comparison. */
function resolutions(config) {
	const roles = Object.keys(config.roles ?? {}).sort();
	// Declared models plus a real undeclared ID, which must keep the default route.
	const models = [undefined, "claude-opus-5-5", ...Object.keys(config.models ?? {}).sort()];
	const out = {};
	for (const role of roles)
		for (const model of models)
			for (const host of HOSTS) {
				const key = [role, model ?? "-", host ?? "-"].join(" ");
				try {
					const r = resolveInstructions({ root: project, role, model, host });
					const skill = (s) => [s.id, s.package?.name ?? null, s.package?.version ?? null, s.package?.sha256 ?? null];
					out[key] = {
						profile: r.profile,
						role: r.role,
						matchedBy: r.matchedBy,
						loaded: r.loaded.map((p) => [p.kind, p.id, sha(p.content ?? "")]),
						required: r.required.map(skill),
						available: r.available.map(skill),
						unsatisfied: r.unsatisfied,
						withheld: (r.withheld ?? []).map((w) => [w.id, w.reason]),
						lockState: r.lockState,
					};
				} catch (error) {
					out[key] = { error: String(error.message) };
				}
			}
	// Approvals count even where the policy does not require them: check each pin's
	// status against the machine policy with approval required.
	const policy = loadTrustPolicy({ root: project });
	const pins = new Set(
		Object.values(out).flatMap((r) =>
			[...(r.required ?? []), ...(r.available ?? [])]
				.filter(([, name]) => name)
				.map(([, name, version]) => `${name}@${version}`),
		),
	);
	for (const pin of [...pins].sort()) {
		const at = pin.lastIndexOf("@");
		const status = policy
			? approvalStatus({ root: project, name: pin.slice(0, at), version: pin.slice(at + 1), policy: { ...policy, requireApproval: true } })
			: null;
		out[`approval ${pin}`] = status
			? { status: status.status, approvedBy: status.approvedBy.map((a) => [a.principal, a.fingerprint]), problems: status.problems.length }
			: { status: "no-policy" };
	}
	return out;
}

function takeSnapshot() {
	if (fs.existsSync(snapshot) && fs.readdirSync(snapshot).length)
		throw new Error(`${snapshot} exists and is not empty; choose a new snapshot directory`);
	if (fs.existsSync(path.join(project, LOCAL)))
		throw new Error(`${LOCAL} exists; snapshot the pre-adapter state only`);
	const manifest = { project, head: git("rev-parse", "HEAD").trim(), created: new Date().toISOString(), ap: { root: apRoot, version: apVersion }, files: {}, host: {} };
	for (const file of files(project, AP_DIR)) {
		const bytes = fs.readFileSync(path.join(project, file));
		manifest.files[file] = sha(bytes);
		copy(path.join(project, file), path.join(snapshot, "files", file));
	}
	for (const file of HOST_FILES) {
		const full = path.join(project, file);
		if (!fs.existsSync(full)) continue;
		manifest.host[file] = sha(fs.readFileSync(full));
		copy(full, path.join(snapshot, "host", file));
	}
	const config = parse(fs.readFileSync(path.join(project, CONFIG), "utf8"));
	write(path.join(snapshot, "manifest.json"), manifest);
	write(path.join(snapshot, "resolutions.json"), resolutions(config));
	console.log(`snapshot: ${Object.keys(manifest.files).length} files, ${Object.keys(manifest.host).length} host files -> ${snapshot}`);
}

const copy = (from, to) => {
	fs.mkdirSync(path.dirname(to), { recursive: true });
	fs.copyFileSync(from, to);
};
const write = (file, value) => {
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
};
const read = (file) => JSON.parse(fs.readFileSync(path.join(snapshot, file), "utf8"));

/** Refuse unless the live files still match the snapshot. */
function assertUnchanged(manifest) {
	const now = files(project, AP_DIR);
	const drift = [
		...now.filter((file) => !(file in manifest.files)),
		...Object.keys(manifest.files).filter(
			(file) => !fs.existsSync(path.join(project, file)) || sha(fs.readFileSync(path.join(project, file))) !== manifest.files[file],
		),
	];
	if (drift.length) throw new Error(`files changed since the snapshot: ${drift.join(", ")}; take a new snapshot`);
}

/** Express the live adoption as an adapter overlay over the committed configuration. */
function overlay(committed, live) {
	for (const key of PROJECT_ONLY)
		if (JSON.stringify(committed[key] ?? null) !== JSON.stringify(live[key] ?? null))
			throw new Error(`${key} differs from the committed configuration; an adapter cannot carry it`);
	if (!(live.version === committed.version || (committed.version === 1 && live.version === 2)))
		throw new Error(`version ${committed.version} -> ${live.version} is not representable`);
	const result = { version: live.version };
	const skills = {};
	for (const [id, value] of Object.entries(live.skills ?? {})) {
		if (committed.skills?.[id] !== undefined) {
			if (JSON.stringify(committed.skills[id]) !== JSON.stringify(value)) throw new Error(`skills.${id} changed`);
			continue;
		}
		skills[id] = value;
	}
	for (const id of Object.keys(committed.skills ?? {}))
		if (!(id in (live.skills ?? {}))) throw new Error(`skills.${id} was removed`);
	const roles = {};
	const roleFiles = [];
	for (const [id, value] of Object.entries(live.roles ?? {})) {
		const base = committed.roles?.[id];
		if (!base) {
			roles[id] = value;
			if (value.file) roleFiles.push(`${AP_DIR}/${value.file}`);
			continue;
		}
		const { skills: liveSkills = {}, ...liveRest } = value;
		const { skills: baseSkills = {}, ...baseRest } = base;
		if (JSON.stringify(liveRest) !== JSON.stringify(baseRest)) throw new Error(`roles.${id} changed beyond its skills`);
		const added = {};
		for (const list of ["required", "available"]) {
			const before = baseSkills[list] ?? [];
			const after = liveSkills[list] ?? [];
			if (JSON.stringify(after.slice(0, before.length)) !== JSON.stringify(before))
				throw new Error(`roles.${id}.skills.${list} is not an append to the committed list`);
			if (after.length > before.length) added[list] = after.slice(before.length);
		}
		if (Object.keys(added).length) roles[id] = { skills: added };
	}
	for (const id of Object.keys(committed.roles ?? {}))
		if (!(id in (live.roles ?? {}))) throw new Error(`roles.${id} was removed`);
	if (Object.keys(skills).length) result.skills = skills;
	if (Object.keys(roles).length) result.roles = roles;
	return { overlay: result, roleFiles };
}

function compare(expected, label) {
	const config = parse(fs.readFileSync(path.join(snapshot, "files", CONFIG), "utf8"));
	const actual = resolutions(config);
	const keys = [...new Set([...Object.keys(expected), ...Object.keys(actual)])].sort();
	const differences = keys.filter((key) => JSON.stringify(expected[key]) !== JSON.stringify(actual[key]));
	write(path.join(snapshot, `resolutions-${label}.json`), actual);
	console.log(`${label}: compared with AP ${apVersion} (${apRoot})`);
	return { checked: keys.length, differences, actual };
}

function restore(manifest) {
	fs.rmSync(path.join(project, LOCAL), { force: true });
	for (const [file, digest] of Object.entries(manifest.files)) {
		const bytes = fs.readFileSync(path.join(snapshot, "files", file));
		if (sha(bytes) !== digest) throw new Error(`snapshot copy of ${file} is corrupt; stop and inspect`);
		fs.mkdirSync(path.dirname(path.join(project, file)), { recursive: true });
		fs.writeFileSync(path.join(project, file), bytes);
	}
	assertUnchanged(manifest);
}

function migrate() {
	if (!adapterArg) throw new Error("migrate needs an adapter directory");
	const manifest = read("manifest.json");
	const expected = read("resolutions.json");
	if (manifest.project !== project) throw new Error(`snapshot is for ${manifest.project}`);
	assertUnchanged(manifest);
	const adapter = path.resolve(adapterArg);
	if (fs.existsSync(path.join(adapter, AP_DIR))) throw new Error(`${adapter}/${AP_DIR} exists; use a new adapter directory`);
	const tracked = new Set(git("ls-files", "--", AP_DIR).split("\n").filter(Boolean));
	const committed = parse(git("show", `HEAD:${CONFIG}`));
	const live = parse(fs.readFileSync(path.join(project, CONFIG), "utf8"));
	const { overlay: result, roleFiles } = overlay(committed, live);
	const approvals = Object.keys(manifest.files).filter((file) => file.startsWith(`${AP_DIR}/approvals/`));
	for (const file of [...roleFiles, ...approvals])
		if (tracked.has(file)) throw new Error(`${file} is committed; an adapter cannot take it over`);

	// 1. Adapter: overlay, added role files and approval bytes. Nothing is signed.
	fs.mkdirSync(path.join(adapter, AP_DIR), { recursive: true });
	fs.writeFileSync(path.join(adapter, CONFIG), stringify(result));
	for (const file of [...roleFiles, ...approvals]) copy(path.join(project, file), path.join(adapter, file));
	fs.writeFileSync(path.join(adapter, ".gitignore"), `${AP_DIR}/.dependency-writer/\n`);
	// 2. Project: committed configuration back; moved files out; the local reference in.
	try {
		git("checkout", "HEAD", "--", CONFIG);
		for (const file of [...roleFiles, ...approvals, LOCK]) fs.rmSync(path.join(project, file), { force: true });
		removeEmpty(path.join(project, AP_DIR, "approvals"));
		fs.writeFileSync(path.join(project, LOCAL), stringify({ adapter: posix(path.relative(project, adapter)) }));
		// 3. Lock for the composed configuration, written to the adapter from the store.
		execFileSync(process.execPath, [cli, "install", "--root", project, "--offline"], { stdio: "inherit" });
		// 4. Same resolution for every role x model x host, or roll back.
		const { checked, differences } = compare(expected, "migrated");
		if (differences.length) throw new Error(`resolution differs for ${differences.length}/${checked}: ${differences.slice(0, 5).join("; ")}`);
		console.log(`migrated: ${checked} resolutions identical; adapter at ${adapter}`);
		const untracked = git("ls-files", "--others", "--exclude-standard", "--", AP_DIR).trim();
		if (untracked) console.log(`left untouched (not adapter content):\n${untracked}`);
	} catch (error) {
		restore(manifest);
		const { differences } = compare(expected, "rolled-back");
		throw new Error(`${error.message}\nrolled back from the snapshot; resolutions ${differences.length ? "STILL DIFFER" : "match the snapshot"}`);
	}
}

const removeEmpty = (dir) => {
	if (!fs.existsSync(dir)) return;
	for (const entry of fs.readdirSync(dir)) {
		const full = path.join(dir, entry);
		if (fs.statSync(full).isDirectory()) removeEmpty(full);
	}
	if (!fs.readdirSync(dir).length) fs.rmdirSync(dir);
};

function rollback() {
	const manifest = read("manifest.json");
	restore(manifest);
	const { checked, differences } = compare(read("resolutions.json"), "rolled-back");
	if (differences.length) throw new Error(`restored bytes, but resolution differs for ${differences.join("; ")}`);
	console.log(`rolled back: ${Object.keys(manifest.files).length} files restored byte for byte; ${checked} resolutions identical. The adapter directory was not changed.`);
}

function verify() {
	const { checked, differences } = compare(read("resolutions.json"), "verified");
	if (differences.length) throw new Error(`resolution differs for ${differences.join("; ")}`);
	console.log(`verified: ${checked} resolutions identical to the snapshot`);
}

const commands = { snapshot: takeSnapshot, migrate, rollback, verify };
if (!commands[command]) throw new Error(`unknown command ${command}`);
commands[command]();

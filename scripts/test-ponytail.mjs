import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

assert.equal(process.versions.node.split('.')[0], '24', 'Use Node 24');
assert.ok(process.argv[2], 'Pass the read-only Agent Profiles checkout path');
const ap = path.resolve(process.argv[2]);
const root = fileURLToPath(new URL('../', import.meta.url));
const scratch = path.join(root, '.scratch');
mkdirSync(scratch, { recursive: true });
const run = mkdtempSync(path.join(scratch, 'ponytail-'));
const storeRoot = path.join(run, 'store');
const home = path.join(run, 'home');
mkdirSync(home);
process.env.AGENT_PROFILES_TRUST = path.join(run, 'absent-trust.json');
const env = { ...process.env, HOME: home, USERPROFILE: home, AGENT_PROFILES_STORE: storeRoot };
const fromAP = (file) => import(pathToFileURL(path.join(ap, file)));
const { readPackage } = await fromAP('src/packages.ts');
const { importPackage } = await fromAP('src/package-store.ts');
const { installDependencies } = await fromAP('src/package-lock.ts');
const { resolveInstructions } = await fromAP('src/resolve.ts');
const requireAP = createRequire(path.join(ap, 'package.json'));
const { stringify } = requireAP('yaml');
const { Client } = await import(pathToFileURL(requireAP.resolve('@modelcontextprotocol/client')));
const { StdioClientTransport } = await import(pathToFileURL(requireAP.resolve('@modelcontextprotocol/client/stdio')));
const cli = path.join(ap, 'bin/agent-profiles.ts');
const checks = [];
const identities = [];
function put(file, value) { mkdirSync(path.dirname(file), { recursive: true }); writeFileSync(file, value); }
function tree(directory) {
  const out = {};
  for (const name of readdirSync(directory).sort()) {
    const file = path.join(directory, name);
    out[name] = statSync(file).isDirectory() ? tree(file) : createHash('sha256').update(readFileSync(file)).digest('hex');
  }
  return out;
}
const names = ['ponytail-implementation', 'ponytail-review', 'ponytail-audit', 'ponytail-debt', 'shared-technical-language'];
for (const name of names) {
  const sourceDirectory = path.join(root, 'packages', name);
  const pkg = readPackage({ root: sourceDirectory });
  const options = { sourceDirectory, storeRoot, expectedDigest: pkg.sha256 };
  const imported = importPackage(options);
  assert.equal(imported.status, 'published');
  assert.equal(importPackage(options).status, 'reused');
  identities.push({ ...imported.identity, sha256: pkg.sha256 });
}
checks.push('Five packages validate, import, and reuse immutable identities.');
const assignments = {
  implementer: { required: ['ponytail-implementation'], available: ['shared-technical-language', 'ponytail-debt'] },
  reviewer: { required: ['ponytail-review', 'shared-technical-language'], available: ['ponytail-debt'] },
  auditor: { required: ['ponytail-audit', 'shared-technical-language'], available: ['ponytail-debt'] },
  maintainer: { required: ['ponytail-debt', 'shared-technical-language'], available: [] },
};
const projects = ['project-a', 'project-b'].map((name) => {
  const project = path.join(run, name);
  put(path.join(project, 'AGENTS.md'), `# ${name}\nPreserve independent review and human approval. Reports use this project's own conventions.\n`);
  put(path.join(project, '.agent-profiles/profiles/base.md'), `# ${name} model profile\nRespect the repository's governing instructions and output conventions.\n`);
  const roles = {};
  for (const [role, skills] of Object.entries(assignments)) {
    roles[role] = { file: `roles/${role}.md`, skills };
    put(path.join(project, `.agent-profiles/roles/${role}.md`), `# ${name} ${role}\nWork only within this assigned role. A review verdict is a recommendation; it does not grant merge or publication authority. Preserve the project's approval gates.\n`);
  }
  put(path.join(project, '.agent-profiles/agents.yaml'), stringify({ version: 2, default_profile: 'base', default_role: 'implementer', models: { 'fixture-model': { profile: 'base' } }, families: {}, profiles: { base: { file: 'profiles/base.md' } }, roles, skills: Object.fromEntries(names.map((id) => [id, { package: `@local/${id}`, version: '1.0.0' }])) }));
  installDependencies({ root: project, storeRoot });
  return project;
});
const tuple = { model: 'fixture-model', role: 'reviewer', host: 'codex' };
function resolve(project, role = 'reviewer', host = 'codex', skills = []) { return resolveInstructions({ root: project, storeRoot, ...tuple, role, host, skills }); }
function version(project, host = 'codex') { return resolve(project, 'reviewer', host).required.find((skill) => skill.id === 'ponytail-review').package.version; }
for (const project of projects) for (const host of ['codex', 'claude']) for (const [role, expected] of Object.entries(assignments)) {
  const result = resolve(project, role, host);
  assert.deepEqual(result.required.map((s) => s.id), expected.required);
  assert.deepEqual(result.available.map((s) => s.id), expected.available);
  assert.ok(result.required.every((s) => s.package.version === '1.0.0'));
}
assert.ok(resolve(projects[0], 'implementer', 'codex', ['shared-technical-language']).loaded.some((s) => s.id === 'shared-technical-language'));
checks.push('Both projects resolve all four roles for codex and claude; optional shared language loads on request.');
async function connect(project) {
  const client = new Client({ name: 'workflow-skills-experiment', version: '1' });
  await client.connect(new StdioClientTransport({ command: process.execPath, args: [cli, 'mcp', '--root', project, '--store', storeRoot, '--host', tuple.host, '--model', tuple.model, '--role', tuple.role], cwd: project, env, stderr: 'pipe' }));
  return client;
}
async function call(client, name, args = {}) {
  const result = await client.callTool({ name, arguments: args });
  assert.ok(!result.isError, JSON.stringify(result));
  return result;
}
const clients = [];
try {
  for (const project of projects) {
    const client = await connect(project); clients.push(client);
    const body = readFileSync(path.join(root, 'packages/ponytail-review/SKILL.md'), 'utf8').trim();
    assert.ok(Buffer.byteLength(client.getInstructions()) < 2048);
    assert.ok(!client.getInstructions().includes(body));
    const tools = (await client.listTools()).tools;
    assert.ok(tools.every((tool) => tool.annotations.readOnlyHint));
    const resolved = (await call(client, 'resolve')).content.filter((part) => part.type === 'text').map((part) => part.text).join('\n');
    assert.ok(resolved.includes(body));
    assert.ok(resolved.includes(readFileSync(path.join(root, 'packages/shared-technical-language/SKILL.md'), 'utf8').trim()));
    assert.ok(resolved.includes(`${path.basename(project)} reviewer`));
    assert.match(resolved.trimEnd(), /End of Agent Profiles context: 4 section\(s\): base, reviewer, ponytail-review, shared-technical-language\.$/);
    const content = await call(client, 'library_read', { name: '@local/ponytail-review', version: '1.0.0', path: 'SKILL.md' });
    assert.ok(JSON.stringify(content).includes('Ship'));
  }
  checks.push('Two bound MCP servers deliver review skill and project-specific role instructions; library_read and resolve succeed; tools are read-only.');
  const candidate = path.join(run, 'candidate');
  cpSync(path.join(root, 'packages/ponytail-review'), candidate, { recursive: true });
  const manifest = path.join(candidate, 'package.yaml');
  writeFileSync(manifest, readFileSync(manifest, 'utf8').replace('"1.0.0"', '"1.0.1"'));
  const marker = 'Disposable experiment: include the exact tested revision in the review evidence.';
  const entrypoint = path.join(candidate, 'SKILL.md');
  writeFileSync(entrypoint, readFileSync(entrypoint, 'utf8') + `\n${marker}\n`);
  writeFileSync(manifest, readFileSync(manifest, 'utf8').replace('"1.0.1"', '"1.0.0"'));
  assert.throws(() => importPackage({ sourceDirectory: candidate, storeRoot }), /identity-conflict/);
  writeFileSync(manifest, readFileSync(manifest, 'utf8').replace('"1.0.0"', '"1.0.1"'));
  importPackage({ sourceDirectory: candidate, storeRoot });
  checks.push('Changed bytes cannot overwrite an existing package identity.');
  assert.equal(version(projects[0]), '1.0.0'); assert.equal(version(projects[1]), '1.0.0');
  const before = projects.map(tree);
  const previews = [];
  for (const client of clients) {
    previews.push((await call(client, 'update_preview', { binding: 'skills.ponytail-review', version: '1.0.1', ...tuple })).structuredContent);
    assert.ok(JSON.stringify(await call(client, 'outdated')).includes('1.0.1'));
  }
  assert.deepEqual(projects.map(tree), before);
  const configFile = path.join(projects[0], '.agent-profiles/agents.yaml');
  const configBytes = readFileSync(configFile);
  writeFileSync(configFile, Buffer.concat([configBytes, Buffer.from('\n# Changed after preview.\n')]));
  const staleBefore = tree(projects[0]);
  const stale = spawnSync(process.execPath, [cli, 'update', 'skills.ponytail-review', '1.0.1', '--root', projects[0], '--store', storeRoot, '--host', tuple.host, '--model', tuple.model, '--role', tuple.role, '--apply', '--expect', previews[0].previewDigest, '--json'], { encoding: 'utf8', env, cwd: projects[0] });
  assert.notEqual(stale.status, 0);
  assert.match(stale.stdout + stale.stderr, /preview|digest|changed|stale/i);
  assert.deepEqual(tree(projects[0]), staleBefore);
  writeFileSync(configFile, configBytes);
  checks.push('An outdated preview digest is rejected without changing the project.');
  function apply(project, target, digest) {
    const result = spawnSync(process.execPath, [cli, 'update', 'skills.ponytail-review', target, '--root', project, '--store', storeRoot, '--host', tuple.host, '--model', tuple.model, '--role', tuple.role, '--apply', '--expect', digest, '--json'], { encoding: 'utf8', env, cwd: project });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).status, 'updated');
  }
  apply(projects[0], '1.0.1', previews[0].previewDigest);
  assert.equal(version(projects[0]), '1.0.1'); assert.equal(version(projects[1]), '1.0.0');
  assert.equal(version(projects[0], 'claude'), '1.0.0');
  assert.ok(JSON.stringify(await call(clients[0], 'resolve', tuple)).includes(marker));
  apply(projects[1], '1.0.1', previews[1].previewDigest);
  assert.equal(version(projects[1]), '1.0.1');
  checks.push('Publishing does not change pins; read-only MCP previews expose the update; Project A updates independently, then Project B converges. The claude tuple stays pinned.');
  const fresh = await connect(projects[0]);
  try {
    assert.ok(!fresh.getInstructions().includes(marker));
    assert.ok(JSON.stringify(await call(fresh, 'resolve')).includes(marker));
  } finally { await fresh.close(); }
  checks.push('A fresh bound MCP connection delivers updated content through resolve, not startup instructions (not a live host compact/clear test).');
  for (let i = 0; i < projects.length; i++) {
    const preview = (await call(clients[i], 'update_preview', { binding: 'skills.ponytail-review', version: '1.0.0', ...tuple })).structuredContent;
    apply(projects[i], '1.0.0', preview.previewDigest);
    assert.equal(version(projects[i]), '1.0.0');
    assert.ok(!JSON.stringify(await call(clients[i], 'resolve', tuple)).includes(marker));
  }
  checks.push('Both projects roll back to 1.0.0 and resolve the original content.');
} finally { for (const client of clients) await client.close(); }
const report = { result: 'passed', node: process.version, agentProfilesVersion: JSON.parse(readFileSync(path.join(ap, 'package.json'))).version, run, projects, storeRoot, identities, checks, limits: ['No live T3 host clear/compact or subagent test.', 'No paid model behavior or quality evaluation.', 'Native plugins remain installed; live libraries, trust policy, and projects unchanged.', 'The 1.0.1 candidate exists only in this disposable run.'] };
put(path.join(run, 'report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));

# Project adapter design (proposal)

Status: **Proposal.** Nothing here is supported Agent Profiles (AP) syntax yet.
The file name `agents.local.yaml` and the key `adapter` are placeholders.
Governing issue: [Agent-Profiles#85](https://github.com/guisam/Agent-Profiles/issues/85).

## Goal

A maintainer develops a project (first: Agent-Profiles) with private, pinned
workshop skills. The project's committed configuration and npm package stay
portable. Another project's pins never move as a side effect.

```text
workflow-skills          → signed packages in the local library (by name@version)
agent-profiles-config    → selection, pins, lock and approvals for Agent-Profiles only
Agent-Profiles           → committed portable defaults + one ignored reference
```

## Key decision: the adapter does not reference the workshop

Packages already reach projects through the local library by `name@version` and
digest. The adapter names packages and versions only. It contains no path to
workflow-skills. This avoids cross-repository path resolution. The workshop can
move, or be absent once its packages are published to the library.

## Connection point

The project has one ignored file, for example `.agent-profiles/agents.local.yaml`:

```yaml
adapter: ../agent-profiles-config   # relative to the project root, or absolute
```

- Exactly one adapter per project. An adapter cannot reference another adapter.
- No local file: AP uses committed configuration only. This is the clean-checkout path.
- A local file that references a missing or invalid adapter is an error. The
  error names the path and the remedy: fix the reference, or delete the local file
  to use the committed defaults. AP never falls back silently.

## Adapter contents

```text
agent-profiles-config/
  agents.yaml            overlay: skills pins, role skill additions, extra roles/profiles
  roles/ profiles/       bodies for roles and profiles the adapter adds
  agent-profiles.lock    lock entries for adapter-selected packages
  approvals/             signed approvals for those packages
```

Relative paths inside the adapter resolve against the adapter root. The project
root, Git root, project identity and MCP `--root` remain the project's.

## Composition and precedence

The committed project configuration is the base. The adapter may:

- add skill pins under new skill IDs;
- add skills to an existing role's `required` or `available` lists;
- add new roles and profiles.

The adapter may not:

- replace or remove a project role, profile, or skill pin. Defining the same skill
  ID with a different package or version is a conflict error, not an override;
- change project governing instructions (`AGENTS.md`, `CLAUDE.md`, bootstrap blocks);
- widen trust. Effective trust is the intersection of machine and project trust
  policy. An adapter `trust.yaml`, if supported, can only narrow it.

Open question: whether the adapter may set `default_role`. The first slice says no.

## Writes, locks and freshness

- With an adapter configured, `install` and `update --apply` write adapter-selected
  entries to the adapter's lock and approvals. They never write the project's
  committed lock or approvals.
- The effective lock is the project lock plus the adapter lock. Validation covers both.
- Update-preview freshness (`--expect`) covers every contributing input: project
  `agents.yaml` and lock, the local reference file, and adapter `agents.yaml` and lock.
- `resolve` (CLI and MCP), `inspect`, `doctor`, `explain`, stamps and update
  previews use the same composed configuration. Each selection shows its source:
  `project` or `adapter:<path>`.

## Host configuration stays host-owned

The adapter does not install or enforce host settings: `.mcp.json`, `.codex/`,
`.claude/settings*.json`, plugins, permissions or hooks. Those remain explicit
per host. Today, both Agent-Profiles' and workflow-skills' MCP configuration run
the AP executable from `workflow-skills/node_modules`. That dependency is
machine-local and outside this design.

## Packaging

The local reference file is never packaged. Since AP 0.19.10 (branch
`fix/85-package-artifact-allowlist`), `package.json` lists each shipped template
by name. `test/package-files.test.js` places sentinel files, including
`agents.local.yaml`, beside the templates and checks that none reach the tarball.
The allowlist does not protect the contents of shipped templates. Publish from CI
or a clean checkout.

## Migration of the current Agent-Profiles dogfood setup

1. Create `agent-profiles-config`. Move AP's local adoption into it: Ponytail and
   shared-technical-language pins, the auditor and maintainer roles, lock entries
   and approvals.
2. Restore AP's committed `.agent-profiles/` to `origin/main`.
3. Add the ignored local reference file to the AP checkout.
4. Verify that resolve output for each role matches the pre-migration output.
5. Rollback: delete the local reference file. AP returns to committed defaults.
   The adapter repository is unchanged and can be reconnected.

Steps 1-3 require AP support for the local layer, and explicit authorization to
change AP's active configuration.

## Acceptance (from #85)

- Committed-only and adapter operation, missing or invalid adapter, and conflicting
  values are documented and tested.
- Two consumer projects with independent adapters keep independent pins and show
  source provenance.
- A stale update preview is refused when any contributing input changed.
- Migration and rollback lose no repository policy or unrelated work.

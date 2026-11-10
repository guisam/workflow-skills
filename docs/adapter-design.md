# Project adapter design

Status: **Released and migrated on AP 0.22.0.** PRs #96/#99, #100 and #101
implement the adapter, guarded updates (#97), and stamps/evidence (#98).
See the [completed live migration record](live-migration-2026-11-10.md).
Governing issue: [Agent-Profiles#85](https://github.com/guisam/Agent-Profiles/issues/85).
Product contract: Agent-Profiles `docs/project-adapter.md` on that branch.

## Goal

A maintainer develops a project (first: Agent-Profiles) with private, pinned
workshop skills. The project's committed configuration and npm package stay
portable. Another project's pins never move as a side effect.

```text
workflow-skills          → signed packages in the local library (by name@version)
agent-profiles-config    → additions, lock and approvals for Agent-Profiles only
Agent-Profiles           → committed portable defaults + one ignored reference
```

The adapter names packages and versions only. It contains no path to
workflow-skills.

## Decisions

### Assignment precedence: ownership, not ranking

Every binding and every assignment belongs to exactly one layer. The adapter may:

- add package-bound skills under new IDs;
- append skills to a project role's `required`/`available` lists;
- add roles, with a file in the adapter or a package;
- add assignments that select only bindings the adapter declares.

The adapter may not:

- redeclare any project entry;
- change a project role's instructions;
- shadow a project file;
- assign versions to a project binding;
- set defaults, `models`, `families`, `profiles` or `workflow_links`.

Within a layer, AP's existing rule is unchanged: a matching strict-superset
selector wins, and incomparable or duplicate rules are refused. Ownership is
exclusive, so no rule ever compares across layers. A cross-layer tie is
impossible by construction.

Exact-model selection (0.20.0): an adapter assignment may name an exact model ID
the project does not declare, for adapter-owned bindings only. Routing stays the
project's. Only the exact host-stated ID selects the rule. No model, another model,
a near match, a prefix or a different case keeps the adapter's baseline pin. A
project alias is refused. Validation checks each adapter-named model under the
default and every family profile, so ambiguity is refused before any session.

Consequence: the adapter cannot give a *project-owned* skill a model-specific
variant, and it cannot route models. Those changes belong in the project.

### Signing stays separate from install and update

- `install` writes only the adapter lock. Neither `install` nor `update` signs or
  writes approvals; unapproved packages are refused or withheld under policy.
- `library approve` is the only signing command. In adapter mode it records the
  approval in the adapter's `approvals/`.
- Verification reads project and adapter approvals. The signed payload names the
  package, version and digest, not a path. Migration therefore copies the five
  existing approvals byte for byte, and they verify without re-signing.

### Snapshot-backed migration and rollback

`scripts/adapter-migration.mjs` (this repository):

| Step | What it does | Refuses or rolls back when |
| --- | --- | --- |
| `snapshot` | Copies and hashes `.agent-profiles/**` and host files. Records the resolution of every role × (no model, `claude-opus-5-5`, declared models) × (no host, claude, codex) and the approval status of each pinned package | The snapshot directory is not empty, or a local reference exists |
| `migrate` | Writes the overlay, added role files and approval bytes to the adapter. Restores the committed `agents.yaml`, removes moved files, adds the reference, runs `install` and compares everything with the snapshot | Live files drifted since the snapshot; the live adoption is not expressible as additions; any resolution or approval differs (automatic byte rollback) |
| `verify` | Compares current resolutions and approvals with the snapshot | Any difference |
| `rollback` | Restores snapshot bytes, removes the reference and verifies | A snapshot copy fails its hash, or resolution still differs |

Host files (`.mcp.json`, `.codex/`, `.claude/`, `AGENTS.md`, `CLAUDE.md`) are
snapshotted but never changed. `permissions.json` is left in place.

## Evidence (2026-11-09)

- AP branch tests: `test/adapter.test.js` has 9 tests and all pass. They cover:
  - committed-only operation;
  - v1 + v2 composition that writes only the adapter lock;
  - staleness;
  - missing or invalid reference;
  - override refusals;
  - assignment ownership;
  - two projects with independent pins;
  - the update gate;
  - approve-to-adapter and union verification.
- Rehearsal on a disposable clone of the live Agent-Profiles checkout with its exact
  dogfood `.agent-profiles/`:
  - Migration: 50/50 resolutions and approval statuses were identical.
  - The five approvals were copied byte for byte and still verify.
  - Negative checks: a reordered skill list and a missing signature were both detected.
  - Rollback restored the project byte for byte to the live state.
- The machine trust policy has `require_approval: false`. Resolution therefore does
  not withhold unapproved packages, so approvals are checked separately with
  approval required.
- Not covered: paid or live model sessions, or host MCP restarts against the adapter
  build.

# Ponytail through Agent Profiles

The initial automated experiment passed on 2026-11-06 with Agent Profiles 0.19.2.
Live Project A testing then exposed truncated startup instructions and recovery
failures, tracked and fixed in Agent-Profiles #80 / PR #81. Skill development
stays here; those general delivery fixes belong in Agent-Profiles.

The automated experiment now passes with Node 24.20.0 and AP 0.19.4, including
compact startup instructions followed by complete skill retrieval through
`resolve`. The latest isolated report is `.scratch/ponytail-wdZP5U/report.json`.

## Package and role design

Each package starts at local version 1.0.0. Package versions are independent of
upstream Ponytail versions.

| Role | Required skills | Available on request |
| --- | --- | --- |
| implementer | ponytail-implementation | shared-technical-language, ponytail-debt |
| reviewer | ponytail-review, shared-technical-language | ponytail-debt |
| auditor | ponytail-audit, shared-technical-language | ponytail-debt |
| maintainer | ponytail-debt, shared-technical-language | none |

The package names are `@local/<skill-name>`. Project-specific role files preserve
approval authority and report conventions; shared skills do not authorize merges,
publication, or orchestration. These assignments are examples, not AP defaults.

Source: https://github.com/DietrichGebert/ponytail at commit
`96608e078b2d5ea607c5c3b8b5a54d1c1fba6846` (5.3.3). Every derived package includes
the complete MIT license and a `PROVENANCE.json` recording the original file hash,
source path, commit, and adaptations.

The implementation skill fixes the policy at full and removes persistent mode
toggles and lite/ultra selection. All four descriptions become role-specific.
The debt skill's custom-marker example uses a normal request instead of a slash
command. The other policy bodies are preserved. Plugin hooks, mode tracking,
help, and the benchmark gain card are excluded. These are instruction packages
with no bundled executable scripts; agents still need their normal repository
read, shell, and test permissions to follow the instructions.

## Reproduce

From this repository, with Node 24 and dependencies already installed in the AP
checkout:

```powershell
node scripts/import-ponytail.mjs C:\workspace\ponytail --check
node scripts/validate-package.mjs C:\workspace\Agent-Profiles
node scripts/test-ponytail.mjs C:\workspace\Agent-Profiles
```

The importer without `--check` regenerates the four packages from the recorded
clean upstream commit. It deliberately rejects a different commit until someone
reviews the adaptation. It does not fetch upstream or automatically update pins.

The test prints its unique `.scratch/ponytail-*` run directory and writes
`report.json` there. It retains Project A, Project B, their configuration and
lockfiles, and the shared isolated store for inspection. Its temporary trust
path is process-local and absent; this tests ordinary unsigned packages, not
the user's live trust policy. It uses no model APIs or new dependencies.

Verified:

- Five package manifests and immutable imports, including reuse and rejection
  of changed bytes under the same identity.
- Four roles in two projects for both `codex` and `claude` selectors; optional
  shared-language loading by the implementer.
- Two real stdio MCP clients receiving bound review instructions and their own
  project role content; `resolve`, `library_read`, `outdated`, and `update_preview`.
- Preview operations leave project trees unchanged. Applying a stale preview
  digest fails without writing.
- Publishing a disposable 1.0.1 candidate leaves both projects pinned. A updates
  independently, B later converges, and both roll back to the original content.
- A fresh MCP connection receives updated instructions through `resolve`.

The 1.0.1 candidate is a test-only evidence sentence, retained only in the run's
scratch source and store. It is not a release of these skill packages.

## What keeping projects in sync means

One skill source repository can feed one AP library. Projects consume immutable
versions from that library and explicitly adopt reviewed updates. They do not
silently follow the latest source checkout or newest published package.

In this experiment the update targets the reviewer / fixture-model / codex
assignment. The corresponding claude assignment deliberately stays at 1.0.0.
Adopting a release across hosts, models, and projects requires reviewing and
updating every intended assignment. MCP previews the changes; the CLI applies
them using the reviewed preview digest. No background synchronization service
has been added.

## Next: live T3 validation before removing native Ponytail

### Resumed after #80

The existing `.scratch/ponytail-dW5W9O/project-a` and `project-b` now both install
exactly `@guisam/agent-profiles@0.19.4` from npm. Their protocol 3 Claude bootstrap
blocks were regenerated. Each MCP command points to that project's installed
package, not the mutable Agent-Profiles source checkout. Both bind Claude,
`claude-opus-5-5`, and reviewer, using the same isolated store and trust setting.
Native Ponytail is disabled locally in both projects; global plugins are retained.
Project B's project-scope MCP approval remains the user's first-session step.

Both projects pass `doctor` and a real stdio MCP probe: startup is 1,488 bytes,
`resolve` contains the exact source bodies of both required skills, the local
project's reviewer text, and the final completion marker. Package pins remain
1.0.0. The upstream adaptation check also passes.

Prior user-observed Project A runs demonstrated fresh/clear/compact recovery
through MCP after the #80 fix. Portable-fixture tests separately covered shell
fallback and a T3 missing-skill failure that stopped review. These are individual
observations, not universal reinjection or instruction-adherence guarantees.
AP #82 tracks subagents; #83 tracks the remaining delivery failure scenarios.

Next, open Project B in T3 and explicitly choose **Claude / Opus 5.5**, in a fresh
session. Approve its project MCP server when prompted. Send a neutral review
request first, then ask for observable tool calls, required skill identities,
project role text, and the completion marker. Do not tell the agent to resolve
in the review request: automatic setup is part of the test. Compare with Project
A before attempting a live skill-version update across both projects.

Use the retained disposable projects for a live host test. Do not use an existing
session with native Ponytail instructions as evidence of AP-only delivery.

1. Configure a test session with native Ponytail disabled for that session or in
   an isolated host profile. Keep the existing installation available for rollback.
2. Bind AP's MCP server to the selected scratch project and scratch store, with
   the actual host, known model identity, and reviewer role. The fixture config
   uses `fixture-model`; add the actual model mapping in that disposable config.
   Use the same isolated trust setting as the automated test.
3. Ask for a small change review. Confirm the resolved package identity and
   version, and check that the report follows both Ponytail and that project's
   local authority. Repeat in the other project.
4. Exercise the host's actual clear and compact operations. Confirm the required
   role and skill instructions are delivered again. A successful MCP reconnect
   alone does not establish either host behavior.
5. If subagents are part of the intended workflow, validate their role delivery
   separately. Do not assume they inherit the parent MCP context.
6. Test implementer, auditor, and maintainer behavior with small representative
   tasks, then assess output quality and conflicts with other installed skills.

Only after those checks should native Ponytail be removed and live projects
adopt these packages. The experiment does not establish reliable model adherence,
compatibility with live trust policies, or equivalence to all native hooks.

## Maintaining the source

For each upstream release: review the diff against the recorded commit, revise
the small adaptation script, bump changed AP package versions, regenerate and
validate, publish to the intended library, and preview adoption in each project.
Do not overwrite an existing package version with new bytes. Keep the upstream
license and provenance with every package. A future public case study belongs
in Agent-Profiles only after the live results are available.

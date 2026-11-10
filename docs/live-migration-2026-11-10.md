# Live adapter migration — completed on 2026-11-10

The maintainer authorized this release and migration in the T3 conversation.
AP 0.22.0 is published and the local development configuration is migrated.
This supersedes the paused 2026-11-09 attempt. No skill version, signing key or
trust policy changed.

## Runtime and configuration

- Release source: `c2134bebbf38e58d59b21b48dcaa6256a2b7e870`.
- [Release workflow](https://github.com/guisam/Agent-Profiles/actions/runs/42862895664)
  passed all checks and published with OIDC. Downloaded npm tarball SHA-1 matches
  both CI and registry: `e0ef8df330c1c5313f1f15d77edcc2ccf0cb9e56`.
- workflow-skills now pins AP 0.22.0; install and clean install succeeded.
- Agent-Profiles is now on main at the release commit, with a fresh 0.22.0 build.
  Its standard bootstrap commands and notice hook remain in use. MCP servers
  continue using the workshop's installed 0.22.0 package.
- Ignored product reference: `.agent-profiles/agents.local.yaml` points to
  `../agent-profiles-config`. Product `agents.yaml` matches committed defaults.
- The adapter is a local Git repository at `C:/workspace/agent-profiles-config`,
  initial commit `16ff1a6`. No remote was created. It contains five 1.0.0 pins,
  role additions, composed lock and unchanged approvals; no signing keys.
- The original product work is preserved on `docs/ponytail-preset` and in named
  stash `e6825f77218f05591393efe9335a9c4dccb2db19` (created before checkout upgrade).
  Its compaction changes, old version edits and Trail hook modification were not
  reapplied over released main. Review them separately before applying anything.

## Verification

- Fresh snapshot: `C:/workspace/.ap-snapshots/2026-11-10-0220`, 24 AP files and
  six host files, plus workshop manifests and the previous Git exclude file.
- Before migration, installed 0.22.0 matched all 50 snapshot checks: 45
  role/model/host resolutions and five approval statuses.
- Migration, subsequent verification and verification after changing the product
  checkout to main all matched 50/50. Every approval reports approved.
- All ten copied approval/signature files match the snapshot SHA-256 values.
- Fresh stdio MCP processes for Claude and Codex each resolved the default
  implementer, reviewer, auditor and maintainer roles. All eight results ended
  with the completion marker. Explain reported the adapter reference, valid lock,
  no withheld skills and no unsatisfied requirements.
- Doctor passes in both repositories. The Claude notice hook command exits 0.
- A composed implementer stamp was captured and verified:
  `0879273f329debd495a61492d45eb257e2f264008ba95891cb6dfc384b796a62`.
  Its configuration is reproducible and the lock covers the configuration.
  The local reference remains digest-only by design.

Raw checks and the stamp/verification JSON remain beside the private snapshot.
These tests establish configuration equivalence and fresh MCP delivery, not model
adherence. New interactive Claude and Codex sessions must still be opened by the
user; existing sessions can retain old instructions and need a restart/re-resolve.

## Rejected intermediate approach

Temporarily pointing managed bootstrap text and the notice hook directly at the
workshop executable resolved correctly, but doctor rejected modified blocks and
still found the old checkout runtime. Those edits were reverted. Preserving the
old work in a stash, moving to released main, rebuilding, and retaining standard
commands made doctor pass without exceptions.

## Rollback

Stop affected AP MCP processes first. From workflow-skills run:

```powershell
node scripts/adapter-migration.mjs rollback C:/workspace/Agent-Profiles C:/workspace/.ap-snapshots/2026-11-10-0220 --ap C:/workspace/workflow-skills/node_modules/@guisam/agent-profiles
```

This restores the old project AP configuration and verifies the snapshot. Keep
the adapter repository for inspection. Version rollback is separate: restore the
saved workshop package manifests and clean-install 0.19.4 only after removing the
adapter reference. The old product branch and named stash preserve source work;
do not blindly apply the stash to main, because it includes obsolete version
edits and temporary bootstrap changes. Original host files are in snapshot/host.

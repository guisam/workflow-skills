# Live adapter migration — 2026-11-09

Status: release published; migration blocked by npm tarball availability.

The maintainer authorized publication and migration in the T3 conversation after
closing #97. This run targets **0.21.0**, superseding the prepared checklist's
0.20.0 target. Existing unrelated product-checkout work must be preserved.

## Release

- Merged source: `0137f148873c23b4c77179cbf97fa3b452545ed6`.
- [OIDC publish workflow](https://github.com/guisam/Agent-Profiles/actions/runs/42728903814)
  passed typecheck, lint, full tests, package validation, dry-run and publication.
- Workflow tarball SHA-1: `c1d35b5b2502720073191484e6baa2f0949309ef`.
- Registry metadata subsequently lists 0.21.0 as latest and the same tarball SHA-1.
  The tarball endpoint still returned 404 at 2026-11-10 00:41 UTC. Repeated installs
  failed with E404; neither workshop package manifest changed.

## Snapshot and upgrade rehearsal

- Private snapshot: `C:/workspace/.ap-snapshots/2026-11-09-0210`.
- Captured 24 AP files and six host files. The older checklist expected two host
  files; the snapshot now includes both MCP files, both Claude settings files,
  AGENTS.md and CLAUDE.md.
- Snapshot resolver: installed AP 0.19.4.
- Verification with merged 0.21.0 source: **50/50 identical** (45 resolution
  combinations and five approvals). No baseline resolution errors.
- All five package approvals report approved, with zero problems.
- Workshop package manifests were backed up alongside the snapshot.

## Remaining execution

Install and verify the published package; update the product's local bootstrap and
hook to use the workshop runtime; migrate and verify the adapter; retain a private
adapter repository and rollback evidence; verify fresh MCP processes for both
hosts. Actual new interactive Claude and Codex sessions remain a separate check.

No packages have been re-signed and no trust policy has changed.

## Paused state and resumption

The AP MCP process serving this T3 session was stopped before the attempted
upgrade. Start a new session or reconnect that server to resume using the intact
0.19.4 installation. No application or other agent process was stopped.

The existing installation still reports 0.19.4. Its post-attempt verification
again matched all 50 snapshot checks. No adapter directory or reference was
created; no host instructions or hooks were edited.

When the registry archive becomes available, install exact 0.21.0 into the
workshop, verify against this snapshot before migration, and follow the remaining
steps above. Recheck snapshot freshness and stop any newly started old MCP
process before changing the configuration. Do not retry publication: the version
has already been published successfully.

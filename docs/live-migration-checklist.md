# Live migration checklist: Agent-Profiles dogfood → project adapter

Status: **Historical preparation checklist; executed using 0.22.0.** See
[the completed migration record](live-migration-2026-11-10.md) for current state,
evidence and rollback. The 0.20.0 references below describe the original plan.
Each step marked
**Gate** needs the user's explicit authorization at the time it is run.
Governing issue: Agent-Profiles#85. Feature: AP 0.20.0 (PR #96, stacked on #95).
Tool: [`scripts/adapter-migration.mjs`](../scripts/adapter-migration.mjs). Design:
[adapter-design.md](adapter-design.md).

## Live setup as found (2026-11-09)

| Component | Runs | Version | Reads the adapter? |
| --- | --- | --- | --- |
| Claude MCP for `C:\workspace\Agent-Profiles` (`.mcp.json`) | `workflow-skills/node_modules/@guisam/agent-profiles/dist/bin/agent-profiles.js` | 0.19.4 | No |
| Codex MCP for the same project (`.codex/config.toml`) | same file | 0.19.4 | No |
| Claude SessionStart hook in Agent-Profiles (`npx --no agent-profiles notice`) | the Agent-Profiles checkout's own `dist/` build | 0.19.11 (built 2026-11-08 from the checked-out branch) | No |
| MCP and hook for `C:\workspace\workflow-skills` | the workflow-skills package | 0.19.4 | Not needed: no adapter is planned here |

- The Agent-Profiles checkout is on `docs/ponytail-preset`. That branch has unrelated
  uncommitted work, including a bump to 0.19.11. Its dogfood state: `agents.yaml`
  raised to v2 with five `@local` pins; `roles/auditor.md` and `roles/maintainer.md`
  added; `agent-profiles.lock`, five signed approvals and `permissions.json` added.
- The machine trust policy has `require_approval: false`. The tool therefore checks
  approval status separately, with approval required.

**Why the order matters:** an AP version older than 0.20.0 ignores
`agents.local.yaml`. If any host component still runs an older build after the
migration, it silently drops the five skills and the auditor and maintainer roles.
Every component in the table must run 0.20.0 or later before step 7.

## Rehearsal evidence (disposable clone, 2026-11-09)

The full sequence below ran against a clone of the live checkout with its exact
`.agent-profiles/`:

1. Snapshot with the installed 0.19.4.
2. `verify` with 0.20.0: 50/50 identical. The version change alone is neutral.
3. `migrate` with 0.20.0: 50/50 identical. Resolve now reports the adapter.
4. `rollback`: 50/50 identical, and the project is byte-identical to live.

The 50 checks are 45 role × model × host resolutions plus the approval status of
5 pins. Not rehearsed: real host restarts and live model sessions.

## Steps

### A. Release (no live change)

1. **Gate: merge.** Review and merge #95, then #96. If the 0.19.11 work on
   `docs/ponytail-preset` merges first, #96 stays 0.20.0. Rebase it and re-run
   `npm test` after the rebase.
2. **Gate: publish.** Publish 0.20.0 through `publish.yml`, or pack a tarball from a
   clean CI checkout. Never pack from the dogfood checkout.
3. Choose a snapshot directory outside every repository, for example
   `C:\workspace\.ap-snapshots\2026-11-XX`. It must not exist yet.

### B. Snapshot with the live version (read-only)

4. Close nothing yet. Run:

   ```powershell
   node scripts/adapter-migration.mjs snapshot C:\workspace\Agent-Profiles <snapshot> --ap C:\workspace\workflow-skills\node_modules\@guisam\agent-profiles
   ```

   Expected result: `24 files, 2 host files`, and no errors in `resolutions.json`.
   If the file count differs, inspect the change before continuing.

### C. Upgrade every host component to 0.20.0

5. **Gate: stop hosts.** End every Claude Code, Codex and T3 session whose MCP server
   runs from `workflow-skills/node_modules`. That includes sessions in workflow-skills
   and in Agent-Profiles. On Windows, a running server can lock the package files
   and make `npm ci` fail.
6. **Gate: upgrade.**
   - In workflow-skills, set `@guisam/agent-profiles` to `0.20.0` in `package.json`,
     then run `npm install` and `npm ci`. This also upgrades workflow-skills' own
     sessions.
   - In Agent-Profiles, make the hook's build 0.20.0 or later. Either commit or merge
     the branch work and `npm run build` on a commit that contains #96, or (a host
     configuration change) point the hook at the workflow-skills package. Don't
     discard uncommitted work to do this.
   - Check: `npx --no -- agent-profiles --version` reports 0.20.0 or later in both
     repositories.
7. Verify the upgrade alone, before migrating:

   ```powershell
   node scripts/adapter-migration.mjs verify C:\workspace\Agent-Profiles <snapshot> --ap C:\workspace\workflow-skills\node_modules\@guisam\agent-profiles
   ```

   Expected: `50 resolutions identical`. If there are any differences, stop. Revert
   the workflow-skills upgrade (step 12b); the configuration has not moved yet.
   For workflow-skills itself, run `npx --no agent-profiles doctor` and confirm it
   still resolves all four roles.

### D. Migrate (configuration change)

8. **Gate: migrate.** Hosts stay stopped. Run:

   ```powershell
   node scripts/adapter-migration.mjs migrate C:\workspace\Agent-Profiles <snapshot> C:\workspace\agent-profiles-config --ap C:\workspace\workflow-skills\node_modules\@guisam\agent-profiles
   ```

   Expected: `50 resolutions identical`. On any difference the tool rolls back
   automatically and prints the result.
9. Confirm that `.agent-profiles/agents.local.yaml` is ignored in Agent-Profiles: the
   0.20.0 `.gitignore` lists it. Run `git status --short .agent-profiles`. The
   expected output is `?? .agent-profiles/permissions.json` only, because
   `permissions.json` is unchanged and still untracked.
10. **Gate: adapter repository.** Run `git init` in `C:\workspace\agent-profiles-config`,
    review its files, commit them, and create a private remote only if wanted.
    It holds the overlay, two role files, the lock and five approvals; no keys.

### E. Restart hosts and check live behavior

11. Start a new Claude Code session in Agent-Profiles, then a new Codex session.
    In each:
    - [ ] The SessionStart notice hook runs without error. This applies to Claude;
      Codex has no hook.
    - [ ] MCP `resolve` with the exact model ID and no role gives `implementer`,
      required `ponytail-implementation`, `shared-technical-language`; available
      `testing`, `ponytail-debt`.
    - [ ] Assigned `reviewer`: required `code-review`, `ponytail-review`,
      `shared-technical-language`.
    - [ ] Assigned `auditor` and `maintainer` resolve. Their role body is the copied
      file.
    - [ ] Each result has `adapter.reference: ../agent-profiles-config`, `lockState: valid`
      and no `withheld` entries.
    - [ ] `npx --no agent-profiles doctor` passes and prints the
      `Configuration: … composed with adapter` note.
    - [ ] `scripts/adapter-migration.mjs verify …` (as in step 7) reports
      `50 resolutions identical`.

    Record the outputs next to the snapshot. These checks show delivery, not model
    behavior.

### F. Rollback

12. Trigger rollback on any failed check in step 11, or on an unexpected refusal
    in daily use:
    - a. Configuration: stop hosts, then run `adapter-migration.mjs rollback
      C:\workspace\Agent-Profiles <snapshot> --ap <0.20.0 package>`. It restores the
      snapshot bytes, removes the reference and verifies 50/50. The adapter
      repository is kept.
    - b. Version, only if the upgrade itself is at fault: restore workflow-skills'
      `package.json` and `package-lock.json` from Git, run `npm ci`, restore the
      hook build, restart, then run `verify` with the 0.19.4 package.
13. After a rollback, the dogfood state matches the snapshot byte for byte. Nothing
    is re-signed, and the five packages in the library are unchanged.

## Known limits after migration (0.20.0)

- `update`, `configure`, `preset`, `migrate`, `stamp`, `inspect` and related commands
  refuse in Agent-Profiles while the adapter is configured. Follow-ups:
  Agent-Profiles#97 (guarded updates) and #98 (stamps and evidence).
- Release Agent-Profiles only from CI or a clean worktree, as before.

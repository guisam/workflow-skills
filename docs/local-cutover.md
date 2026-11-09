# Local Ponytail cutover

The user authorized migrating Agent-Profiles and workflow-skills, then explicitly
approved signing the five inspected packages with the configured AP key.

## Installed state

- Stable packages: `@local/ponytail-implementation`, `ponytail-review`,
  `ponytail-audit`, `ponytail-debt`, and `shared-technical-language`, all 1.0.0.
- Shared library: the normal user AP store. The disposable 1.0.1 experiment
  remains in its separate scratch store and is not a production release.
- Both projects have signed approvals, valid version-2 configurations and locks,
  and protocol-3 Claude and Codex bootstrap blocks.
- Existing Agent-Profiles role instructions, researcher role, testing skill,
  code-review skill, profiles and repository rules were preserved.
- Implementer is the default. Reviewer, auditor and maintainer must be assigned
  explicitly; shared technical language is required in each of these four roles.
- Both host MCP configurations use the installed AP 0.19.4 executable in
  workflow-skills/node_modules. Run `npm ci` in workflow-skills to restore it.
  Model and role are unbound; the host supplies its identity, and the user or
  agent definition assigns the role. Removing workflow-skills breaks this path.
- Native Ponytail is disabled at project scope for Claude and Codex. It remains
  installed for other projects and rollback. Other plugins were not changed.
- The existing live trust policy remains unchanged and requires signed approval.

## Verification

Both projects pass `doctor`. Sixteen direct MCP checks cover both projects,
both hosts, and all four roles: full skill bodies, completion marker, valid lock,
and no withheld skills. Evidence: `.scratch/cutover-verification.json`.
These are protocol checks, not paid model behavior tests.

Prior live A/B tests established independent pinning and explicit convergence:
A adopted review 1.0.1 while B retained 1.0.0, then B adopted the same digest.
Both retained project-specific roles. B reconnected before its final retrieval;
uninterrupted refresh was not established. Accidental Codex/native-plugin runs
were excluded from the Claude AP delivery evidence.

## First session

Start a fresh T3 session in either migrated project. Existing sessions retain
already-injected plugin text. Trust the project and approve its MCP server when
the host asks. For a review, assign the reviewer role explicitly before work:

> Work as the reviewer. Resolve Agent Profiles for this role before reviewing.
> Report the selected required packages, any withheld skills, and the completion
> marker. Do not modify files.

Expect stable review and language 1.0.0, with the existing local code-review
skill also required in Agent-Profiles. For implementation, the default role
requires implementation and language 1.0.0. A role change requires a new resolve;
use separate sessions for independent implementation and review.

Native mode levels, plugin hooks, help and benchmark commands were not migrated.
Subagent delivery and consistent model adherence remain unverified (#82/#83).

## Rollback and publication boundary

The pre-cutover copies are under
`.scratch/ponytail-cutover-20261106-200541/agent-profiles` and `workflow-skills`.
Restore only integration files after comparing for newer edits. Remove newly
created integration files only when the backup shows they were absent. Removing
the project-local Ponytail disable settings restores the installed plugin.
Signed library packages may remain; publication alone does not activate them.

Agent-Profiles adoption is a local machine configuration, not an npm release or
a proposed product default. Its tracked integration files are locally modified.
Do not commit these private pins or pack/release this dirty checkout: the npm
package includes `.agent-profiles`. Build releases from a clean product revision.
The skill sources stay in workflow-skills. No product version, public release,
GitHub wiki publication or remote push was performed for this local cutover.

# Elephant role in Agent-Profiles

The user authorized activating the previously described setup on 2026-11-11.
Both packages were reviewed against the handoff and authority contracts, validated
in an isolated store and disposable consumer, published to the local AP library,
and signed with the configured AP approval key. Nothing was published remotely.

## Start a session

Open a new T3 thread targeting `C:/workspace/Agent-Profiles`. Select Codex Astra
in T3. Use this first message:

> Work as the elephant. Resolve Agent Profiles with role `elephant` using your
> actual host-stated model identity before proceeding. Help me develop the design
> and preserve decisions. Load the available `delegate` skill before handing off
> child tasks. Follow my authorization and the project's review gates.

AP model identity is supplied by the host, not inferred from the display name.
The verified tuple is host `codex`, model `gpt-6-astra`, role `elephant`.
Selecting a model or naming a thread Elephant does not itself assign the role.
Restart existing MCP connections if they retain older runtime or configuration.

## Installed configuration

The external `C:/workspace/agent-profiles-config` adapter adds:

- `elephant`, with instructions in `.agent-profiles/roles/elephant.md`.
- Required `elephant-workbench` 0.1.0 and `shared-technical-language` 1.0.0.
- Available `delegate` 0.1.0, loaded explicitly when needed.

The adapter owns the new bindings, role, lock and signed approvals. The product's
committed configuration and its default implementer role were not changed.
The workbench's own default and role configuration were not changed.

Approved package identities:

| Package | SHA-256 |
| --- | --- |
| `@local/elephant-workbench@0.1.0` | `69f6da4a2ea568d04b2d023cfecde842e40b115eaa07a065e38216fd5dacfd57` |
| `@local/delegate@0.1.0` | `89a42ab6278bddc0be8d1cd9e7c5d6b1e2d4239d1068006fabac7f67c5177bc4` |

The elephant package's workbench reference records its pre-adoption design
baseline. This document records the subsequent deployment; signed package bytes
are immutable. Model provider and effort remain the user's T3 selection.

## Verification and limits

Node 24 and installed AP 0.23.9 were used for validation. Isolated package import
and adapter composition passed. Live CLI resolution found no withheld skills or
unsatisfied requirements. A new stdio MCP process delivered the full elephant
skill body and completion marker, then delivered the complete delegate body on
request. Existing implementer, reviewer, researcher, auditor and maintainer
resolutions retained identical profile, role, loaded/required/available content
and requirement status.

The user subsequently reported a successful live elephant launch under Astra in
a new T3 session. This is user-reported startup evidence, not an independently
observed child dispatch or paid model evaluation. See [goldfish roles](goldfish-adoption.md)
for the specification-review roles. T3 delegation tools must be available in the session. A new
worktree still needs its ignored adapter/host configuration and design resources
delivered before work; that lifecycle has not been live-tested. Top-level threads
remain distinct from child tasks and require the user's thread request.

The product checkout bootstrap reports AP 0.23.10 while the shared installed MCP
runtime is 0.23.9. This pre-existing doctor version mismatch remains; fresh
resolution through the shared runtime passed. No source-checkout downgrade was
performed.

Snapshot and raw evidence are under ignored
`.scratch/elephant-adoption-EJ2uva/`. For rollback, compare for intervening edits
before restoring the adapter's `agents.yaml` and `agent-profiles.lock` from
`backup-adapter/`, then remove only the added `roles/elephant.md` and verify the
old roles. The new packages and approvals may remain; without the bindings they
do not activate. Do not restore a snapshot over later adapter work.

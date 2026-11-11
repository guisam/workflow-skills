# Goldfish roles for Sol 6.1 and Opus 5.5

Status: packages reviewed, validated, published locally, signed with the configured
AP key and activated in Agent-Profiles' external adapter on 2026-11-11.
No live model evaluation has been run. No remote publication occurred.

The user requested these specification-review roles for both models. The T3
capability catalog reports the following execution targets:

| T3 provider | Exact model ID | AP host |
| --- | --- | --- |
| `codex` | `gpt-6.1-sol` | `codex` |
| `claudeAgent` | `claude-opus-5-5` | `claude` |

T3 selects the model and execution settings. AP selects the explicitly assigned
role and its instructions. These are model-neutral roles, not an exclusive model
allowlist; both requested models use the same 0.1.0 package versions. No new model
mapping, default role, effort setting or automatic dispatch rule is introduced.

## Role contracts

| Role and required skill | Review evidence | Expected result |
| --- | --- | --- |
| `goldfish-comprehension` | The designated design document alone | Explain the proposed and current behavior, then identify material ambiguity |
| `goldfish-design` | Design plus relevant permitted source evidence | Concrete design defects, conditional risks, unsupported assumptions and trade-offs |
| `goldfish-readiness` | Plan, target project and relevant permitted sources | Readiness of the bounded assignment, with blockers separated from optional refinements |

Each role also requires `shared-technical-language` 1.0.0. None has optional
skills by default. Read-only conduct and no further delegation are instructions;
they do not claim that T3 removes tools or creates an OS sandbox.

The review skills are original, self-contained workbench packages. Comprehension
and readiness record their conceptual EGM sources in their skill files. No EGM
plugin installation or runtime resources are required. No public license was
selected for these original packages.

## Assign a review

In an existing elephant session, re-resolve the elephant role to load the updated
role instructions listing the three goldfish roles. Restart the MCP connection
if the session retains stale configuration.

In the elephant session, request a bounded review, for example:

> Delegate an independent design review of [design path and revision] in
> Agent-Profiles to Sol 6.1, using AP role `goldfish-design`. Give the child the
> design and relevant sources, without our discussion or a preferred verdict.
> Return findings without changing files.

For Opus, request Opus 5.5 instead. Choose `goldfish-comprehension` for a
document-only explanation test or `goldfish-readiness` for implementation handoff
readiness. The elephant must preserve the selected model and load `delegate`
before a child-task handoff. The child resolves its assigned AP role using its
actual host-stated identity. The capability check names the dispatch target; it
does not substitute for the child's identity check.

A new manually opened T3 thread can also select the model and start with:

> Work as `goldfish-readiness`. Resolve Agent Profiles for that role using your
> actual host-stated model identity before reviewing [plan path and revision].
> Assess readiness without implementing or editing anything.

Changing the elephant's role inside its existing conversation is not independent
review. Fresh parent-turn context can still contain project/host instructions.
An independent reviewer must disclose an unsuitable context rather than claim
isolation. If a design needs revision, the elephant and user handle that decision;
a review verdict does not grant execution or merge authority.

## Package identities

| Package | SHA-256 |
| --- | --- |
| `@local/goldfish-comprehension@0.1.0` | `7251480c9f749b97418d954d5cd27359814d188bd382087d30721ac8f6b9773f` |
| `@local/goldfish-design@0.1.0` | `f4e34ad98285e92a25d05bbe72944f7a1694cc245b017eec3196cae916fbb1ff` |
| `@local/goldfish-readiness@0.1.0` | `841e1ee9d5af4c5ef1f08e44c93be08e8637a56b6e1e13d05104eac55490ec4b` |

## Verification and recovery

Skill frontmatter validation, AP package validation/import and all six
role/model combinations passed in an isolated store and disposable consumer.
The existing adapter and twelve baseline role/model resolutions were captured in
ignored `.scratch/goldfish-adoption-jaAlXp/` before live changes.

After activation, all six live CLI combinations resolved with the intended
required skills, no withheld skills and no unsatisfied requirements. Two fresh
stdio MCP processes, one per host, delivered all three role packages and shared
technical language in full, each with the completion marker. All twelve existing
role/model selections preserved their profile and skill selections; the elephant
role text gained the explicit goldfish roster. Other existing role content was
unchanged. Signed approval verification passed for all three packages. Raw MCP
results and the verification record remain beside the snapshot.

For rollback after activation, compare for later edits before restoring the
adapter's `agents.yaml`, `agent-profiles.lock` and `roles/elephant.md` from
`backup-adapter/`, then remove only the three added goldfish role files. Verify
the previous roles resolve. Local package bytes and approvals can remain without
activating skills once their bindings are removed.

Model adherence, review quality and fresh-worktree delivery require separate
behavioral evidence. The user reported a successful live Astra elephant startup;
that does not establish goldfish behavior on Sol or Opus. The pre-existing AP
0.23.9 shared-runtime / 0.23.10 product-bootstrap mismatch remains unchanged.

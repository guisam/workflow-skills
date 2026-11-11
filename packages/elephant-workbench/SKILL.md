---
name: elephant-workbench
description: Develop and preserve a design with the user, arrange fresh-context specification reviews, and prepare project-specific implementation handoffs from a development workbench.
---

# Elephant workbench

The elephant is the continuing design conversation. It explores intent with the
user, preserves decisions, and reconciles evidence from other agents. It may
inspect code and write design artifacts; it does not implement product code in
this role. An explicit change of assignment requires the appropriate project
instructions and role before implementation.

## Develop the design

Start with the user's problem and the relevant project's governing sources.
Distinguish confirmed constraints, proposed choices, assumptions and open questions.
Challenge consequential assumptions and discuss alternatives with the user.
Ask only questions that affect the design or next action. Ordinary discussion
does not require dispatching agents or producing a full specification.

As decisions become useful beyond the conversation, maintain a durable design
record in the user's chosen location or the project's established design area.
Keep private workbench notes separate from product-owned documentation. Identify
the target project explicitly; do not mix decisions from unrelated projects.

Use the project's existing format. Otherwise capture:

- Problem, desired outcome, scope and exclusions.
- Governing sources, constraints and relevant current behavior.
- Decisions, their rationale, alternatives rejected, and unresolved questions.
- Proposed changes, affected interfaces/files where known, and dependencies.
- Acceptance checks and implementation boundaries.
- Review findings, their disposition, and the user's implementation authorization.

Scale detail to the task. Do not invent file names or signatures to make a draft
look ready. Record unknowns as investigation work. Reference an exact revision or
snapshot when handing off a design so later edits cannot silently change the task.

After compaction or a new session, reload the governing sources and latest design
record. Reconcile it with the current assignment and repository state. Conversation
memory is not the sole record of a decision or authorization.

## Request fresh review when useful

A goldfish is a fresh-context specification reviewer, not an implementer. Use
independent review for consequential designs or when requested; do not impose a
fixed number of agents or review rounds on every task. Preserve project-mandated
review gates and any user limits on delegation or spending.

Supply the design revision, governing constraints, necessary source access and a
bounded review question. Do not supply the brainstorming transcript, the
elephant's preferred verdict, or another reviewer's conclusions for an independent
first pass. Fresh context still needs enough evidence to assess the design.
Request a read-only review. Confirm parent conversation history is excluded;
if the host cannot provide a fresh context, report independent review as
unavailable rather than relabeling the elephant's self-review. Host and project
instructions may still be present: report that limit without claiming complete
isolation or excluding governing authority.

Choose the review question that addresses the uncertainty:

- Comprehension: read the design alone to test its self-containment. Return an
  explanation of the proposal and current behavior before listing ambiguities.
  Preserve that explanation even when there are no findings; compare it with
  the intended design. Keep source verification separate from this test.
- Challenge: find concrete failure cases, hidden dependencies and unsupported assumptions.
- Readiness: identify missing information that would force an implementer to make
  consequential design decisions; distinguish blockers from optional refinements.

Request findings with supporting evidence and a clear statement of what was not
checked. Resolve findings with the user as needed, update the design, and retain
unresolved objections. A reviewer verdict is evidence, not implementation or merge
authorization. Re-review affected parts when revisions invalidate earlier findings.
Honor agreed review budgets. If the budget is exhausted, report the remaining
findings and readiness limits; a round limit never accepts objections on the
user's behalf. Leave routine implementation choices to the worker within the
agreed boundaries, while returning consequential design changes to the elephant.

## Hand off implementation

Proceed when the design is sufficiently specified for the assignment and the
user's existing authorization covers implementation. Do not ask again for an
authorization already given. If only investigation is ready, delegate that
bounded investigation instead of presenting the design as implementation-ready.

The handoff names the target repository, design revision, objective, allowed
changes, dependencies, acceptance checks, open issues, and expected return evidence.
Preserve the user's provider, model, settings, branch/base and execution choices.
AP delivers instructions; the host selects and runs the model. Elephant and
goldfish are workflow responsibilities, not model IDs or capability rankings.

Use the consumer's installed delegation contract for child tasks. If none is
available, follow the host's current orchestration tools and instructions; do not
assume a skill name loads its content. A new top-level T3 thread requires the
user's request for that thread. A child task and a top-level thread are distinct.
Ask T3 to prepare any required worktree; do not create a checkout inside the task
prompt. Bind execution to the target project, not the workbench by accident.

Require the worker to load that project's governing instructions and resolve its
AP role for its actual host/model/workspace before dependent work. Verify that
required adapter references, packages and supporting files are accessible in the
new workspace: ignored local configuration and uncommitted designs are not
automatically copied into a worktree. Follow the supported bootstrap and stop the
assignment on incomplete or mismatched delivery. Workbench instructions cannot
replace consuming-project authority.

Collect the outcome, changed files, checks and evidence, unresolved issues,
skipped checks, and actual model/profile/role/package identities. Preserve the
host's task or thread reference and waiting instructions. Distinguish reported
results from independently verified checks. Reconcile discoveries into the design
record, and follow the target project's code-review and completion gates.

## Local setup and provenance

Read [the workbench mapping](references/workbench.md) when configuring this
workflow or checking its deployment status. This skill does not install a plugin,
select a model, change routing, or authorize publication or paid evaluations.

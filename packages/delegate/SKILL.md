---
name: delegate
description: Use when handing a bounded task to a child agent through T3 Code with Agent Profiles instructions. Not for creating top-level threads or changing profile configuration.
---

# Delegate

T3 manages the child task. Agent Profiles (AP) selects and delivers its
instructions. The parent supplies the assignment and checks the returned evidence.

## Prepare the assignment

State the objective, relevant context, workspace, allowed changes, dependencies,
acceptance checks and expected result. Carry forward the user's constraints and
authorization. Delegation does not grant permission to publish, spend or change
unrelated files. Use a plan file when useful; confirm the child can read it.

Choose an existing AP role that fits the assignment. Do not create a role or
specialist persona merely to delegate. Keep task-specific instructions in the
handoff and reusable policy in AP.

## Select the execution target

Follow the host's delegation rules. Check T3's orchestration capabilities before
the first T3 delegation. Preserve the requested provider, exact model and settings.
If they are unavailable, report the blocker instead of substituting another model.

Use the host-required native path when applicable. Use T3 delegation for
cross-provider work, requested T3 delegation or other cases required by the host.
Do not create a top-level thread as a substitute for a child task. Request an
isolated checkout through T3 when needed; do not create it in the handoff prompt.
For concurrent work in a shared checkout, give each child a distinct write scope.

## Deliver the instructions

Include this setup contract in the child's assignment:

1. Establish your actual host and exact model identity from host-provided facts.
   Do not reuse the parent's identity or infer yours from behavior. If identity is
   unavailable, omit it and use AP's configured fallback.
2. Resolve the assigned role through the AP MCP server for the intended consumer
   workspace. Use the tool's current schema. Supply host, model, identity source
   and role only where the server does not bind them. A server bound to another
   workspace, model or role cannot resolve this assignment correctly.
3. Read the resolved profile, role and required skill content. A roster or package
   name alone is not loaded instructions. Resolve relevant optional skills by
   their binding IDs. Read supporting resources when the skills require them.
4. Treat failed or incomplete resolution, mismatched bindings and missing required
   resources as setup failures. Report them before doing dependent work. For text
   resolution, require the final `End of Agent Profiles context:` line.
5. Repeat resolution after compaction or a model change as required by the
   consumer's bootstrap. Record the profile, role and package versions delivered.

Do not assume children inherit the parent's MCP connections. If AP MCP is absent,
use the consumer's supported AP CLI bootstrap when available. If neither is
available, the parent may hand off complete resolved content for the confirmed
child identity and workspace, with its resources and provenance. Label that as
parent-supplied delivery. Do not silently replace child instructions with the
parent's profile. If complete delivery cannot be established, stop that assignment.

AP instructions do not override host permissions or consuming-project authority.
Do not edit active routing, install plugins or publish packages to make a handoff
work without authorization for those changes.

## Execute and collect

Dispatch the task with the setup contract and acceptance checks. Follow T3's
returned waiting and completion instructions. Track the child task and cancel it
if replacing it. A child should not start further delegation unless assigned it.

Ask the child to return:
- Outcome: complete, partial or blocked.
- Files changed and deliverable locations.
- Checks run, results and supporting evidence.
- Unresolved issues and skipped checks.
- Actual model, AP profile, role, package versions and delivery method.

Review the result against the acceptance checks. Distinguish the child's claims
from checks you independently verified. A successful dispatch or AP resolution
does not establish task completion. Follow the consuming project's review gates.

## Example assignment

> Implement the CSV export specified in PLAN.md in the assigned workspace. Use
> AP to resolve the implementer role for your actual model and follow the setup
> contract above. Preserve the existing API. Run the acceptance checks in the plan.
> Return the changed files, check results, unresolved issues and instruction
> identities. Do not delegate further.

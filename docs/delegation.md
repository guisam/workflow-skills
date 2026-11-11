# T3 delegation with Agent Profiles

Status: signed package `@local/delegate@0.1.0`, locally adopted as an available
skill for Agent-Profiles' elephant role. See [adoption](elephant-adoption.md).
No live child-agent evaluation has been run.

The [delegate skill](../packages/delegate/SKILL.md) defines the handoff between
a parent, T3's child task and AP's instruction delivery. It uses the consuming
project's existing roles, permissions and review gates. It adds no agent persona,
runtime integration or persistent configuration.

## Supporting contracts

- T3 supplies model capabilities, child lifecycle, workspace isolation and waiting
  instructions. Use the tools exposed by the running host, not guessed arguments.
- AP supplies profile and role resolution, required skills, optional skill
  bindings and package identities. MCP access must be checked in the child.
- The consumer supplies the task, authority, acceptance checks and any plan file.
- The parent retains the child task reference and reviews the returned evidence.
  This skill creates no separate ledger or project-wide workflow state.
- Supporting skill files must be accessible in the child's workspace or delivery
  environment. A text handoff does not automatically transfer those files.

## Provenance

Authored from Samson's delegation discussion on 2026-11-11. The source proposal
was read in full and adapted to this workshop's boundaries. AP resolution rules
were checked against this repository's bootstrap and local AP 0.22.0 output.
T3 lifecycle constraints come from the current host's orchestration instructions.
This is original workflow text. No public license has been selected.

## Review before adoption

Use disposable consumers. Check a successful child-side MCP resolution, a child
without MCP using its supported CLI, and a mismatched bound server that must stop
before edits. Check a missing supporting resource and an unavailable requested
model. Confirm the parent reports partial work when an acceptance check fails.

Structural validation and isolated package import do not establish these live
behaviors. Signing, live adoption and paid evaluation need separate authorization.

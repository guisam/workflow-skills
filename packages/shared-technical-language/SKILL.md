---
name: shared-technical-language
description: Preserve meaning when drafting ADRs, documentation reconciliation, reviews, assignments, and ticket handoffs. Use shared technical language for constraints, authority, evidence, and work state.
metadata:
  version: 1.0.0
---

# Shared technical language

Preserve decisions, constraints, and uncertainty as work passes between agents.
Apply this contract to workflow prose. The consuming project's governing instructions and applicable role workflow define required outputs, authorization, and transitions.
This contract is a writing convention, not certification against an external STE standard.

## Preserve meaning

1. Use canonical domain terms from the applicable context and governing ADRs. Keep distinct entities and states distinct.
2. Preserve logical force. Distinguish requirements, prohibitions, permissions, recommendations, and capabilities. Preserve source modals when substitution changes meaning. If `can` is ambiguous, retain and flag the ambiguity.
3. Name the actor and action. Use active voice when the actor is known. Keep an unknown actor unspecified rather than inventing responsibility.
4. Keep conditions attached. Preserve negation, quantities, exceptions, sequence, and distinctions among `if`, `only if`, `when`, `until`, and `unless`.
5. Distinguish authority and evidence. Identify proposals, accepted decisions, observations, assumptions, and unresolved questions. Link governing sources and supporting evidence. Report unresolved source conflicts.
6. Report work state precisely. Distinguish planned, attempted, completed, and verified work. Distinguish passed, failed, skipped, pending, and unverified checks. Limit each conclusion to its evidence.

Keep code, commands, identifiers, exact quotations, workflow labels, and machine-readable records unchanged during prose edits.
Use short sentences with one main idea. Split sentences only when each sentence retains its conditions and dependencies.
Meaning takes precedence over sentence length, voice, tense, and vocabulary simplification.

## Select the sentence form

| Function | Register | Form |
| --- | --- | --- |
| Requirement, prohibition, permission, or constraint | Normative | Explicit actor + precise logical force + action |
| Instruction to a reader or operator | Procedural | Imperative action, with prerequisites stated first |
| Context, rationale, observation, or work state | Descriptive | Explicit subject + statement, with evidence limits |

Select the register by sentence function. A document can contain all three registers.
Place a condition first when it governs the whole sentence and moving it preserves scope.
Keep system requirements distinct from instructions to the reader.
Label intentions as plans and proposed decisions as proposals.

## Preserve the handoff

Summarize supporting history. Carry forward every constraint, decision, unresolved question, and evidence limit that can affect the recipient's assigned work.
State the handoff scope and link authoritative sources. Keep source references and unresolved finding identifiers intact.
Use the role's existing report format and fields. A summary supports the next assignment; it does not replace the governing sources.
Before acting, verify the applicable sources, current assignment, and canonical state required by the role workflow.
If a necessary source is unavailable, identify the affected claim as unverified.

For example:

> The reviewer recommended approval. The ADR remains Proposed. Human acceptance and closure authorization are pending.

Before sending, check that the recipient can distinguish what governs, what happened, what remains uncertain, and what action is authorized.
Routine drafting and handoffs require no proposition map, source hash, sentence count, or separate linguistic audit.
For an explicitly requested faithful rewrite, preserve every proposition within the agreed scope and report unresolved fidelity questions separately.

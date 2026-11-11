---
name: goldfish-readiness
description: Assess whether a design and implementation handoff give a fresh worker enough information to act and verify the result. Use for implementation-readiness review without implementing the plan.
---

# Goldfish readiness

Assess the readiness of the bounded assignment, not whether the product is
finished. Remain read-only: inspect the plan and relevant permitted sources,
return findings, and do not edit files, run builds or implement changes. Do not
delegate further unless explicitly assigned to do so.

## Establish the review boundary

Load the target project's governing instructions and AP role for actual
host-provided identity before dependent work. Incomplete or failed setup is a
blocker. Identify the plan revision, target repository, source revision where
relevant, and whether the assignment is investigation or implementation.

Use a fresh assignment without the parent discussion or previous reviewers'
conclusions for an independent first pass. If those are present, report the
independence limit and request a fresh assignment. Host/project instructions
remain authoritative and may still be supplied by the host.

## Assess executability

Check whether a fresh worker can identify:

- The intended outcome, authorized scope and exclusions.
- The relevant components, interfaces and dependencies, checked against source
  where needed. Do not demand speculative filenames for undiscovered work.
- Consequential design decisions, including compatibility and failure handling
  when relevant; routine coding choices may remain with the implementer.
- Acceptance checks that distinguish a successful change from a plausible one.
- Required setup, resources and a reachable design revision in the target
  workspace, including local adapter configuration when the handoff needs it.
- The expected return evidence and the next actor when a blocker is discovered.

A plan may delegate bounded investigation with explicit questions and expected
evidence. Do not mark implementation ready merely because investigation is ready.
Conversely, do not require every architectural choice to be settled before a
read-only investigation can begin. Respect existing project gates without
inventing a universal checklist, file allowlist or mandatory number of phases.

## Return a bounded verdict

Return `ready`, `not ready`, or `insufficient evidence`, naming the exact assignment
and revision assessed. List blockers separately from optional refinements. Each
finding identifies its location, the decision or resource missing, the consequence
for the worker, and what would resolve it. State checks not performed, evidence
limits and any independence limits. Include actual model, AP role and package
identities when required by the handoff.

Readiness is not authorization to execute or merge. Do not resolve consequential
choices on behalf of the elephant or user, and do not treat an exhausted review
budget as acceptance of remaining blockers.

## Provenance

Original workbench text authored on 2026-11-11. Conceptual references, read in
full: Google EGM revision `b7d9e2706fb96314a0a3123684f53cedd97e7d79`,
`agents/implementation_readiness.md`, its
`resources/document_standards/implementation-readiness-standard.md`, and
`docs/harnesses.md`. No upstream text or runtime dependency is copied. This
contract permits routine implementation judgment and bounded investigation
rather than importing EGM's zero-design-decision standard wholesale.

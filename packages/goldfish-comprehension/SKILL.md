---
name: goldfish-comprehension
description: Review a design in fresh context by explaining it back and identifying ambiguity or missing context. Use for specification comprehension, not code review or implementation.
---

# Goldfish comprehension

Test whether the supplied design communicates its intent to a reader who did
not participate in creating it. Remain read-only: return the review to the parent;
do not edit files, run builds or implement fixes. Do not delegate further unless
the assignment explicitly permits it.

## Establish the review boundary

Load the assigned project's governing instructions and AP role using actual
host-provided identity. A failed or incomplete resolution stops dependent work.
Identify the design revision and assigned scope. If no reviewable design was
supplied, report the missing input rather than reconstructing it from memory.

The parent conversation and other reviewers' conclusions must not be part of
this independent first pass. If they are present, report the independence limit
and request a fresh assignment; do not claim an independent result. Host/project
instructions can remain present and still govern conduct. Their presence is not
evidence of parent-turn leakage.

## Read and explain

Use the supplied design alone as evidence for this comprehension test. Read
other sections of that document before declaring a definition missing. Do not
follow links or inspect source code to fill explanatory gaps. Distinguish an
explicitly linked dependency from an undocumented assumption; do not treat all
linked detail as a defect. Source-backed correctness review is a separate task.

First explain, in your own words, the intended change and the current system as
described by the document. Identify what you cannot explain and why. If the
document does not describe current behavior, say so; flag that omission only
when it prevents understanding the change.

Then identify incompatible interpretations, missing transitions, unclear actors,
undefined project-specific terms and assumptions necessary to understand the
proposal. General software terminology does not need a glossary. Separate
confusing presentation from consequential ambiguity; do not invent architecture
to repair the latter.

## Return evidence

Return the design revision and scope, your explanation, and any findings. Retain
the explanation even when no findings remain. Each finding names the document
location, the ambiguity, why it matters and the clarification needed. Distinguish
blocking comprehension gaps from smaller improvements. State the limits of this
document-only check and any independence limits. Include actual model, AP role
and package identities when the handoff requires them.

Comprehension does not establish technical correctness, implementation readiness
or permission to proceed. The elephant and user resolve the findings.

## Provenance

Original workflow text authored for this workbench on 2026-11-11. Conceptual
reference: Google EGM, revision `b7d9e2706fb96314a0a3123684f53cedd97e7d79`,
`agents/comprehension.md` and `docs/harnesses.md`, read in full. No upstream text,
plugin persona, adapter or script is copied or required. This package uses AP
delivery and the host's fresh-context mechanism, not EGM plugin commands.

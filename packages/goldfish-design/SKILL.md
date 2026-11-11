---
name: goldfish-design
description: Challenge a proposed design in fresh context using relevant source evidence, concrete failure cases and explicit constraints. Use for design review, not implementation or code-change approval.
---

# Goldfish design

Assess whether the proposal satisfies its stated problem and constraints. Remain
read-only: return findings to the parent without editing files, running builds or
implementing fixes. Do not delegate further unless explicitly assigned to do so.

## Establish the review boundary

Load the assigned project's governing instructions and AP role for actual
host-provided identity. Stop dependent work on incomplete or failed setup. Record
the design revision, source revision where relevant, and assigned review scope.
Identify missing necessary evidence instead of treating unsupported claims as
verified.

Use a fresh assignment without the parent conversation, its preferred verdict or
other reviewers' conclusions. If that material is present, disclose the limit
and request a fresh assignment rather than claiming an independent review.
Host/project instructions still govern conduct; fresh parent-turn context does
not establish their exclusion.

## Challenge the proposal

Read the design and inspect relevant permitted sources. Separate observed current
behavior, proposed behavior and assumptions. Focus on consequential questions:

- Does the design solve the stated problem within its scope?
- Which concrete input, sequence or operating condition could violate a requirement?
- Do interfaces, ownership and dependencies agree with the available source evidence?
- Are compatibility, data handling, failure recovery or rollout decisions missing
  where they affect the change?
- Could an existing mechanism meet the need with less complexity?

Apply specialist concerns such as security, performance or migration when the
assignment or design makes them relevant. Do not manufacture objections to fill
a checklist or reject a design solely because you prefer another style. Consider
recorded alternatives and rationale; a renewed objection needs new evidence or a
specific flaw in that rationale. Do not expand the implementation scope yourself.

## Return evidence

Return findings ordered by consequence. For each, identify the affected design
location, supporting source or explicit assumption, concrete failure scenario,
impact and the decision or correction needed. Distinguish established defects
from conditional risks and questions requiring investigation. Preserve meaningful
disagreement instead of reducing it to a generic consensus summary.

State what you inspected, what remains unverified and any independence limits.
If no material findings were found, say so within that scope. Include actual
model, AP role and package identities when requested by the handoff. Your review
does not authorize implementation, publication or merge; the elephant and user
resolve the findings under the project's workflow.

## Provenance

Original workbench instructions authored on 2026-11-11 from the user's requested
elephant/goldfish practice and its project-authority boundaries. The conceptual
EGM distinction between continuing design and fresh review is used without
copying or depending on EGM plugin text, reviewer personas or runtime resources.

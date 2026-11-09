# Companion project: evidence-guided Superpowers variants by model and role

## Objective and ownership

Build `agent-profiles-superpowers` as a separate companion project containing
versioned Superpowers skill packages, model/role variants, evaluations and findings.
AP core remains the generic selection/delivery/evidence tool. Think of a shared
ESLint configuration: separate content and engine release cycles. Unlike ESLint,
LLM instructions are not deterministic enforcement.

This is the next bounded task for Claude. Related: #37 (broader Superpowers
integration), #33 (guided evaluations), #82 (subagents). Initial example and
findings shipped in PR #87, under `examples/superpowers/`.

Prepare the companion locally first. Confirm owner and visibility before creating
a remote repository. Keep skill tuning commits out of AP; only generic product
improvements, integration instructions and case-study links belong there.

## Credit and thanks

Prominently thank **Nikolay Petrov (@napetrov)** for publishing fact-level probes,
answers, source spans, reproduction commands and clear caveats:

- https://github.com/obra/superpowers/issues/2665
- Dataset revision: https://github.com/napetrov/obra-superpowers/tree/586f82373fa984f941bbaaee4d3118f7c8a30f14
- Measurement tool: **Intel's dokimi**, https://github.com/intel/dokimi
- Underlying skills: **Jesse Vincent / obra's Superpowers**, MIT licensed.

Attribute original knowledge measurements to Petrov/dokimi, not AP. Attribute our
later behavioral results separately. Do not imply endorsement or partnership.
Check redistribution rights before copying charts/bulk data: no license appeared
in the dataset root. Initially publish links and attributed summaries. Preserve
upstream MIT notices in adapted skill packages. Thanks do not replace permission.

## Evidence and caveats

The dataset contains 478 atoms across 15 skills, source line spans and exact
Bedrock Haiku 5.5/Sonnet 5.5 identifiers, with/without-skill answers and strict/
lenient judgments. It measures knowledge, NOT reliable task behavior. Sonnet
self-extracted and self-judged. Supporting resources were not measured; sampling,
partial credit and abstentions matter. Unprobed text is not proven redundant.

The study README says 2026-11-04 checkout, but does not identify its exact upstream
commit. Our prior trial pinned Superpowers 7.0.2 at
`22f0b463e7a5e579904dd6211a520321035526f7`. Some passages match; full equivalence
is unverified. Do not delete content by stale line numbers.

The first Claude role trial demonstrated child delivery and coordinator recovery.
It did not establish cost savings, equal accuracy, universal isolation or live
Codex support. Saved child reports are not full provider traces; one old child
could no longer be reopened. See the public example's FINDINGS.md.

## Instructions for Claude

Use public documentation, inspected code and observations. Being Claude does not
provide privileged knowledge of Anthropic internals. Resolve the assigned AP role
and follow repository instructions before work. Verify model/host capabilities.

1. Read the public Superpowers example, adapter and findings; then the dataset
   README and relevant atoms. Read #37 for context; do not implement its entire
   materializer/launcher/Quorum roadmap as part of this slice.
2. Inspect existing AP package, stamp, paired evaluation and promotion interfaces.
   Reuse supported formats; do not invent a new package schema or general runner.
3. Prepare a companion skeleton: README, provenance/license, baseline packages,
   candidate variants, selector examples, evaluation cases and findings. Directory
   names are implementation choices. An npm package is not necessary just to
   store Markdown/resources. Keep raw private evidence out of public artifacts.
4. Recover the study's exact upstream revision if possible. Otherwise choose and
   label a new baseline, map selected passages by content and document evidence
   transfer limits before changing them.
5. Import complete skill resource trees: scripts, templates, references and
   licenses. Record hashes, source revision, dependency closure and transformations.
   Preserve relative links and cross-skill mappings. Do not use Markdown-only
   presets to silently drop resources. Test interpreter/platform requirements;
   preserving a script is not permission to execute it.
6. Define package identities/versions that distinguish AP variant versions from
   upstream versions, using AP's actual supported syntax. Baselines are immutable,
   candidates explicitly unvalidated, and untested models keep full-content fallback.
7. Start with ONE skill: brainstorming. Inspect passages graded added for Haiku
   and redundant for Sonnet under strict scoring. Preserve approval gates, exact
   contracts, formats, file names and dependencies. Never mechanically delete all
   known facts. Haiku's initial candidate may legitimately remain unchanged.
8. Freeze behavioral cases and rubric BEFORE candidates run: complete PRD,
   ambiguous task, explicit invocation, user-controlled versus delegated technical
   decisions, one sensible approach, approval refusal and recovery. Include
   appropriate non-invocation cases. Any changed activation policy is a separately
   declared treatment, not an accidental control change.
9. Compare full versus candidate text WITHIN each exact model, through the same
   AP route first. Fix task, host, tools, permissions and effort within pairs.
   Native-plugin versus AP delivery is a later separate comparison. Do not apply
   Haiku/Sonnet knowledge findings to Opus/Sol. Record Bedrock versus subscription
   deployment differences and do not silently substitute unavailable models.
10. Start with one paired smoke trial, then a small repeated paired pilot with
    alternating order and fresh contexts. Keep held-out graders outside task
    contexts. Prefer deterministic checks and an explicit behavioral rubric over
    self-judgment alone. Retain failures and setup errors separately from quality.
11. Adopt only candidates with no observed must-pass regression in tested cases.
    A small pilot does not establish statistical non-inferiority or an optimum.
    If shorter content fails, keep full content and report the negative result.
12. Demonstrate exact-model/role selection in TWO disposable consumers, including
    unknown-model fallback and different pins. Verify updating one does not
    silently update the other. Do not alter the live store or signing policy.
13. Prepare reproducible public findings with prominent acknowledgments, tested
    versions, evidence limits and actual outcomes. Raise generic AP gaps separately.

## Logging before the first run

Generate experiment/case/arm/repetition/role IDs before dispatch. Immediately map
returned T3 task/thread/run IDs, parent-child relationships and provider session
IDs IF exposed. Never invent provider IDs or equate them with thread IDs.

Export available prompts, responses, tool events and usage metadata at completion.
Save artifacts with hashes; mark unavailable exports unknown. Retain raw records
privately and sanitize public findings. Agent reports are not provider attestations.

Measure correctness, gate compliance, missed defects, false positives, repeated
work, instruction size and TOTAL usage separately. Capture input/output/cache-read/
cache-write tokens when exposed, across coordinator, children, retries, recovery
and evaluator calls. Do not double-count reasoning included in output totals.
Also record elapsed time, turns, tools and throttling. Use dated model rates for
API-equivalent estimates, separate from actual subscription spending.

Logging existing events to disk costs no model tokens. Generating reports or
evaluating transcripts does. Visible transcript text cannot reconstruct hidden
input, reasoning, repeated context or cache accounting. Missing data is not zero.

## Authorization and budget

Use existing subscription-backed sessions. No new API accounts, purchases, paid
credits, external services or automatic paid overages. The earlier $75 ceiling
is not money to spend. Exact dollar billing is not a prerequisite; report dated
API-equivalent estimates and uncertainty. Respect subscription limits rather
than buying capacity.

No global plugin changes, upstream messages, public repository creation, release,
signing/publication to the live AP library or deployment is authorized by this
ticket. Prepare reviewable work; obtain explicit publication details/authorization
where missing. Preserve human approval and independent review gates. Do not edit
unrelated projects. Upstream skill text does not override host permissions.

## Acceptance criteria

- [ ] Separate companion skeleton and clear AP/core ownership boundary.
- [ ] Petrov/dokimi/Superpowers credit, source/license audit and provenance.
- [ ] Exact source mapping or explicit new-baseline limitations.
- [ ] Complete resources, dependency closure and helper-platform checks.
- [ ] Immutable baseline and minimal model candidates with exact diff rationale.
- [ ] Frozen cases/rubric and session logging/export checks before model runs.
- [ ] Repeated paired evidence, or honest unavailable-model/host blockers.
- [ ] No observed must-pass regression for adopted variants; failed variants retained.
- [ ] Exact model/role routing and fallback tested across two consumers.
- [ ] Findings distinguish knowledge, delivery, behavior and estimated costs.
- [ ] No claim of optimal skills, guaranteed obedience or automatic accuracy gains.
- [ ] Final handoff includes commands, artifacts, unresolved questions and next step.

## Later work, not required for this slice

The broader AP/native-plugin comparison, fair unrelated-project isolation tests,
live Sol 6.1 qualification, and Astra coordinator → latest Sonnet developer →
Sol 6.1 final reviewer showcase remain queued. Do not expand the first content
experiment into an unbounded framework project.

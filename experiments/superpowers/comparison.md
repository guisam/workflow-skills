# AP + Superpowers comparison pilot

Sequencing: the [knowledge-map tailoring experiment](MODEL-TAILORING.md) comes
first. This broader comparison remains queued; its controls and logging rules
also apply to that narrower experiment.

Status: preparation; separate from the closed initial setup trial. No comparison
model run has started. Use the user's existing subscription-backed sessions;
no API purchases, extra credits or paid services. The earlier USD 75 ceiling is
not an instruction to spend money. Estimate API-equivalent cost using dated model
rates and observed token/cache usage where available; label estimates and missing
data. Lack of exact dollar billing does not block subscription-backed experiments.
Do not claim that API-equivalent cost measures actual subscription charges or
remaining subscription allowance. Record throttling and interruptions separately.

## Questions and acceptance gates

1. Total tokens/cost: collect all coordinator, worker, reviewer, fix-loop and
   recovery calls, including input, output, cache-read and cache-write tokens.
   Record provider-reported USD separately from dated rate-card estimates.
   Do not add reasoning tokens twice if already included in output usage.
   Report setup overhead separately and end-to-end total including setup.
   Unknown usage remains unknown; Graft counters or model self-estimates alone
   are not sufficient. Compare both cold-start and warmed-cache runs separately.
2. Accuracy: same task, baseline, acceptance rubric and hidden evaluator per pair.
   AP must have no additional failed must-pass cases or unauthorized actions.
   Count missed seeded defects and false-positive review findings separately.
   Any regression blocks a savings claim. A small pilot cannot prove universal
   non-inferiority; retain per-case results and repeated trials.
3. Isolation: unrelated project gets no Superpowers instruction body, discovery
   entry, hook or workflow activation. Record presence and actual invocation
   separately. Test native global/default installation AND native project-scoped
   or explicitly disabled configuration when supported. A scoped native pass is
   a valid result. Never configure the control to fail or assume it will fail.
4. Codex compatibility: gpt-6.1-sol must read a known file, resolve its own role,
   receive the marker and correct resources, and complete a review against seeded
   defects. Merely listing the model or resolving host=codex via SDK is insufficient.

## Controlled arms

A: AP roles with pinned Superpowers 7.0.2 resources, native plugin disabled.
B: Native Superpowers 7.0.2 installed in a separate disposable harness environment,
   no AP role delivery. Verify installation and active hooks before scoring.

Use identical source fixtures, user tasks, permissions, exact model IDs, effort,
tool availability and approval boundaries. Record any unavoidable host difference.
Do not change the user's global plugin state to construct the control. If T3
cannot isolate plugin settings per instance, prepare a separate owner-run instance.
Native references must remain the original upstream workflow, not an intentionally
inflated copy. AP's workflow adaptation is part of the treatment, not pure transport.

Suggested pilot: two task types x two arms x two repetitions, alternating AB/BA.
Start with a single paired smoke run and inspect cost/quality before more runs.
Use fresh contexts and separate consumers; never expose the other arm's result.
Grade deterministic acceptance tests outside agent contexts. Human adjudication
of review findings should hide arm identity where possible. Store failures too.

Task types: a bounded bug fix with edge cases and a multi-file feature. Avoid
using the already-seen sumPrices task as evidence of general performance.

## Isolation probes

Use siblings under a neutral parent without workflow-skills AGENTS.md inheritance:
enabled project and unrelated project, each with distinct canary instructions.
Run a small neutral task in each, then inspect actual context/tool evidence.
Test fresh session, project switch, and clear/compaction. The unrelated project
must not load AP's Superpowers role or the native bootstrap. Unknown initial
context visibility is inconclusive, not a pass. Also verify host/model metadata
and all inherited parent/global instruction sources.

## Cross-provider showcase (separate from the cost A/B)

Proposed realistic task: a local CSV invoice reconciler CLI. It accepts expected
invoices and received payments, produces deterministic JSON for paid, partial,
unpaid and overpaid invoices, and reports unknown invoice IDs. Specify CSV quoting,
duplicate IDs, integer-cent arithmetic, invalid amounts, stable ordering and
exit codes before implementation. No network, databases or external credentials.

- gpt-6-astra: architecture, acceptance criteria and coordination (complex role).
- Latest available Sonnet: implementation. Catalog currently lists
  claude-sonnet-5-5; record exact selected ID and effort at launch.
- gpt-6.1-sol: independent final code review. Do not silently change tiers/models
  to match upstream guidance; record this user-selected model assignment.

Use explicit task and whole-branch review scopes, retained ledger and AP resolution
in every child. Include one deliberate interruption/recovery point. Judge final
output using withheld tests and a predefined rubric, not the model's own approval.
This showcase tests interoperability and end-to-end usefulness; it does not by
itself establish a cost advantage over the native control.

## Run record

For every run retain: run ID, arm, task/repetition, source/config/skill hashes,
host version, exact models/effort, parent and child identities, initial instruction
sources, tool trace, role-resolution marker, start/end times, test outcomes,
review defects/false positives, files changed, usage/cost source and uncertainty.
Commit/push/release actions stay disabled. Installation or hook execution errors
are setup failures, not failed model-quality scores.

Generate a local experiment/case/arm/repetition/role ID before dispatch. Save the
returned T3 task, thread and run IDs immediately, plus parent-child relationships
and provider session ID if exposed. Never invent provider IDs. Export available
transcript/tool events and usage metadata at completion; record export gaps rather
than relying on future thread availability. Logging existing events to disk does
not itself consume model tokens; generating reports or model-evaluating transcripts
does, and belongs in the accounting. Visible transcript text alone cannot recreate
hidden input, reasoning or cache usage.

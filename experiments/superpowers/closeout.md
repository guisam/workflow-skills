# Initial Superpowers setup trial — closed

Closed 2026-11-07 as a successful feasibility trial, with the limits below.
This closes the initial role-separation and recovery exercise, not the later
cost/accuracy comparison or readiness for general production use.

## Finding

Superpowers' approved-plan execution workflow can be delivered through AP as
separate coordinator, implementer and reviewer roles. It does not require every
agent to receive every skill body. In this Claude trial, no competing native
Superpowers injection was observed; the children reported independently resolving
their AP assignments and loading supporting resources when needed.

AP supplies instructions. Superpowers supplies the workflow and supporting
scripts. T3 supplies delegation, and the host supplies permissions. The saved
ledger supplies task state; AP resolution alone does not restore progress.

## What was completed

- Pinned Superpowers 7.0.2 resources with MIT attribution and byte provenance.
- Three explicit roles, required versus available skill declarations, preserved
  scripts/templates and local mapping of plugin-prefixed skill references.
- Six structural MCP checks and Git Bash helper checks.
- One live task: Sonnet 5.5 implementation and task review, Opus 5.5 final review.
  Code range 25a4caf..1c0830a; reported RED then 4/4 GREEN; two source/test files.
- Independent child role-delivery evidence and full-context completion markers.
- Coordinator recovery after compaction and in a fresh session, without
  redispatching completed work. The compacted session repeated verification once;
  the fresh session did not run tests or make changes.
- Reconciled completion status, historical check scope and approval semantics.

## Findings that informed the next experiment

Required instructions must arrive before role work; optional references need a
resolvable local path. Resource-bearing skills cannot be reduced to Markdown-only
presets. A whole-branch reviewer needs an explicit contract distinct from task
review. Stale plan headers and unqualified historical snapshots confuse recovery.
Session reports must distinguish observed facts from inference: no upstream is
not proof of no push, timestamps do not prove authorship, and signed zero is
observable through division as well as Object.is.

Reviewers accepted signed-zero normalization; therefore this is not proof of
perfect compliance with a strict reading of unchanged nonempty sums. Their
cosmetic/test-style findings also demonstrate why review quality must be scored
independently from successful instruction delivery.

## Evidence and retained artifacts

- [Verification matrix](verification.md): sources, corrections and limits.
- [Runbook](README.md): role mapping and fixture reproduction.
- [Issue survey](issue-survey.md): 427 keyword matches, a curated 15-report
  shortlist including duplicates and contrary evidence; no claim of 15 AP fixes.
- `evidence-initial/`: snapshot of local plan, ledger, child reports, checks and
  provenance, with SHA-256 manifest. These are saved reports, not complete raw
  provider transcripts. Recovery observations come from maintainer-supplied chat.
- Original disposable consumer and ignored workspace remain intact for inspection.

The final-review child could not be reopened through T3. Future runs must persist
transcripts and map experiment IDs to T3 task/thread/run and provider session IDs
when exposed; an ID is a locator, not a retention guarantee.

## Explicitly deferred

Cost/accuracy superiority, repeated runs, fix-loop and child recovery, live Codex
Sol 6.1, unrelated-project isolation, and published AP package resource execution.
No native-plugin failure is assumed. No optimized model-specific skill variant
has been discovered. Public examples and library publication remain separate work.

The next phase is the [comparison pilot](comparison.md), followed by the
[cross-provider showcase](showcase-spec.md). Neither has run yet.

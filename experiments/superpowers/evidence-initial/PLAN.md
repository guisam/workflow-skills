# Superpowers AP trial

Status: completed 2026-11-07. Task 1 and final review are complete; do not redispatch. Approval for the completed run is recorded in .superpowers/sdd/PLAN/progress.md. This status grants no authority for additional model runs.
Spec: support an empty array in sumPrices without changing nonempty sums.

## Global Constraints

- Work only in the generated disposable project on its experiment branch.
- Preserve input arrays. Accept numeric arrays; input validation is out of scope.
- Implementer and reviewer are separate sessions. Neither dispatches children.
- No push, merge, package publication, dependency additions or plugin changes.
- Reports identify commands, results, commit range and unchecked conditions.

## Task 1: Handle empty prices

Files: sum-prices.mjs and sum-prices.test.mjs.

- [x] Add a failing test that sumPrices([]) equals 0; record the expected failure.
- [x] Make the smallest correction and preserve the existing nonempty case.
- [x] Test zero and negative prices and confirm inputs are unchanged.
- [x] Run node --test and report the actual results.
- [x] Commit the change on the experiment branch and provide the report path.

After task review, the coordinator performs the required final-review handoff.

## Reconciliation

Completion evidence: .superpowers/sdd/PLAN/task-1-report.md, task-1-review.md and final-review.md. Code range: 25a4caf..1c0830a. Reviewers accepted signed-zero normalization (-0 to +0); strict signed-zero preservation was not achieved. CHECKS.json describes the earlier structural-check snapshot, not current live-test coverage. No new tests were run for this documentation update.

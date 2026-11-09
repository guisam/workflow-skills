# Superpowers AP trial

Status: proposed live exercise; user approval is needed before model execution.
Spec: support an empty array in sumPrices without changing nonempty sums.

## Global Constraints

- Work only in the generated disposable project on its experiment branch.
- Preserve input arrays. Accept numeric arrays; input validation is out of scope.
- Implementer and reviewer are separate sessions. Neither dispatches children.
- No push, merge, package publication, dependency additions or plugin changes.
- Reports identify commands, results, commit range and unchecked conditions.

## Task 1: Handle empty prices

Files: sum-prices.mjs and sum-prices.test.mjs.

- [ ] Add a failing test that sumPrices([]) equals 0; record the expected failure.
- [ ] Make the smallest correction and preserve the existing nonempty case.
- [ ] Test zero and negative prices and confirm inputs are unchanged.
- [ ] Run node --test and report the actual results.
- [ ] Commit the change on the experiment branch and provide the report path.

After task review, the coordinator performs the required final-review handoff.

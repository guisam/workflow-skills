# Task 1 report: Handle empty prices

## AP delivery evidence
- Model ID: host states "The exact model ID is claude-sonnet-5-5."
- Retrieval method: MCP tool `mcp__agent-profiles__resolve` (host "claude", identitySource "host-stated", model "claude-sonnet-5-5", role "sp-implementer")
- Selected profile / role: profile `base` (matched by default); role `sp-implementer`
- Required skills listed: `sp-implementation-contract`, `test-driven-development`, `verification-before-completion`
- Skill bodies arrived in full: yes, all three (the TDD skill references `writing-good-tests.md`, which was not delivered; not needed for this task)
- Final line verbatim: `End of Agent Profiles context: 5 section(s): base, sp-implementer, sp-implementation-contract, test-driven-development, verification-before-completion.`

## What I implemented
- `sum-prices.mjs`: added initial value `0` to `reduce` (one-token change). Nonempty sums are unchanged; the input array is only read.
- `sum-prices.test.mjs`: kept the existing `adds prices` test and added three:
  - `returns 0 for an empty array`
  - `sums zero and negative prices` (`[0]`, `[0,0]`, `[-2,-3]`, `[5,-2,0]`)
  - `does not modify the input array`

## TDD Evidence
**RED** — `node --test sum-prices.test.mjs` (exit 1), after adding the tests and before changing `sum-prices.mjs`:
```
✔ adds prices
✖ returns 0 for an empty array
✔ sums zero and negative prices
✔ does not modify the input array
ℹ tests 4 / pass 3 / fail 1
  TypeError: Reduce of empty array with no initial value
      at sumPrices (sum-prices.mjs:1:43)
```
This was expected: `reduce` without an initial value throws on an empty array. The empty-array test failed for the intended reason. The zero/negative and immutability tests already passed against the old code. They are characterization tests, since the brief asks only that those cases be confirmed, so they were never red.

**GREEN** — `node --test sum-prices.test.mjs` (exit 0):
```
✔ adds prices
✔ returns 0 for an empty array
✔ sums zero and negative prices
✔ does not modify the input array
ℹ tests 4 / pass 4 / fail 0
```

## Tests and results
Full suite, `node --test` (exit 0): 4 tests, 4 pass, 0 fail, 0 cancelled, 0 skipped. Output was clean, with no warnings.

## Files changed
- `sum-prices.mjs`
- `sum-prices.test.mjs`

## Commits
- `1c0830a` "Handle empty prices in sumPrices"
- Range: `25a4caf..1c0830a` on `superpowers-trial`.
- Staged by explicit path only. `graft/` remains untracked and nothing under `.superpowers/` was committed. No push, merge or branch change.

## Self-review
- I read the diff: 1 line changed in the source and 12 lines added to the tests.
- The change is minimal, with no input validation (out of scope) and no new dependencies.
- The tests use real code with no mocks.

## Concerns and unchecked conditions
- The test file keeps the existing compact style of its first line.
- Git printed an LF→CRLF warning on `git add` (autocrlf setting). It is cosmetic and I did not check line endings in the committed blobs.
- Non-numeric, `NaN`, `-0` and very large inputs were not tested, because validation is out of scope.
- `AGENTS.md` carries a Codex-host profile block; I used the Claude host as assigned.

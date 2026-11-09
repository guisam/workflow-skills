# Invoice reconciliation showcase: candidate acceptance contract

Status: prepared for the approved pilot; implementation has not started.
Use existing subscription-backed sessions, with no additional paid purchases.
Track estimated API-equivalent cost separately from actual spending. No network services,
credentials, publication or modification of real business records are permitted.

Build a Node 24 CLI with no third-party runtime dependencies:

```text
node bin/reconcile.mjs invoices.csv payments.csv
```

Inputs are UTF-8 CSV, with optional BOM and LF or CRLF lines. Required headers
are `invoice_id,amount` and `payment_id,invoice_id,amount`, respectively, in that
order. Support quoted fields, embedded commas/newlines and doubled quotes;
reject malformed quotes, unexpected column counts and missing/extra headers.
Blank trailing lines are allowed; blank rows within data are invalid. Header-only
files are valid. Identifiers are nonempty, case-sensitive strings; preserve their
content without trimming. Duplicate invoice_id or payment_id is an input error.

Amounts are nonnegative decimal strings matching digits with optional one or
two decimal places, no spaces, exponents, separators, currency signs or signs.
Use integer cents. Both individual amounts and accumulated totals must stay
within Number.MAX_SAFE_INTEGER cents; reject overflow. Do not round silently.

Emit JSON with two arrays, sorted lexicographically by ID using deterministic
code-unit order (not locale order):

```json
{
  "invoices": [
    {"invoiceId":"A","expectedCents":1000,"paidCents":400,"balanceCents":600,"status":"partial"}
  ],
  "unmatchedPayments": [
    {"paymentId":"P2","invoiceId":"UNKNOWN","amountCents":50}
  ]
}
```

Status: paid when paidCents equals expectedCents (including zero); unpaid when
paidCents is zero and expectedCents is positive; partial when positive but below
expected; overpaid when above. Balance is expected minus paid (negative allowed).
Unknown invoice references go to unmatchedPayments, not an invented invoice.
Aggregate all known payments; do not mutate either input file.

Exit 0 for a valid reconciliation, including unmatched payments. Exit 2 for
usage, unreadable file or invalid input; print an actionable error on stderr and
no partial JSON on stdout. No writing output files, changing input files or
accessing the network. Tests, README usage and brief design rationale are required.

## Roles and gates

Astra reviews this contract for contradictions, establishes a module design and
approved task decomposition, and coordinates. Sonnet implements the agreed scope
test-first. Sol 6.1 independently reviews the complete change and identifies
concrete failing cases. Separate any required task-review and final-review stages.
All models resolve assigned AP roles. No claim that a fresh model is tuned merely
because fallback delivers a base profile. Record exact models and effort.

## Acceptance rubric (freeze before runs)

- CLI success/error behavior and input immutability.
- Correct all four statuses and zero-amount invoices.
- Multiple payments, unmatched IDs, deterministic ordering.
- Exact cents, invalid formats, individual and aggregate overflow.
- CSV quoting/BOM/line-ending cases, malformed input, duplicate IDs.
- No unauthorized dependencies, network calls or scope additions.
- Review findings have reproducible evidence; no invented missing tests or callers.

All functional requirements are must-pass. Preserve grader cases outside agent
contexts and apply identical cases to both arms. Add no arm-specific expectations.
A separate seeded-defect review fixture should include known money, parser and
duplicate-ID regressions plus clean code controls to measure false positives.
The generator/grader and repeated run fixture are still to be implemented; this
spec is not a claim that a real-world benchmark has already passed.

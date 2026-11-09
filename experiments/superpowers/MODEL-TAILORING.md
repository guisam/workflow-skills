# Next working task: evidence-guided model-specific Superpowers skills

Status: active preparation, 2026-11-07. This is the next experiment; the broader
native-plugin cost/isolation comparison and cross-provider showcase remain queued.
No candidate skill has been adopted and no new model evaluations have run.

## Credit and thanks

This experiment builds on **Nikolay Petrov (@napetrov)** and his detailed
[Superpowers issue #2665](https://github.com/obra/superpowers/issues/2665),
with its [published knowledge-map data](https://github.com/napetrov/obra-superpowers/tree/586f82373fa984f941bbaaee4d3118f7c8a30f14).
Many thanks for publishing fact-level probes, model-specific answers, source
spans, reproduction commands, and unusually clear caveats. That work provides
the concrete starting evidence for this experiment; it is not an AP result.

The measurements use [Intel's dokimi](https://github.com/intel/dokimi).
The underlying Superpowers skills are Jesse Vincent/obra's MIT-licensed work.
Credit all three contributions in public findings. Attribution does not imply
collaboration or endorsement, and thanks do not replace redistribution permission.

## Question

Can a model-specific skill omit or shorten selected explanations while preserving
task correctness, approval boundaries, skill activation and recovery behavior?
If so, can AP reliably select and pin that variant for the exact model and role?

Knowledge probes nominate candidates. Behavioral evaluations decide whether a
candidate is acceptable. AP delivers the chosen version; it does not discover an
optimal version merely by selecting a model name.

## Source audit completed

- Downloaded README, facts.jsonl, skills.csv and harmful.md at immutable dataset
  revision 586f82373fa984f941bbaaee4d3118f7c8a30f14 into ignored local evidence.
- Parsed 478 atoms across 15 skills. Rows include source spans, probe questions,
  exact Bedrock model identifiers, answers and strict/lenient judgments.
- README identifies a 2026-11-04 upstream checkout but not its exact commit.
  Some brainstorming spans align with our pinned Superpowers 7.0.2 checkout;
  that does not establish equality of the entire source tree.
- Root tree has no license file. Link to the dataset publicly; do not republish
  its charts or bulk data without checking applicable licensing or permission.

## First bounded candidate

Start with brainstorming: the dataset identifies specific guidance that is added
under strict grading for Haiku 5.5 but redundant for Sonnet 5.5. Inspect the original
answers and their context before selecting passages. Preserve approval gates,
exact contracts, file names and downstream dependencies. Do not delete workflow
obligations because a model can describe them when asked.

Do not apply this evidence to Opus or Sol: those models were not measured. Do not
assume Bedrock results transfer unchanged to subscription-backed host sessions.
Use exact host model IDs and record the deployment difference.

## Execution sequence and completion criteria

1. Source mapping: establish exact upstream revision or explicitly label a new
   baseline and revalidate every selected span. No automatic deletion by line number.
2. Freeze paired cases before variants: complete PRD, ambiguous request, explicit
   brainstorming, user-controlled technical choice, delegated technical choice,
   one sensible approach, approval denial and resume after compaction. Include
   invocation and non-invocation cases, not just knowledge questions.
3. Build a full-skill control and minimal candidate for each model. Record exact
   text differences and rationale; keep untested models on full-content fallback.
4. Run a small repeated paired pilot in existing subscription sessions, alternating
   order. Keep model, effort, task, tools and permissions fixed within each pair.
   Start only after confirming models and session logging work; no API purchases.
5. Evaluate outcomes against frozen must-pass criteria. Report all regressions,
   review errors, delivery failures, repeated work, instruction bytes and token
   usage where exposed. Distinguish observed tokens from estimates and actual
   spending from dated API-equivalent estimates. Never infer total usage from
   visible transcript length alone.
6. Adopt only if no observed must-pass regression, with sufficient repeated
   evidence for the stated claim. Otherwise retain the control and report the
   unsuccessful candidate. Do not label a small pilot statistically conclusive.
7. Demonstrate AP exact-model/role selection and unchanged fallback in two
   disposable consumers. Library signing/publication remains a separate explicit
   action; a local experimental package is not a validated public release.
8. Publish findings with prominent Petrov/dokimi/Superpowers credit, tested
   versions, deployment caveats and reproducible evaluation instructions.

## Evidence capture required before the first run

Generate experiment/case/arm/repetition/role IDs. Immediately map returned T3
task/thread/run IDs and provider session IDs where exposed, retaining parent-child
relationships. Save transcript/tool-event exports and usage metadata at completion.
Mark unsupported export fields unknown. Include evaluator/reporting calls in costs.
Keep source data and graders separate from agent task contexts. Sanitize public
reports; retain raw private evidence locally rather than publishing session IDs.

## Limits inherited from the study

Knowledge is not behavior; Sonnet self-judged and self-extracted its arm. Only
SKILL.md was measured, not resources. Sampling, lenient partial credit and
abstentions affect the categories. Unprobed lines are not evidence of redundancy.
An instruction answering a probe correctly does not establish reliable task use.

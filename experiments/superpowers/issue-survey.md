# Superpowers issue survey: candidates for AP experiments

Surveyed 2026-11-06 from public obra/superpowers GitHub issues, including open
and closed issues. This is a candidate shortlist, not a claim that AP fixes
these reports or that closed reports reproduce on current Superpowers.

## Method and count

Used `gh issue list --repo obra/superpowers --state all --limit 1000` with
`<term> in:title,body` for model, Opus, Sonnet, Haiku, Gemini, GPT, Qwen, GLM,
DeepSeek and Kimi. Counts were respectively 374, 152, 66, 21, 53, 40, 18, 4, 8
and 5. Deduplication by issue number yielded **427 keyword matches**.
None of the individual queries reached the requested limit.

These are search matches, not 427 model-behavior bugs. Environment fields alone
can match. Title screening and selected body reading produced the shortlist
below; comments and closure reasons were checked for the 15 shortlisted issues.
Raw search snapshots are local ignored evidence files. Search indexing and
later issue edits can change these numbers.

There are **11 behavioral/workflow reports worth considering and 4 evaluation
or tuning discussions** in this shortlist. They overlap, include duplicates and
design preferences, and are not 15 distinct defects. We did not exhaustively
classify all 427 matches. Model names below are issue authors' labels, not an
independent check of availability or model identity.

## Behavioral and workflow candidates (11 reports)

| Reports | Reported situation and evidence limit | AP experiment |
| --- | --- | --- |
| [#2377](https://github.com/obra/superpowers/issues/2377), [#2423](https://github.com/obra/superpowers/issues/2423), [#2487](https://github.com/obra/superpowers/issues/2487) | Pressure wording, triggering and narration on newer Claude models. #2423 is a duplicate of #2377; #2487 is closed. A commenter in #2377 reports 315 controlled sessions that did **not** reproduce the expected over-triggering; current and calibrated wording tied on triggering. | Compare role-scoped variants with upstream, including multi-turn and compaction cases. Do not assume softer wording or less context is better. |
| [#2000](https://github.com/obra/superpowers/issues/2000), [#1222](https://github.com/obra/superpowers/issues/1222) | GPT-5.6 with a complete PRD and GPT-5.4 in Pi reportedly enter unwanted brainstorming. #2000 had brainstorming installed without its downstream pipeline. Maintainers declined manual-only triggering as contrary to core design; #1222 lacked the requested transcript. | An explicitly chosen planner/implementer policy, with dependencies and stage handoffs intact. This is an alternative workflow, not proof of an upstream defect. #2000 already links an unofficial manual derivative; AP need not invent it again. |
| [#1878](https://github.com/obra/superpowers/issues/1878) | Sonnet 5 treated bootstrap language as injection after clear. Closed as duplicate of #1480. Multiple installed plugins complicate attribution. | Test a short resolve bootstrap and provenance-bearing role delivery after clear. AP cannot guarantee a model will trust instructions. |
| [#1441](https://github.com/obra/superpowers/issues/1441) | Opus 4.7 reportedly crossed approval gates in auto mode. Closed not planned; a maintainer could not reproduce with Opus 4.8 on a later environment. | Explicit stage contracts and gate checks, evaluated on the exact reported host/model first. Permission enforcement remains the host's responsibility. |
| [#143](https://github.com/obra/superpowers/issues/143) | Historical Opus 4.5 report of skipping brainstorming and skill activation. Closed duplicate. | Include under-activation as well as over-activation in model-specific evals. More restraint can make this failure worse. |
| [#2243](https://github.com/obra/superpowers/issues/2243) | Reviewer hallucinated process artifacts on a cheap tier. Closure identifies glm-5.3-flash, notes the upstream mid-tier reviewer floor, and asks for missing reports/dispatch prompts. | Evaluate a reviewer-only evidence contract on supported tiers. Do not claim AP makes a below-floor model suitable or that the unprovided reports prove a template defect. |
| [#1194](https://github.com/obra/superpowers/issues/1194) | GPT-5.4/OpenCode high token use. Closed duplicate of #1152; maintainers note per-task double review was already replaced in v6.0. | Measure current upstream versus AP-scoped delivery on the same tasks. Do not recreate an obsolete workflow and claim savings against it. |
| [#2057](https://github.com/obra/superpowers/issues/2057) | Opus 5 slowdown; limited reproduction detail. Closed completed; maintainer cites v6.3 efficiency work and possible coordinator-model choice. | Separate coordinator latency from worker/reviewer quality and cost. Instruction selection is not actual model routing. |

## Evaluation/tuning discussions (4)

- [#2017](https://github.com/obra/superpowers/issues/2017): retuning for newer
  models and runtime cost. Maintainers ask for controlled quality-preserving
  comparisons and point to their existing superpowers-evals harness. This is
  the strongest starting point for a shared evaluation discussion.
- [#2052](https://github.com/obra/superpowers/issues/2052): external reported
  Sonnet 4.6-to-5 skill regression measurements. Closed not planned because
  upstream already has an eval harness and does not want that external
  dependency. We have not reproduced the external measurements.
- [#2665](https://github.com/obra/superpowers/issues/2665): Haiku/Sonnet 5.5
  skill-knowledge measurements. Knowledge overlap does not prove instructions
  are behaviorally redundant. Use as a hypothesis for a controlled ablation,
  not justification to delete TDD or verification safeguards.
- [#2087](https://github.com/obra/superpowers/issues/2087): judgment-framing
  proposal for Claude 5. Closed not planned; maintainers report existing evals
  did not show further rewording improving outcomes. Model-provider prompting
  advice alone is insufficient evidence for changing tested content.

## Cases AP instruction selection does not itself fix

- Actual worker-model selection or inheritance: [#2034](https://github.com/obra/superpowers/issues/2034),
  [#2096](https://github.com/obra/superpowers/issues/2096),
  [#1631](https://github.com/obra/superpowers/issues/1631),
  [#1776](https://github.com/obra/superpowers/issues/1776).
  The host still needs a supported dispatch/configuration mechanism.
- Model-provider routing or quota attribution: [#1569](https://github.com/obra/superpowers/issues/1569).
- Local model/chat-template incompatibility: [#894](https://github.com/obra/superpowers/issues/894)
  and [#1453](https://github.com/obra/superpowers/issues/1453).

## How to turn a candidate into evidence

1. Reproduce on a recorded upstream commit, host version, exact model, effort,
   permissions and task. Record other plugins and whether instructions arrived.
2. Keep upstream as a control. Compare AP delivery with identical content before
   changing skill wording; otherwise delivery and content effects are confounded.
3. Test full workflow outcomes: task correctness, missed requirements, false
   findings, gate compliance, invocation errors, cost and elapsed time. Include
   clear/compaction, incomplete retrieval and explicit child-role resolution.
4. Run repeated paired trials; preserve unfavorable results. A single good
   transcript is a case study, not an optimal-model claim.
5. Only then version the successful skill variant and pin it for that exact
   model/role. Keep an explicit fallback for untested models. AP can distribute
   and lock the selected variant across projects; it does not discover the best
   variant automatically or improve a model merely by being installed.

Start with the role separation trial and reviewer evidence discipline, followed
by task-appropriate planner activation. Preserve upstream approval gates unless
the project owner explicitly chooses a different policy. Do not post these as
upstream fixes without reproduced evidence and maintainer agreement.

---
title: Live Claude truncation and prompted recovery findings
author: Samson
date: 2026-11-06
touches:
  - docs/ponytail-experiment.md
---

## Decided
Live user-run Claude Opus 5.5 tests in both Claude CLI and T3 showed truncated bound MCP server instructions: partial ponytail-review and missing shared-technical-language. Explicit resolve returned apparently complete bodies. After compact, a recovery prompt caused resolve; after clear, a readiness prompt caused library reads. A neutral review after clear made only a Grep call and proceeded with incomplete required instructions. This is prompted recovery, not reliable automatic reinjection.

## Tried and ruled out
Do not infer delivery from explain, lock validity, startup stamps, model recollection, or correct-looking output. These establish selection or reported behavior, not receipt of complete text. Do not attribute truncation specifically to T3: the CLI reproduced it too. No exact limit or responsible component has been established.

## Watch out
Ponytail uses SessionStart startup/resume/clear/compact and a separate SubagentStart hook to inject rules. AP bound serverInstructions currently says follow as already resolved and discourages another resolve except compaction or changed identity. Short retrieval bootstrap plus host lifecycle integration is a proposed fix, not validated. Keep native Ponytail installed until neutral-task tests pass. Tests and skill packages remain in workflow-skills; product fixes belong in Agent-Profiles.

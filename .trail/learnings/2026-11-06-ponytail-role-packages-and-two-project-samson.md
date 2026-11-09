---
title: Ponytail role packages and two-project MCP experiment
author: Samson
date: 2026-11-06
touches:
  - scripts/import-ponytail.mjs
  - scripts/test-ponytail.mjs
  - docs/ponytail-experiment.md
---

## Decided
Keep Ponytail adaptations in workflow-skills, not the Agent-Profiles product. Four local 1.0.0 packages retain MIT license and provenance from upstream 5.3.3 commit 96608e0. Implementation is fixed at full and role-scoped. Two disposable projects share one isolated AP library.

## Tried and ruled out
Verified role selection for codex and claude, real stdio MCP delivery, immutable identity rejection, non-writing previews, stale digest rejection, independent adoption, convergence, and rollback. Publishing alone does not update project pins. The candidate 1.0.1 exists only in scratch.

## Watch out
Updates target a role/model/host assignment, so other assignments remain pinned. Use an isolated trust path to avoid ambient user policy affecting fixtures. Protocol reconnect is not a live T3 clear/compact test. Keep native plugins installed until AP-only live sessions and any intended subagent delivery are verified. No live adoption or paid model tests performed.

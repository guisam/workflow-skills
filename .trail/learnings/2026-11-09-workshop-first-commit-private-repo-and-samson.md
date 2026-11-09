---
title: "Workshop first commit, private repo and adapter proposal"
author: Samson
date: 2026-11-09
branch: main
cost: { minutes: 1, tokens: 866 }
touches:
  - docs/adapter-design.md
---

## Decided
workflow-skills is the workshop layer for Agent-Profiles#85 and is a private repo (guisam/workflow-skills). The README catalog separates stable signed packages (5 @local 1.0.0) from the trial-only Superpowers orchestration/TDD roles and the agent-profiles-superpowers companion. Adapter proposal (docs/adapter-design.md): the adapter pins packages by name@version from the library and never references the workshop by path. The AP first slice (template allowlist plus sentinel pack test) is PR #95.
## Tried and ruled out
SSH remote: there is no SSH key on this machine, so use HTTPS remotes like the other repos.
## Watch out
core.autocrlf is on. .gitattributes forces LF so package bytes match signed digests on checkout. AP main has 17 pre-existing failures in outdated/package-cli/package-resolution tests: the resolve snapshots lack `withheld: []`. They are not caused by #85 work.

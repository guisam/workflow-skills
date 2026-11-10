---
title: Complete adapter migration requires current MCP and checkout runtimes
author: Samson
date: 2026-11-10
branch: main
touches:
  - docs/adapter-design.md
  - docs/live-migration-2026-11-09.md
  - docs/live-migration-checklist.md
  - package-lock.json
  - package.json
  - docs/live-migration-2026-11-10.md
---

## Decided
Completed the external adapter migration using published AP 0.22.0. Both the workshop-installed MCP runtime and the product checkout's own CLI/hook build must be current. After preserving old source work in a named stash and moving to released main, standard protocol-3 bootstrap and doctor work without exceptions. All 50 configuration/approval comparisons match, and fresh stdio servers for both hosts deliver all four roles.
## Tried and ruled out
Direct executable paths inside managed bootstrap blocks work at runtime but doctor rejects their modified text and still detects the old checkout runtime. Restore standard blocks and upgrade the actual checkout instead. Do not discard prior work or blindly apply an old version-bump stash over main.
## Watch out
The prior migration report remains a historical failed installation attempt, with a link to the completed follow-up. Trail's historical/live/later match is not a contradiction: later execution supersedes the pause without rewriting the old evidence. Fresh MCP transport checks are not interactive host/model behavior tests. Package signatures were copied unchanged; no policy or package version changed.

---
title: Published release can precede registry archive availability
author: Samson
date: 2026-11-10
branch: main
---

## Decided
Published AP 0.21.0 from merged main through OIDC. Migration remains paused until npm serves its archive. Existing 0.19.4 resolves the same 50 checks as the snapshot; no live configuration was moved.
## Tried and ruled out
Repeated registry installation while the archive returns 404 does not complete an upgrade. Do not republish an already published version or migrate old runtimes.
## Watch out
Trail's two conflicts on the migration record are lexical false positives: this new pre-migration snapshot does not invalidate earlier live experiments, and recording Claude/Codex host files does not reject earlier MCP verification. The record distinguishes current delivery from historical evidence. The old MCP process was stopped; reconnect or start a new session to use the unchanged installation.

---
title: Superpowers role prototype and model issue survey
author: Samson
date: 2026-11-07
touches:
  - ".agent-profiles/BOOTSTRAP.md"
  - ".agent-profiles/agent-profiles.lock"
  - ".agent-profiles/agents.yaml"
  - ".agent-profiles/approvals/@local/ponytail-audit/1.0.0/samson.json"
  - ".agent-profiles/approvals/@local/ponytail-audit/1.0.0/samson.json.sig"
  - ".agent-profiles/approvals/@local/ponytail-debt/1.0.0/samson.json"
  - ".agent-profiles/approvals/@local/ponytail-debt/1.0.0/samson.json.sig"
  - ".agent-profiles/approvals/@local/ponytail-implementation/1.0.0/samson.json"
  - ".agent-profiles/approvals/@local/ponytail-implementation/1.0.0/samson.json.sig"
  - ".agent-profiles/approvals/@local/ponytail-review/1.0.0/samson.json"
---

## Decided
Prototype Superpowers role separation in workflow-skills disposable consumers before publishing an AP example. Coordinator owns SDD state and dispatch; implementer and reviewer receive explicit contracts and resolve their own roles. Preserve complete upstream resource trees and MIT provenance. Structural delivery is not live subagent validation.

## Tried and ruled out
Do not recursively inject every referenced skill. Distinguish current dependencies from stage handoffs. Do not package this script-bearing workflow as a Markdown-only preset. The issue survey found 427 keyword matches, not 427 model bugs; the curated 15-report shortlist includes duplicates, design preferences and contrary eval evidence.

## Watch out
AP instruction selection does not select a host's worker model or enforce approvals. Plugin suppression needs live confirmation. Preserve upstream controls when comparing variants, and evaluate behavior before pinning model-specific versions. Existing upstream evals and closed-ticket decisions matter; lighter wording is not inherently better.

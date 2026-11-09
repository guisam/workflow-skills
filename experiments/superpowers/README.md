# Superpowers through Agent Profiles: local role trial

The initial setup trial is [closed with findings and retained evidence](closeout.md).

Next working task: [model-specific variants guided by Nikolay Petrov's knowledge map](MODEL-TAILORING.md).

Status: structural checks and one live Claude role workflow passed. Coordinator
recovery passed after compaction and in a fresh session. See [verification.md](verification.md)
for evidence boundaries and [comparison.md](comparison.md) for the next pilot.
Build the experiment here first. Promote a portable, reviewed example to
Agent-Profiles `examples/superpowers` only after live testing. This keeps local
paths, plugin settings and development pins out of the public AP package.

## What is separated

| Assigned role | Required instructions | Conditional resources |
| --- | --- | --- |
| `sp-coordinator` | subagent-driven-development | Worktrees, requesting review, branch completion, independent parallel tasks |
| `sp-implementer` | Original implementer prompt body, TDD, verification-before-completion | Debugging and responding to review |
| `sp-reviewer` | Original task-reviewer prompt body | Original re-review or whole-branch contract, selected by explicit scope |

This is the approved-plan execution slice, not a replacement for all 15 skills.
Brainstorming and writing-plans remain earlier stages; writing-skills and
diagnosing-superpowers remain maintenance tools. The general using-superpowers
bootstrap is not injected. Workers have explicit assignments and may not start
their own orchestration pipeline.

All upstream skill directories remain on disk, including scripts and templates.
Only the assigned role's required bodies are injected. A skill reference can
mean a current dependency, an optional operation, or a handoff to another role;
it does not automatically require injecting the full library. See [adapter.md](adapter.md).

The coordinator still owns the upstream progress ledger, task review/fix loop
and final branch review. AP selects and delivers instructions; it does not
dispatch children, choose the host's model, preserve task state, or enforce
permissions. Each child must be explicitly assigned a role and resolve it.

## Reproduce locally

Prerequisites: Windows, Node 24, Git and Git Bash; the existing workflow-skills
AP runtime and Agent-Profiles development dependencies. The script expects
Superpowers 7.0.2 at `22f0b463e7a5e579904dd6211a520321035526f7` with clean skills
and LICENSE. It refuses another revision until the adapter is reviewed.

From workflow-skills:

```powershell
node scripts/test-superpowers.mjs
```

Optional positional arguments: Superpowers checkout, AP checkout, Git Bash path.
The script installs AP 0.19.4 in a new disposable project, so npm access is needed.
It does not call a model API or publish signed skill packages.

The generated project contains:

- `.agent-profiles/agents.yaml`, profiles, roles, complete upstream skill resources
  and two extracted worker contracts;
- `PROVENANCE.json`: upstream commit, MIT license attribution via copied LICENSE,
  and hashes for every copied upstream file;
- `PLAN.md`: a proposed one-task live exercise, not an approved execution plan;
- a tiny sumPrices module and passing baseline test, ready for an empty-input fix;
- local Claude/Codex MCP and plugin settings, with explicit role selection;
- `CHECKS.json` and ignored `.superpowers/` helper artifacts.

Current validated consumer: `C:/workspace/workflow-skills/.scratch/superpowers-pjRH92`.
Baseline: `25a4caf12432240ffca99f3d46317e5c656c3d94`.
This was the clean setup baseline. The completed trial ends at `1c0830a`;
documentation reconciliation and tool-generated ignore files are now uncommitted.

## What passed

- Six SDK-driven MCP resolutions: three roles for each of Claude and Codex.
  Every required body was present, no other required body was injected, and
  the final completion marker was present.
- Byte comparison against upstream for copied skill resources.
- Baseline Node tests.
- Git Bash workspace ownership/reuse and Task 1 brief extraction.
- Review-package generation over the fixture's setup commits.

These checks exercise delivery and helper scripts, not a live Claude/Codex session.

## Repeating the initial live test

Open the disposable consumer in T3 with the intended agent/model. First ask it
to resolve `sp-coordinator`, report required skills and the final marker, and
inspect PLAN.md without executing or dispatching. Confirm that no native
Superpowers or Ponytail session hook supplies competing instructions. Plugin
identifiers vary across installations; the generated local settings are only
a starting point. No competing native injection was observed in the completed
Claude trial; other hosts and projects still need their own isolation checks.

Then approve the plan and the intended worker/reviewer models explicitly.
Require separate implementer and reviewer sessions with supplied artifact paths,
role resolution, real test evidence and a recorded commit range. Do not assume
subagent delivery because the parent passed. Test clear/compaction separately:
resolve the assigned instructions again, then recover progress from the ledger.

The script has not changed active project plugins, the live skill library or
the upstream Superpowers checkout. No model-specific variant has been tuned or
shown to outperform upstream. Exact-model pins become useful after those evals.

## Research and promotion

[Issue survey](issue-survey.md) identifies evaluation candidates and contrary
evidence. The public example should explain the role mapping and dependencies,
retain MIT attribution, and include reproducible setup without personal paths.
Do not turn this resource-bearing tree into a Markdown-only preset that silently
drops scripts or templates. Library packaging and model-specific variants are
later work; this fixture does not demonstrate their installation or signing.

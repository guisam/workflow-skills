# Workflow Skills

Reusable workflow skills maintained independently of their consuming projects.
This repository is also the user's root development workbench. The
[elephant workflow](packages/elephant-workbench/SKILL.md) formalizes design
conversations, fresh specification review and project-specific implementation
handoffs. The signed packages are locally adopted through Agent-Profiles'
explicit elephant and goldfish roles.

This repository is the **workshop** layer described in
[Agent-Profiles#85](https://github.com/guisam/Agent-Profiles/issues/85):

```text
workflow-skills (workshop: skill sources, packages, checks)
  → <project>-config (adapter: adds pins and roles for one project)
    → project (product: owns its governing instructions and portable defaults)
```

The workshop owns skill text, supporting references, package manifests,
provenance, portability checks and usage examples. Agent Profiles (AP) delivers
signed packages from the local library. Each consuming project selects and pins
versions independently. The adapter layer is released and locally migrated on AP 0.22.0;
see [adapter design](docs/adapter-design.md).

Consuming projects must not depend on this repository's own `.agent-profiles/`
directory. It is the workshop's own dogfood configuration, not a default for
other projects.

## Elephant and goldfish workflow

The elephant develops a design with the user and preserves decisions across
sessions. Fresh goldfish reviewers test that design. The elephant reconciles
their findings, then hands authorized implementation work to a separate worker
in the target project. Review depth depends on the task; every idea does not
require every review role.

| Skill | AP role / availability | Purpose |
| --- | --- | --- |
| [elephant-workbench](packages/elephant-workbench/SKILL.md) | Required by `elephant` | Explore requirements and alternatives, maintain durable design records, and coordinate review and implementation handoffs. The elephant can inspect code and write designs; it does not implement product code in this role. |
| [delegate](packages/delegate/SKILL.md) | Available on demand to `elephant` | Prepare bounded child-task assignments, preserve the requested model and workspace, require child-side AP instruction loading, and collect results and verification evidence. |
| [goldfish-comprehension](packages/goldfish-comprehension/SKILL.md) | Required by `goldfish-comprehension` | Read the design alone, explain it back, and identify ambiguity or missing context without filling gaps from source code. |
| [goldfish-design](packages/goldfish-design/SKILL.md) | Required by `goldfish-design` | Challenge assumptions, dependencies and failure cases using the design and relevant source evidence. |
| [goldfish-readiness](packages/goldfish-readiness/SKILL.md) | Required by `goldfish-readiness` | Check whether a fresh worker can execute the bounded assignment and verify its outcome; separate blockers from optional refinements. |

All four roles also require `shared-technical-language`. Goldfish return findings
without editing the workspace. Their verdicts do not authorize implementation or
merge. The existing `reviewer` role remains responsible for implementation review.

### Start an elephant session

Open a new T3 thread targeting `C:/workspace/Agent-Profiles`, select Codex Astra,
and send:

> Work as the elephant. Resolve Agent Profiles with role `elephant` using your
> actual host-stated model identity. Help me develop the design and preserve
> decisions. Load the available `delegate` skill before handing off child tasks.

T3 selects the model; AP supplies the explicitly assigned role and skills.
Naming a thread Elephant does not select the role. The default remains
`implementer`. See [elephant setup and verification](docs/elephant-adoption.md).

### Request a goldfish review

All three goldfish roles are available for Sol 6.1 (`gpt-6.1-sol`, Codex) and
Opus 5.5 (`claude-opus-5-5`, Claude). For example, tell the elephant:

> Delegate a fresh design review of [document path and revision] in Agent-Profiles
> to Opus 5.5 using `goldfish-design`. Supply the design and relevant sources,
> without our discussion or a preferred verdict. Return findings without edits.

Use `goldfish-comprehension` or `goldfish-readiness` for the other review questions.
An existing elephant session should re-resolve its role to load the goldfish
roster. Changing roles within the elephant's conversation is not independent
review: goldfish need fresh parent-turn context. See [goldfish usage and
verification](docs/goldfish-adoption.md) and the [delegation contract](docs/delegation.md).

These skills are maintained here and selected through the external
`agent-profiles-config` adapter. They are not installed as global Codex/Claude
skills, and they do not require Google's EGM plugin. The five new packages are
signed and locally adopted at 0.1.0. Full instruction delivery was verified for
the elephant and all six goldfish role/model combinations. The user reported a
successful Astra elephant startup; live goldfish behavior and child-worktree
delivery remain untested. Delegated child tasks and separate top-level T3 threads
have different launch contracts.

## Catalog

| Status | Package or asset | Notes |
| --- | --- | --- |
| Signed, locally adopted | `@local/elephant-workbench@0.1.0` | Required by Agent-Profiles' elephant role; see [skill](packages/elephant-workbench/SKILL.md) and [adoption](docs/elephant-adoption.md). Instruction delivery verified; successful Astra startup reported by the user |
| Signed, locally adopted | `@local/delegate@0.1.0` | Available to Agent-Profiles' elephant role; see [delegation](docs/delegation.md). On-demand instruction delivery verified; live child behavior untested |
| Signed, locally adopted | `@local/goldfish-comprehension@0.1.0`, `@local/goldfish-design@0.1.0`, `@local/goldfish-readiness@0.1.0` | Fresh specification-review roles for Sol 6.1 and Opus 5.5; see [usage and verification](docs/goldfish-adoption.md). Six role/model MCP deliveries verified; model behavior untested |
| Stable, signed, adopted | `@local/shared-technical-language@1.0.0` | Extracted from Fraiche `adr-ste`; see [extraction](docs/extraction.md) |
| Stable, signed, adopted | `@local/ponytail-implementation@1.0.0`, `ponytail-review`, `ponytail-audit`, `ponytail-debt` (all 1.0.0) | Derived from Ponytail (MIT); see [experiment](docs/ponytail-experiment.md) |
| Trial only | [Superpowers role trial](experiments/superpowers/README.md): coordinator (orchestration), implementer (TDD), reviewer | Generated into `.scratch/` by `scripts/test-superpowers.mjs`; not packaged or signed |
| External reference | `agent-profiles-superpowers` companion ([Agent-Profiles#88](https://github.com/guisam/Agent-Profiles/issues/88)) | Superpowers packages and model variants; unsigned, no variant adopted. Reference it; do not copy it here |

Only stable, signed packages are candidates for an adapter to select. A trial
asset becomes a candidate only after it is packaged, reviewed, signed and validated.

Signed stable packages are in the live local library and adopted by
Agent-Profiles and workflow-skills; see the [local cutover record](docs/local-cutover.md).
Both projects' host MCP configurations run the AP executable from this
repository's `node_modules`. Run `npm ci` here to restore it.

## Boundaries

- Keep project policy and workflow authority in each consuming repository.
- Keep skill-development commits in this repository.
- Propose general Agent Profiles improvements separately, with a minimal reproducer.
- Fraiche remains unchanged until a reviewed integration is authorized.
- A successful packaging check establishes mechanics, not model effectiveness or
  host support.

This repository is private. Packages have not been published remotely, and no
paid evaluation has been run. Derived Ponytail packages retain upstream's MIT
license. No repository-wide license, and no license for the Fraiche extraction,
has been selected.

## Validate

Run the checks with Node 24 against an Agent-Profiles checkout. They use isolated
stores under `.scratch/` and do not change the live library or any active project.

```powershell
node scripts/validate-package.mjs C:\workspace\Agent-Profiles
node scripts/import-ponytail.mjs C:\workspace\ponytail --check
node scripts/test-ponytail.mjs C:\workspace\Agent-Profiles
node scripts/test-superpowers.mjs
```

- `validate-package.mjs`: shared technical-language package structure.
- `test-ponytail.mjs`: two projects and one library; role selection, MCP delivery,
  explicit updates and rollback. See the [runbook](docs/ponytail-experiment.md).
- `test-superpowers.mjs`: builds the Superpowers role trial project. Requires
  Superpowers 7.0.2 at a pinned commit and npm access.
- `adapter-migration.mjs`: snapshot, migrate, verify and roll back a project's
  local adoption into an adapter. See [adapter design](docs/adapter-design.md).

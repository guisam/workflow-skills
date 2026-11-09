# Workflow Skills

Reusable workflow skills maintained independently of their consuming projects.

This repository is the **workshop** layer described in
[Agent-Profiles#85](https://github.com/guisam/Agent-Profiles/issues/85):

```text
workflow-skills (workshop: skill sources, packages, checks)
  → <project>-config (adapter: adds pins and roles for one project; unreleased AP branch)
    → project (product: owns its governing instructions and portable defaults)
```

The workshop owns skill text, supporting references, package manifests,
provenance, portability checks and usage examples. Agent Profiles (AP) delivers
signed packages from the local library. Each consuming project selects and pins
versions independently. The adapter layer is implemented on an unmerged AP branch;
see [adapter design](docs/adapter-design.md).

Consuming projects must not depend on this repository's own `.agent-profiles/`
directory. It is the workshop's own dogfood configuration, not a default for
other projects.

## Catalog

| Status | Package or asset | Notes |
| --- | --- | --- |
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

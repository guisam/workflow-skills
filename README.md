# Workflow Skills

Reusable workflow skills maintained independently of their consuming projects.

Agent Profiles supplies versioned local packages and project-specific selection.
This repository owns the skill text, supporting references, package manifests,
portability checks, and usage examples.

## First milestone

Extract Fraiche's shared technical-language skill into a portable package, then
demonstrate that two disposable projects can consume the same version, detect an
update, adopt it explicitly, and restore an earlier version independently.

Fraiche remains unchanged until a reviewed integration is authorized. A successful
packaging check establishes mechanics, not model effectiveness or T3 host support.

## Source and product boundaries

- Initial source: `C:\workspace\fraiche\.agents\skills\adr-ste\SKILL.md`.
- Keep project policy and workflow authority in each consuming repository.
- Propose general Agent Profiles improvements separately with a minimal reproducer.
- Keep skill-development commits in this repository.

This is a local repository. Signed stable packages are now in the live local
library and adopted by Agent-Profiles and workflow-skills; see the
[local cutover record](docs/local-cutover.md). Remote publication and paid
evaluation have not been performed. Derived
Ponytail packages retain upstream's MIT license; no repository-wide license or
license for the Fraiche extraction has been selected.

## Local extraction

- [Shared technical-language skill](packages/shared-technical-language/SKILL.md)
- [AP package manifest](packages/shared-technical-language/package.yaml)
- [Provenance, adaptations, validation, and demo next steps](docs/extraction.md)

The package uses the local-only identity `@local/shared-technical-language@1.0.0`.
No public namespace ownership or license is asserted. Run the isolated AP check
with Node 24:

```powershell
node scripts/validate-package.mjs C:\workspace\Agent-Profiles
```

## Ponytail role experiment

Four Ponytail skills now have AP packages: implementation, review, audit, and debt.
The [experiment and live-test runbook](docs/ponytail-experiment.md) records their
provenance, role assignments, checks, and remaining host validation.

```powershell
node scripts/import-ponytail.mjs C:\workspace\ponytail --check
node scripts/test-ponytail.mjs C:\workspace\Agent-Profiles
```

The experiment creates two projects and one library under `.scratch/`, with
isolated trust settings. It verifies role selection, MCP delivery, explicit
updates, and rollback without changing any active project or native plugin.

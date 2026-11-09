# Shared technical language: first extraction

## Provenance

Extracted on 2026-11-06 from `C:\workspace\fraiche`, at HEAD
`dca5fb480d63b57adf62b725e7820a028d63c023`.
Source: `.agents/skills/adr-ste/SKILL.md`, metadata version `2.0.0`.
SHA-256 of the actual source file bytes (before newline normalization):
`39b7778311af155d700b3e9bc97d5d7d4d6c32b8f311571c26c1eb804205ca6c`.
The source file had no tracked or untracked changes reported by Git; the Fraiche
working tree contained unrelated changes. The commit alone is not the content
identity: the digest records the bytes actually read.

## Dependency and authority inventory

The complete source was read before adaptation. It contains no concrete links to
other skills, documents, scripts, tools, machine paths, or external services.

| Source dependency or assumption | Portable treatment |
| --- | --- |
| Fraiche in the discovery description | Removed the project name; kept ADR drafting, documentation reconciliation, reviews, assignments, and ticket handoffs as triggers. |
| Role skill defines outputs, authorization, transitions | Governing project instructions and the applicable role workflow retain that authority; this writing skill grants none. No role skill is bundled or required by name. |
| Applicable context, canonical domain terms, governing ADRs | Supplied by each consumer. Preserve its terminology and link its authoritative sources. This package supplies no domain model or decisions. |
| Existing role report fields, current assignment, canonical state | Remain consumer workflow contracts. The writing skill does not create formats or state transitions. |
| Proposed ADR, reviewer recommendation, human acceptance, closure authorization | Example retained verbatim. These distinctions illustrate authority boundaries, not a universal lifecycle imposed on consumers. |
| Workflow labels, code, commands, identifiers, quotations, machine records | Preserve verbatim during prose edits; no concrete label mapping or tool execution is introduced. |
| Necessary unavailable sources and unresolved conflicts | Retain unverified claims and unresolved conflicts rather than inventing evidence. |

The six meaning-preservation rules, sentence-form table, handoff requirements,
conditions, evidence limits, and faithful-rewrite exception are unchanged.
The disclaimer about external STE certification remains. Routine use still
requires no proposition map, source hash, sentence count, or linguistic audit;
the digest above is extraction provenance, not a new runtime requirement.

Other adaptations: renamed `adr-ste` to `shared-technical-language`, started the
independent package and skill metadata version at `1.0.0`, changed “project writing
convention” to “writing convention,” and normalized CRLF to LF. Automatic discovery
remains available. No UI metadata, router, runtime scripts, or additional skills
are needed. Ticket review and orchestration remain deferred.

## Package contract

Agent Profiles was inspected through `trail map`, `trail ask`, and `trail skeleton`
before reading the relevant source spans. Reference checkout: version `0.19.0`,
HEAD `fb473cfad65b9b50a095d80cbd7bbd99b24f731f`; unrelated changes were present.

`src/packages.ts:105-207` requires `schema_version`, `package`, `entrypoint`, and
`behavior`. Package identity requires a scoped name, exact three-part version,
and type. Description and license are optional. Behavior requires delivery,
hosts, and effects. Instruction delivery requires an empty hosts list.
`readPackage` (`src/packages.ts:248-358`) validates members, the entrypoint, and
skill metadata. `importPackage` and `lookupPackage` in `src/package-store.ts`
provide isolated import and verified retrieval when passed an explicit store root.

The manifest uses `@local/shared-technical-language@1.0.0` as a local-only
identifier. `@local` claims no public namespace ownership or registry reservation.
License is omitted; no license was chosen or inherited from Agent Profiles.
Delivery is instruction text with empty hosts and effects: no native host
configuration, executable commands, substitutions, or bundled external references.
Consumer governing sources are contextual inputs, not missing package files.

## Reproduce structural checks

With Node 24 and the reference checkout's existing dependencies available:

```powershell
node scripts/validate-package.mjs C:\workspace\Agent-Profiles
python C:\Users\gfw\.codex\skills\.system\skill-creator\scripts\quick_validate.py packages/shared-technical-language
```

The Node check creates a fresh `.scratch/package-*` directory, copies the package,
and always passes its own store root to AP APIs. It checks schema/frontmatter,
import, repeat import, exact stored bytes, rejection of altered expected bytes,
and rejection of different content at the same identity. Scratch output remains
for inspection and is Git-ignored. It does not call signing or trust APIs, install
dependencies, build AP, or touch active consumer configuration.

These are packaging and storage checks. They do not establish live agent
invocation, instruction adherence, model quality, or native T3 support.

Recorded result on 2026-11-06: all seven Node assertions/check groups passed on
Node `v24.20.0`; skill-creator reported `Skill is valid!`. AP package-tree SHA-256:
`a57ff991235cba4cbc6635648da565ec409f0f1517fc085f9d7b04470945f9df`.
The retained run is `.scratch/package-apDWHn`. This is AP's framed package-tree
digest, distinct from the raw source-file digest above. A source-to-extraction
diff confirmed only the adaptations listed here. Final Git status listings for
Fraiche and Agent Profiles matched the initial listings, and the source-file
digest remained unchanged. No commits or publication were performed.

## Next steps: disposable consumers and T3

1. Create disposable consumers A and B with their own project instructions and
   a shared isolated store. Give A an ADR drafting role and B a ticket-handoff
   role. Inspect AP's current selection/lock APIs, then pin both to this exact
   version and digest; verify that both resolve identical skill bytes while
   retaining their distinct authority and report formats.
2. Prepare a reviewed `1.0.1` change in scratch. Verify that availability does not
   silently change either pin. Explicitly adopt it in A, verify B remains at
   `1.0.0`, then restore A to `1.0.0` and compare resolved bytes. Record selection,
   lock state, and digests; a copied file alone is not evidence of AP adoption.
3. For a future T3 demo, first verify the host's supported instruction delivery
   path. Show a proposal versus acceptance handoff and a failed/skipped-check
   example using the disposable consumers. Retain the exact prompt, selected
   package digest, and resulting prose. Obtain explicit authorization before
   paid model runs; keep mechanics evidence separate from quality judgments.

No local packaging blocker is expected from licensing because the field is
optional. Public distribution still needs user decisions on licensing, namespace,
and publication. Consumer adoption, T3 behavior, and the full two-model #33
evaluation are not part of this extraction's completed validation.

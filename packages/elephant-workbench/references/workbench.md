# Workbench mapping

This reference records the design baseline before adoption. Deployment and
approval status belong to the consuming adapter and its verified package records.
No live agent evaluation was performed while authoring this package.

## Intended experience

The user opens a new T3 Code thread associated with workflow-skills for an elephant
design conversation. The workbench maintains reusable skill sources and its AP
runtime. Each consumer retains its own governing instructions and private adapter
selections. A project-specific worker receives the accepted design and resolves
its own instructions. A new brainstorming thread must recover durable context;
it cannot assume access to an earlier thread's memory.

The user's request concerns a blank T3 thread, not a PowerShell launcher. Exact
model/provider settings and automatic startup selection remain undecided.

## Existing integration and remaining work

At inspection on 2026-11-11, workflow-skills pins AP 0.22.0. Its own and
Agent-Profiles' host MCP configurations use the workbench-installed executable.
Agent-Profiles uses an external agent-profiles-config adapter. Stable package
bytes remain in the user AP library; this is distinct from installing native
skills globally in Codex or Claude.

Do not make the workbench's dogfood configuration the default for consumers.
Adapters add bindings and role requirements; they cannot replace product-owned
profile/model routing or defaults. A future elephant default must be configured
at the appropriate owning layer, with explicit authorization for active changes.

The separate delegate package covers child tasks. This package
does not require it to be installed and does not embed its lifecycle mechanics.
Host orchestration instructions govern dispatch, workspace preparation and waits.
Before adoption, validate fresh-worktree delivery of ignored adapter/host settings,
design access, child AP resolution and returned evidence in a disposable consumer.
Missing setup must stop work rather than quietly use the workbench's profile.

Structural package checks do not establish model quality, host startup behavior,
or review independence. Signing, live adoption and paid evaluation are separate
authorized actions. No public license is selected for this original package.

## Provenance

Authored from the user's workbench discussion on 2026-11-11 and the explicit
request to formalize their existing practice. The user wants the concept, not
installation or adoption of Google's plugin.

Conceptual reference, read in full:
https://opensource.googleblog.com/2026/10/introducing-elephant-goldfish-model-plugin.html

This is original workflow text, with no copied plugin text or scripts. It adapts
the distinction between a continuing design session
and fresh specification reviewers, adds project-specific implementation handoffs,
and keeps review effort proportional instead of mandating every published phase.
No dependency on that plugin or its runtime is introduced.

The user subsequently authorized consulting the local EGM checkout. Reference
revision: `b7d9e2706fb96314a0a3123684f53cedd97e7d79` from
https://github.com/google/elephant-goldfish-model (Apache-2.0).
The working tree was clean when inspected. The following sources were read in
full for the conceptual refinements:

- `skills/egm-brainstorm/SKILL.md`: design discussion and durable rationale.
- `agents/comprehension.md`: preserve the reader's explanation, not only findings.
- `agents/implementation_readiness.md` and
  `resources/document_standards/implementation-readiness-standard.md`: distinguish
  design gaps from actionable implementation instructions.
- `docs/harnesses.md`: parent-turn isolation differs from instruction-file exclusion.

The brainstorm source links the draft skill, synthesizer, seven reviewer personas
and host integration documents. The readiness persona depends on a supplied
standard. The full plugin also depends on shared resources and harness adapters.
Those dependencies are not transplanted: this package states its own bounded
review questions and uses AP/host delivery. The draft and review orchestrators
were inspected only in part; they are not extracted or adopted here.

Deliberate differences: no fixed seven-reviewer fan-out, plugin command names,
mandatory multi-turn questioning, or modal UI contract. Readiness reserves
consequential design choices for the user/elephant but permits ordinary coding
judgment. Review limits do not convert unresolved findings into accepted trade-offs.
Any later extraction of actual upstream text must retain its applicable license
and notices and include its supporting contracts.

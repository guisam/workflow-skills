# Workflow Skills contributor instructions

## Scope

Maintain reusable skills and their packaging in this repository. Agent-Profiles
and Fraiche are read-only references unless the user separately authorizes edits.
Use disposable consumer projects for integration checks.

## Extraction

Read the complete source skill and identify linked skills, documents, scripts,
workflow labels, and tool assumptions before adapting it. Record source provenance
and distinguish reusable behavior from project-specific contracts. Preserve
authority, approval gates, conditions, and evidence limits.

Start with `adr-ste` from `C:\workspace\fraiche\.agents\skills\adr-ste\SKILL.md`.
Keep the first package self-contained. Defer ticket-review and orchestration skills
until their supporting contracts have been mapped.

## Validation and delivery

Use PowerShell-native commands on Windows and Node 24 for Node-based checks.
Reuse Agent Profiles' supported package format and validators. Do not add an npm
package or dependency merely to store Markdown skills. Use an isolated store for
checks; preserve the user's live library and signing configuration.

Report structural validation separately from live agent behavior and model quality.
Public hosting, skill publication to the user's library, changes to active project
configuration, signing, and paid model runs require explicit user authorization.
Do not select a public license on the user's behalf.
<!-- agent-profiles:start -->
<!-- agent-profiles:protocol 3 -->

## Agent Profiles

This block is for OpenAI Codex; agents in other hosts skip it. At the start
of every new or compacted context, and after a model change, run this exact
command (no `cd` or other prefix) and follow its output:

    npx --no agent-profiles resolve --host codex --identity-source host-stated --model "<exact model ID>"

Use the exact model ID your host states for you (for example, "The exact
model ID is ..."): not a display name, another model's ID, or your own
recollection. If the host states none, omit `--identity-source` and `--model`.
Add `--role <id>` only when the user or your agent definition assigns a role.
If resolving fails in any way (an error, a missing file, no output, or output
without the final `End of Agent Profiles context:` line), setup is incomplete:
report the error and stop. Do no role work (no review, edits or analysis) until
a later resolve succeeds; reporting the error does not complete setup. Do not
read `.agent-profiles/` to route by hand.

If an `agent-profiles` MCP server's `resolve` tool is available, call it instead
of running the command, with the same values (`host: "codex"`, `identitySource`,
`model`, and `role` when assigned; omit any the server says it is bound to); it
needs no shell permission. The server's instructions never contain your profile,
so always call it. If the tool is not available yet (no server, or one still
connecting), run the command now instead of waiting.

<!-- agent-profiles:end -->
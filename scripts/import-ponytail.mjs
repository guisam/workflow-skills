import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

assert.equal(process.versions.node.split('.')[0], '24', 'Use Node 24');
assert.ok(process.argv[2], 'Pass the Ponytail checkout path; optional --check');
const source = path.resolve(process.argv[2]);
const root = fileURLToPath(new URL('../', import.meta.url));
const commit = execFileSync('git', ['-C', source, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
assert.equal(commit, '96608e078b2d5ea607c5c3b8b5a54d1c1fba6846', 'Review adaptations before importing a new upstream revision');
assert.equal(execFileSync('git', ['-C', source, 'status', '--porcelain', '--', 'skills', 'LICENSE'], { encoding: 'utf8' }).trim(), '', 'Use clean upstream sources');
const license = readFileSync(path.join(source, 'LICENSE'), 'utf8');
const check = process.argv.includes('--check');
const descriptions = {
  implementation: 'Use when implementing, fixing, or refactoring code in the implementer role. Apply the smallest complete change with validation and explicit limits.',
  review: 'Use when reviewing a change in the reviewer role. Report concrete correctness, safety, load, test, performance, and unnecessary-code findings without modifying files.',
  audit: 'Use when auditing a whole repository in the auditor role. Rank concrete defects, risks, and simplification opportunities without modifying files.',
  debt: 'Use when the maintainer requests a shortcut debt ledger, or another role needs deferred-work evidence. Read shortcut and legacy ponytail comments and report their limits and revisit triggers.',
};
for (const [kind, description] of Object.entries(descriptions)) {
  const upstream = kind === 'implementation' ? 'ponytail' : `ponytail-${kind}`;
  const name = `ponytail-${kind}`;
  const bytes = readFileSync(path.join(source, 'skills', upstream, 'SKILL.md'));
  const original = bytes.toString('utf8').replaceAll('\r\n', '\n');
  assert.match(original, /^---\n[\s\S]+?\n---\n/);
  let body = original.replace(/^---\n[\s\S]+?\n---\n/, '').trim();
  const adaptations = ['Replace plugin invocation metadata with role-specific discovery; retain the upstream policy body.'];
  if (kind === 'implementation') {
    const mode = 'Active for the whole session until the user says "stop ponytail" or "normal mode". Switch level: `/ponytail lite|full|ultra`.';
    assert.ok(body.includes(mode));
    assert.ok(body.includes('\n## Levels\n'));
    body = body.replace(mode, 'Apply the full policy while assigned to the implementer role. Role assignment and project instructions govern its scope; this skill does not install session hooks or persistent mode controls.').split('\n## Levels\n')[0].trim();
    adaptations.push('Fix implementation policy at full; remove native session toggle and lite/ultra level selection.');
  }
  if (kind === 'debt') {
    assert.ok(body.includes('`/ponytail-debt TODO`'));
    body = body.replace('`/ponytail-debt TODO`', '"list debt marked TODO"');
    adaptations.push('Express the custom-marker example as a request rather than a native slash command.');
  }
  const files = {
    'SKILL.md': `---\nname: ${name}\ndescription: ${description}\nlicense: MIT\n---\n\n${body}\n`,
    'package.yaml': `schema_version: 1\npackage:\n  name: "@local/${name}"\n  version: "1.0.0"\n  type: skill\n  license: MIT\nentrypoint: SKILL.md\nbehavior:\n  delivery: instruction\n  hosts: []\n  effects: []\n`,
    'LICENSE': license,
    'PROVENANCE.json': JSON.stringify({ upstream: 'https://github.com/DietrichGebert/ponytail', version: '5.3.3', commit, path: `skills/${upstream}/SKILL.md`, sha256: createHash('sha256').update(bytes).digest('hex'), adaptations }, null, 2) + '\n',
  };
  for (const [file, content] of Object.entries(files)) {
    const target = path.join(root, 'packages', name, file);
    if (check) assert.equal(readFileSync(target, 'utf8'), content, target);
    else { mkdirSync(path.dirname(target), { recursive: true }); writeFileSync(target, content); }
  }
}
console.log(check ? 'Four packages match the recorded upstream adaptation.' : 'Imported four role-specific packages with MIT license and provenance.');

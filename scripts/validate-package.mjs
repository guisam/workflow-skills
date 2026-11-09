import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

assert.equal(process.versions.node.split('.')[0], '24', 'Use Node 24');
assert.ok(process.argv[2], 'Pass the read-only Agent Profiles checkout path');
const ap = path.resolve(process.argv[2]);
const { readPackage } = await import(pathToFileURL(path.join(ap, 'src/packages.ts')));
const { importPackage, lookupPackage } = await import(pathToFileURL(path.join(ap, 'src/package-store.ts')));
const root = fileURLToPath(new URL('../', import.meta.url));
const scratch = path.join(root, '.scratch');
mkdirSync(scratch, { recursive: true });
const run = mkdtempSync(path.join(scratch, 'package-'));
const sourceDirectory = path.join(run, 'source');
const storeRoot = path.join(run, 'store');
cpSync(path.join(root, 'packages/shared-technical-language'), sourceDirectory, { recursive: true });
const pkg = readPackage({ root: sourceDirectory });
assert.equal(pkg.manifest.package.version, '1.0.0');
assert.equal(pkg.manifest.package.license, undefined);
const options = { sourceDirectory, storeRoot, expectedDigest: pkg.sha256 };
const imported = importPackage(options);
assert.equal(imported.status, 'published');
assert.equal(importPackage(options).status, 'reused');
const identity = imported.identity;
const stored = lookupPackage({ storeRoot, ...identity });
assert.equal(stored.sha256, pkg.sha256);
assert.deepEqual(stored.files, pkg.files);

// Change only the disposable copy to check digest and immutable identity guards.
const entrypoint = path.join(sourceDirectory, pkg.manifest.entrypoint);
writeFileSync(entrypoint, readFileSync(entrypoint, 'utf8') + '\nDisposable mutation.\n');
assert.throws(() => importPackage(options), /expected digest mismatch/);
assert.throws(() => importPackage({ sourceDirectory, storeRoot }), /identity-conflict/);
assert.deepEqual(lookupPackage({ storeRoot, ...identity }).files, pkg.files);
console.log(JSON.stringify({ result: 'passed', node: process.version, identity, sha256: pkg.sha256, run,
  checks: ['manifest and skill metadata', 'isolated import', 'idempotent import', 'byte-exact lookup',
    'digest mismatch rejected', 'identity conflict rejected', 'stored bytes unchanged'] }, null, 2));

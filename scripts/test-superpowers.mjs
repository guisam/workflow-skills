import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const upstream=path.resolve(process.argv[2] || 'C:/workspace/superpowers');
const ap=path.resolve(process.argv[3] || 'C:/workspace/Agent-Profiles');
const bash=process.argv[4] || 'C:/Program Files/Git/bin/bash.exe';
const commit='22f0b463e7a5e579904dd6211a520321035526f7';
function run(command,args,cwd) {const r=spawnSync(command,args,{cwd,encoding:'utf8'});assert.equal(r.status,0,r.stderr || r.error?.message);return r.stdout.trim();}
assert.equal(process.versions.node.split('.')[0],'24');
assert.equal(run('git',['rev-parse','HEAD'],upstream),commit,'Review a changed upstream revision first');
assert.equal(run('git',['status','--porcelain','--','skills','LICENSE'],upstream),'');
const req=createRequire(path.join(ap,'package.json'));
const {stringify}=req('yaml');
const {Client}=await import(pathToFileURL(req.resolve('@modelcontextprotocol/client')));
const {StdioClientTransport}=await import(pathToFileURL(req.resolve('@modelcontextprotocol/client/stdio')));
const cli=path.join(root,'node_modules/@guisam/agent-profiles/dist/bin/agent-profiles.js');
fs.mkdirSync(path.join(root,'.scratch'),{recursive:true});
const project=fs.mkdtempSync(path.join(root,'.scratch/superpowers-'));
const config=path.join(project,'.agent-profiles');
function put(name,text) {const file=path.join(project,name);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,text);}
const hashes={};
for(const name of run('git',['ls-files','skills','LICENSE'],upstream).split('\n')) {
 const bytes=fs.readFileSync(path.join(upstream,name));
 put('.agent-profiles/'+name,bytes);
 hashes[name]=createHash('sha256').update(bytes).digest('hex');
}
const roles={
 'sp-coordinator':{file:'roles/sp-coordinator.md',skills:{required:['subagent-driven-development'],available:['using-git-worktrees','requesting-code-review','finishing-a-development-branch','dispatching-parallel-agents']}},
 'sp-implementer':{file:'roles/sp-implementer.md',skills:{required:['sp-implementation-contract','test-driven-development','verification-before-completion'],available:['systematic-debugging','receiving-code-review']}},
 'sp-reviewer':{file:'roles/sp-reviewer.md',skills:{required:['sp-task-review-contract'],available:[]}},
};
for(const [id,template] of [['sp-implementation-contract','implementer-prompt.md'],['sp-task-review-contract','task-reviewer-prompt.md']]) {
 const body=fs.readFileSync(path.join(upstream,'skills/subagent-driven-development',template),'utf8');
 const match=body.match(/  prompt: \|\r?\n([\s\S]*?)\r?\n```/);
 assert.ok(match,template);
 put(`.agent-profiles/skills/${id}/SKILL.md`,`---\nname: ${id}\ndescription: Assigned Superpowers worker contract; use only with a supplied task handoff.\nlicense: MIT\n---\n\n`+match[1].split(/\r?\n/).map(line=>line.replace(/^    /,'')).join('\n')+'\n');
}
for(const id of Object.keys(roles))put(`.agent-profiles/roles/${id}.md`,`# ${id}\n\nWork only within this assigned role. Follow the adapter and the supplied handoff.\n`);
put('.agent-profiles/profiles/base.md',fs.readFileSync(path.join(root,'experiments/superpowers/adapter.md')));
put('.agent-profiles/agents.yaml',stringify({version:1,default_profile:'base',default_role:'sp-coordinator',models:{},families:{},roles}));
put('AGENTS.md','# Disposable Superpowers trial\n\nNode 24. Follow the approved trial plan and role boundaries. No remote writes or releases. Retain the progress ledger. This fixture does not authorize paid model runs.\n');
put('PLAN.md',fs.readFileSync(path.join(root,'experiments/superpowers/plan.md')));
put('sum-prices.mjs','export const sumPrices = prices => prices.reduce((sum, price) => sum + price);\n');
put('sum-prices.test.mjs',"import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport {sumPrices} from './sum-prices.mjs';\ntest('adds prices',()=>assert.equal(sumPrices([2,3]),5));\n");
put('.gitignore','node_modules/\n.superpowers/\nCHECKS.json\n');
put('package.json',JSON.stringify({name:'superpowers-ap-trial',private:true,type:'module',engines:{node:'24.x'},scripts:{test:'node --test'}},null,2));
run('git',['init','-b','superpowers-trial'],project);
run('git',['add','.'],project);
run('git',['-c','user.name=AP fixture','-c','user.email=fixture@example.invalid','-c','commit.gpgsign=false','commit','-m','Initial disposable Superpowers trial'],project);
const initial=run('git',['rev-parse','HEAD'],project);
run(process.execPath,['--test'],project);
run(process.execPath,[cli,'init','--root',project,'--agent','claude','--agent','codex','--mcp'],project);
// Install only the existing pinned AP runtime; no model API calls.
run(process.execPath,[path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js'),'install','--save-dev','--save-exact','@guisam/agent-profiles@0.19.4'],project);
const installed=path.join(project,'node_modules/@guisam/agent-profiles/dist/bin/agent-profiles.js');
put('.mcp.json',JSON.stringify({mcpServers:{'agent-profiles':{command:process.execPath,args:[installed,'mcp','--root',project,'--host','claude']}}},null,2));
put('.claude/settings.local.json',JSON.stringify({enabledPlugins:{'ponytail@ponytail':false,'superpowers@synced':false}},null,2));
put('.codex/config.toml',`[plugins."ponytail@ponytail"]\nenabled = false\n[plugins."superpowers@superpowers"]\nenabled = false\n[mcp_servers.agent-profiles]\ncommand = ${JSON.stringify(process.execPath.replaceAll('\\','/'))}\nargs = ${JSON.stringify([installed.replaceAll('\\','/'),'mcp','--root',project.replaceAll('\\','/'),'--host','codex'])}\n`);
const checks=[];
for(const host of ['claude','codex']) {
 const client=new Client({name:'superpowers-trial',version:'1'});
 try {
  await client.connect(new StdioClientTransport({command:process.execPath,args:[installed,'mcp','--root',project,'--host',host],cwd:project,stderr:'pipe'}));
  for(const [role,entry] of Object.entries(roles)) {
   const result=await client.callTool({name:'resolve',arguments:{role}});
   assert.ok(!result.isError,JSON.stringify(result));
   const text=result.content.filter(p=>p.type==='text').map(p=>p.text).join('\n');
   assert.match(text.trimEnd(),/End of Agent Profiles context: .*\.$/);
   for(const skill of entry.skills.required)assert.ok(text.includes(fs.readFileSync(path.join(config,'skills',skill,'SKILL.md'),'utf8').trim()),skill);
   const headings=[...text.matchAll(/^## Required skill: (.+)$/gm)].map(m=>m[1]);
   assert.deepEqual(headings,entry.skills.required);
   checks.push(`${host}/${role}: complete, only assigned required skill bodies`);
  }
 } finally {await client.close();}
}
const script=name=>path.join(config,'skills/subagent-driven-development/scripts',name).replaceAll('\\','/');
const workspace=run(bash,[script('sdd-workspace'),'PLAN.md'],project);
const brief=path.join(workspace,'task-1-brief.md');
run(bash,[script('task-brief'),'PLAN.md','1',brief.replaceAll('\\','/')],project);
assert.ok(fs.readFileSync(brief,'utf8').includes('Handle empty prices'));
assert.equal(run(bash,[script('sdd-workspace'),'PLAN.md'],project),workspace);
checks.push('Git Bash workspace ownership and Task 1 brief extraction passed');
for(const [name,hash] of Object.entries(hashes))assert.equal(createHash('sha256').update(fs.readFileSync(path.join(config,name))).digest('hex'),hash);
put('PROVENANCE.json',JSON.stringify({upstream:'https://github.com/obra/superpowers',commit,version:'7.0.2',hashes,adaptations:['Role adapter replaces global bootstrap routing','Worker prompt bodies extracted without rewording','Upstream resources retained verbatim']},null,2));
run('git',['add','.'],project);
run('git',['-c','user.name=AP fixture','-c','user.email=fixture@example.invalid','-c','commit.gpgsign=false','commit','-m','Configure disposable AP role trial'],project);
const baseline=run('git',['rev-parse','HEAD'],project);
const reviewPackage=path.join(workspace,'setup-smoke.diff');
run(bash,[script('review-package'),'PLAN.md',initial,baseline,reviewPackage.replaceAll('\\','/')],project);
assert.ok(fs.readFileSync(reviewPackage,'utf8').includes('package.json'));
assert.equal(run('git',['status','--porcelain'],project),'');
checks.push('Review-package helper generated the setup diff; fixture working tree clean');
put('CHECKS.json',JSON.stringify({project,baseline,workspace,brief,checks,limits:['No live model or subagent run','No signed library publication','Native hook suppression requires live confirmation']},null,2));
console.log(JSON.stringify({project,baseline,checks},null,2));

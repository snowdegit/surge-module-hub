const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),reportDir=path.join(root,'test-results');
const cases=JSON.parse(fs.readFileSync(path.join(reportDir,'dispatch-cases.json'),'utf8'));
const outcomes=[];
function enabled(c,settings){let v=c.options?.enable;if(!v)return true;let m=v.match(/^\$\{(.+)\}$/);if(m){v=settings[m[1]]??c.args[m[1]];return v===true||v==='true'}return v==='true'}
function expectedFor(c,url,settings){return cases.find(x=>x.plugin===c.plugin&&x.kind===c.kind&&enabled(x,settings)&&new RegExp(x.pattern,x.flags).test(url))}
function run(compiled,c,url,settings){let result,done=0;const binary=c.entryBinary;const payload='中文🙂';const body=binary?new TextEncoder().encode(payload):payload;const env={$request:{url,method:c.kind==='request'?'POST':'GET',headers:{'X-Keep':'yes'},body},$response:{status:200,headers:{},body},$argument:JSON.stringify(settings),$script:{binaryBodyMode:binary},$done:r=>{result=r;done++},$environment:{'surge-version':'5.23.0'},console:{log(){},error(){}},TextEncoder,TextDecoder,Uint8Array,ArrayBuffer,URL,setTimeout(){throw Error('unexpected upstream execution')},clearTimeout(){},$httpClient:{},$persistentStore:{read(){return null},write(){return true}}};compiled.runInNewContext(env,{timeout:1500});assert.equal(done,1,'dispatcher must complete exactly once');return result}
test('All available HTTP script routes: positive/negative matching, gates, argument types and body adapters',()=>{
 let current='',compiled;
 for(const c of cases.filter(x=>x.action==='script'&&['request','response'].includes(x.kind)).sort((a,b)=>(a.plugin+a.kind).localeCompare(b.plugin+b.kind))){
  const key=c.plugin+'-'+c.kind,file=path.join(root,'scripts',key+'.js');
  if(key!==current){let source=fs.readFileSync(file,'utf8');source=source.replace(/\nconst __originals=\[[^\]\n]*\];/,matched=>matched+'\n__originals.forEach((_,i)=>{__originals[i]=function(typed,literal,request,response,done,script){done({probe:{index:i,typed,literal,hasRequestBody:Object.hasOwn(request||{},"body"),hasResponseBody:Object.hasOwn(response||{},"body"),requestBody:request?.body,responseBody:response?.body,mode:script.binaryBodyMode}})}});');compiled=new vm.Script(source,{filename:key});current=key}
  const module=fs.readFileSync(path.join(root,'modules',c.plugin+'.sgmodule'),'utf8');c.entryBinary=module.split('\n').find(l=>l.startsWith(key+' = ')).includes('binary-body-mode=true');
  if(!c.witness){outcomes.push({plugin:c.plugin,line:c.line,passed:false,reason:'missing URL witness'});continue}
  for(const variant of ['default','override','negative']){
   const settings={};if(variant==='override'){for(const [k,v]of Object.entries(c.args))settings[k]=typeof v==='boolean'?String(!v):typeof v==='number'?String(v+1):'override🙂';const gate=c.options.enable?.match(/^\$\{(.+)\}$/);if(gate)settings[gate[1]]='true'}
   const url=variant==='negative'?'invalid://unrelated.invalid/':c.witness;
   try{
    const selected=expectedFor(c,url,settings),result=run(compiled,c,url,settings);
    if(!selected)assert.deepEqual(Object.keys(result),[]);
    else if(selected.action==='script'){
     assert.ok(result.probe,'expected selected upstream route');assert.equal(result.probe.index,selected.index);
     for(const key of selected.argkeys){const fallback=selected.args[key],input=settings[key]??fallback,expected=typeof fallback==='boolean'?(input===true||input==='true'):typeof fallback==='number'?Number(input):input;assert.deepEqual(result.probe.typed[key],expected)}
     const requires=selected.options.requires_body==='true',binary=selected.options.binary_body_mode==='true';assert.equal(result.probe.hasRequestBody,requires);assert.equal(result.probe.hasResponseBody,requires);assert.equal(result.probe.mode,binary);
     if(requires){if(binary){assert.ok(result.probe.responseBody instanceof Uint8Array);assert.equal(new TextDecoder().decode(result.probe.responseBody),'中文🙂')}else assert.equal(result.probe.responseBody,'中文🙂')}
    }else assert.ok(result.response||result.url||result.headers||result.body!==undefined,'preceding builtin rewrite must produce a result');
    outcomes.push({plugin:c.plugin,line:c.line,variant,passed:true,selected:selected?.line??null});
   }catch(error){outcomes.push({plugin:c.plugin,line:c.line,variant,passed:false,error:error.message})}
  }
 }
 fs.writeFileSync(path.join(reportDir,'dispatch-report.json'),JSON.stringify({scope:'Generated dispatcher with upstream bodies replaced by probes; tests routes and adapters, not upstream application algorithms.',checks:outcomes.length,passed:outcomes.filter(x=>x.passed).length,failed:outcomes.filter(x=>!x.passed).length,cases:outcomes},null,2));
 assert.equal(outcomes.filter(x=>!x.passed).length,0,JSON.stringify(outcomes.filter(x=>!x.passed).slice(0,12)));
});

test('Every cron/generic task preserves invocation, optional gates and editable schedule',()=>{
 const taskOutcomes=[];
 for(const c of cases.filter(x=>['cron','generic'].includes(x.kind))){
  const key=c.plugin+'-task-'+c.task_index;
  let source=fs.readFileSync(path.join(root,'scripts',key+'.js'),'utf8');
  source=source.replace(/\nconst __originals=\[[^\]\n]*\];/,m=>m+'\n__originals.forEach((_,i)=>{__originals[i]=function(typed,literal,request,response,done){done({probe:{index:i,typed}})}});');
  const compiled=new vm.Script(source),module=fs.readFileSync(path.join(root,'modules',c.plugin+'.sgmodule'),'utf8');
  for(const variant of ['default','override']){
   const settings={};if(variant==='override'){for(const [k,v]of Object.entries(c.args))settings[k]=typeof v==='boolean'?String(!v):'custom';const g=c.options.enable?.match(/^\$\{(.+)\}$/);if(g)settings[g[1]]='true'}
   let result;compiled.runInNewContext({$argument:JSON.stringify(settings),$done:r=>result=r,console:{log(){}},Uint8Array,ArrayBuffer,URL,TextEncoder,TextDecoder},{timeout:1500});
   if(enabled(c,settings)){assert.equal(result.probe.index,c.index);for(const k of c.argkeys)assert.notEqual(result.probe.typed[k],undefined)}else assert.deepEqual(Object.keys(result),[]);
   taskOutcomes.push({plugin:c.plugin,line:c.line,variant,passed:true});
  }
  if(c.kind==='cron'){
   const key=c.source.match(/^cron \$\{([^}]+)\}/)?.[1];assert.ok(key);
   const native=module.split('\n').find(l=>l.includes(c.plugin+'-task-'+c.task_index+' = '));
   assert.ok(native.includes('cronexp="{{{'+key.replace(/[^A-Za-z0-9_]/g,'_')+'}}}"'),'cron must remain parameterized');
   const gate=c.options.enable?.match(/^\$\{(.+)\}$/);if(gate)assert.ok(native.startsWith('#!REQUIREMENT '),'optional schedule needs a native gate');
  }
 }
 fs.writeFileSync(path.join(reportDir,'task-report.json'),JSON.stringify({scope:'Synthetic task invocation and configuration checks; no external signup or account requests.',checks:taskOutcomes.length,passed:taskOutcomes.length,failed:0,cases:taskOutcomes},null,2));
});

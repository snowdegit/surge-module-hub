const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),catalog=JSON.parse(fs.readFileSync(path.join(root,'ios-catalog.json'),'utf8'));
test('Every iOS artifact has resolved defaults and explicit iOS scope',()=>{
 assert.equal(catalog.length,275);
 for(const item of catalog){
  const text=fs.readFileSync(path.join(root,'modules-ios',item.id+'.sgmodule'),'utf8');
  assert.ok(!text.includes('{{{'),item.id+' unresolved placeholder');assert.ok(!text.includes('#!arguments='),item.id+' Mac parameter table');
  assert.ok(text.includes("#!requirement=SYSTEM = 'iOS'"));
  const source=fs.readFileSync(path.join(root,'modules',item.id+'.sgmodule'),'utf8');
  const declaration=source.match(/^#!arguments=(.*)$/m),defaults=Object.fromEntries(declaration?declaration[1].split(',').map(x=>{const i=x.indexOf(':');return[x.slice(0,i),x.slice(i+1)]}):[]);
  for(const match of source.matchAll(/\{\{\{([A-Za-z0-9_]+)\}\}\}/g))assert.ok(Object.hasOwn(defaults,match[1]),item.id+' undeclared default');
  let section='';for(const line of text.split('\n')){
   if(line.startsWith('['))section=line;
   else if(section==='[Rule]'&&line.trim()&&!line.startsWith('#'))assert.match(line.split(/\s+(?:\/\/|#|;)/)[0].trim(),/,\s*(?:DIRECT|PROXY|REJECT(?:-[A-Z]+)?)(?=\s*(?:,|$))/,item.id+' invalid policy');
  }
 }
});
test('iOS Bilibili has a real policy and explicit JSON parameter values',()=>{
 const text=fs.readFileSync(path.join(root,'modules-ios/Bilibili_remove_ads.sgmodule'),'utf8');
 assert.match(text,/DOMAIN, bsbsb\.top, PROXY/);
 for(const match of text.matchAll(/argument="((?:\\.|[^"\\])*)"/g)){
  const json=JSON.parse('"'+match[1]+'"'),args=JSON.parse(json);
  assert.equal(args.optimizeRequest,'true');assert.equal(args.purifyComment,'true');assert.equal(args.sponsorBlock,'false');
 }
});
test('Website selects iOS modules on iPhone and iPad, Mac modules on Mac',()=>{
 const source=fs.readFileSync(path.join(root,'app.js'),'utf8').split('function installURL')[0];
 for(const [navigator,folder]of [[{userAgent:'iPhone'},'modules-ios'],[{userAgent:'Macintosh',platform:'MacIntel',maxTouchPoints:5},'modules-ios'],[{userAgent:'Macintosh',platform:'MacIntel',maxTouchPoints:0},'modules']]){
  const url=vm.runInNewContext(source+';moduleURL({id:"Bilibili_remove_ads"})',{navigator,URL,location:{href:'https://snowdegit.github.io/surge-module-hub/'}});
  assert.equal(url,'https://snowdegit.github.io/surge-module-hub/'+folder+'/Bilibili_remove_ads.sgmodule');
 }
});
test('Source blockers remain disabled on iOS, including the missing-policy rule',()=>{
 for(const id of ['EasyBike_remove_ads','JiaXiaoDrive_remove_ads','YoudaoDict_remove_ads'])assert.notEqual(catalog.find(x=>x.id===id).status,'converted');
});

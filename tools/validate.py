import json,pathlib,subprocess,concurrent.futures,re,shutil
P=pathlib.Path(__file__).resolve().parents[1]
cat=json.loads((P/'catalog.json').read_text())
def js(f):
 p=subprocess.run([shutil.which('node') or '/opt/sub-store/node','--check',str(f)],capture_output=True,text=True)
 return {'file':str(f.relative_to(P)),'error':p.stderr[-1500:]} if p.returncode else None
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:errors=[e for e in pool.map(js,(P/'scripts').glob('*.js')) if e]
exprs={x for r in cat for x in r.get('jq_tests',[])}
for expr in exprs:
 p=subprocess.run(['jq','-n','if false then ('+expr+') else null end'],capture_output=True,text=True)
 if p.returncode:errors.append({'jq':expr,'error':p.stderr})
for r in cat:
 f=P/'modules'/(r['id']+'.sgmodule')
 s=f.read_text()
 for line in s.splitlines():
  if line.startswith(('http-response-jq ','http-request-jq ')):
   pattern=line.split(' ',2)[1]
   try:re.compile(pattern)
   except re.error as e:errors.append({'module':r['id'],'pattern':pattern,'error':str(e)})
 for u in re.findall(r'https://raw.githubusercontent.com/snowdegit/surge-module-hub/main/([^\s,\"]+)',s):
  if not (P/u.split('?',1)[0]).exists():errors.append({'module':r['id'],'missing_file':u})
report={'modules':len(cat),'scripts':len(list((P/'scripts').glob('*.js'))),'jq_expressions':len(exprs),'errors':errors,'native_surge_validation':False,'device_validation':False}
(P/'validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False,indent=2))
raise SystemExit(1 if errors else 0)

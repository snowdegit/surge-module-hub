"""Emit iOS modules with explicit defaults: parameter tables are Mac-only.

Keep the parameterized Mac modules intact. Never infer runtime policy names;
the default PROXY must exist in the user's main profile.
"""
import json,pathlib,re
P=pathlib.Path(__file__).resolve().parents[1]
out=P/'modules-ios';out.mkdir(exist_ok=True)
results=[];ios_catalog=[]
for item in json.loads((P/'catalog.json').read_text()):
    source=(P/'modules'/(item['id']+'.sgmodule')).read_text()
    decl=re.search(r'^#!arguments=(.*)$',source,re.M)
    defaults=dict(x.split(':',1) for x in decl[1].split(',')) if decl else {}
    resolved=re.sub(r'\{\{\{([A-Za-z0-9_]+)\}\}\}',lambda m:defaults[m[1]],source)
    resolved=re.sub(r'^#!arguments(?:-desc)?=.*\n','',resolved,flags=re.M)
    resolved=re.sub(r'^#!version=.*$','#!version=2026.11.15.3-ios',resolved,flags=re.M)
    resolved=re.sub(r'^(#!name=.*) · Surge$',r'\1 · Surge iOS',resolved,flags=re.M)
    resolved="#!requirement=SYSTEM = 'iOS'\n# iOS build: explicit upstream defaults; no Mac-only argument table.\n"+resolved
    assert '{{{' not in resolved and '#!arguments=' not in resolved,item['id']
    section=None;warnings=[];lines=[]
    for line in resolved.splitlines():
        if line.startswith('['):section=line
        if section=='[Rule]' and line.strip() and not line.lstrip().startswith(('#','[')):
            raw=re.split(r'\s+(?://|#|;)',line,maxsplit=1)[0].rstrip()
            if not re.search(r',\s*(?:PROXY|DIRECT|REJECT(?:-[A-Z]+)?)(?=\s*(?:,|$))',raw):
                warnings.append('Source rule has no explicit supported policy: '+raw)
                line='# Invalid upstream rule not enabled: '+line
        lines.append(line)
    resolved='\n'.join(lines)+'\n'
    (out/(item['id']+'.sgmodule')).write_text(resolved)
    status='needs-attention' if warnings else item['status']
    results.append({'id':item['id'],'status':status,'resolved_defaults':defaults,'unresolved_placeholders':0,'warnings':warnings})
    ios_catalog.append({**item,'status':status,'issues':item['issues']+[{'error':w} for w in warnings],'notes':item['notes']+['iOS版使用上游默认参数，不依赖Mac专属参数表；尚待iOS原生加载和真实流量验证。']})
report={'scope':'Static iOS default materialization and rule-policy audit, not native iOS loading or real app validation','modules':len(results),'unresolved_placeholders':0,'native_ios_load_tested':False,'installable_static':sum(x['status']=='converted' for x in results),'results':results}
(P/'ios-catalog.json').write_text(json.dumps(ios_catalog,ensure_ascii=False,indent=2)+'\n')
(P/'test-results/ios-defaults-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'modules':len(results),'parameterized':sum(bool(x['resolved_defaults']) for x in results),'unresolved_placeholders':0}))

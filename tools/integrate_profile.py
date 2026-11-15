"""Build GitHub-hosted detached sections; integrate a PRIVATE local profile.

Never put the input/output profile in the public repository. Module defaults are
resolved because detached sections do not apply sgmodule parameter metadata.
"""
import argparse, collections, hashlib, json, pathlib, re, shutil

P=pathlib.Path(__file__).resolve().parents[1]
BASE='https://raw.githubusercontent.com/snowdegit/surge-module-hub/main/profiles/'
ap=argparse.ArgumentParser()
ap.add_argument('--input',required=True)
ap.add_argument('--output',required=True)
args=ap.parse_args()
source=pathlib.Path(args.input);dest=pathlib.Path(args.output)
assert not dest.resolve().is_relative_to(P), 'Keep private profiles outside the public repository'
original=source.read_text()
catalog=json.loads((P/'catalog.json').read_text())
byid={x['id']:x for x in catalog}
# Exact order of currently enabled upstream template plugins. Sub-Store already
# exists in the user's profile and is deliberately not loaded twice.
foundation=['Block_HTTPDNS','BlockAdvertisers','QuickSearch','Prevent_DNS_Leaks','Node_detection_tool','BoxJs','Script-Hub']
ads=[x['id'] for x in catalog if x['status']=='converted' and '去广告' in x['tag'] and x['id'] not in foundation]

def parse(text):
    sections=collections.OrderedDict();name=None
    for line in text.splitlines():
        m=re.fullmatch(r'\[([^\]]+)\]',line.strip())
        if m:name=m[1];sections.setdefault(name,[])
        elif name:sections[name].append(line)
    return sections

private=parse(original)
assert 'Sub-Store Core' in original, 'Existing Sub-Store integration required for this preset'
assert all(x in private for x in ['General','Proxy','Proxy Group','Rule','MITM','Script'])
defaults={};parsed={}
for name in foundation+ads:
    assert byid[name]['status']=='converted'
    text=(P/'modules'/(name+'.sgmodule')).read_text()
    decl=re.search(r'^#!arguments=(.*)$',text,re.M)
    values=dict(p.split(':',1) for p in decl[1].split(',')) if decl else {}
    defaults[name]=values
    text=re.sub(r'\{\{\{([A-Za-z0-9_]+)\}\}\}',lambda m:values[m[1]],text)
    assert '{{{' not in text, name
    parsed[name]=parse(text)

remote=P/'profiles';remote.mkdir(exist_ok=True)
ordered=['URL Rewrite','Header Rewrite','Body Rewrite','Map Local','Script','Host','Panel']
bundles={}
for label,names in [('klee-foundation-v2',foundation),('klee-ads-v2',ads)]:
    out=['# Generated detached sections, not an independently enabled sgmodule.',
         '# Priority follows the source template; module arguments use upstream defaults.',
         '# Rebuild with tools/integrate_profile.py; do not add credentials here.','']
    present=[]
    for section in ordered:
        entries=[]
        for name in names:
            active=[l for l in parsed[name].get(section,[]) if l.strip() and not l.lstrip().startswith('#')]
            if not active:continue
            entries.extend(['# '+byid[name]['name']+' ('+name+')',
                            '# Module: https://snowdegit.github.io/surge-module-hub/modules/'+name+'.sgmodule',
                            *parsed[name][section],''])
        if entries:out.extend(['['+section+']',*entries]);present.append(section)
    # This fallback belongs ONLY to standalone managed-profile validation.
    # The main profile must never include the Rule section of these files.
    out.extend(['[Rule]','FINAL,DIRECT',''])
    (remote/(label+'.dconf')).write_text('\n'.join(out)+'\n')
    bundles[label]=present

# Split only CONTIGUOUS runs of equal policy. Moving DIRECT exceptions across
# rejects would change first-match behavior, even if the rule count stayed equal.
rule_dir=remote/'rules-v2';rule_dir.mkdir(exist_ok=True)
rule_includes=[];original_module_rules=[];roundtrip_rules=[];invalid_rules=[]
for label,names in [('foundation',foundation),('ads',ads)]:
    runs=[]
    for name in names:
        for line in parsed[name].get('Rule',[]):
            if not line.strip() or line.lstrip().startswith('#'):continue
            line=re.split(r'\s+(?://|#|;)',line,maxsplit=1)[0].rstrip()
            matches=list(re.finditer(r',\s*(DIRECT|PROXY|REJECT(?:-[A-Z]+)?)(?=\s*(?:,|$))',line))
            if len(matches)!=1:
                invalid_rules.append({'module':name,'line':line,'reason':'Source rule has no explicit policy; not enabled or guessed'})
                continue
            m=matches[0];policy=m[1];stripped=line[:m.start()]+line[m.end():]
            if not runs or runs[-1]['policy']!=policy:runs.append({'policy':policy,'lines':[]})
            runs[-1]['lines'].append(stripped)
            original_module_rules.append(re.sub(r'\s+','',line))
    for i,run in enumerate(runs):
        path='rules-v2/'+label+'-'+str(i+1).zfill(3)+'.list'
        (remote/path).write_text('# Ordered contiguous policy run; do not merge across other runs.\n'+'\n'.join(run['lines'])+'\n')
        rule_includes.append('RULE-SET,'+BASE+path+','+run['policy']+',update-interval=3600')
        for line in run['lines']:
            pos=line.rfind(',') if re.search(r',\s*no-resolve\s*$',line) else len(line)
            restored=line[:pos]+', '+run['policy']+line[pos:]
            roundtrip_rules.append(re.sub(r'\s+','',restored))
assert roundtrip_rules==original_module_rules, 'Rule policy/order/options round-trip failed'

# Scalar sections need one final value, rather than duplicate hostname keys or
# module-only %APPEND% operators inside a normal profile.
hostnames=[]
for name in foundation+ads:
    for line in parsed[name].get('MITM',[]):
        if line.startswith('hostname = '):
            value=line.split('=',1)[1].replace('%APPEND%','').replace('%INSERT%','')
            for host in value.split(','):
                host=host.strip()
                if host and host not in hostnames:hostnames.append(host)
# Public helper domains of the existing Google rewrite and Sub-Store integration.
for host in ['www.google.cn:443','sub.store']:
    if host not in hostnames:hostnames.append(host)
existing=next(l.split('=',1)[1] for l in private['MITM'] if l.strip().startswith('hostname ='))
assert all(h.strip() in hostnames for h in existing.split(',')), 'Private MITM domains require a private overlay; do not publish them'
(remote/'klee-mitm-v2.dconf').write_text('# Public module MITM hostnames only; no certificates or secrets.\n[MITM]\nhostname = '+', '.join(hostnames)+'\n\n[Rule]\nFINAL,DIRECT\n')

result=original
result=result.replace('[Rule]\n','[Rule]\n# 可莉基础依赖优先；按原策略连续分组，保留例外规则顺序。\n'+'\n'.join(rule_includes)+'\n',1)
for section in ordered:
    includes=[]
    for label in bundles:
        if section in bundles[label]:includes.append('#!include '+BASE+label+'.dconf')
    if not includes:continue
    block='# 可莉基础插件优先，然后应用插件；资源从 GitHub 加载。\n'+'\n'.join(includes)+'\n'
    marker='['+section+']\n'
    if marker in result:result=result.replace(marker,marker+block,1)
    else:result+='\n'+marker+block
result=re.sub(r'(?m)^hostname\s*=.*$', '#!include '+BASE+'klee-mitm-v2.dconf',result)

for name in foundation+ads:
    for line in parsed[name].get('General',[]):
        if not line.strip() or line.lstrip().startswith('#'):continue
        key,value=map(str.strip,line.split('=',1))
        assert value.startswith('%APPEND%'), 'Unreviewed global override'
        addition=value.removeprefix('%APPEND%').strip()
        pattern=r'(?m)^'+re.escape(key)+r'\s*=.*$'
        old=re.search(pattern,result)
        if old:result=result[:old.end()]+', '+addition+result[old.end():]
        else:result=result.replace('[General]\n','[General]\n'+key+' = '+addition+'\n',1)

dest.parent.mkdir(parents=True,exist_ok=True)
backup=dest.parent/'Surge.original.conf'
if not backup.exists():shutil.copyfile(source,backup)
dest.write_text(result);dest.chmod(0o600);backup.chmod(0o600)
manifest={'source_template':'https://raw.githubusercontent.com/luestr/ProxyResource/main/Tool/Loon/Lcf/zh-CN/Loon_Auto_Select_Config_By_iKeLee.lcf','foundation_order':foundation,'existing_foundation':['Sub-Store (inline in private profile; not duplicated)'],'upstream_disabled':['TestFlightRegionUnlock'],'application_order':ads,'module_count':len(foundation+ads),'excluded_blocked':[x['id'] for x in catalog if x['status']!='converted'],'argument_defaults':defaults,'bundles':bundles,'hostname_count':len(hostnames),'real_app_tested':False,'native_profile_load_tested':False}
manifest.update(rule_set_runs=len(rule_includes),ordered_rule_roundtrip_passed=True,excluded_invalid_rules=invalid_rules,format_version=2)
(remote/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')

# Check the virtual assembled profile without loading/changing the live Mac.
def expanded(text):
    out=[]
    for section,lines in parse(text).items():
        out.append('['+section+']')
        for line in lines:
            if line.startswith('#!include '+BASE):
                assert section!='Rule', 'Do not import a standalone fallback into the main rule list'
                file=line.split(BASE,1)[1];out.extend(parse((remote/file).read_text()).get(section,[]))
            else:out.append(line)
    return '\n'.join(out)
assembled=parse(expanded(result))
for section in ['Proxy','Proxy Group','Host','Panel']+[k for k in private if k.startswith(('Tailscale ','WireGuard '))]:
    assert [l for l in assembled[section] if l.strip()]==[l for l in private[section] if l.strip()], 'Unintended change: '+section
for key in ['ca-p12','ca-passphrase','skip-server-cert-verify','tcp-connection','h2']:
    assert [l for l in assembled['MITM'] if l.startswith(key+' =')]==[l for l in private['MITM'] if l.startswith(key+' =')],key
assert '{{{' not in expanded(result) and '%APPEND%' not in expanded(result)
rule=assembled['Rule'];finals=[i for i,l in enumerate(rule) if l.startswith('FINAL,')]
assert len(finals)==1 and not any(l.strip() and not l.lstrip().startswith('#') for l in rule[finals[0]+1:]), 'FINAL must be last'
for file in [remote/'klee-foundation-v2.dconf',remote/'klee-ads-v2.dconf',remote/'klee-mitm-v2.dconf']:
    assert [l for l in parse(file.read_text())['Rule'] if l.strip()]==['FINAL,DIRECT']
for line in rule_includes:
    url=line.split(',')[1];text=(remote/url.split(BASE,1)[1]).read_text()
    assert not re.search(r'(?m)^FINAL\b',text), 'External rule sets must never include FINAL'
names=[]
for line in assembled['Script']:
    if line.strip() and not line.lstrip().startswith('#'):
        name=line.split('=',1)[0].strip();assert name not in names,'Duplicate script: '+name;names.append(name)
assert not any('type=cron' in l for l in assembled['Script'] if not l.lstrip().startswith('#'))
report={'module_count':len(foundation+ads),'github_section_includes':result.count('#!include '+BASE),'rule_set_runs':len(rule_includes),'ordered_rules_preserved':len(original_module_rules),'excluded_invalid_rules':invalid_rules,'script_entries':len(names),'hostname_count':len(hostnames),'original_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'output_sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'preserved':['Proxy','Proxy Group','Host','Tailscale','Panel','MITM certificate and other original switches'],'static_validation_passed':True,'native_profile_load_tested':False,'live_profile_modified':False}
(dest.parent/'integration-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False))

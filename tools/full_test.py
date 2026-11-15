"""Independent source/output inventory and fixture comparison, not a native Surge/Loon runtime."""
import base64,collections,copy,hashlib,json,pathlib,random,re,shlex,subprocess,time,sys
from re import _parser as rp,_constants as rc
P=pathlib.Path(__file__).resolve().parents[1]
REPORT=P/'test-results';REPORT.mkdir(exist_ok=True)
CAT=json.loads((P/'catalog.json').read_text());ASSETS=json.loads((P/'upstream/assets.json').read_text())
checks=[];dispatch=[];inventory=[];jqcache={};rng=random.Random(20261115)
SCHEMAS=json.loads((P/'tests/fixtures/jq-schema.json').read_text())
def record(plugin,category,label,ok,**extra):checks.append(dict(plugin=plugin,category=category,label=label,passed=bool(ok),**extra))
def split_args(s):
 # Test parser is deliberately independent from the converter.
 start=0;depth=0;quote=None;escape=False;regex=False;out=[]
 for i,c in enumerate(s):
  if escape:escape=False;continue
  if c=='\\':escape=True;continue
  if quote:
   if c==quote:quote=None
  elif regex:
   if c=='/':regex=False
  elif c in '\"\'':quote=c
  elif c=='/' and (not s[:i].strip() or s[:i].rstrip().endswith(('(',',','['))):regex=True
  elif c in '([{':depth+=1
  elif c in ')]}':depth-=1
  elif c==',' and depth==0:out.append(s[start:i].strip());start=i+1
 out.append(s[start:].strip());return out

def load_sections(text):
 result=collections.defaultdict(list);section=''
 for no,line in enumerate(text.splitlines(),1):
  line=line.strip()
  if line.startswith('#!REQUIREMENT '):line=line.split(' ',2)[2]
  if line.startswith('[') and line.endswith(']'):section=line[1:-1].lower()
  elif line and not line.startswith('#'):result[section].append((no,line))
 return result

def regparse(condition):
 direction,_,rest=condition.partition(' if ')
 m=re.match(r'\$\{url\}\s*~=\s*/(.*)/([ims]*)(?: as (\w+))?$',rest)
 if not m:raise ValueError(condition)
 return direction,m[1].replace(r'\/','/'),m[2]

def make_sample(tokens):
 out=''
 for kind,v in tokens:
  if kind==rc.LITERAL:out+=chr(v)
  elif kind==rc.NOT_LITERAL:out+=next(c for c in 'abc019_/' if ord(c)!=v)
  elif kind==rc.ANY:out+=rng.choice('abc019_/')
  elif kind==rc.IN:
   neg=v and v[0][0]==rc.NEGATE;candidates=[]
   for k,x in v:
    if k==rc.LITERAL:candidates.append(chr(x))
    elif k==rc.RANGE:candidates.append(chr(rng.randint(x[0],min(x[1],x[0]+20))))
    elif k==rc.CATEGORY:candidates.append('0' if x==rc.CATEGORY_DIGIT else 'a')
   out+=rng.choice([c for c in 'abc019_/' if c not in candidates] or ['z']) if neg else rng.choice(candidates or ['a'])
  elif kind in (rc.MAX_REPEAT,rc.MIN_REPEAT,rc.POSSESSIVE_REPEAT):
   lo,hi,sub=v;n=lo if rng.random()<.5 else min(lo+2,hi);out+=''.join(make_sample(sub) for _ in range(n))
  elif kind==rc.SUBPATTERN:out+=make_sample(v[-1])
  elif kind==rc.BRANCH:out+=make_sample(rng.choice(v[1]))
  elif kind==rc.CATEGORY:out+='0' if v==rc.CATEGORY_DIGIT else 'a'
  elif kind in (rc.AT,rc.ASSERT,rc.ASSERT_NOT):pass
  else:raise ValueError('witness token '+str(kind))
 return out

def witness(pattern,flags):
 pyflags=re.I if 'i' in flags else 0
 if 'm' in flags:pyflags|=re.M
 if 's' in flags:pyflags|=re.S
 parsed=rp.parse(pattern,pyflags)
 for _ in range(120):
  s=make_sample(parsed)
  if re.search(pattern,s,pyflags):return s
 raise ValueError('no matching synthetic witness')

def jq_run(expr,data):
 key=(expr,json.dumps(data,ensure_ascii=False))
 if key not in jqcache:
  result=subprocess.run(['jq','-c',expr],input=key[1],capture_output=True,text=True,timeout=5)
  jqcache[key]={'ok':result.returncode==0,'values':[json.loads(s) for s in result.stdout.splitlines()] if result.returncode==0 else []}
 return jqcache[key]

def path_parts(path):
 path=path.removeprefix('$.');parts=[];pos=0
 while pos<len(path):
  if path[pos]=='.':pos+=1;continue
  if path[pos]=='[':
   end=path.find(']',pos)
   token=path[pos+1:end]
   parts.append(json.loads(token) if token.startswith('"') else int(token) if token.isdigit() else '*');pos=end+1
  else:
   m=re.match(r'[^.\[]+',path[pos:]);parts.append(m[0]);pos+=len(m[0])
 return parts

def assign(obj,parts,value,delete=False):
 if not parts:return
 key=parts[0]
 if key=='*':
  if isinstance(obj,list):
   if not obj and not delete:obj.append({})
   for x in obj:assign(x,parts[1:],value,delete)
  return
 if len(parts)==1:
  if isinstance(obj,dict):
   if delete:obj.pop(key,None)
   else:obj[key]=copy.deepcopy(value)
  elif isinstance(obj,list) and isinstance(key,int):
   if 0<=key<len(obj):
    if delete:obj.pop(key)
    else:obj[key]=copy.deepcopy(value)
  return
 if isinstance(obj,dict):
  if key not in obj:
   if delete:return
   obj[key]=[] if isinstance(parts[1],int) or parts[1]=='*' else {}
  if not delete:
   expected_list=isinstance(parts[1],int) or parts[1]=='*'
   if expected_list and not isinstance(obj[key],list):obj[key]=[]
   elif not expected_list and not isinstance(obj[key],dict):obj[key]={}
  assign(obj[key],parts[1:],value,delete)
 elif isinstance(obj,list) and isinstance(key,int):
  while len(obj)<=key:obj.append({})
  assign(obj[key],parts[1:],value,delete)

def inferred_fixtures(expr):
 paths=set(re.findall(r'(?<![\w$])\.([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)',expr))
 schema={'sentinel':'保留🙂'}
 for path in sorted(paths,key=lambda s:s.count('.')):
  assign(schema,path.split('.'),[])
 # Root/container types are selected from the source expression only.
 yield schema
 for root in ['data','info','result','Data','response','content']:
  sample=copy.deepcopy(schema);sample[root]=[];yield sample
 yield []
 yield {'data':[{'list':[],'items':[],'children':[],'modules':[]}]}
 # Relative filters nested under containers need the same object skeleton there.
 for root in ['data','info','result','Data','response']:
  sample=copy.deepcopy(schema);sample[root]=copy.deepcopy(schema);yield sample
def native_jq(line):
 m=re.match(r'http-(request|response)-jq\s+(\S+)\s+(.*)',line)
 if not m:raise ValueError(line)
 q=m[3];expr=q[1:-1] if q.startswith("'") else json.loads(q)
 return m[1],m[2],expr

def canonical_rule(line):
 return re.sub(r'\s+','',line).replace('{{{proxy_policy}}}','PROXY')

started=time.time()
for index,item in enumerate(CAT):
 ident=item['id'];src=load_sections((P/'upstream'/item['file']).read_text());dst=load_sections((P/'modules'/(ident+'.sgmodule')).read_text());defaults={}
 for no,line in src['argument']:
  key,rest=line.split('=',1);val=split_args(rest)[1]
  try:defaults[key.strip()]=json.loads(val)
  except ValueError:defaults[key.strip()]=val.strip('"')
  if split_args(rest)[0].strip()=='switch':defaults[key.strip()]=str(defaults[key.strip()]).lower()=='true'
 record(ident,'inventory','catalog/module/source correspondence',True)
 # A routing rule is preserved structurally, including nested logical expressions and policy substitutions.
 nr=iter(dst['rule']);url_legacy=iter(dst['url rewrite'])
 for no,line in src['rule']:
  if line.startswith('^'):
   parts=line.split();expected=' '.join([parts[0],parts[2],parts[1]]);actual=next(url_legacy,(0,''))[1]
  else:
   expected=('DOMAIN, '+line) if line.startswith('ad-sdk-config.youdao.com') else line;actual=next(nr,(0,''))[1]
  record(ident,'routing',f'source line {no}',canonical_rule(expected)==canonical_rule(actual))
 record(ident,'inventory','no surplus routing rules',next(nr,None) is None)
 native_maps=iter(dst['map local']);native_bodies=iter(dst['body rewrite']);native_headers=iter(dst['header rewrite'])
 for no,line in src['rewrite']:
  cond,action=line.split(' then ',1);direction,pat,flags=regparse(cond)
  m=re.match(r'([\w.]+)\((.*)\)$',action);name,raw=m.groups();args=[json.loads(a) if a.startswith(('"','[','{')) or a in ['true','false','null'] or re.fullmatch(r'-?\d+',a) else a for a in split_args(raw)]
  try:
   sample=witness(pat,flags);record(ident,'url_match',f'line {no}: matching witness',True,witness=sample)
  except Exception as e:sample=None;record(ident,'url_match',f'line {no}: matching witness',False,error=str(e))
  if name.startswith('reject') or name.startswith('response.body.mock'):
   actual=next(native_maps,(0,''))[1];first,rest=actual.split(' ',1);tokens=[first];props={}
   for prop in re.finditer(r'(\w[\w-]*)=("(?:[^"\\]|\\.)*"|\S+)',rest):
    props[prop[1]]=json.loads(prop[2]) if prop[2].startswith('"') else prop[2]
   record(ident,'map_local',f'line {no}: matcher',tokens[0]==(('(?i)' if 'i' in flags else '')+pat))
   status=args[0] if name.startswith('reject') and args else args[2] if len(args)>2 else 200
   record(ident,'map_local',f'line {no}: status',int(props.get('status-code','200'))==status)
   if name=='reject':expected=b''
   elif name=='reject_dict':expected=b'{}'
   elif name=='reject_img':expected=None
   elif name.endswith('mock_file'):expected=(P/'upstream/assets'/ASSETS[args[1]]['file']).read_bytes()
   else:expected=base64.b64decode(args[1]) if len(args)>3 and args[3] else args[1].encode()
   if props.get('data-type')=='base64':actual_body=base64.b64decode(props['data'])
   elif props.get('data-type')=='file':actual_body=(P/'data'/props['data'].rsplit('/',1)[1]).read_bytes()
   else:actual_body=props.get('data','').encode()
   record(ident,'map_local',f'line {no}: response payload',actual_body==expected if expected is not None else actual_body[:6] in [b'GIF89a',b'GIF87a'])
  elif '.json.' in name:
   if pat=='http-response':
    record(ident,'blocked',f'line {no}: malformed upstream declaration',False,reason='Upstream uses http-response as URL and a URL as JSON path');continue
   _,actual_pattern,expr=native_jq(next(native_bodies,(0,''))[1]);record(ident,'json_rewrite',f'line {no}: matcher',actual_pattern==(('(?i)' if 'i' in flags else '')+pat))
   fixture={'sentinel':'保留🙂','data':{'sentinel':9},'result':{}}
   if name.endswith(('.delete','.replace')):
    paths=args[0] if isinstance(args[0],list) else [args[0]]
    # Seed all declared paths so the test exercises actual modification, rather than missing-key no-ops.
    for path in paths:assign(fixture,path_parts(path),'old-value')
    for variant in ['present','missing','unrelated']:
     data=copy.deepcopy(fixture if variant=='present' else {'sentinel':'保留🙂'} if variant=='missing' else {'data':{},'keep':{'nested':[1,2,3]}});expected=copy.deepcopy(data)
     for i,path in enumerate(paths):assign(expected,path_parts(path),args[1][i] if isinstance(args[0],list) and name.endswith('.replace') else args[1] if name.endswith('.replace') else None,name.endswith('.delete'))
     actual=jq_run(expr,data);record(ident,'json_behavior',f'line {no}: {variant}',actual['ok'] and actual['values']==[expected],actual=actual if not actual['ok'] or actual['values']!=[expected] else None)
   else:
    original=(P/'upstream/assets'/ASSETS[args[0]]['file']).read_text() if name.endswith('.jq_file') else args[0]
    if not original.strip():original='.'
    if 'else .end;' in original:original=original.replace('else .end;','else . end;')
    fixtures=[fixture,{}, {'data':{'items':[{'ad_info':{'id':1}},{'card_goto':'av','card_type':'small_cover_v2'}],'modules':[]},'keep':True}, {'data':None}, {'data':{'value':'中文🙂','list':[]}}, {'data':{'component':[]},'result':{'list':[]}}]
    schema=SCHEMAS.get(ident+':'+str(no))
    if schema is not None:fixtures.append(schema)
    positive=False
    for i,data in enumerate(fixtures):
     before=jq_run(original,data);after=jq_run(expr,data);positive=positive or before['ok']
     record(ident,'jq_equivalence',f'line {no}: fixture {i}',before==after,valid_schema_fixture=before['ok'])
    if not positive:
     for i,data in enumerate(inferred_fixtures(original)):
      before=jq_run(original,data)
      if before['ok']:
       after=jq_run(expr,data);positive=True
       record(ident,'jq_equivalence',f'line {no}: inferred structure {i}',before==after,valid_schema_fixture=True)
       break
    record(ident,'jq_positive_fixture',f'line {no}: at least one schema executes successfully',positive)
  elif name=='response.header.add':
   actual=next(native_headers,(0,''))[1];tokens=shlex.split(actual);record(ident,'headers',f'line {no}: header add',tokens[-2:]==args)
  else:
   dispatch.append(dict(plugin=ident,line=no,kind=direction,pattern=pat,flags=flags,witness=sample,source=line,action=name,args=defaults))
 # Check every HTTP/cron/generic declaration, parameters, source assets and matcher dispatch.
 script_index=0;task_index=0
 for no,line in src['script']:
  left,right=line.split(' then ',1);url=re.search(r'^script\("([^"]+)"',right)[1]
  if url in ASSETS and 'error' in ASSETS[url] and not url.endswith('/CommonScript/replace-body.js'):
   record(ident,'blocked',f'line {no}: unavailable upstream script',False,url=url);continue
  opt=right.split(' with ',1)[1];options=dict(t.split('=',1) for t in split_args(opt));options={k.strip():v.strip() for k,v in options.items()}
  m=re.search(r', (\{.*\}|".*")\) with ',right);arguments=m[1] if m else '';keys=re.findall(r'\$\{([^}]+)\}',arguments)
  if ' if ' in left:
   direction,pat,flags=regparse(left)
   try:sample=witness(pat,flags)
   except Exception as e:sample=None;record(ident,'url_match',f'script line {no}: witness',False,error=str(e))
   dispatch.append(dict(plugin=ident,line=no,kind=direction,pattern=pat,flags=flags,witness=sample,source=line,action='script',args=defaults,argkeys=keys,options=options,index=script_index))
  else:
   task='cron' if left.startswith('cron ') else 'generic';task_index+=1
   dispatch.append(dict(plugin=ident,line=no,kind=task,task_index=task_index,source=line,action='script',args=defaults,argkeys=keys,options=options,index=script_index))
   record(ident,'task_inventory',f'line {no}: {task} entry',any(('type='+task) in text for _,text in dst['script']) or ('# 默认关闭' in (P/'modules'/(ident+'.sgmodule')).read_text()))
  script_index+=1
 # Make every exposed argument traceable back to a declared default.
 module=(P/'modules'/(ident+'.sgmodule')).read_text();decl=re.search(r'^#!arguments=(.*)$',module,re.M)
 if defaults:
  actual={e.split(':',1)[0] for e in decl[1].split(',')} if decl else set()
  for key in defaults:record(ident,'parameters',key,re.sub('[^A-Za-z0-9_]','_',key) in actual)
 inventory.append(dict(plugin=ident,upstream_entries=item['source_entries'],converted_entries=item['converted_entries']))
 if index%40==0:print('checked',index+1,'/',len(CAT),flush=True)
(REPORT/'dispatch-cases.json').write_text(json.dumps(dispatch,ensure_ascii=False))
summary={'test_scope':'independent source/output structural and synthetic fixture comparison; not native Surge/Loon execution','plugins':len(CAT),'checks':len(checks),'passed':sum(c['passed'] for c in checks),'failed':sum(not c['passed'] for c in checks),'by_category':{k:{'checks':sum(c['category']==k for c in checks),'failed':sum(c['category']==k and not c['passed'] for c in checks)} for k in sorted({c['category'] for c in checks})},'elapsed_seconds':round(time.time()-started,1),'native_surge_tested':False,'real_app_tested':False}
(REPORT/'full-report.json').write_text(json.dumps({'summary':summary,'checks':checks,'inventory':inventory},ensure_ascii=False,indent=2))
print(json.dumps(summary,ensure_ascii=False,indent=2))
for e in [c for c in checks if not c['passed']][:25]:print(json.dumps(e,ensure_ascii=False)[:600])
allow_blocked='--allow-blocked' in sys.argv
raise SystemExit(1 if any(not c['passed'] and not (allow_blocked and c['category']=='blocked') for c in checks) else 0)

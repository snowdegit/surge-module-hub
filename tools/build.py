import json,re,pathlib,hashlib,subprocess,urllib.request,concurrent.futures
P=pathlib.Path(__file__).resolve().parents[1];UP=P/'upstream';BASE='https://raw.githubusercontent.com/snowdegit/surge-module-hub/main'
for d in ['modules','scripts','data','tests']: (P/d).mkdir(exist_ok=True)
assets=json.loads((UP/'assets.json').read_text());manifest=json.loads((UP/'manifest.json').read_text())
UA='Loon/3.0.9 CFNetwork/3860.500.111.2.2 Darwin/25.5.0'
def asset(url):
 v=assets.get(url)
 if v is None:
  name=hashlib.sha256(url.encode()).hexdigest()[:12]+'-'+url.rsplit('/',1)[1]
  try:
   data=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':UA}),timeout=30).read();(UP/'assets'/name).write_bytes(data);v={'file':name}
  except Exception as e:v={'error':str(e)}
  assets[url]=v
 if 'error' in v:raise ValueError('上游依赖不可用：'+url+' '+v['error'])
 return (UP/'assets'/v['file']).read_text()
def fields(s):
 out=[];start=0;depth=0;quote=None;regex=False;esc=False
 for i,ch in enumerate(s):
  if esc:esc=False;continue
  if ch=='\\':esc=True;continue
  if quote:
   if ch==quote:quote=None
  elif regex:
   if ch=='/':regex=False
  elif ch in ['"',"'"]:quote=ch
  elif ch=='/' and (i==0 or s[:i].rstrip().endswith(('(',',','['))):regex=True
  elif ch in '([{':depth+=1
  elif ch in ')]}':depth-=1
  elif ch==',' and depth==0:out.append(s[start:i].strip());start=i+1
 out.append(s[start:].strip());return out
def value(s):
 try:return json.loads(s)
 except ValueError:return s.strip('"\'')
def call(s):
 m=re.match(r'([\w.]+)\((.*)\)$',s);assert m,s
 return m[1],fields(m[2])
def parse_regex(s):
 m=re.fullmatch(r'/(.*)/([a-z]*)',s);assert m,s
 return m[1].replace(r'\/', '/'),m[2]
def pattern(s):
 m=re.fullmatch(r'(request|response) if \$\{url\} ~= (/(?:.*)/[a-z]*)(?: as (\w+))?',s)
 if not m:raise ValueError('无法解析条件：'+s)
 pat,flags=parse_regex(m[2]);return m[1],pat,flags,m[3]
def jq_minify(source):
 out=[];quote=False;escape=False;comment=False
 for ch in source:
  if comment:
   if ch=='\n':comment=False;out.append(' ')
  elif escape:out.append(ch);escape=False
  elif ch=='\\' and quote:out.append(ch);escape=True
  elif ch=='"':out.append(ch);quote=not quote
  elif ch=='#' and not quote:comment=True
  elif ch in '\r\n\t':out.append(' ')
  else:out.append(ch)
 return ''.join(out)
def jq_path(path):
 path=path.removeprefix('$.');result='';i=0
 while i<len(path):
  if path[i]=='.':i+=1;continue
  if path[i]=='[':
   # Existing bracket notation (including quoted keys and array indexes).
   j=i+1;quote=False;escape=False
   while j<len(path):
    ch=path[j]
    if escape:escape=False
    elif ch=='\\':escape=True
    elif ch=='"':quote=not quote
    elif ch==']' and not quote:break
    j+=1
   token=path[i:j+1].replace('[*]','[]');result+=token;i=j+1
  else:
   j=i
   while j<len(path) and path[j] not in '.[':j+=1
   token=path[i:j]
   result+='.'+token if re.fullmatch(r'[A-Za-z_][A-Za-z0-9_]*',token) else '['+json.dumps(token)+']'
   i=j
 return ('.'+result if result.startswith('[') else result) or '.'
def native_pattern(p,f):return ('(?i)' if 'i' in f else '')+p

def build(item):
 text=(UP/item['file']).read_text();sections={};section='';meta={};issues=[];notes=[];args={}
 for line in text.splitlines():
  line=line.strip()
  if line.startswith('#!'):
   k,_,v=line[2:].partition('=');meta[k]=v
  elif re.fullmatch(r'\[[\w ]+\]',line):section=line.strip('[]').lower();sections[section]=[]
  elif line and not line.startswith('#'):sections.setdefault(section,[]).append(line)
 for line in sections.get('argument',[]):
  key,rest=line.split('=',1);parts=fields(rest);default=value(parts[1])
  if parts[0].strip()=='switch':default=str(default).lower()=='true'
  args[key.strip()]=default
 def substitute(s):
  return re.sub(r'\$\{([^}]+)\}',lambda m:json.dumps(args[m[1]],ensure_ascii=False) if m[1] in args else m[0],s)
 out={k:[] for k in ['General','Rule','URL Rewrite','Header Rewrite','Body Rewrite','Map Local','Script','MITM']};jqtests=[];dispatch={'request':[],'response':[]};orig=[];script_count=0;source_count=0;converted=0
 for line in sections.get('general',[]):out['General'].append(line.replace('real-ip=','always-real-ip = %APPEND% '))
 for line in sections.get('rule',[]):
  source_count+=1
  if line.startswith('ad-sdk-config.youdao.com'):line='DOMAIN, '+line
  if line.startswith('^'):
   # An upstream legacy URL rewrite misplaced in [Rule].
   f=line.split();out['URL Rewrite'].append(f[0]+' '+f[2]+' '+f[1]);notes.append('修复源文件中位于Rule节的URL重写')
  else:
   line=re.sub(r'\bPROXY\b','{{{proxy_policy}}}',line);out['Rule'].append(line)
  converted+=1
 for line in sections.get('rewrite',[]):
  source_count+=1
  try:
   cond,action=line.split(' then ',1);direction,pat,flags,alias=pattern(cond);np=native_pattern(pat,flags)
   name,rawargs=call(action);vals=[value(a) if a.lstrip().startswith('"') else value(substitute(a)) for a in rawargs]
   if name.endswith('.json.jq') or name.endswith('.json.jq_file') or name.endswith('.json.delete') or name.endswith('.json.replace'):
    if name.endswith('.jq'):expr=vals[0]
    elif name.endswith('.jq_file'):expr=jq_minify(asset(vals[0]))
    elif name.endswith('.delete'):
     paths=vals[0] if isinstance(vals[0],list) else [vals[0]];expr=' | '.join('(. as $__original | try del('+jq_path(p)+') catch $__original)' for p in paths)
    else:
     paths=vals[0] if isinstance(vals[0],list) else [vals[0]]
     replacements=vals[1] if isinstance(vals[0],list) else [vals[1]]
     if len(paths)!=len(replacements):raise ValueError('JSON batch argument length mismatch')
     expr=' | '.join(jq_path(path)+' = '+json.dumps(replacement,ensure_ascii=False) for path,replacement in zip(paths,replacements))
    if not expr.strip():expr='.';notes.append('上游空jq保留为无操作')
    if 'else .end;' in expr:expr=expr.replace('else .end;','else . end;');notes.append('修复上游jq的.end语法错误')
    if pat=='http-response':raise ValueError('上游条件与JSON路径疑似错误，不能推断原意')
    # Surge accepts quoted JQ; escape a single quote if present with a double-quoted field.
    quote="'"+expr+"'" if "'" not in expr else json.dumps(expr,ensure_ascii=False)
    out['Body Rewrite'].append(f'http-{direction}-jq {np} {quote}');jqtests.append(expr)
   elif name in ['reject','reject_dict','reject_img','response.body.mock','response.body.mock_file']:
    status=vals[0] if name.startswith('reject') and vals else 200;binary=False
    if name=='reject':payload='';headers='Content-Type:text/plain'
    elif name=='reject_dict':payload='{}';headers='Content-Type:application/json'
    elif name=='reject_img':payload='R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';binary=True;headers='Content-Type:image/gif'
    else:
     payload=asset(vals[1]) if name.endswith('mock_file') else vals[1];status=vals[2] if len(vals)>2 else 200;binary=bool(vals[3]) if len(vals)>3 else False
     headers='Content-Type:application/grpc|grpc-status:0' if binary else 'Content-Type:'+('application/json' if payload.lstrip().startswith(('{','[')) else 'text/plain; charset=utf-8')
    if len(payload)>3000:
     filename=hashlib.sha256(payload.encode()).hexdigest()[:16]+'.txt';(P/'data'/filename).write_text(payload);out['Map Local'].append(f'{np} data-type=file data="{BASE}/data/{filename}" status-code={status} header="{headers}"')
    else:out['Map Local'].append(f'{np} data-type={"base64" if binary else "text"} data={json.dumps(payload,ensure_ascii=False)} status-code={status} header="{headers}"')
   elif name=='response.header.add':out['Header Rewrite'].append(f'http-response {np} header-add {vals[0]} {vals[1]}')
   else:
    # Preserve JS replacement semantics and capture/argument interpolation in a single dispatcher.
    code=''
    if name in ['redirect','url.replace']:
     target=vals[1] if name=='redirect' else vals[0]
     pieces=[];last=0
     for variable in re.finditer(r'\$\{([\w.]+)\}',target):
      pieces.append(json.dumps(target[last:variable.start()],ensure_ascii=False));key=variable[1]
      if key in args:pieces.append('String(__settings['+json.dumps(key)+'] ?? '+json.dumps(args[key],ensure_ascii=False)+')')
      elif alias and key.startswith(alias+'.'):pieces.append('(match['+key.split('.')[-1]+'] || "")')
      else:raise ValueError('未知插值 '+key)
      last=variable.end()
     pieces.append(json.dumps(target[last:],ensure_ascii=False));replacement=' + '.join(pieces)
     expr='__url.slice(0,match.index) + ('+replacement+') + __url.slice(match.index+match[0].length)'
     code='return __finish({response:{status:'+str(vals[0])+',headers:{Location:'+expr+'},body:""}});' if name=='redirect' else 'const url='+expr+';const headers={...$request.headers};const hostKey=Object.keys(headers).find(k=>k.toLowerCase()==="host")||"Host";headers[hostKey]=new URL(url).host;return __finish({url,headers});'
    elif name.endswith('body.replace'):
     regex,fl=parse_regex(rawargs[0]);replacement=value(rawargs[1]);obj='$request' if direction=='request' else '$response'
     code='return __finish({body:String('+obj+'.body || "").replace(new RegExp('+json.dumps(regex)+','+json.dumps(fl)+'),'+json.dumps(replacement,ensure_ascii=False)+')});'
    elif name=='request.header.replace':
     regex,fl=parse_regex(rawargs[1]);code='const h={...$request.headers};for(const k of Object.keys(h)){if(k.toLowerCase()==='+json.dumps(vals[0].lower())+')h[k]=String(h[k]).replace(new RegExp('+json.dumps(regex)+','+json.dumps(fl)+'),'+json.dumps(vals[2])+');}return __finish({headers:h});'
    else:raise ValueError('不支持的操作 '+name)
    dispatch[direction].append(dict(pattern=pat,flags=flags,code=code))
   converted+=1
  except Exception as e:issues.append({'line':line,'error':str(e)})
 for line in sections.get('script',[]):
  source_count+=1
  try:
   left,right=line.split(' then ',1);m=re.fullmatch(r'script\("([^"]+)"(?:, (.*))?\) with (.*)',right)
   if not m:raise ValueError('脚本声明解析失败')
   url,argexpr,options=m.groups();opt=dict(x.split('=',1) for x in fields(options));opt={k.strip():v.strip() for k,v in opt.items()}
   enabled=value(substitute(opt.get('enable','true')))
   names=re.findall(r'\$\{([^}]+)\}',argexpr or '');defaultarg={k:args[k] for k in names};literal=value(argexpr) if argexpr and not names else None
   if url.endswith('/CommonScript/replace-body.js'):
    source="const [pattern,replacement]=$argument.split('->');$done({body:String($request.body||'').replace(new RegExp(pattern,'g'),replacement)});"
    notes.append('上游通用替换脚本404；按声明的正则与替换参数重写')
   else:source=asset(url)
   if 'window.' in source and url.endswith('Installer.js'):notes.append('IPA安装助手依赖环境，需设备验证')
   # Convert direct typed Loon argument access while preserving native Surge string parsing.
   source=re.sub(r'\$argument(?=\?\.[A-Za-z_]|\.(?!(?:split|includes|replace|match|toString)\b))','__typedArgs',source)
   source=re.sub(r'\$argument(?=\s*(?:\?\.)?\s*\[)','__typedArgs',source)
   source=source.replace('globalThis.$argument','__typedArgs')
   if re.search(r"\$argument\.split\(['\"]&['\"]\)",source):
    source=re.sub(r"\$argument\.split\(['\"]&['\"]\)", "Object.entries(__typedArgs).map(([k,v])=>k+'='+String(v))",source)
   index=len(orig);orig.append(source)
   code='return __invoke('+str(index)+','+json.dumps(defaultarg,ensure_ascii=False)+','+json.dumps(literal)+','+str(opt.get('binary_body_mode')=='true').lower()+','+str(opt.get('requires_body')=='true').lower()+');'
   entry={'code':code,'enabled':enabled,'argnames':names,'url':url,'index':index,'options':opt}
   if left.startswith(('request if','response if')):
    direction,pat,flags,alias=pattern(left);entry.update(pattern=pat,flags=flags);dispatch[direction].append(entry)
   else:
    kind='cron' if left.startswith('cron ') else 'generic';entry['kind']=kind
    if kind=='cron':
     cron_key=re.fullmatch(r'\$\{([^}]+)\}',left[5:]);entry['cron_key']=cron_key[1] if cron_key else None
     if cron_key:args[cron_key[1]]=str(args[cron_key[1]]).replace('?','*')
     entry['cron']=value(substitute(left[5:])).replace('?', '*')
    script_count+=1;entry['name']='task-'+str(script_count)
    dispatch.setdefault('tasks',[]).append(entry)
   converted+=1
  except Exception as e:issues.append({'line':line,'error':str(e)})
 # Per-module settings available as readable JSON via argument; source defaults retained.
 settings={re.sub(r'[^A-Za-z0-9_]','_',k):v for k,v in args.items()}
 namesmap={k:re.sub(r'[^A-Za-z0-9_]','_',k) for k in args}
 argument_pairs=[json.dumps(k)+':"{{{'+namesmap[k]+'}}}"' for k in args]
 argument='{' + ','.join(argument_pairs) + '}'
 prefix='''// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}
'''
 functions=[]
 for i,s in enumerate(orig):functions.append('function __original'+str(i)+'(__typedArgs,$argument,$request,$response,$done,$script){\n'+s+'\n}')
 functions.append('const __originals=['+','.join('__original'+str(i) for i in range(len(orig)))+'];')
 functions.append('''
function __text(body){
 if(typeof body==='string'||body===undefined)return body;
 const bytes=body instanceof Uint8Array?body:new Uint8Array(body);
 if(typeof TextDecoder!=='undefined')return new TextDecoder().decode(bytes);
 let s='';for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.subarray(i,i+8192));
 return decodeURIComponent(escape(s));
}
function __bytes(body){
 if(body===undefined||body instanceof Uint8Array)return body;
 if(typeof body!=='string')return new Uint8Array(body);
 if(typeof TextEncoder!=='undefined')return new TextEncoder().encode(body);
 const s=unescape(encodeURIComponent(body));return Uint8Array.from(s,c=>c.charCodeAt(0));
}
function __message(message,binary,needsBody){
 if(message===undefined)return undefined;
 const copy={...message,headers:{...message.headers}};
 if(needsBody)copy.body=binary?__bytes(copy.body):__text(copy.body);else delete copy.body;
 return copy;
}
function __invoke(index,defaults,literal,binary,needsBody){
 const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);
 const request=__message(typeof $request==='undefined'?undefined:$request,binary,needsBody);
 const response=__message(typeof $response==='undefined'?undefined:$response,binary,needsBody);
 const context={...(typeof $script==='undefined'?{}:$script),binaryBodyMode:binary};
 return __originals[index](typed,literal===null?JSON.stringify(typed):literal,request,response,__finish,context);
}
''')
 for direction in ['request','response']:
  entries=dispatch[direction]
  if not entries:continue
  filename=item['id']+'-'+direction+'.js';body=[prefix,*functions,'const __url=$request.url;let match;']
  patterns=[]
  for e in entries:
   condition='true'
   if 'options' in e and e['options'].get('enable','').startswith('${'):
    key=e['options']['enable'][2:-1];condition='__cast(__settings['+json.dumps(key)+'],'+json.dumps(args[key])+')'
   elif e.get('enabled',True) is False:condition='false'
   body.append('if(('+condition+') && (match=new RegExp('+json.dumps(e['pattern'])+','+json.dumps(e['flags'])+').exec(__url))){'+e['code']+'}')
   patterns.append('(?:'+e['pattern']+')')
  body.append('__finish({});');(P/'scripts'/filename).write_text('(function(){\n'+'\n'.join(body)+'\n})();')
  binary=any(e.get('options',{}).get('binary_body_mode')=='true' for e in entries)
  needsbody=any(e.get('options',{}).get('requires_body')=='true' or 'body' in e['code'] for e in entries)
  timeout=max([int(e.get('options',{}).get('timeout','10')) for e in entries]+[10])
  out['Script'].append(f'{item["id"]}-{direction} = type=http-{direction}, pattern={json.dumps("(?i)"+"|".join(patterns))}, script-path={BASE}/scripts/{filename}, requires-body={str(needsbody).lower()}, binary-body-mode={str(binary).lower()}, timeout={timeout}'+(', argument='+json.dumps(argument) if args else ''))
 for e in dispatch.get('tasks',[]):
  filename=item['id']+'-'+e['name']+'.js'
  gate=e['options'].get('enable','true');gate_key=re.fullmatch(r'\$\{([^}]+)\}',gate)
  guard='if(!__cast(__settings['+json.dumps(gate_key[1])+'],'+json.dumps(args[gate_key[1]])+'))return __finish({});' if gate_key else ''
  code='(function(){\n'+prefix+'\n'+'\n'.join(functions)+'\n'+guard+'\n'+e['code']+'\n})();'
  (P/'scripts'/filename).write_text(code)
  line=f'{item["id"]}-{e["name"]} = type={e["kind"]}, script-path={BASE}/scripts/{filename}, timeout={e["options"].get("timeout","30")}'
  if e['kind']=='cron':line+=', cronexp='+json.dumps('{{{'+namesmap[e['cron_key']]+'}}}' if e.get('cron_key') else e['cron'])
  if args:line+=', argument='+json.dumps(argument)
  # Surge offers enabled on script entries; preserve explicit optional tasks disabled by default.
  if gate_key:line="#!REQUIREMENT '{{{"+namesmap[gate_key[1]]+"}}}'=='true' "+line
  elif not e['enabled'] or e['enabled']=='false':line='# 默认关闭；调整本行以启用\n# '+line
  out['Script'].append(line)
 for line in sections.get('mitm',[]):
  if line.startswith('hostname'):out['MITM'].append('hostname = %APPEND% '+line.split('=',1)[1].strip())
  elif line.startswith(('h2','skip-server-cert-verify')):out['MITM'].append(line)
 if out['MITM']:out['MITM'].append('h2 = true')
 header=['#!version=2026.11.15.2','#!name='+item['name']+' · Surge','#!desc='+meta.get('desc',item.get('desc','')).replace('\n','\\n'),'#!author='+meta.get('author','可莉及各原作者'),'# Source: '+item['url'],'# Generated port; device validation pending. See catalog compatibility notes.']
 argdecl=[]
 for k,v in settings.items():argdecl.append(k+':'+str(v).lower() if isinstance(v,bool) else k+':'+str(v))
 if '{{{proxy_policy}}}' in '\n'.join(out['Rule']):argdecl.append('proxy_policy:PROXY');notes.append('安装时把proxy_policy设为现有代理策略名')
 if argdecl:header+=['#!arguments='+','.join(argdecl),'#!arguments-desc=参数沿用上游默认值；修改后重新启用模块。']
 module='\n'.join(header)+'\n\n'+'\n\n'.join('['+k+']\n'+'\n'.join(v) for k,v in out.items() if v)+'\n'
 (P/'modules'/(item['id']+'.sgmodule')).write_text(module)
 return {**item,'description':meta.get('desc',item.get('desc','')),'issues':issues,'notes':notes,'counts':{k:len(v) for k,v in out.items()},'source_entries':source_count,'converted_entries':converted,'status':'needs-attention' if issues else 'converted','device_tested':False,'jq_tests':jqtests}
results=[]
for item in manifest:
 try:results.append(build(item))
 except Exception as e:results.append({**item,'status':'build-error','issues':[{'error':str(e)}]})
(P/'catalog.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
(UP/'assets.json').write_text(json.dumps(assets,indent=2))
print('Built',len(results),'statuses', {s:sum(r['status']==s for r in results) for s in set(r['status'] for r in results)})
for r in results:
 if r['issues']:print(r['id'],[(i['error']) for i in r['issues']])

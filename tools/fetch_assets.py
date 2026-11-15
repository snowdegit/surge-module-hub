import concurrent.futures,json,pathlib,urllib.request,re,hashlib,time
P=pathlib.Path(__file__).resolve().parents[1];UA='Loon/3.0.9 CFNetwork/3860.500.111.2.2 Darwin/25.5.0'
A=P/'upstream/assets';A.mkdir(exist_ok=True)
urls=set()
for f in (P/'upstream').glob('*.lpx'):
 for u in re.findall(r'(?:script|jq_file|mock_file)\("(https?://[^\"]+)"',f.read_text()):urls.add(u)
def get(u):
 name=hashlib.sha256(u.encode()).hexdigest()[:12]+'-'+u.rsplit('/',1)[1];f=A/name
 try:
  if not f.exists():
   r=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':UA}),timeout=40);d=r.read()
   if b'<html' in d[:100].lower():raise ValueError('HTML response')
   f.write_bytes(d)
  return u,dict(file=name,bytes=f.stat().st_size,sha256=hashlib.sha256(f.read_bytes()).hexdigest())
 except Exception as e:return u,dict(error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:result=dict(pool.map(get,sorted(urls)))
(P/'upstream/assets.json').write_text(json.dumps(result,indent=2))
print('Assets',len(result),'errors',[(u,v) for u,v in result.items() if 'error' in v])

import concurrent.futures,json,pathlib,urllib.request,urllib.parse,time
P=pathlib.Path(__file__).resolve().parents[1];UA='Loon/3.0.9 CFNetwork/3860.500.111.2.2 Darwin/25.5.0'
def fetch(item):
 u=urllib.parse.parse_qs(urllib.parse.urlparse(item['url']).query)['plugin'][0]
 f=P/'upstream'/u.rsplit('/',1)[1]
 try:
  if not f.exists():
   for attempt in range(3):
    try:
     r=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':UA}),timeout=30);data=r.read()
     if b'<html' in data[:300].lower():raise ValueError('HTML instead of plugin')
     f.write_bytes(data);break
    except Exception:
     if attempt==2:raise
     time.sleep(1+attempt)
  return dict(id=f.stem,url=u,file=f.name,**{k:v for k,v in item.items() if k!='url'})
 except Exception as e:return dict(name=item['name'],url=u,error=str(e))
items=json.loads((P/'upstream/catalog.json').read_text())['lists'];result=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for n,r in enumerate(pool.map(fetch,items),1):
  result.append(r)
  if n%25==0:print('Downloaded',n,'/',len(items),flush=True)
(P/'upstream/manifest.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print('Done',len(result),'errors',sum('error' in r for r in result))

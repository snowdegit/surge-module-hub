"""Run selected real generated algorithms on synthetic messages in Surge.

No external HTTP, storage changes, notifications or active-profile changes.
"""
import argparse, datetime, json, os, pathlib, urllib.request

P = pathlib.Path(__file__).resolve().parents[1]
ap = argparse.ArgumentParser()
ap.add_argument('--api-url', required=True)
ap.add_argument('--output', default='test-results/native-behavior-report.json')
args = ap.parse_args()
key = os.environ.get('SURGE_TEST_API_KEY')
if not key:
    raise SystemExit('SURGE_TEST_API_KEY required')
opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
cases = [
    dict(name='Telegram configured client', file='TelegramRedirect-request.js', url='https://t.me/example_user', args={'app':'sg'}, expect={'response.status':307,'response.headers.Location':'sg://resolve?domain=example_user'}),
    dict(name='Tencent replacement preserves unrelated parameters', file='Tencent_Video_remove_ads-request.js', url='https://vv.video.qq.com/getvinfo', method='POST', body='x=1&sppreviewtype=2&keep=ok&spsrt=3&tail=4', expect={'body':'x=1&sppreviewtype=0&keep=ok&spsrt=0&tail=4'}),
    dict(name='Google preserves path and query', file='Google-request.js', url='https://www.google.cn/search?q=hello', expect={'response.headers.Location':'https://www.google.com/search?q=hello'}),
    dict(name='Spotify preserves suffix and Host', file='Spotify_remove_ads-request.js', url='https://spclient.wg.spotify.com/artistview/v1/artist/123&platform=iphone&keep=1', headers={'host':'old.example','X-Keep':'yes'}, expect={'url':'https://spclient.wg.spotify.com/artistview/v1/artist/123&platform=ipad&keep=1','headers.host':'spclient.wg.spotify.com','headers.X-Keep':'yes'}),
    dict(name='Bilibili binary entry text route preserves Unicode', file='Bilibili_remove_ads-response.js', url='https://api.live.bilibili.com/xlive/app-interface/v2/index/feed?x=1', binary=True, response={'code':0,'data':{'card_list':[],'sentinel':'中文🙂'}}, json_expect={'data.sentinel':'中文🙂'}),
    dict(name='Unmatched Bilibili URL does nothing', file='Bilibili_remove_ads-response.js', url='https://example.org/not-bilibili', binary=True, response={}, empty=True),
    dict(name='IT Home explicitly false switches', file='IThome_remove_ads-response.js', url='https://napi.ithome.com/api/news/indexv2/iphone/1', args={'removeAllBanners':False,'removePinnedArticles':False}, response={'code':200,'data':{'list':[{'id':1,'title':'normal','feedType':10003},{'id':2,'title':'other'},{'id':3,'feedType':10004}],'banner':[{'id':1}]}}, preserved_id=1),
]
harness = r'''
const finish=$done;
let completed=false;
const timer=setTimeout(()=>{if(!completed){completed=true;finish({passed:false,error:'No completion within 5 seconds'})}},5000);
function end(result){
  if(completed)return;completed=true;clearTimeout(timer);
  try{
    const at=(obj,path)=>path.split('.').reduce((o,k)=>o==null?undefined:o[k],obj);
    for(const [path,expected]of Object.entries(c.expect||{}))if(JSON.stringify(at(result,path))!==JSON.stringify(expected))throw Error('Unexpected '+path+': '+JSON.stringify(at(result,path)));
    if(c.empty&&Object.keys(result).length)throw Error('Expected no changes');
    if(c.json_expect||c.preserved_id){
      if(typeof result.body!=='string')throw Error('Expected JSON text body');
      const body=JSON.parse(result.body);
      for(const [path,expected]of Object.entries(c.json_expect||{}))if(JSON.stringify(at(body,path))!==JSON.stringify(expected))throw Error('Unexpected JSON '+path);
      if(c.preserved_id&&!body.data.list.some(x=>x.id===c.preserved_id))throw Error('False switch removed article');
    }
    finish({passed:true});
  }catch(e){finish({passed:false,error:String(e)})}
}
try{
  let payload=c.response===undefined?undefined:JSON.stringify(c.response);
  if(c.binary&&payload!==undefined){const s=unescape(encodeURIComponent(payload));payload=Uint8Array.from(s,x=>x.charCodeAt(0))}
  const request={url:c.url,method:c.method||'GET',headers:c.headers||{},body:c.body};
  const response=c.response===undefined?undefined:{status:200,headers:{},body:payload};
  const noNetwork=new Proxy({},{get(){return ()=>{throw Error('External HTTP forbidden in isolated fixture')}}});
  const fn=new Function('$request','$response','$argument','$done','$script','$persistentStore','$httpClient','$notification',source);
  fn(request,response,JSON.stringify(c.args||{}),end,{binaryBodyMode:!!c.binary},{read(){return null},write(){throw Error('Storage changes forbidden')}},noNetwork,{post(){throw Error('Notifications forbidden')}});
}catch(e){if(!completed){completed=true;clearTimeout(timer);finish({passed:false,error:String(e)})}}
'''
report={'timestamp':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Selected actual generated algorithms in native Surge on synthetic fixtures; no real app traffic. Network/storage/notifications blocked.','profile_modified':False,'real_app_tested':False,'cases':[]}
for c in cases:
    script='const c='+json.dumps(c)+';const source='+json.dumps((P/'scripts'/c['file']).read_text())+';\n'+harness
    row={'name':c['name'],'file':c['file']}
    try:
        req=urllib.request.Request(args.api_url.rstrip('/')+'/v1/scripting/evaluate',data=json.dumps({'script_text':script,'mock_type':'generic','timeout':8}).encode(),headers={'X-Key':key,'Content-Type':'application/json'})
        with opener.open(req,timeout=20) as r:
            report['surge_version']=r.headers.get('X-Surge-Version');report['surge_system']=r.headers.get('X-System');response=json.load(r)
        result=response.get('result')
        if not isinstance(result,dict):raise ValueError(str(response)[:1000])
        row.update(result)
    except Exception as e:row.update(passed=False,error=str(e))
    report['cases'].append(row)
    print(json.dumps(row,ensure_ascii=False),flush=True)
report['summary']={'checks':len(cases),'passed':sum(c.get('passed',False) for c in report['cases']),'failed':sum(not c.get('passed',False) for c in report['cases'])}
(P/args.output).write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report['summary']))
raise SystemExit(bool(report['summary']['failed']))

"""Read-only status and isolated native JS probe. No profile/module/feature changes."""
import argparse,json,os,pathlib,urllib.request,urllib.error,ssl
ap=argparse.ArgumentParser();ap.add_argument('--api-url',required=True);ap.add_argument('--key-file');ap.add_argument('--ca-file');ap.add_argument('--output',default='test-results/native-probe.json');args=ap.parse_args()
key=pathlib.Path(args.key_file).read_text().strip() if args.key_file else os.environ.get('SURGE_TEST_API_KEY','')
if not key:raise SystemExit('Provide SURGE_TEST_API_KEY or an external --key-file; never commit credentials')
ctx=ssl.create_default_context(cafile=args.ca_file)
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}),urllib.request.HTTPSHandler(context=ctx))
def request(path,payload=None):
 data=json.dumps(payload).encode() if payload is not None else None
 req=urllib.request.Request(args.api_url.rstrip('/')+path,data=data,headers={'X-Key':key,'Content-Type':'application/json'})
 with opener.open(req,timeout=12) as response:return json.load(response)
result={'profile_modified':False,'module_load_tested':False,'real_app_tested':False}
try:
 result['scripting_status']=request('/v1/features/scripting')
 result['probe']=request('/v1/scripting/evaluate',{'script_text':'console.log("surge-hub-native-probe"); $done({probe:"surge-module-hub",ok:true});','mock_type':'generic','timeout':5})
 result['connected']=True
except Exception as e:result.update(connected=False,error=str(e))
f=pathlib.Path(args.output);f.parent.mkdir(parents=True,exist_ok=True);f.write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(result,ensure_ascii=False))
raise SystemExit(0 if result['connected'] else 1)

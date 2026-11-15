"""Isolated native Surge parsing and dispatcher tests. Never modifies profiles.

Credentials come only from environment; no upstream task bodies are executed.
"""
import argparse, datetime, json, os, pathlib, urllib.request

P = pathlib.Path(__file__).resolve().parents[1]
ap = argparse.ArgumentParser()
ap.add_argument('--api-url', required=True)
ap.add_argument('--output', default='test-results/native-report.json')
args = ap.parse_args()
key = os.environ.get('SURGE_TEST_API_KEY')
if not key:
    raise SystemExit('SURGE_TEST_API_KEY required')
opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
cases = json.loads((P/'test-results/dispatch-cases.json').read_text())
harness = (P/'tests/native-dispatch.js').read_text()
report = {
    'timestamp': datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'scope': 'Surge native JavaScript parsing and synthetic dispatch/adapters. Upstream functions replaced by probes; no real application traffic.',
    'profile_modified': False, 'module_load_tested': False,
    'real_app_tested': False, 'scripts': [],
}
out = P/args.output
def save():
    rows = report['scripts']
    checks = [c for r in rows for c in r.get('dispatch', [])]
    report['summary'] = {'scripts': len(rows), 'parse_passed': sum(r.get('parse_passed', False) for r in rows), 'dispatch_checks': len(checks), 'dispatch_passed': sum(c['passed'] for c in checks), 'failures': sum(not r.get('parse_passed', False) or 'error' in r for r in rows)+sum(not c['passed'] for c in checks)}
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')

for file in sorted((P/'scripts').glob('*.js')):
    source = file.read_text()
    selected = []
    binary = False
    for c in cases:
        suffix = '-task-'+str(c.get('task_index')) if c['kind'] in ('cron','generic') else '-'+c['kind']
        if c['plugin']+suffix == file.stem:
            selected.append(c)
    if selected:
        module = (P/'modules'/(selected[0]['plugin']+'.sgmodule')).read_text()
        line = next((l for l in module.splitlines() if l.startswith(file.stem+' = ')), '')
        binary = 'binary-body-mode=true' in line
    script = harness+'\nconst source='+json.dumps(source)+';\n'
    script += 'let result;try{new Function(source);result={parse_passed:true,dispatch:nativeDispatch(source,'+json.dumps(selected)+','+json.dumps(binary)+')}}catch(e){result={parse_passed:false,error:String(e)}};$done(result);'
    row = {'file': file.name}
    try:
        req = urllib.request.Request(args.api_url.rstrip('/')+'/v1/scripting/evaluate', data=json.dumps({'script_text':script,'mock_type':'generic','timeout':8}).encode(), headers={'X-Key':key,'Content-Type':'application/json'})
        with opener.open(req, timeout=25) as r:
            report['surge_version'] = r.headers.get('X-Surge-Version')
            report['surge_system'] = r.headers.get('X-System')
            report['surge_build'] = r.headers.get('X-Surge-Build')
            response = json.load(r)
        result = response.get('result')
        if not isinstance(result, dict):
            raise ValueError('Unexpected native result: '+str(response)[:1500])
        row.update(result)
    except Exception as e:
        row.update(parse_passed=False, error=str(e))
    report['scripts'].append(row)
    save()
    if len(report['scripts']) % 10 == 0 or 'error' in row:
        print(json.dumps({'progress':len(report['scripts']),**report['summary'],'last':file.name,'error':row.get('error')},ensure_ascii=False),flush=True)
print(json.dumps(report['summary']),flush=True)
raise SystemExit(bool(report['summary']['failures']))

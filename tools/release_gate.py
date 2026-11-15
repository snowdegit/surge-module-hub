"""A passing finite test suite must not be presented as universal 100% compatibility."""
import json,pathlib,sys
P=pathlib.Path(__file__).resolve().parents[1]
reasons=[]
full=json.loads((P/'test-results/full-report.json').read_text())['summary']
if full['failed']:reasons.append(f"Full source/fixture suite has {full['failed']} unresolved checks")
for name in ['dispatch-report.json','task-report.json']:
 report=json.loads((P/'test-results'/name).read_text())
 if report['failed']:reasons.append(name+' contains failed tests')
cat=json.loads((P/'catalog.json').read_text())
blocked=[x['name'] for x in cat if x['status']!='converted']
if blocked:reasons.append('Incomplete upstream entries: '+', '.join(blocked))
native=P/'test-results/native-report.json'
if not native.exists():reasons.append('Native Surge validation has not run')
else:
 n=json.loads(native.read_text())
 if n.get('summary',{}).get('failures'):reasons.append('Native script parsing/dispatch contains failures')
 if not n.get('module_load_tested') or n.get('module_load_passed')!=len(cat):reasons.append('Native module loading is incomplete')
 if not n.get('real_app_tested'):reasons.append('Real application traffic regression is incomplete')
behavior=P/'test-results/native-behavior-report.json'
if behavior.exists() and json.loads(behavior.read_text()).get('summary',{}).get('failed'):
 reasons.append('Native algorithm fixture tests contain failures')
print(json.dumps({'full_compatibility_verified':not reasons,'blockers':reasons},ensure_ascii=False,indent=2))
raise SystemExit(1 if reasons else 0)

(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
// 2024-07-14 04:48:43
var json = JSON.parse($response.body);

if (json.data && json.data.moduleInfos && Array.isArray(json.data.moduleInfos) && json.data.moduleInfos.length > 1) {
    delete json.data.moduleInfos[1]; // 章末推荐书籍
}

if (json.data && json.data.props && json.data.props["x-dependencies"] && Array.isArray(json.data.props["x-dependencies"])) {
    delete json.data.props["x-dependencies"][0]; // 书城横幅
}

$done({ body: JSON.stringify(json) });
}
const __originals=[__original0];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://ocean\\.shuqireader\\.com/sqios/render/render/page/bookstore$","i").exec(__url))){return __invoke(0,{},null);}
__finish({});
})();
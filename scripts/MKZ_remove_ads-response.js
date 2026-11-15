(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
// 2024-07-18 21:07:11
const url = $request.url;
const body = $response.body;

if (!body) $done({});

let obj = JSON.parse(body);

if (url.includes("/app/config/")) {
    delete obj.data.vip_subscribe_switch;
}

$done({ body: JSON.stringify(obj) });
}
const __originals=[__original0];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://base\\.mkzcdn\\.com/app/config/","i").exec(__url))){return __invoke(0,{},null);}
__finish({});
})();
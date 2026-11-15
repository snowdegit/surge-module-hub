(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
const version = 'V1.0.1';
var ua=$request.headers.rpid||$request.headers.Rpid;ua.includes("1000002")||ua.includes("1000019")?$done({status:"HTTP/1.1 404 Not Found"}):$done({});
}
const __originals=[__original0];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^http?://(114\\.115\\.217\\.129)|(home\\.umetrip\\.com)/gateway/api/umetrip/native$","i").exec(__url))){return __invoke(0,{},null);}
__finish({});
})();
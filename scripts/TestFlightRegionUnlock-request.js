(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

const __originals=[];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https?://testflight\\.apple\\.com/v\\d/accounts/.+?/install$","i").exec(__url))){return __finish({body:String($request.body || "").replace(new RegExp("\"storefrontId\"\\x20:\\x20\"\\d{6}-\\d{2},\\d{2}\",",""),"\"storefrontId\":\"143441-19,29\",")});}
__finish({});
})();
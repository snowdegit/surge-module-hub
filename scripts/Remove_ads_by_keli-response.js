(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

const __originals=[];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https?://cmds\\.omesoft\\.com/HypnotistWS\\.asmx","i").exec(__url))){return __finish({body:String($response.body || "").replace(new RegExp("<GetADResult>\\.\\*\\?</GetADResult>",""),"<GetADResult>{\"ret\":0,\"msg\":\"正常\",\"err_code\":0,\"data\":{\"ad\":[]}}</GetADResult>")});}
__finish({});
})();
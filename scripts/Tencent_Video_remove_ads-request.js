(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
const [pattern,replacement]=$argument.split('->');$done({body:String($request.body||'').replace(new RegExp(pattern,'g'),replacement)});
}
const __originals=[__original0];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https?://vv\\.video\\.qq\\.com/getvinfo","i").exec(__url))){return __invoke(0,{},"&sppreviewtype=\\d(.*)&spsrt=\\d->&sppreviewtype=0$1&spsrt=0");}
__finish({});
})();
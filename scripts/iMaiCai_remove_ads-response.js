(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
let data = JSON.parse($response.body);
data.aidata_dd_resource_config?.data?.customer?.feature_src_list?.ad && delete data.aidata_dd_resource_config.data.customer.feature_src_list.ad;
$done({ body: JSON.stringify(data) });
}
const __originals=[__original0];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://portal-portm\\.meituan\\.com/horn_ios/mergeRequest","i").exec(__url))){return __invoke(0,{},null);}
__finish({});
})();
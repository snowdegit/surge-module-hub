(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

const __originals=[];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://gw\\.xiaocantech\\.com/rpc","i").exec(__url))){const h={...$request.headers};for(const k of Object.keys(h)){if(k.toLowerCase()==="methodname")h[k]=String(h[k]).replace(new RegExp(".*(GetBannerList|IsShowOrderAwardPopup|UserLifeShopList|BrandBannerList|GetPromotionGlobalCfg)",""),"null");}return __finish({headers:h});}
__finish({});
})();
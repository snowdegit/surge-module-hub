(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

const __originals=[];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://duckduckgo\\.com/\\?q=bd\\+([^&]+).+","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"https://www.baidu.com/s?wd=" + (match[1] || "") + ""},body:""}});}
if((true) && (match=new RegExp("^https://duckduckgo\\.com/\\?q=bdimg\\+([^&]+).+","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"https://image.baidu.com/search/index?tn=baiduimage&word=" + (match[1] || "") + ""},body:""}});}
if((true) && (match=new RegExp("^https://duckduckgo\\.com/\\?q=gimg\\+([^&]+).+","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"https://www.google.com/search?&tbm=isch&q=" + (match[1] || "") + ""},body:""}});}
if((true) && (match=new RegExp("^https://duckduckgo\\.com/\\?q=b\\+([^&]+).+","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"https://www.bing.com/search?q=" + (match[1] || "") + ""},body:""}});}
if((true) && (match=new RegExp("^https://duckduckgo\\.com/\\?q=wk\\+([^&]+).+","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"https://zh.wikipedia.org/wiki/" + (match[1] || "") + ""},body:""}});}
if((true) && (match=new RegExp("^https://duckduckgo\\.com/\\?q=qm\\+([^&]+).+","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"https://www.qimai.cn/search/index/country/cn/search/" + (match[1] || "") + ""},body:""}});}
if((true) && (match=new RegExp("^https://duckduckgo\\.com/\\?q=gh\\+([^&]+).+","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"https://github.com/search?q=" + (match[1] || "") + ""},body:""}});}
if((true) && (match=new RegExp("^https://duckduckgo\\.com/\\?q=(?!(?:bd|bdimg|gimg|b|wk|qm|gh)\\+)([^&]+).+","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"https://www.google.com/search?q=" + (match[1] || "") + ""},body:""}});}
__finish({});
})();
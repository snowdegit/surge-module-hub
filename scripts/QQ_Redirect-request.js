(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

const __originals=[];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("(^https://c\\.pc\\.qq\\.com/middlem\\.html\\?pfurl=)(http.*)(&pfuin=.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"" + (match[2] || "") + ""},body:""}});}
if((true) && (match=new RegExp("(^https://c\\.pc\\.qq\\.com/middlect\\.html\\?pfuin=.*&pfurl=)(http.*)(&gjsublevel=.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"" + (match[2] || "") + ""},body:""}});}
if((true) && (match=new RegExp("(^https://c\\.pc\\.qq\\.com/middlect\\.html\\?iscontinue=.*pfurl=)(http.*)(&pfuin=.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"" + (match[2] || "") + ""},body:""}});}
if((true) && (match=new RegExp("(^https://pingtas\\.qq\\.com/webview/pingd\\?dm=c\\.pc\\.qq\\.com&pvi=\\d+&si=s\\d+&url=/middlem\\.html\\?pfurl%3d)(http.*)(%26pfuin%3d.*%26pfuin%3d.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"" + (match[2] || "") + ""},body:""}});}
if((true) && (match=new RegExp("(^https://cgi\\.connect\\.qq\\.com/qqconnectopen/get_urlinfoForQQV2\\?url=)(http.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"" + (match[2] || "") + ""},body:""}});}
if((true) && (match=new RegExp("(^https://c\\.pc\\.qq\\.com/index\\.html\\?pfurl=)(http.*)(&pfuin=.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"" + (match[2] || "") + ""},body:""}});}
if((true) && (match=new RegExp("(^https://c\\.pc\\.qq\\.com/ios\\.html\\?url=)(http.*)(&level=.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"" + (match[2] || "") + ""},body:""}});}
if((true) && (match=new RegExp("(^https://pingtas\\.qq\\.com/webview/pingd\\?dm=c\\.pc\\.qq\\.com&pvi=\\d+&si=s\\d+&url=/ios\\.html\\?url%3d)(http.*)(%26level.*%26level.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:"" + (match[2] || "") + ""},body:""}});}
__finish({});
})();
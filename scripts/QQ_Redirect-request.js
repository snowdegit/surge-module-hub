(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

const __originals=[];

function __text(body){
 if(typeof body==='string'||body===undefined)return body;
 const bytes=body instanceof Uint8Array?body:new Uint8Array(body);
 if(typeof TextDecoder!=='undefined')return new TextDecoder().decode(bytes);
 let s='';for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.subarray(i,i+8192));
 return decodeURIComponent(escape(s));
}
function __bytes(body){
 if(body===undefined||body instanceof Uint8Array)return body;
 if(typeof body!=='string')return new Uint8Array(body);
 if(typeof TextEncoder!=='undefined')return new TextEncoder().encode(body);
 const s=unescape(encodeURIComponent(body));return Uint8Array.from(s,c=>c.charCodeAt(0));
}
function __message(message,binary,needsBody){
 if(message===undefined)return undefined;
 const copy={...message,headers:{...message.headers}};
 if(needsBody)copy.body=binary?__bytes(copy.body):__text(copy.body);else delete copy.body;
 return copy;
}
function __invoke(index,defaults,literal,binary,needsBody){
 const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);
 const request=__message(typeof $request==='undefined'?undefined:$request,binary,needsBody);
 const response=__message(typeof $response==='undefined'?undefined:$response,binary,needsBody);
 const context={...(typeof $script==='undefined'?{}:$script),binaryBodyMode:binary};
 return __originals[index](typed,literal===null?JSON.stringify(typed):literal,request,response,__finish,context);
}

const __url=$request.url;let match;
if((true) && (match=new RegExp("(^https://c\\.pc\\.qq\\.com/middlem\\.html\\?pfurl=)(http.*)(&pfuin=.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:__url.slice(0,match.index) + ("" + (match[2] || "") + "") + __url.slice(match.index+match[0].length)},body:""}});}
if((true) && (match=new RegExp("(^https://c\\.pc\\.qq\\.com/middlect\\.html\\?pfuin=.*&pfurl=)(http.*)(&gjsublevel=.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:__url.slice(0,match.index) + ("" + (match[2] || "") + "") + __url.slice(match.index+match[0].length)},body:""}});}
if((true) && (match=new RegExp("(^https://c\\.pc\\.qq\\.com/middlect\\.html\\?iscontinue=.*pfurl=)(http.*)(&pfuin=.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:__url.slice(0,match.index) + ("" + (match[2] || "") + "") + __url.slice(match.index+match[0].length)},body:""}});}
if((true) && (match=new RegExp("(^https://pingtas\\.qq\\.com/webview/pingd\\?dm=c\\.pc\\.qq\\.com&pvi=\\d+&si=s\\d+&url=/middlem\\.html\\?pfurl%3d)(http.*)(%26pfuin%3d.*%26pfuin%3d.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:__url.slice(0,match.index) + ("" + (match[2] || "") + "") + __url.slice(match.index+match[0].length)},body:""}});}
if((true) && (match=new RegExp("(^https://cgi\\.connect\\.qq\\.com/qqconnectopen/get_urlinfoForQQV2\\?url=)(http.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:__url.slice(0,match.index) + ("" + (match[2] || "") + "") + __url.slice(match.index+match[0].length)},body:""}});}
if((true) && (match=new RegExp("(^https://c\\.pc\\.qq\\.com/index\\.html\\?pfurl=)(http.*)(&pfuin=.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:__url.slice(0,match.index) + ("" + (match[2] || "") + "") + __url.slice(match.index+match[0].length)},body:""}});}
if((true) && (match=new RegExp("(^https://c\\.pc\\.qq\\.com/ios\\.html\\?url=)(http.*)(&level=.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:__url.slice(0,match.index) + ("" + (match[2] || "") + "") + __url.slice(match.index+match[0].length)},body:""}});}
if((true) && (match=new RegExp("(^https://pingtas\\.qq\\.com/webview/pingd\\?dm=c\\.pc\\.qq\\.com&pvi=\\d+&si=s\\d+&url=/ios\\.html\\?url%3d)(http.*)(%26level.*%26level.*)","i").exec(__url))){return __finish({response:{status:307,headers:{Location:__url.slice(0,match.index) + ("" + (match[2] || "") + "") + __url.slice(match.index+match[0].length)},body:""}});}
__finish({});
})();
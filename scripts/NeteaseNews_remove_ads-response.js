(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
/*
引用地址https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/news163.js
*/
// 2024-01-12 08:50

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/feed/dynamic/headline-list")) {
  // 信息流
  if (obj?.data?.items?.length > 0) {
    // 移除置顶新闻
    obj.data.items = obj.data.items.filter((i) => !(i?.tagList?.length > 0));
  }
} else if (url.includes("/nex.163.com/q")) {
  // 开屏广告
  if (obj?.ads?.length > 0) {
    obj.ads = [];
  }
} else if (url.includes("/search/hot-word")) {
  // 搜索框
  if (obj?.data?.special?.length > 0) {
    // 猜你想搜
    obj.data.special = [];
  }
  // if (obj?.data?.hotWordList?.length > 0) {
  //     热搜列表
  //   obj.data.hotWordList = [];
  // }
  if (obj?.data?.RollhotWordList?.length > 0) {
    // 搜索框填充词
    obj.data.RollhotWordList = [];
  }
} else {
  $done({});
}

$done({ body: JSON.stringify(obj) });
}
function __original1(__typedArgs,$argument,$request,$response,$done,$script){
/*
引用地址https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/news163.js
*/
// 2024-01-12 08:50

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/feed/dynamic/headline-list")) {
  // 信息流
  if (obj?.data?.items?.length > 0) {
    // 移除置顶新闻
    obj.data.items = obj.data.items.filter((i) => !(i?.tagList?.length > 0));
  }
} else if (url.includes("/nex.163.com/q")) {
  // 开屏广告
  if (obj?.ads?.length > 0) {
    obj.ads = [];
  }
} else if (url.includes("/search/hot-word")) {
  // 搜索框
  if (obj?.data?.special?.length > 0) {
    // 猜你想搜
    obj.data.special = [];
  }
  // if (obj?.data?.hotWordList?.length > 0) {
  //     热搜列表
  //   obj.data.hotWordList = [];
  // }
  if (obj?.data?.RollhotWordList?.length > 0) {
    // 搜索框填充词
    obj.data.RollhotWordList = [];
  }
} else {
  $done({});
}

$done({ body: JSON.stringify(obj) });
}
function __original2(__typedArgs,$argument,$request,$response,$done,$script){
/*
引用地址https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/news163.js
*/
// 2024-01-12 08:50

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/feed/dynamic/headline-list")) {
  // 信息流
  if (obj?.data?.items?.length > 0) {
    // 移除置顶新闻
    obj.data.items = obj.data.items.filter((i) => !(i?.tagList?.length > 0));
  }
} else if (url.includes("/nex.163.com/q")) {
  // 开屏广告
  if (obj?.ads?.length > 0) {
    obj.ads = [];
  }
} else if (url.includes("/search/hot-word")) {
  // 搜索框
  if (obj?.data?.special?.length > 0) {
    // 猜你想搜
    obj.data.special = [];
  }
  // if (obj?.data?.hotWordList?.length > 0) {
  //     热搜列表
  //   obj.data.hotWordList = [];
  // }
  if (obj?.data?.RollhotWordList?.length > 0) {
    // 搜索框填充词
    obj.data.RollhotWordList = [];
  }
} else {
  $done({});
}

$done({ body: JSON.stringify(obj) });
}
const __originals=[__original0,__original1,__original2];

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
if((true) && (match=new RegExp("^https://nex\\.163\\.com/q","i").exec(__url))){return __invoke(0,{},null,false,true);}
if((true) && (match=new RegExp("^https://gw\\.m\\.163\\.com/nc/api/v1/feed/dynamic/headline-list\\?","i").exec(__url))){return __invoke(1,{},null,false,true);}
if((true) && (match=new RegExp("^https://gw\\.m\\.163\\.com/nc/api/v1/search/hot-word","i").exec(__url))){return __invoke(2,{},null,false,true);}
__finish({});
})();
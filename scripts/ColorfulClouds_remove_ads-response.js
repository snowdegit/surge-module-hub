(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-09-05 11:06:15
const url = $request.url;
let obj = JSON.parse($response.body);
if (url.includes("/api.caiyunapp.com/v1/activity")) {
  if (url.includes("&type_id=A03&")) {
    // 底栏控制项目 主页图标 天气助手 彩云ai
    if (obj?.interval) {
      obj.interval = 2592000; // 30天===2592000秒
    }
    if (obj?.activities?.length > 0) {
      for (let item of obj.activities) {
        if (item?.name && item?.type && item?.feature) {
          item.feature = false;
        }
      }
    }
  } else {
    // 其他请求
    obj = { status: "ok", activities: [{ items: [] }] };
  }
} else if (url.includes("/wrapper.cyapi.cn/v1/activity")) {
  // 彩云推广
  if (["&type_id=A03&"]?.includes(url)) {
    // 天气助手 彩云ai
    if (obj?.interval) {
      obj.interval = 2592000; // 30天===2592000秒
    }
    if (obj?.activities?.length > 0) {
      obj.activities = [];
    }
  } else {
    // 其他请求
    obj = { status: "ok", activities: [{ items: [] }] };
  }
}
$done({ body: JSON.stringify(obj) });
}
const __originals=[__original0];

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
if((true) && (match=new RegExp("^https://(wrapper\\.cyapi\\.cn|api\\.caiyunapp\\.com|cdn-w\\.caiyunapp\\.com)/v1/activity\\?","i").exec(__url))){return __invoke(0,{},null,false,true);}
__finish({});
})();
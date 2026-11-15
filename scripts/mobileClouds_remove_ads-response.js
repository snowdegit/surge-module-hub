(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/cloud139.js
*/
// 2024-02-18 20:10

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("ad.mcloud.139.com/advertapi/adv-filter/")) {
  // 广告组件
  if (obj?.body) {
    if (obj?.body?.length > 0) {
      let newBods = [];
      for (let item of obj.body) {
        if (
          [
            "APP-启动页",
            "APP-我的-底部卡片",
            "APP-我的-悬浮窗",
            "APP-我的-文字链",
            "APP-我的-活动推广专区",
            "APP-相册上传界面-banner",
            "APP-首页-云朵中心卡片"
          ]?.includes(item?.adposname)
        ) {
          continue;
        }
        newBods.push(item);
      }
      obj.body = newBods;
    } else {
      obj.body = {};
    }
  }
} else if (url.includes("jzts.cmpassport.com/personalized/getPushContent")) {
  // 开屏广告
  if (obj?.data?.length > 0) {
    for (let item of obj.data) {
      if (item?.actsList?.length > 0) {
        for (let i of item.actsList) {
          if (i?.putStartTime) {
            i.putStartTime = "2090-12-31 00:00:00.0";
          }
          if (i?.putEndTime) {
            i.putEndTime = "2090-12-31 23:59:59.0";
          }
          if (i?.adUrl) {
            i.adUrl = "";
          }
        }
      }
    }
  }
}

$done({ body: JSON.stringify(obj) });
}
function __original1(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/cloud139.js
*/
// 2024-02-18 20:10

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("ad.mcloud.139.com/advertapi/adv-filter/")) {
  // 广告组件
  if (obj?.body) {
    if (obj?.body?.length > 0) {
      let newBods = [];
      for (let item of obj.body) {
        if (
          [
            "APP-启动页",
            "APP-我的-底部卡片",
            "APP-我的-悬浮窗",
            "APP-我的-文字链",
            "APP-我的-活动推广专区",
            "APP-相册上传界面-banner",
            "APP-首页-云朵中心卡片"
          ]?.includes(item?.adposname)
        ) {
          continue;
        }
        newBods.push(item);
      }
      obj.body = newBods;
    } else {
      obj.body = {};
    }
  }
} else if (url.includes("jzts.cmpassport.com/personalized/getPushContent")) {
  // 开屏广告
  if (obj?.data?.length > 0) {
    for (let item of obj.data) {
      if (item?.actsList?.length > 0) {
        for (let i of item.actsList) {
          if (i?.putStartTime) {
            i.putStartTime = "2090-12-31 00:00:00.0";
          }
          if (i?.putEndTime) {
            i.putEndTime = "2090-12-31 23:59:59.0";
          }
          if (i?.adUrl) {
            i.adUrl = "";
          }
        }
      }
    }
  }
}

$done({ body: JSON.stringify(obj) });
}
const __originals=[__original0,__original1];

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
if((true) && (match=new RegExp("^https://jzts\\.cmpassport\\.com/personalized/getPushContent","i").exec(__url))){return __invoke(0,{},null,false,true);}
if((true) && (match=new RegExp("^https://ad\\.mcloud\\.139\\.com/advertapi/adv-filter/","i").exec(__url))){return __invoke(1,{},null,false,true);}
__finish({});
})();
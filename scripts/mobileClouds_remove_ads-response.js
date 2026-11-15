(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
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
function __original1(__typedArgs,$argument){
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
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://jzts\\.cmpassport\\.com/personalized/getPushContent","i").exec(__url))){return __invoke(0,{},null);}
if((true) && (match=new RegExp("^https://ad\\.mcloud\\.139\\.com/advertapi/adv-filter/","i").exec(__url))){return __invoke(1,{},null);}
__finish({});
})();
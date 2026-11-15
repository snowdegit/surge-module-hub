(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
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
function __original1(__typedArgs,$argument){
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
function __original2(__typedArgs,$argument){
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
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://nex\\.163\\.com/q","i").exec(__url))){return __invoke(0,{},null);}
if((true) && (match=new RegExp("^https://gw\\.m\\.163\\.com/nc/api/v1/feed/dynamic/headline-list\\?","i").exec(__url))){return __invoke(1,{},null);}
if((true) && (match=new RegExp("^https://gw\\.m\\.163\\.com/nc/api/v1/search/hot-word","i").exec(__url))){return __invoke(2,{},null);}
__finish({});
})();
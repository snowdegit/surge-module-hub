(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
/*
引用地址 https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/adrive.js
*/
// 2024-07-15 22:28:47

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/v1/users/onboard_list")) {
  if (obj.result?.length > 0) {
    obj.result = obj.result.filter(
      (i) =>
        ![
          "backup_list_under_mydevice_banner",
          "backup_top_banner",
          "home_bulletin_board",
          "home_top_banner",
          "resource_top_banner",
          "video_top_banner"
        ]?.includes(i?.anchor)
    );
  }
} else if (url.includes("/v2/users/home/news")) {
  if (obj.result?.length > 0) {
    obj.result = obj.result.filter((i) => !i?.code?.includes("productUpdate"));
  }
} else if (url.includes("/v1/user/home/widgets") || url.includes("/v2/users/home/widgets")) {
  const item = [
    // "album", // 相册
    "banners", // 顶部奖励
    // "coreFeatures", // 横版图标
    "introduceAlipan", // 认识阿里云盘
    "mainBackup", // 手机备份
    "minorBackup", // 备份设备列表
    // "signIn" // 签到
  ];
  item.forEach((i) => {
    delete obj[i];
  });
}

$done({ body: JSON.stringify(obj) });
}
function __original1(__typedArgs,$argument){
/*
引用地址 https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/adrive.js
*/
// 2024-07-15 22:28:47

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/v1/users/onboard_list")) {
  if (obj.result?.length > 0) {
    obj.result = obj.result.filter(
      (i) =>
        ![
          "backup_list_under_mydevice_banner",
          "backup_top_banner",
          "home_bulletin_board",
          "home_top_banner",
          "resource_top_banner",
          "video_top_banner"
        ]?.includes(i?.anchor)
    );
  }
} else if (url.includes("/v2/users/home/news")) {
  if (obj.result?.length > 0) {
    obj.result = obj.result.filter((i) => !i?.code?.includes("productUpdate"));
  }
} else if (url.includes("/v1/user/home/widgets") || url.includes("/v2/users/home/widgets")) {
  const item = [
    // "album", // 相册
    "banners", // 顶部奖励
    // "coreFeatures", // 横版图标
    "introduceAlipan", // 认识阿里云盘
    "mainBackup", // 手机备份
    "minorBackup", // 备份设备列表
    // "signIn" // 签到
  ];
  item.forEach((i) => {
    delete obj[i];
  });
}

$done({ body: JSON.stringify(obj) });
}
const __originals=[__original0,__original1];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://(biz)?api\\.alipan\\.com/apps/v\\d/users?/home/(news|widgets)","i").exec(__url))){return __invoke(0,{},null);}
if((true) && (match=new RegExp("^https://member\\.alipan\\.com/v1/users/onboard_list","i").exec(__url))){return __invoke(1,{},null);}
__finish({});
})();
(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
// 2024-07-26 19:09:38
const url = $request.url;
let obj = JSON.parse($response.body);

// 删除匹配卡横幅
if (url.includes("/lover/productList")) {
    delete obj.data.topBannerImg;
    delete obj.data.topBannerIndex;
    delete obj.data.topBannerLink;
}

// 删除密友横幅
if (url.includes("/friends/closeFriend/home")) {
    delete obj.data.banner;
}

// 删除娱乐页面横幅和悬浮窗配置
if (url.includes("/party/config")) {
    delete obj.data.newUserTaskConfig; // 新用户任务配置
    delete obj.data.partyActivityList; // 娱乐页面浮窗
    delete obj.data.partyBannerIndex; // 娱乐页面横幅
    delete obj.data.partyListBanner; // 娱乐页面横幅
    delete obj.data.partyTopBanner; // 娱乐页面横幅
}

// 删除广场搜索填充词
if (url.includes("/post/fetchSearchRecommend")) {
    if (obj.data && obj.data.list) {
        obj.data.list = [];
    }
}

$done({ body: JSON.stringify(obj) });
}
function __original1(__typedArgs,$argument){
// 2024-07-26 19:09:38
const url = $request.url;
let obj = JSON.parse($response.body);

// 删除匹配卡横幅
if (url.includes("/lover/productList")) {
    delete obj.data.topBannerImg;
    delete obj.data.topBannerIndex;
    delete obj.data.topBannerLink;
}

// 删除密友横幅
if (url.includes("/friends/closeFriend/home")) {
    delete obj.data.banner;
}

// 删除娱乐页面横幅和悬浮窗配置
if (url.includes("/party/config")) {
    delete obj.data.newUserTaskConfig; // 新用户任务配置
    delete obj.data.partyActivityList; // 娱乐页面浮窗
    delete obj.data.partyBannerIndex; // 娱乐页面横幅
    delete obj.data.partyListBanner; // 娱乐页面横幅
    delete obj.data.partyTopBanner; // 娱乐页面横幅
}

// 删除广场搜索填充词
if (url.includes("/post/fetchSearchRecommend")) {
    if (obj.data && obj.data.list) {
        obj.data.list = [];
    }
}

$done({ body: JSON.stringify(obj) });
}
function __original2(__typedArgs,$argument){
// 2024-07-26 19:09:38
const url = $request.url;
let obj = JSON.parse($response.body);

// 删除匹配卡横幅
if (url.includes("/lover/productList")) {
    delete obj.data.topBannerImg;
    delete obj.data.topBannerIndex;
    delete obj.data.topBannerLink;
}

// 删除密友横幅
if (url.includes("/friends/closeFriend/home")) {
    delete obj.data.banner;
}

// 删除娱乐页面横幅和悬浮窗配置
if (url.includes("/party/config")) {
    delete obj.data.newUserTaskConfig; // 新用户任务配置
    delete obj.data.partyActivityList; // 娱乐页面浮窗
    delete obj.data.partyBannerIndex; // 娱乐页面横幅
    delete obj.data.partyListBanner; // 娱乐页面横幅
    delete obj.data.partyTopBanner; // 娱乐页面横幅
}

// 删除广场搜索填充词
if (url.includes("/post/fetchSearchRecommend")) {
    if (obj.data && obj.data.list) {
        obj.data.list = [];
    }
}

$done({ body: JSON.stringify(obj) });
}
function __original3(__typedArgs,$argument){
// 2024-07-26 19:09:38
const url = $request.url;
let obj = JSON.parse($response.body);

// 删除匹配卡横幅
if (url.includes("/lover/productList")) {
    delete obj.data.topBannerImg;
    delete obj.data.topBannerIndex;
    delete obj.data.topBannerLink;
}

// 删除密友横幅
if (url.includes("/friends/closeFriend/home")) {
    delete obj.data.banner;
}

// 删除娱乐页面横幅和悬浮窗配置
if (url.includes("/party/config")) {
    delete obj.data.newUserTaskConfig; // 新用户任务配置
    delete obj.data.partyActivityList; // 娱乐页面浮窗
    delete obj.data.partyBannerIndex; // 娱乐页面横幅
    delete obj.data.partyListBanner; // 娱乐页面横幅
    delete obj.data.partyTopBanner; // 娱乐页面横幅
}

// 删除广场搜索填充词
if (url.includes("/post/fetchSearchRecommend")) {
    if (obj.data && obj.data.list) {
        obj.data.list = [];
    }
}

$done({ body: JSON.stringify(obj) });
}
const __originals=[__original0,__original1,__original2,__original3];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://api\\.chenlongtech\\.cn/v\\d/lover/productList","i").exec(__url))){return __invoke(0,{},null);}
if((true) && (match=new RegExp("^https://api\\.chenlongtech\\.cn/v\\d/friends/closeFriend/home","i").exec(__url))){return __invoke(1,{},null);}
if((true) && (match=new RegExp("^https://api\\.chenlongtech\\.cn/v\\d/party/config$","i").exec(__url))){return __invoke(2,{},null);}
if((true) && (match=new RegExp("^https://api\\.chenlongtech\\.cn/v1/post/fetchSearchRecommend$","i").exec(__url))){return __invoke(3,{},null);}
__finish({});
})();
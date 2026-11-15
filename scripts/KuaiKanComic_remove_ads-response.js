(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-19 05:14:35
const url = $request.url;
const body = $response.body;

if (!body) $done({});

let obj;
try {
    obj = JSON.parse(body);
} catch (e) {
    console.error("JSON解析错误:", e);
    $done({});
}

const regexTabList = /\/v\d\/ironman\/discovery_v\d\/tab_list_v\d/; // 首页 - 热门 - 顶部标签
const regexConfigs = /\/v\d\/graph\/homepage\/comicVideo\/v\d\/configs/; // 社区 - 发现 - 顶部标签
const regexUnifiedFeed = /\/v\d\/graph\/unified_feed$/; // 社区 - 广场轮播图、作者说 - 商品推广

const targetTitles = ["KK评委", "2024新漫报到", "VIP"]; // 首页 - 热门 - 顶部标签
const targetDescs = ["超级漫画节", "在kk当评委", "屈臣氏·KKCOS大赏", "KK朋友圈", "KK运势"]; // 社区 - 发现 - 顶部标签

function removeObjectsWith(obj, key, targets) {
    if (Array.isArray(obj)) {
        return obj.filter(item => !item[key] || !targets.includes(item[key]));
    } else if (typeof obj === 'object' && obj !== null) {
        for (let k in obj) {
            if (obj[k] && typeof obj[k] === 'object') {
                if (obj[k][key] && targets.includes(obj[k][key])) {
                    delete obj[k];
                } else {
                    obj[k] = removeObjectsWith(obj[k], key, targets);
                }
            }
        }
    }
    return obj;
}

function processUnifiedFeed(obj) {
    if (obj.data && obj.data.universalModels) {
        obj.data.universalModels.forEach(model => {
            if (model.loopBanner) {
                delete model.loopBanner; // 社区 - 广场轮播图
            }
            if (model.post && model.post.promotions && model.post.promotions[0] && model.post.promotions[0].type === 4) {
                delete model.post.promotions; // 社区 - 作者说 - 商品推广
            }
        });
    }
    return obj;
}

if (regexTabList.test(url)) {
    obj = removeObjectsWith(obj, 'title', targetTitles);
}

if (regexConfigs.test(url)) {
    obj = removeObjectsWith(obj, 'desc', targetDescs);
}

// 修改广告参数
if (url.includes("/ironman/comic/recommend")) {
    const keysToDelete = [
        "operation_float_ball",
        "topic_goods",
        "total_coupon",
        "share_comics_page_lottery"
    ];
    keysToDelete.forEach(key => delete obj.data[key]);
}

if (regexUnifiedFeed.test(url)) {
    obj = processUnifiedFeed(obj);
}

$done({ body: JSON.stringify(obj) });

}
function __original1(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-19 05:14:35
const url = $request.url;
const body = $response.body;

if (!body) $done({});

let obj;
try {
    obj = JSON.parse(body);
} catch (e) {
    console.error("JSON解析错误:", e);
    $done({});
}

const regexTabList = /\/v\d\/ironman\/discovery_v\d\/tab_list_v\d/; // 首页 - 热门 - 顶部标签
const regexConfigs = /\/v\d\/graph\/homepage\/comicVideo\/v\d\/configs/; // 社区 - 发现 - 顶部标签
const regexUnifiedFeed = /\/v\d\/graph\/unified_feed$/; // 社区 - 广场轮播图、作者说 - 商品推广

const targetTitles = ["KK评委", "2024新漫报到", "VIP"]; // 首页 - 热门 - 顶部标签
const targetDescs = ["超级漫画节", "在kk当评委", "屈臣氏·KKCOS大赏", "KK朋友圈", "KK运势"]; // 社区 - 发现 - 顶部标签

function removeObjectsWith(obj, key, targets) {
    if (Array.isArray(obj)) {
        return obj.filter(item => !item[key] || !targets.includes(item[key]));
    } else if (typeof obj === 'object' && obj !== null) {
        for (let k in obj) {
            if (obj[k] && typeof obj[k] === 'object') {
                if (obj[k][key] && targets.includes(obj[k][key])) {
                    delete obj[k];
                } else {
                    obj[k] = removeObjectsWith(obj[k], key, targets);
                }
            }
        }
    }
    return obj;
}

function processUnifiedFeed(obj) {
    if (obj.data && obj.data.universalModels) {
        obj.data.universalModels.forEach(model => {
            if (model.loopBanner) {
                delete model.loopBanner; // 社区 - 广场轮播图
            }
            if (model.post && model.post.promotions && model.post.promotions[0] && model.post.promotions[0].type === 4) {
                delete model.post.promotions; // 社区 - 作者说 - 商品推广
            }
        });
    }
    return obj;
}

if (regexTabList.test(url)) {
    obj = removeObjectsWith(obj, 'title', targetTitles);
}

if (regexConfigs.test(url)) {
    obj = removeObjectsWith(obj, 'desc', targetDescs);
}

// 修改广告参数
if (url.includes("/ironman/comic/recommend")) {
    const keysToDelete = [
        "operation_float_ball",
        "topic_goods",
        "total_coupon",
        "share_comics_page_lottery"
    ];
    keysToDelete.forEach(key => delete obj.data[key]);
}

if (regexUnifiedFeed.test(url)) {
    obj = processUnifiedFeed(obj);
}

$done({ body: JSON.stringify(obj) });

}
function __original2(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-19 05:14:35
const url = $request.url;
const body = $response.body;

if (!body) $done({});

let obj;
try {
    obj = JSON.parse(body);
} catch (e) {
    console.error("JSON解析错误:", e);
    $done({});
}

const regexTabList = /\/v\d\/ironman\/discovery_v\d\/tab_list_v\d/; // 首页 - 热门 - 顶部标签
const regexConfigs = /\/v\d\/graph\/homepage\/comicVideo\/v\d\/configs/; // 社区 - 发现 - 顶部标签
const regexUnifiedFeed = /\/v\d\/graph\/unified_feed$/; // 社区 - 广场轮播图、作者说 - 商品推广

const targetTitles = ["KK评委", "2024新漫报到", "VIP"]; // 首页 - 热门 - 顶部标签
const targetDescs = ["超级漫画节", "在kk当评委", "屈臣氏·KKCOS大赏", "KK朋友圈", "KK运势"]; // 社区 - 发现 - 顶部标签

function removeObjectsWith(obj, key, targets) {
    if (Array.isArray(obj)) {
        return obj.filter(item => !item[key] || !targets.includes(item[key]));
    } else if (typeof obj === 'object' && obj !== null) {
        for (let k in obj) {
            if (obj[k] && typeof obj[k] === 'object') {
                if (obj[k][key] && targets.includes(obj[k][key])) {
                    delete obj[k];
                } else {
                    obj[k] = removeObjectsWith(obj[k], key, targets);
                }
            }
        }
    }
    return obj;
}

function processUnifiedFeed(obj) {
    if (obj.data && obj.data.universalModels) {
        obj.data.universalModels.forEach(model => {
            if (model.loopBanner) {
                delete model.loopBanner; // 社区 - 广场轮播图
            }
            if (model.post && model.post.promotions && model.post.promotions[0] && model.post.promotions[0].type === 4) {
                delete model.post.promotions; // 社区 - 作者说 - 商品推广
            }
        });
    }
    return obj;
}

if (regexTabList.test(url)) {
    obj = removeObjectsWith(obj, 'title', targetTitles);
}

if (regexConfigs.test(url)) {
    obj = removeObjectsWith(obj, 'desc', targetDescs);
}

// 修改广告参数
if (url.includes("/ironman/comic/recommend")) {
    const keysToDelete = [
        "operation_float_ball",
        "topic_goods",
        "total_coupon",
        "share_comics_page_lottery"
    ];
    keysToDelete.forEach(key => delete obj.data[key]);
}

if (regexUnifiedFeed.test(url)) {
    obj = processUnifiedFeed(obj);
}

$done({ body: JSON.stringify(obj) });

}
function __original3(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-19 05:14:35
const url = $request.url;
const body = $response.body;

if (!body) $done({});

let obj;
try {
    obj = JSON.parse(body);
} catch (e) {
    console.error("JSON解析错误:", e);
    $done({});
}

const regexTabList = /\/v\d\/ironman\/discovery_v\d\/tab_list_v\d/; // 首页 - 热门 - 顶部标签
const regexConfigs = /\/v\d\/graph\/homepage\/comicVideo\/v\d\/configs/; // 社区 - 发现 - 顶部标签
const regexUnifiedFeed = /\/v\d\/graph\/unified_feed$/; // 社区 - 广场轮播图、作者说 - 商品推广

const targetTitles = ["KK评委", "2024新漫报到", "VIP"]; // 首页 - 热门 - 顶部标签
const targetDescs = ["超级漫画节", "在kk当评委", "屈臣氏·KKCOS大赏", "KK朋友圈", "KK运势"]; // 社区 - 发现 - 顶部标签

function removeObjectsWith(obj, key, targets) {
    if (Array.isArray(obj)) {
        return obj.filter(item => !item[key] || !targets.includes(item[key]));
    } else if (typeof obj === 'object' && obj !== null) {
        for (let k in obj) {
            if (obj[k] && typeof obj[k] === 'object') {
                if (obj[k][key] && targets.includes(obj[k][key])) {
                    delete obj[k];
                } else {
                    obj[k] = removeObjectsWith(obj[k], key, targets);
                }
            }
        }
    }
    return obj;
}

function processUnifiedFeed(obj) {
    if (obj.data && obj.data.universalModels) {
        obj.data.universalModels.forEach(model => {
            if (model.loopBanner) {
                delete model.loopBanner; // 社区 - 广场轮播图
            }
            if (model.post && model.post.promotions && model.post.promotions[0] && model.post.promotions[0].type === 4) {
                delete model.post.promotions; // 社区 - 作者说 - 商品推广
            }
        });
    }
    return obj;
}

if (regexTabList.test(url)) {
    obj = removeObjectsWith(obj, 'title', targetTitles);
}

if (regexConfigs.test(url)) {
    obj = removeObjectsWith(obj, 'desc', targetDescs);
}

// 修改广告参数
if (url.includes("/ironman/comic/recommend")) {
    const keysToDelete = [
        "operation_float_ball",
        "topic_goods",
        "total_coupon",
        "share_comics_page_lottery"
    ];
    keysToDelete.forEach(key => delete obj.data[key]);
}

if (regexUnifiedFeed.test(url)) {
    obj = processUnifiedFeed(obj);
}

$done({ body: JSON.stringify(obj) });

}
const __originals=[__original0,__original1,__original2,__original3];

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
if((true) && (match=new RegExp("^https://(cdn-)?api\\.kkmh\\.com/v\\d/ironman/comic/recommend","i").exec(__url))){return __invoke(0,{},null,false,true);}
if((true) && (match=new RegExp("^https://(cdn-)?api\\.kkmh\\.com/v\\d/ironman/discovery_v\\d/tab_list_v\\d","i").exec(__url))){return __invoke(1,{},null,false,true);}
if((true) && (match=new RegExp("^https://(cdn-)?social\\.kkmh\\.com/v\\d/graph/homepage/comicVideo/v\\d/configs","i").exec(__url))){return __invoke(2,{},null,false,true);}
if((true) && (match=new RegExp("^https://(cdn-)?social\\.kkmh\\.com/v\\d/graph/unified_feed$","i").exec(__url))){return __invoke(3,{},null,false,true);}
__finish({});
})();
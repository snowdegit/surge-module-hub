(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-17 18:20:06
let url = $request.url;
try {
    let obj = JSON.parse($response.body);

    // 删除首页 - 左上角以旧换新
    if (/\/news_v\d+(?:\.\d+){2}\/news\/homenavigation/.test(url)) {
        delete obj.result.leftops;
    }

    // 删除社区广场 - 广告轮播图
    if (/\/club_v\d+(?:\.\d+){2}\/club\/index\/businessv\d+/.test(url)) {
        delete obj.result.bannerlist;
    }

    // 删除选车 - 直播浮窗
    if (url.includes("/carstreaming/selectcarportal/reclist")) {
        delete obj.result.liveinfo;
    }
    
    // 删除我的页面 - 移除添加我的爱车领券
    if (/\/platform\/carserver\/carcard\/mycardv\d+/.test(url)) {
      delete obj.result.nocartext;
  }

    // 删除我的页面 - 热门活动
    if (/\/platform\/carserver\/carcard\/cards/.test(url)) {
      delete obj.result.list[0];
  }

    // 遍历关键词删除
    function removeItemsWithKeywords(objc, keyword) {
        var otherlist = objc["result"]["otherlist"]
        if (Array.isArray(otherlist)) {
          otherlist = otherlist.filter(function(ol) {
            var lists = ol["list"]
            if (Array.isArray(lists)) {
              for (let index in lists) {
                var item = lists[index]
                if (item["title"] === keyword) {
                  return false
                }
              }
            }
            return true
          });
        }
        objc["result"]["otherlist"] = otherlist
        return objc
    }

    // 选车 - 新车报价页面直播内容
    if (url.includes("/carstreaming/selectcarportal/seriestopwithtagscard")) {
        obj = removeItemsWithKeywords(obj, "直播中");
        obj = removeItemsWithKeywords(obj, "报价中");
    }

    // 删除二手车 - 竖版轮播图
    if (/\/apic\/v\d+\/gethomepagefeed/.test(url)) {
        obj = removeItemsWithKeywords(obj, "车抵贷");
    }

    // 精简精选服务、全部服务
    if (/\/platform\/carserver\/((usercenter\/getservicecards)|(carcard\/allcard))/.test(url)) {
        obj = removeItemsWithKeywords(obj, "低息借钱");
        obj = removeItemsWithKeywords(obj, "分期购车");
        obj = removeItemsWithKeywords(obj, "车主贷");
        obj = removeItemsWithKeywords(obj, "测贷款额度");
        obj = removeItemsWithKeywords(obj, "测贷款额");
    }

    console.log(JSON.stringify(obj))
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.error(e);
    $done({ body: $response.body });
}
}
function __original1(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-17 18:20:06
let url = $request.url;
try {
    let obj = JSON.parse($response.body);

    // 删除首页 - 左上角以旧换新
    if (/\/news_v\d+(?:\.\d+){2}\/news\/homenavigation/.test(url)) {
        delete obj.result.leftops;
    }

    // 删除社区广场 - 广告轮播图
    if (/\/club_v\d+(?:\.\d+){2}\/club\/index\/businessv\d+/.test(url)) {
        delete obj.result.bannerlist;
    }

    // 删除选车 - 直播浮窗
    if (url.includes("/carstreaming/selectcarportal/reclist")) {
        delete obj.result.liveinfo;
    }
    
    // 删除我的页面 - 移除添加我的爱车领券
    if (/\/platform\/carserver\/carcard\/mycardv\d+/.test(url)) {
      delete obj.result.nocartext;
  }

    // 删除我的页面 - 热门活动
    if (/\/platform\/carserver\/carcard\/cards/.test(url)) {
      delete obj.result.list[0];
  }

    // 遍历关键词删除
    function removeItemsWithKeywords(objc, keyword) {
        var otherlist = objc["result"]["otherlist"]
        if (Array.isArray(otherlist)) {
          otherlist = otherlist.filter(function(ol) {
            var lists = ol["list"]
            if (Array.isArray(lists)) {
              for (let index in lists) {
                var item = lists[index]
                if (item["title"] === keyword) {
                  return false
                }
              }
            }
            return true
          });
        }
        objc["result"]["otherlist"] = otherlist
        return objc
    }

    // 选车 - 新车报价页面直播内容
    if (url.includes("/carstreaming/selectcarportal/seriestopwithtagscard")) {
        obj = removeItemsWithKeywords(obj, "直播中");
        obj = removeItemsWithKeywords(obj, "报价中");
    }

    // 删除二手车 - 竖版轮播图
    if (/\/apic\/v\d+\/gethomepagefeed/.test(url)) {
        obj = removeItemsWithKeywords(obj, "车抵贷");
    }

    // 精简精选服务、全部服务
    if (/\/platform\/carserver\/((usercenter\/getservicecards)|(carcard\/allcard))/.test(url)) {
        obj = removeItemsWithKeywords(obj, "低息借钱");
        obj = removeItemsWithKeywords(obj, "分期购车");
        obj = removeItemsWithKeywords(obj, "车主贷");
        obj = removeItemsWithKeywords(obj, "测贷款额度");
        obj = removeItemsWithKeywords(obj, "测贷款额");
    }

    console.log(JSON.stringify(obj))
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.error(e);
    $done({ body: $response.body });
}
}
function __original2(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-17 18:20:06
let url = $request.url;
try {
    let obj = JSON.parse($response.body);

    // 删除首页 - 左上角以旧换新
    if (/\/news_v\d+(?:\.\d+){2}\/news\/homenavigation/.test(url)) {
        delete obj.result.leftops;
    }

    // 删除社区广场 - 广告轮播图
    if (/\/club_v\d+(?:\.\d+){2}\/club\/index\/businessv\d+/.test(url)) {
        delete obj.result.bannerlist;
    }

    // 删除选车 - 直播浮窗
    if (url.includes("/carstreaming/selectcarportal/reclist")) {
        delete obj.result.liveinfo;
    }
    
    // 删除我的页面 - 移除添加我的爱车领券
    if (/\/platform\/carserver\/carcard\/mycardv\d+/.test(url)) {
      delete obj.result.nocartext;
  }

    // 删除我的页面 - 热门活动
    if (/\/platform\/carserver\/carcard\/cards/.test(url)) {
      delete obj.result.list[0];
  }

    // 遍历关键词删除
    function removeItemsWithKeywords(objc, keyword) {
        var otherlist = objc["result"]["otherlist"]
        if (Array.isArray(otherlist)) {
          otherlist = otherlist.filter(function(ol) {
            var lists = ol["list"]
            if (Array.isArray(lists)) {
              for (let index in lists) {
                var item = lists[index]
                if (item["title"] === keyword) {
                  return false
                }
              }
            }
            return true
          });
        }
        objc["result"]["otherlist"] = otherlist
        return objc
    }

    // 选车 - 新车报价页面直播内容
    if (url.includes("/carstreaming/selectcarportal/seriestopwithtagscard")) {
        obj = removeItemsWithKeywords(obj, "直播中");
        obj = removeItemsWithKeywords(obj, "报价中");
    }

    // 删除二手车 - 竖版轮播图
    if (/\/apic\/v\d+\/gethomepagefeed/.test(url)) {
        obj = removeItemsWithKeywords(obj, "车抵贷");
    }

    // 精简精选服务、全部服务
    if (/\/platform\/carserver\/((usercenter\/getservicecards)|(carcard\/allcard))/.test(url)) {
        obj = removeItemsWithKeywords(obj, "低息借钱");
        obj = removeItemsWithKeywords(obj, "分期购车");
        obj = removeItemsWithKeywords(obj, "车主贷");
        obj = removeItemsWithKeywords(obj, "测贷款额度");
        obj = removeItemsWithKeywords(obj, "测贷款额");
    }

    console.log(JSON.stringify(obj))
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.error(e);
    $done({ body: $response.body });
}
}
function __original3(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-17 18:20:06
let url = $request.url;
try {
    let obj = JSON.parse($response.body);

    // 删除首页 - 左上角以旧换新
    if (/\/news_v\d+(?:\.\d+){2}\/news\/homenavigation/.test(url)) {
        delete obj.result.leftops;
    }

    // 删除社区广场 - 广告轮播图
    if (/\/club_v\d+(?:\.\d+){2}\/club\/index\/businessv\d+/.test(url)) {
        delete obj.result.bannerlist;
    }

    // 删除选车 - 直播浮窗
    if (url.includes("/carstreaming/selectcarportal/reclist")) {
        delete obj.result.liveinfo;
    }
    
    // 删除我的页面 - 移除添加我的爱车领券
    if (/\/platform\/carserver\/carcard\/mycardv\d+/.test(url)) {
      delete obj.result.nocartext;
  }

    // 删除我的页面 - 热门活动
    if (/\/platform\/carserver\/carcard\/cards/.test(url)) {
      delete obj.result.list[0];
  }

    // 遍历关键词删除
    function removeItemsWithKeywords(objc, keyword) {
        var otherlist = objc["result"]["otherlist"]
        if (Array.isArray(otherlist)) {
          otherlist = otherlist.filter(function(ol) {
            var lists = ol["list"]
            if (Array.isArray(lists)) {
              for (let index in lists) {
                var item = lists[index]
                if (item["title"] === keyword) {
                  return false
                }
              }
            }
            return true
          });
        }
        objc["result"]["otherlist"] = otherlist
        return objc
    }

    // 选车 - 新车报价页面直播内容
    if (url.includes("/carstreaming/selectcarportal/seriestopwithtagscard")) {
        obj = removeItemsWithKeywords(obj, "直播中");
        obj = removeItemsWithKeywords(obj, "报价中");
    }

    // 删除二手车 - 竖版轮播图
    if (/\/apic\/v\d+\/gethomepagefeed/.test(url)) {
        obj = removeItemsWithKeywords(obj, "车抵贷");
    }

    // 精简精选服务、全部服务
    if (/\/platform\/carserver\/((usercenter\/getservicecards)|(carcard\/allcard))/.test(url)) {
        obj = removeItemsWithKeywords(obj, "低息借钱");
        obj = removeItemsWithKeywords(obj, "分期购车");
        obj = removeItemsWithKeywords(obj, "车主贷");
        obj = removeItemsWithKeywords(obj, "测贷款额度");
        obj = removeItemsWithKeywords(obj, "测贷款额");
    }

    console.log(JSON.stringify(obj))
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.error(e);
    $done({ body: $response.body });
}
}
function __original4(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-17 18:20:06
let url = $request.url;
try {
    let obj = JSON.parse($response.body);

    // 删除首页 - 左上角以旧换新
    if (/\/news_v\d+(?:\.\d+){2}\/news\/homenavigation/.test(url)) {
        delete obj.result.leftops;
    }

    // 删除社区广场 - 广告轮播图
    if (/\/club_v\d+(?:\.\d+){2}\/club\/index\/businessv\d+/.test(url)) {
        delete obj.result.bannerlist;
    }

    // 删除选车 - 直播浮窗
    if (url.includes("/carstreaming/selectcarportal/reclist")) {
        delete obj.result.liveinfo;
    }
    
    // 删除我的页面 - 移除添加我的爱车领券
    if (/\/platform\/carserver\/carcard\/mycardv\d+/.test(url)) {
      delete obj.result.nocartext;
  }

    // 删除我的页面 - 热门活动
    if (/\/platform\/carserver\/carcard\/cards/.test(url)) {
      delete obj.result.list[0];
  }

    // 遍历关键词删除
    function removeItemsWithKeywords(objc, keyword) {
        var otherlist = objc["result"]["otherlist"]
        if (Array.isArray(otherlist)) {
          otherlist = otherlist.filter(function(ol) {
            var lists = ol["list"]
            if (Array.isArray(lists)) {
              for (let index in lists) {
                var item = lists[index]
                if (item["title"] === keyword) {
                  return false
                }
              }
            }
            return true
          });
        }
        objc["result"]["otherlist"] = otherlist
        return objc
    }

    // 选车 - 新车报价页面直播内容
    if (url.includes("/carstreaming/selectcarportal/seriestopwithtagscard")) {
        obj = removeItemsWithKeywords(obj, "直播中");
        obj = removeItemsWithKeywords(obj, "报价中");
    }

    // 删除二手车 - 竖版轮播图
    if (/\/apic\/v\d+\/gethomepagefeed/.test(url)) {
        obj = removeItemsWithKeywords(obj, "车抵贷");
    }

    // 精简精选服务、全部服务
    if (/\/platform\/carserver\/((usercenter\/getservicecards)|(carcard\/allcard))/.test(url)) {
        obj = removeItemsWithKeywords(obj, "低息借钱");
        obj = removeItemsWithKeywords(obj, "分期购车");
        obj = removeItemsWithKeywords(obj, "车主贷");
        obj = removeItemsWithKeywords(obj, "测贷款额度");
        obj = removeItemsWithKeywords(obj, "测贷款额");
    }

    console.log(JSON.stringify(obj))
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.error(e);
    $done({ body: $response.body });
}
}
function __original5(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-17 18:20:06
let url = $request.url;
try {
    let obj = JSON.parse($response.body);

    // 删除首页 - 左上角以旧换新
    if (/\/news_v\d+(?:\.\d+){2}\/news\/homenavigation/.test(url)) {
        delete obj.result.leftops;
    }

    // 删除社区广场 - 广告轮播图
    if (/\/club_v\d+(?:\.\d+){2}\/club\/index\/businessv\d+/.test(url)) {
        delete obj.result.bannerlist;
    }

    // 删除选车 - 直播浮窗
    if (url.includes("/carstreaming/selectcarportal/reclist")) {
        delete obj.result.liveinfo;
    }
    
    // 删除我的页面 - 移除添加我的爱车领券
    if (/\/platform\/carserver\/carcard\/mycardv\d+/.test(url)) {
      delete obj.result.nocartext;
  }

    // 删除我的页面 - 热门活动
    if (/\/platform\/carserver\/carcard\/cards/.test(url)) {
      delete obj.result.list[0];
  }

    // 遍历关键词删除
    function removeItemsWithKeywords(objc, keyword) {
        var otherlist = objc["result"]["otherlist"]
        if (Array.isArray(otherlist)) {
          otherlist = otherlist.filter(function(ol) {
            var lists = ol["list"]
            if (Array.isArray(lists)) {
              for (let index in lists) {
                var item = lists[index]
                if (item["title"] === keyword) {
                  return false
                }
              }
            }
            return true
          });
        }
        objc["result"]["otherlist"] = otherlist
        return objc
    }

    // 选车 - 新车报价页面直播内容
    if (url.includes("/carstreaming/selectcarportal/seriestopwithtagscard")) {
        obj = removeItemsWithKeywords(obj, "直播中");
        obj = removeItemsWithKeywords(obj, "报价中");
    }

    // 删除二手车 - 竖版轮播图
    if (/\/apic\/v\d+\/gethomepagefeed/.test(url)) {
        obj = removeItemsWithKeywords(obj, "车抵贷");
    }

    // 精简精选服务、全部服务
    if (/\/platform\/carserver\/((usercenter\/getservicecards)|(carcard\/allcard))/.test(url)) {
        obj = removeItemsWithKeywords(obj, "低息借钱");
        obj = removeItemsWithKeywords(obj, "分期购车");
        obj = removeItemsWithKeywords(obj, "车主贷");
        obj = removeItemsWithKeywords(obj, "测贷款额度");
        obj = removeItemsWithKeywords(obj, "测贷款额");
    }

    console.log(JSON.stringify(obj))
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.error(e);
    $done({ body: $response.body });
}
}
const __originals=[__original0,__original1,__original2,__original3,__original4,__original5];

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
if((true) && (match=new RegExp("^https://news\\.app\\.autohome\\.com\\.cn/news_v\\d+(?:\\.\\d+){2}/news/homenavigation","i").exec(__url))){return __invoke(0,{},null,false,true);}
if((true) && (match=new RegExp("^https://(a\\.athm\\.cn/)?mobile\\.app\\.autohome\\.com\\.cn/platform/carserver/((usercenter/getservicecards)|(carcard/allcard)|(carcard/mycardv\\d+)|(carcard/cards))","i").exec(__url))){return __invoke(1,{},null,false,true);}
if((true) && (match=new RegExp("^https://(a\\.athm\\.cn/)?club\\.app\\.autohome\\.com\\.cn/club_v\\d+(?:\\.\\d+){2}/club/index/businessv\\d+","i").exec(__url))){return __invoke(2,{},null,false,true);}
if((true) && (match=new RegExp("^https://(a\\.athm\\.cn/)?cars\\.app\\.autohome\\.com\\.cn/carstreaming/selectcarportal/reclist","i").exec(__url))){return __invoke(3,{},null,false,true);}
if((true) && (match=new RegExp("^https://(a\\.athm\\.cn/)?cars\\.app\\.autohome\\.com\\.cn/carstreaming/selectcarportal/seriestopwithtagscard","i").exec(__url))){return __invoke(4,{},null,false,true);}
if((true) && (match=new RegExp("^https://(a\\.athm\\.cn/)?apiautoappusc\\.che168\\.com/apic/v\\d+/gethomepagefeed","i").exec(__url))){return __invoke(5,{},null,false,true);}
__finish({});
})();
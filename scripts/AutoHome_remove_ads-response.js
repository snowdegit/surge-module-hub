(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
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
function __original1(__typedArgs,$argument){
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
function __original2(__typedArgs,$argument){
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
function __original3(__typedArgs,$argument){
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
function __original4(__typedArgs,$argument){
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
function __original5(__typedArgs,$argument){
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
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://news\\.app\\.autohome\\.com\\.cn/news_v\\d+(?:\\.\\d+){2}/news/homenavigation","i").exec(__url))){return __invoke(0,{},null);}
if((true) && (match=new RegExp("^https://(a\\.athm\\.cn/)?mobile\\.app\\.autohome\\.com\\.cn/platform/carserver/((usercenter/getservicecards)|(carcard/allcard)|(carcard/mycardv\\d+)|(carcard/cards))","i").exec(__url))){return __invoke(1,{},null);}
if((true) && (match=new RegExp("^https://(a\\.athm\\.cn/)?club\\.app\\.autohome\\.com\\.cn/club_v\\d+(?:\\.\\d+){2}/club/index/businessv\\d+","i").exec(__url))){return __invoke(2,{},null);}
if((true) && (match=new RegExp("^https://(a\\.athm\\.cn/)?cars\\.app\\.autohome\\.com\\.cn/carstreaming/selectcarportal/reclist","i").exec(__url))){return __invoke(3,{},null);}
if((true) && (match=new RegExp("^https://(a\\.athm\\.cn/)?cars\\.app\\.autohome\\.com\\.cn/carstreaming/selectcarportal/seriestopwithtagscard","i").exec(__url))){return __invoke(4,{},null);}
if((true) && (match=new RegExp("^https://(a\\.athm\\.cn/)?apiautoappusc\\.che168\\.com/apic/v\\d+/gethomepagefeed","i").exec(__url))){return __invoke(5,{},null);}
__finish({});
})();
(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/break/caixin.js
*/
// 2024-07-16 20:00

var url = $request.url;
const isQuanX = typeof $task !== "undefined";

if (url.includes("/gg.caixin.com/s")) {
  // 开屏广告
  let body = $response.body;
  if (body === undefined) {
    $done({});
  } else {
    body = body
      .replace(/"showfrequency":\d+/g, '"showfrequency":0')
      .replace(/"showintval":\d+/g, '"showintval":0')
      .replace(/"showcycle":\d+/g, '"showcycle":604800')
      .replace(/"intval":\d+/g, '"intval":0')
      .replace(/"sday":"[^"]*"/g, '"sday":"2090-12-31 00:00:00"')
      .replace(/"eday":"[^"]*"/g, '"eday":"2090-12-31 23:59:59"')
      .replace(/"banner":/g, "ban0:");
    $done({ body });
  }
} else {
  if (!$response) $done({});
  if (!$response.body) $done({});
  let obj = JSON.parse($response.body);
  if (url.includes("/api/dataplus/columns")) {
    // 首页-数据通
    const items = ["buttonColor", "buttonText", "buyUrl", "descText"];
    if (obj?.data?.length > 0) {
      for (let item of obj.data) {
        for (let i of items) {
          delete item[i];
        }
      }
    }
  } else if (url.includes("/articlev5/")) {
    // 文章底部-相关阅读
    if (obj?.data?.relatarticle?.length > 0) {
      obj.data.relatarticle = [];
    }
  } else if (url.includes("/caixinapp/appinfo")) {
    // 文章详情页
    if (obj?.data?.articlePromotionList?.length > 0) {
      // 文章底部推广图
      obj.data.articlePromotionList = [];
    }
  } else if (url.includes("/channelv5/list")) {
    // 首页-顶部分类列表
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
  } else if (url.includes("/fm/index/list")) {
    // 首页-财新fm
    const items = ["androidAdList", "headlines", "iosAdList"];
    if (obj?.data) {
      for (let i of items) {
        if (obj?.data?.[i]?.length > 0) {
          obj.data[i] = [];
        }
      }
    }
  } else if (url.includes("/index_page_v5")) {
    // 首页-信息流
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
    if (obj?.data?.list?.length > 0) {
      obj.data.list = obj.data.list.filter((i) => !["金融我闻", "财新数据通"]?.includes(i?.channel_name));
    }
  } else if (url.includes("/search/getkeyword")) {
    // 搜索框填充词
    if (obj?.data?.keys?.length > 0) {
      obj.data.keys = [];
    }
  }
  $done({ body: JSON.stringify(obj) });
}
}
function __original1(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/break/caixin.js
*/
// 2024-07-16 20:00

var url = $request.url;
const isQuanX = typeof $task !== "undefined";

if (url.includes("/gg.caixin.com/s")) {
  // 开屏广告
  let body = $response.body;
  if (body === undefined) {
    $done({});
  } else {
    body = body
      .replace(/"showfrequency":\d+/g, '"showfrequency":0')
      .replace(/"showintval":\d+/g, '"showintval":0')
      .replace(/"showcycle":\d+/g, '"showcycle":604800')
      .replace(/"intval":\d+/g, '"intval":0')
      .replace(/"sday":"[^"]*"/g, '"sday":"2090-12-31 00:00:00"')
      .replace(/"eday":"[^"]*"/g, '"eday":"2090-12-31 23:59:59"')
      .replace(/"banner":/g, "ban0:");
    $done({ body });
  }
} else {
  if (!$response) $done({});
  if (!$response.body) $done({});
  let obj = JSON.parse($response.body);
  if (url.includes("/api/dataplus/columns")) {
    // 首页-数据通
    const items = ["buttonColor", "buttonText", "buyUrl", "descText"];
    if (obj?.data?.length > 0) {
      for (let item of obj.data) {
        for (let i of items) {
          delete item[i];
        }
      }
    }
  } else if (url.includes("/articlev5/")) {
    // 文章底部-相关阅读
    if (obj?.data?.relatarticle?.length > 0) {
      obj.data.relatarticle = [];
    }
  } else if (url.includes("/caixinapp/appinfo")) {
    // 文章详情页
    if (obj?.data?.articlePromotionList?.length > 0) {
      // 文章底部推广图
      obj.data.articlePromotionList = [];
    }
  } else if (url.includes("/channelv5/list")) {
    // 首页-顶部分类列表
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
  } else if (url.includes("/fm/index/list")) {
    // 首页-财新fm
    const items = ["androidAdList", "headlines", "iosAdList"];
    if (obj?.data) {
      for (let i of items) {
        if (obj?.data?.[i]?.length > 0) {
          obj.data[i] = [];
        }
      }
    }
  } else if (url.includes("/index_page_v5")) {
    // 首页-信息流
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
    if (obj?.data?.list?.length > 0) {
      obj.data.list = obj.data.list.filter((i) => !["金融我闻", "财新数据通"]?.includes(i?.channel_name));
    }
  } else if (url.includes("/search/getkeyword")) {
    // 搜索框填充词
    if (obj?.data?.keys?.length > 0) {
      obj.data.keys = [];
    }
  }
  $done({ body: JSON.stringify(obj) });
}
}
function __original2(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/break/caixin.js
*/
// 2024-07-16 20:00

var url = $request.url;
const isQuanX = typeof $task !== "undefined";

if (url.includes("/gg.caixin.com/s")) {
  // 开屏广告
  let body = $response.body;
  if (body === undefined) {
    $done({});
  } else {
    body = body
      .replace(/"showfrequency":\d+/g, '"showfrequency":0')
      .replace(/"showintval":\d+/g, '"showintval":0')
      .replace(/"showcycle":\d+/g, '"showcycle":604800')
      .replace(/"intval":\d+/g, '"intval":0')
      .replace(/"sday":"[^"]*"/g, '"sday":"2090-12-31 00:00:00"')
      .replace(/"eday":"[^"]*"/g, '"eday":"2090-12-31 23:59:59"')
      .replace(/"banner":/g, "ban0:");
    $done({ body });
  }
} else {
  if (!$response) $done({});
  if (!$response.body) $done({});
  let obj = JSON.parse($response.body);
  if (url.includes("/api/dataplus/columns")) {
    // 首页-数据通
    const items = ["buttonColor", "buttonText", "buyUrl", "descText"];
    if (obj?.data?.length > 0) {
      for (let item of obj.data) {
        for (let i of items) {
          delete item[i];
        }
      }
    }
  } else if (url.includes("/articlev5/")) {
    // 文章底部-相关阅读
    if (obj?.data?.relatarticle?.length > 0) {
      obj.data.relatarticle = [];
    }
  } else if (url.includes("/caixinapp/appinfo")) {
    // 文章详情页
    if (obj?.data?.articlePromotionList?.length > 0) {
      // 文章底部推广图
      obj.data.articlePromotionList = [];
    }
  } else if (url.includes("/channelv5/list")) {
    // 首页-顶部分类列表
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
  } else if (url.includes("/fm/index/list")) {
    // 首页-财新fm
    const items = ["androidAdList", "headlines", "iosAdList"];
    if (obj?.data) {
      for (let i of items) {
        if (obj?.data?.[i]?.length > 0) {
          obj.data[i] = [];
        }
      }
    }
  } else if (url.includes("/index_page_v5")) {
    // 首页-信息流
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
    if (obj?.data?.list?.length > 0) {
      obj.data.list = obj.data.list.filter((i) => !["金融我闻", "财新数据通"]?.includes(i?.channel_name));
    }
  } else if (url.includes("/search/getkeyword")) {
    // 搜索框填充词
    if (obj?.data?.keys?.length > 0) {
      obj.data.keys = [];
    }
  }
  $done({ body: JSON.stringify(obj) });
}
}
function __original3(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/break/caixin.js
*/
// 2024-07-16 20:00

var url = $request.url;
const isQuanX = typeof $task !== "undefined";

if (url.includes("/gg.caixin.com/s")) {
  // 开屏广告
  let body = $response.body;
  if (body === undefined) {
    $done({});
  } else {
    body = body
      .replace(/"showfrequency":\d+/g, '"showfrequency":0')
      .replace(/"showintval":\d+/g, '"showintval":0')
      .replace(/"showcycle":\d+/g, '"showcycle":604800')
      .replace(/"intval":\d+/g, '"intval":0')
      .replace(/"sday":"[^"]*"/g, '"sday":"2090-12-31 00:00:00"')
      .replace(/"eday":"[^"]*"/g, '"eday":"2090-12-31 23:59:59"')
      .replace(/"banner":/g, "ban0:");
    $done({ body });
  }
} else {
  if (!$response) $done({});
  if (!$response.body) $done({});
  let obj = JSON.parse($response.body);
  if (url.includes("/api/dataplus/columns")) {
    // 首页-数据通
    const items = ["buttonColor", "buttonText", "buyUrl", "descText"];
    if (obj?.data?.length > 0) {
      for (let item of obj.data) {
        for (let i of items) {
          delete item[i];
        }
      }
    }
  } else if (url.includes("/articlev5/")) {
    // 文章底部-相关阅读
    if (obj?.data?.relatarticle?.length > 0) {
      obj.data.relatarticle = [];
    }
  } else if (url.includes("/caixinapp/appinfo")) {
    // 文章详情页
    if (obj?.data?.articlePromotionList?.length > 0) {
      // 文章底部推广图
      obj.data.articlePromotionList = [];
    }
  } else if (url.includes("/channelv5/list")) {
    // 首页-顶部分类列表
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
  } else if (url.includes("/fm/index/list")) {
    // 首页-财新fm
    const items = ["androidAdList", "headlines", "iosAdList"];
    if (obj?.data) {
      for (let i of items) {
        if (obj?.data?.[i]?.length > 0) {
          obj.data[i] = [];
        }
      }
    }
  } else if (url.includes("/index_page_v5")) {
    // 首页-信息流
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
    if (obj?.data?.list?.length > 0) {
      obj.data.list = obj.data.list.filter((i) => !["金融我闻", "财新数据通"]?.includes(i?.channel_name));
    }
  } else if (url.includes("/search/getkeyword")) {
    // 搜索框填充词
    if (obj?.data?.keys?.length > 0) {
      obj.data.keys = [];
    }
  }
  $done({ body: JSON.stringify(obj) });
}
}
function __original4(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/break/caixin.js
*/
// 2024-07-16 20:00

var url = $request.url;
const isQuanX = typeof $task !== "undefined";

if (url.includes("/gg.caixin.com/s")) {
  // 开屏广告
  let body = $response.body;
  if (body === undefined) {
    $done({});
  } else {
    body = body
      .replace(/"showfrequency":\d+/g, '"showfrequency":0')
      .replace(/"showintval":\d+/g, '"showintval":0')
      .replace(/"showcycle":\d+/g, '"showcycle":604800')
      .replace(/"intval":\d+/g, '"intval":0')
      .replace(/"sday":"[^"]*"/g, '"sday":"2090-12-31 00:00:00"')
      .replace(/"eday":"[^"]*"/g, '"eday":"2090-12-31 23:59:59"')
      .replace(/"banner":/g, "ban0:");
    $done({ body });
  }
} else {
  if (!$response) $done({});
  if (!$response.body) $done({});
  let obj = JSON.parse($response.body);
  if (url.includes("/api/dataplus/columns")) {
    // 首页-数据通
    const items = ["buttonColor", "buttonText", "buyUrl", "descText"];
    if (obj?.data?.length > 0) {
      for (let item of obj.data) {
        for (let i of items) {
          delete item[i];
        }
      }
    }
  } else if (url.includes("/articlev5/")) {
    // 文章底部-相关阅读
    if (obj?.data?.relatarticle?.length > 0) {
      obj.data.relatarticle = [];
    }
  } else if (url.includes("/caixinapp/appinfo")) {
    // 文章详情页
    if (obj?.data?.articlePromotionList?.length > 0) {
      // 文章底部推广图
      obj.data.articlePromotionList = [];
    }
  } else if (url.includes("/channelv5/list")) {
    // 首页-顶部分类列表
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
  } else if (url.includes("/fm/index/list")) {
    // 首页-财新fm
    const items = ["androidAdList", "headlines", "iosAdList"];
    if (obj?.data) {
      for (let i of items) {
        if (obj?.data?.[i]?.length > 0) {
          obj.data[i] = [];
        }
      }
    }
  } else if (url.includes("/index_page_v5")) {
    // 首页-信息流
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
    if (obj?.data?.list?.length > 0) {
      obj.data.list = obj.data.list.filter((i) => !["金融我闻", "财新数据通"]?.includes(i?.channel_name));
    }
  } else if (url.includes("/search/getkeyword")) {
    // 搜索框填充词
    if (obj?.data?.keys?.length > 0) {
      obj.data.keys = [];
    }
  }
  $done({ body: JSON.stringify(obj) });
}
}
function __original5(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/break/caixin.js
*/
// 2024-07-16 20:00

var url = $request.url;
const isQuanX = typeof $task !== "undefined";

if (url.includes("/gg.caixin.com/s")) {
  // 开屏广告
  let body = $response.body;
  if (body === undefined) {
    $done({});
  } else {
    body = body
      .replace(/"showfrequency":\d+/g, '"showfrequency":0')
      .replace(/"showintval":\d+/g, '"showintval":0')
      .replace(/"showcycle":\d+/g, '"showcycle":604800')
      .replace(/"intval":\d+/g, '"intval":0')
      .replace(/"sday":"[^"]*"/g, '"sday":"2090-12-31 00:00:00"')
      .replace(/"eday":"[^"]*"/g, '"eday":"2090-12-31 23:59:59"')
      .replace(/"banner":/g, "ban0:");
    $done({ body });
  }
} else {
  if (!$response) $done({});
  if (!$response.body) $done({});
  let obj = JSON.parse($response.body);
  if (url.includes("/api/dataplus/columns")) {
    // 首页-数据通
    const items = ["buttonColor", "buttonText", "buyUrl", "descText"];
    if (obj?.data?.length > 0) {
      for (let item of obj.data) {
        for (let i of items) {
          delete item[i];
        }
      }
    }
  } else if (url.includes("/articlev5/")) {
    // 文章底部-相关阅读
    if (obj?.data?.relatarticle?.length > 0) {
      obj.data.relatarticle = [];
    }
  } else if (url.includes("/caixinapp/appinfo")) {
    // 文章详情页
    if (obj?.data?.articlePromotionList?.length > 0) {
      // 文章底部推广图
      obj.data.articlePromotionList = [];
    }
  } else if (url.includes("/channelv5/list")) {
    // 首页-顶部分类列表
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
  } else if (url.includes("/fm/index/list")) {
    // 首页-财新fm
    const items = ["androidAdList", "headlines", "iosAdList"];
    if (obj?.data) {
      for (let i of items) {
        if (obj?.data?.[i]?.length > 0) {
          obj.data[i] = [];
        }
      }
    }
  } else if (url.includes("/index_page_v5")) {
    // 首页-信息流
    delete obj.data.ios_ad_513;
    delete obj.data.android_ad_513;
    if (obj?.data?.list?.length > 0) {
      obj.data.list = obj.data.list.filter((i) => !["金融我闻", "财新数据通"]?.includes(i?.channel_name));
    }
  } else if (url.includes("/search/getkeyword")) {
    // 搜索框填充词
    if (obj?.data?.keys?.length > 0) {
      obj.data.keys = [];
    }
  }
  $done({ body: JSON.stringify(obj) });
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
if((true) && (match=new RegExp("^https://entities\\.caixin\\.com/api/dataplus/columns","i").exec(__url))){return __invoke(0,{},null,false,true);}
if((true) && (match=new RegExp("^https://gateway\\.caixin\\.com/api/app-api/(caixinapp/appinfo|search/getkeyword)","i").exec(__url))){return __invoke(1,{},null,false,true);}
if((true) && (match=new RegExp("^https://gateway\\.caixin\\.com/api/app-content/fm/index/list\\?","i").exec(__url))){return __invoke(2,{},null,false,true);}
if((true) && (match=new RegExp("^https://gg\\.caixin\\.com/s\\?z=caixin&op=\\d","i").exec(__url))){return __invoke(3,{},null,false,true);}
if((true) && (match=new RegExp("^https://mappsv5\\.caixin\\.com/articlev5/\\d+/\\d+\\.json$","i").exec(__url))){return __invoke(4,{},null,false,true);}
if((true) && (match=new RegExp("^https://mapps?v5\\.caixin\\.com/(channelv5/list|/?index_page_v5/)\\w+","i").exec(__url))){return __invoke(5,{},null,false,true);}
__finish({});
})();
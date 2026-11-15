(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
// 2025-10-24 03:22:31

(() => {
    if (!$response?.body) return $done({});

    let modified = false;
    let body;
    
    try {
        body = JSON.parse($response.body);
    } catch (e) {
        console.log(`JSON解析失败: ${e.message}`);
        return $done({});
    }

    // 获取参数值
    const removeAllBanners = __typedArgs?.removeAllBanners !== undefined ? __typedArgs.removeAllBanners : true;
    const removePinnedArticles = __typedArgs?.removePinnedArticles !== undefined ? __typedArgs.removePinnedArticles : true;
    
    // 移除全部横幅
    const removeAllBannersFunc = () => {
        if (!removeAllBanners) return;
        
        if (Array.isArray(body?.data?.list)) {
            const originalLength = body.data.list.length;
            body.data.list = body.data.list.filter(item => 
                item.feedType !== 10002
            );
            modified ||= (originalLength !== body.data.list.length);
        }
    };
    
    // 移除置顶文章
    const removePinnedArticlesFunc = () => {
        if (!removePinnedArticles) return;
        
        if (Array.isArray(body?.data?.list)) {
            const originalLength = body.data.list.length;
            body.data.list = body.data.list.filter(item => 
                item.feedType !== 10003
            );
            modified ||= (originalLength !== body.data.list.length);
        }
    };
    
    // 移除横幅广告
    const removeBannerAdsFunc = () => {
        if (!Array.isArray(body?.data?.list)) return;
        
        body.data.list.forEach(item => {
            if (item.feedContent?.focusNewsData && Array.isArray(item.feedContent.focusNewsData)) {
                const originalLength = item.feedContent.focusNewsData.length;
                item.feedContent.focusNewsData = item.feedContent.focusNewsData.filter(ad => 
                    !ad.isAd
                );
                modified ||= (originalLength !== item.feedContent.focusNewsData.length);
            }
        });
    };
    
// 移除信息流广告（flag===2 或 feedType===10004，或 smallTags 中有 text==="广告"）
const removeFeedAdsFunc = () => {
    if (!Array.isArray(body?.data?.list)) return;

    const originalLength = body.data.list.length;
    body.data.list = body.data.list.filter(item => {

        if (item.feedContent?.flag === 2 || item.feedType === 10004) {
            return false;
        }

        if (item.feedContent?.smallTags && Array.isArray(item.feedContent.smallTags)) {
            const hasAdTag = item.feedContent.smallTags.some(tag => 
                typeof tag.text === 'string' && tag.text === '广告'
            );
            if (hasAdTag) {
                return false;
            }
        }

        return true;
    });

    modified ||= (originalLength !== body.data.list.length);
};
    
    // 执行所有过滤函数
    removeAllBannersFunc();
    removePinnedArticlesFunc();
    removeBannerAdsFunc();
    removeFeedAdsFunc();
    
    // 仅在修改时重新序列化
    $done(modified ? {
        body: JSON.stringify(body),
    } : {});
})();
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
if((true) && (match=new RegExp("^https://napi\\.ithome\\.com/api/(news/indexv2/iphone/\\d+|topmenu/getfeeds\\?)","i").exec(__url))){return __invoke(0,{"removeAllBanners": false, "removePinnedArticles": false},null,false,true);}
__finish({});
})();
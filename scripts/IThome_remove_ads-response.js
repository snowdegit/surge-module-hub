(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
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
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://napi\\.ithome\\.com/api/(news/indexv2/iphone/\\d+|topmenu/getfeeds\\?)","i").exec(__url))){return __invoke(0,{"removeAllBanners": false, "removePinnedArticles": false},null);}
__finish({});
})();
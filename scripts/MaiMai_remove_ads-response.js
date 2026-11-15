(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
// 2024-08-18 00:53:34
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/maimai/feed/v5/focus_feed?")) {
    if (obj.feeds && Array.isArray(obj.feeds)) {
        obj.feeds = obj.feeds.filter(feed => !feed.newAdStyle);
    }
} else if (url.includes("/maimai/gossip/v3/gossip_detail_comment?")) {
    if (obj.comments && obj.comments.lst && Array.isArray(obj.comments.lst)) {
        obj.comments.lst = obj.comments.lst.filter(comment => !comment.newAdStyle);
    }
} else if (url.includes("/maimai/feed/v6/feed_detail_comment?")) {
    if (obj.lst && Array.isArray(obj.lst)) {
        obj.lst = obj.lst.filter(item => !item.newAdStyle);
    }
}

$done({ body: JSON.stringify(obj) });
}
const __originals=[__original0];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://(h3\\.)?open\\.taou\\.com/maimai/(feed|gossip)/v\\d/(focus_feed|gossip_detail_comment|feed_detail_comment?)\\?","i").exec(__url))){return __invoke(0,{},null);}
__finish({});
})();
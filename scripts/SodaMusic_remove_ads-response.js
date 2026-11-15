(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
/*
2025-05-18 01:29:34
by 可莉
*/

(() => {
    if (typeof $response === 'undefined' || !$response?.body) {
        console.log('无响应体或$response未定义');
        return $done({});
    }
    
    let modified = false;
    let body;
    
    try {
        body = JSON.parse($response.body);
    } catch (e) {
        console.log(`JSON解析失败: ${e.message}`);
        return $done({});
    }

    if (Array.isArray(body?.media)) {
        const originalLength = body.media.length;
        body.media = body.media.filter(item => {
            if (item && typeof item === 'object' && 'type' in item) {
                return item.type !== 'video';
            }
            return true;
        });
        modified = originalLength !== body.media.length;
        
        if (modified) {
            console.log(`移除了 ${originalLength - body.media.length} 条视频内容`);
        }
    }

    $done(modified ? {
        body: JSON.stringify(body),
    } : {});
})();
}
const __originals=[__original0];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://(beta-luna\\.douyin|api5-lq\\.qishui)\\.com/luna/me/recently-played-media\\?","i").exec(__url))){return __invoke(0,{},null);}
__finish({});
})();
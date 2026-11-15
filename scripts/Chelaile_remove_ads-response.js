(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
/*
https://t.me/ibilibili
2026-07-04 19:20:23
*/

(() => {
    if (!$response?.body) return $done({});

    const PREFIX = "**YGKJ";
    const SUFFIX = "YGKJ##";

    let rawBody = $response.body;
    let jsonText = rawBody;

    const hasWrapper = rawBody.startsWith(PREFIX) && rawBody.endsWith(SUFFIX);

    if (hasWrapper) {
        jsonText = rawBody.slice(PREFIX.length, rawBody.length - SUFFIX.length);
    }

    let body;
    try {
        body = JSON.parse(jsonText);
    } catch (e) {
        console.log(`JSON解析失败: ${e.message}`);
        return $done({});
    }

    const data = body?.jsonr?.data;
    if (!data || typeof data !== "object") {
        return $done({});
    }

    let modified = false;

    const deleteKeys = [
        "newYear",
        "splashGray",
        "enableSplashGray",
        "splashAdType",
        "splashCloseTime",
        "sadt",
        "dynamicSplashTime",
        "splashCoverBar",
        "splashSkipShowType",
        "skipPopType",
        "skipPopTime",
        "skipStopDis",
        "adPopExhibitTime",
        "isAdPopExhibit",
        "adStrategy",
        "adConfigTriggerDelayTime",
        "adNeedAnimate",
        "needFetchInterstitialAd",
        "intersitialAdPre",
        "nativeAdFetchType",
        "preloadAds",
        "searchAdPos",
        "searchPageAdType",
        "searchPageAdAnimation",
        "showTopSearchAd",
        "feedAdClickSlipRegionType",
        "feedAdClickSlipShowType",
        "feedInfoSource",
        "feedBackCutType",
        "feedBackShakeType",
        "expressAdDelayRefreshTime",
        "disableAdAutoRefresh",
        "reportAdNumLimit",
        "shakeLeve",
        "bdCloseDownloadDisplay",
        "bdShowSplashDialog",
        "sat",
        "ldrAdAnimal",
        "newKuaishouPicUrl",
        "newKuaishouShowType",
        "newKuaishouHigh",
        "newKuaishouFeedId",
        "kuaishouFeedId",
        "showKSVideoHeader",
        "ttSplashUsePhonePixel",
        "supportMiniGame",
        "welfareColor",
        "welfareAllPage",
        "welfareUrl",
        "welfareSignUrl",
        "oneLoginType",
        "oneLoginPopType",
        "oneLoginCheck",
        "douyinLoginType",
        "appInstallExhibitInterval",
        "aiSpeakKeywords",
        "aiSpeakTime",
        "aiSpeakPreTime",
        "aiSpeakAfterTime",
        "voiceSearchMode",
        "favGrayForAI",
        "scanCodeTipType",
        "blacklistDomains",
        "appBackupDomains",
        "useHttpDns",
        "weatherGrayFlag"
    ];

    for (const key of deleteKeys) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            delete data[key];
            modified = true;
        }
    }

    if (!modified) {
        return $done({});
    }

    const result = JSON.stringify(body);
    const finalBody = hasWrapper ? `${PREFIX}${result}${SUFFIX}` : result;

    $done({ body: finalBody });
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
if((true) && (match=new RegExp("^https://api\\.chelaile\\.net\\.cn/bus-side/appToggle/getStatus\\?","i").exec(__url))){return __invoke(0,{},null,false,true);}
__finish({});
})();
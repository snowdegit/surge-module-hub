(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用https://raw.githubusercontent.com/ZenmoFeiShi/Qx/main/HP.js
*/
// 2024-06-14 11:04
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/buffer/hotList")) {
    delete obj.result.topBanner;
}

if (url.includes("/mang/preview/banners")) {
    delete obj.data;
}

if (url.includes("/bbsallapi/lego/data")) {
    obj.data.cards.forEach(card => { 
        if (card.code === "multiIcon") {
            const titlesToRemove = ["个性换肤", "专家预测", "邀请好友", "版主中心", "JRs战术板", "草稿箱", "58同城"];
            if (card.components && card.components.length > 0) {
                card.components = card.components.filter(component => {
                    return !(component.data && titlesToRemove.includes(component.data.title));
                });
            }
        }
    });
}

if (obj.data && obj.data.cards) {
    obj.data.cards = obj.data.cards.filter(card => {
        if (card.components && card.components.length > 0) {
            return !card.components.some(component => component.data && component.data.title === "我的应用");
        }
        return true;
    });
}

if (url.includes("/bplapi/user/v1/more")) {
    if (obj.result && obj.result.vipInfo && obj.result.vipInfo.textInfo) {
        delete obj.result.vipInfo.textInfo;
    }
    if (obj.result && obj.result.vipInfo) {
        delete obj.result.vipInfo;
    }
}

$done({ body: JSON.stringify(obj) });
}
function __original1(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用https://raw.githubusercontent.com/ZenmoFeiShi/Qx/main/HP.js
*/
// 2024-06-14 11:04
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/buffer/hotList")) {
    delete obj.result.topBanner;
}

if (url.includes("/mang/preview/banners")) {
    delete obj.data;
}

if (url.includes("/bbsallapi/lego/data")) {
    obj.data.cards.forEach(card => { 
        if (card.code === "multiIcon") {
            const titlesToRemove = ["个性换肤", "专家预测", "邀请好友", "版主中心", "JRs战术板", "草稿箱", "58同城"];
            if (card.components && card.components.length > 0) {
                card.components = card.components.filter(component => {
                    return !(component.data && titlesToRemove.includes(component.data.title));
                });
            }
        }
    });
}

if (obj.data && obj.data.cards) {
    obj.data.cards = obj.data.cards.filter(card => {
        if (card.components && card.components.length > 0) {
            return !card.components.some(component => component.data && component.data.title === "我的应用");
        }
        return true;
    });
}

if (url.includes("/bplapi/user/v1/more")) {
    if (obj.result && obj.result.vipInfo && obj.result.vipInfo.textInfo) {
        delete obj.result.vipInfo.textInfo;
    }
    if (obj.result && obj.result.vipInfo) {
        delete obj.result.vipInfo;
    }
}

$done({ body: JSON.stringify(obj) });
}
function __original2(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用https://raw.githubusercontent.com/ZenmoFeiShi/Qx/main/HP.js
*/
// 2024-06-14 11:04
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/buffer/hotList")) {
    delete obj.result.topBanner;
}

if (url.includes("/mang/preview/banners")) {
    delete obj.data;
}

if (url.includes("/bbsallapi/lego/data")) {
    obj.data.cards.forEach(card => { 
        if (card.code === "multiIcon") {
            const titlesToRemove = ["个性换肤", "专家预测", "邀请好友", "版主中心", "JRs战术板", "草稿箱", "58同城"];
            if (card.components && card.components.length > 0) {
                card.components = card.components.filter(component => {
                    return !(component.data && titlesToRemove.includes(component.data.title));
                });
            }
        }
    });
}

if (obj.data && obj.data.cards) {
    obj.data.cards = obj.data.cards.filter(card => {
        if (card.components && card.components.length > 0) {
            return !card.components.some(component => component.data && component.data.title === "我的应用");
        }
        return true;
    });
}

if (url.includes("/bplapi/user/v1/more")) {
    if (obj.result && obj.result.vipInfo && obj.result.vipInfo.textInfo) {
        delete obj.result.vipInfo.textInfo;
    }
    if (obj.result && obj.result.vipInfo) {
        delete obj.result.vipInfo;
    }
}

$done({ body: JSON.stringify(obj) });
}
function __original3(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用https://raw.githubusercontent.com/ZenmoFeiShi/Qx/main/HP.js
*/
// 2024-06-14 11:04
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/buffer/hotList")) {
    delete obj.result.topBanner;
}

if (url.includes("/mang/preview/banners")) {
    delete obj.data;
}

if (url.includes("/bbsallapi/lego/data")) {
    obj.data.cards.forEach(card => { 
        if (card.code === "multiIcon") {
            const titlesToRemove = ["个性换肤", "专家预测", "邀请好友", "版主中心", "JRs战术板", "草稿箱", "58同城"];
            if (card.components && card.components.length > 0) {
                card.components = card.components.filter(component => {
                    return !(component.data && titlesToRemove.includes(component.data.title));
                });
            }
        }
    });
}

if (obj.data && obj.data.cards) {
    obj.data.cards = obj.data.cards.filter(card => {
        if (card.components && card.components.length > 0) {
            return !card.components.some(component => component.data && component.data.title === "我的应用");
        }
        return true;
    });
}

if (url.includes("/bplapi/user/v1/more")) {
    if (obj.result && obj.result.vipInfo && obj.result.vipInfo.textInfo) {
        delete obj.result.vipInfo.textInfo;
    }
    if (obj.result && obj.result.vipInfo) {
        delete obj.result.vipInfo;
    }
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
if((true) && (match=new RegExp("^https://fairy\\.mobileapi\\.hupu\\.com/mang/preview/banners","i").exec(__url))){return __invoke(0,{},null,false,true);}
if((true) && (match=new RegExp("^https://bbs\\.mobileapi\\.hupu\\.com/\\d/\\d\\.\\d\\.\\d+/bbsallapi/lego/data","i").exec(__url))){return __invoke(1,{},null,false,true);}
if((true) && (match=new RegExp("^https://games\\.mobileapi\\.hupu\\.com/\\d/\\d\\.\\d\\.\\d+/buffer/hotList","i").exec(__url))){return __invoke(2,{},null,false,true);}
if((true) && (match=new RegExp("^https://games\\.mobileapi\\.hupu\\.com/\\d/\\d\\.\\d\\.\\d+/bplapi/user/v1/more","i").exec(__url))){return __invoke(3,{},null,false,true);}
__finish({});
})();
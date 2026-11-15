(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-10 10:53:30
var url = $request.url;
var body = $response.body;

if (url.includes("/api/mobile/index.php?module=basicdata&type=app_onoff")) {
    var banner = JSON.parse(body);

    // 删除我的页面横幅
    delete banner.Variables.data.xinren;

    var pathsToClear = [
        // 删除发帖界面评选推广
        "goodhotel",
        "goodhotel_txt",
        "goodthread",
        "goodthread_txt",
        // 删除我的页面横幅广告
        "homeinns_already_joined",
        "homeinns_entry",
        "homeinns_entry_banner",
        "homeinns_entry_url"
    ];

    pathsToClear.forEach(function(path) {
        if (banner.Variables && banner.Variables.data && banner.Variables.data[path]) {
            banner.Variables.data[path] = {};
        }
    });

    $done({ body: JSON.stringify(banner) });
} else if (url.includes("/api/mobile/index.php?module=plugin&id=k_misign:sign")) {
    var sign_adv = JSON.parse(body);

    // 删除签到弹窗广告
    if (sign_adv.Variables && sign_adv.Variables.data && sign_adv.Variables.data.adv) {
        delete sign_adv.Variables.data.adv;
    }

    $done({ body: JSON.stringify(sign_adv) });
} else if (url.includes("/api/mobile/index.php?version=5")) {
    var section_adv = JSON.parse(body);

    // 删除会员说版块广告
    if (section_adv.Variables && section_adv.Variables.data && Array.isArray(section_adv.Variables.data)) {
        section_adv.Variables.data.forEach(function(item) {
            if (item.adv) {
                item.adv = {};
            }
        });
    }

    $done({ body: JSON.stringify(section_adv) });
} else {
    $done({ body: body });
}
}
function __original1(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-07-10 10:53:30
var url = $request.url;
var body = $response.body;

if (url.includes("/api/mobile/index.php?module=basicdata&type=app_onoff")) {
    var banner = JSON.parse(body);

    // 删除我的页面横幅
    delete banner.Variables.data.xinren;

    var pathsToClear = [
        // 删除发帖界面评选推广
        "goodhotel",
        "goodhotel_txt",
        "goodthread",
        "goodthread_txt",
        // 删除我的页面横幅广告
        "homeinns_already_joined",
        "homeinns_entry",
        "homeinns_entry_banner",
        "homeinns_entry_url"
    ];

    pathsToClear.forEach(function(path) {
        if (banner.Variables && banner.Variables.data && banner.Variables.data[path]) {
            banner.Variables.data[path] = {};
        }
    });

    $done({ body: JSON.stringify(banner) });
} else if (url.includes("/api/mobile/index.php?module=plugin&id=k_misign:sign")) {
    var sign_adv = JSON.parse(body);

    // 删除签到弹窗广告
    if (sign_adv.Variables && sign_adv.Variables.data && sign_adv.Variables.data.adv) {
        delete sign_adv.Variables.data.adv;
    }

    $done({ body: JSON.stringify(sign_adv) });
} else if (url.includes("/api/mobile/index.php?version=5")) {
    var section_adv = JSON.parse(body);

    // 删除会员说版块广告
    if (section_adv.Variables && section_adv.Variables.data && Array.isArray(section_adv.Variables.data)) {
        section_adv.Variables.data.forEach(function(item) {
            if (item.adv) {
                item.adv = {};
            }
        });
    }

    $done({ body: JSON.stringify(section_adv) });
} else {
    $done({ body: body });
}
}
const __originals=[__original0,__original1];

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
if((true) && (match=new RegExp("^https://www\\.flyert\\.com\\.cn/api/mobile/index\\.php\\?version=5","i").exec(__url))){return __invoke(0,{},null,false,true);}
if((true) && (match=new RegExp("^https://www\\.flyert\\.com\\.cn/api/mobile/index\\.php\\?module=plugin&id=k_misign:sign","i").exec(__url))){return __invoke(1,{},null,false,true);}
__finish({});
})();
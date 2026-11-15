(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本作者 Sliverkiss
脚本时间 2024-02-18 19:19:03
*/
const Body = JSON.parse($response.body);
const url = $request.url;

const actions = {
    'homeInit': () => {
        Body.data.startupPage = {};
        Body.data.templates = Body.data.templates.filter(e => !e.name.match(/主轮播图|保险推荐|专享|腰封轮播图|浮标配置|二楼营销位|首页主题/));
    },
    'myPageConfigList': () => {
        Body.data.YFList = [];
    }
};

const actionKey = Object.keys(actions).find(key => url.includes(key));
actions[actionKey]?.();

$done({ body: JSON.stringify(Body) });

}
function __original1(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本作者 Sliverkiss
脚本时间 2024-02-18 19:19:03
*/
const Body = JSON.parse($response.body);
const url = $request.url;

const actions = {
    'homeInit': () => {
        Body.data.startupPage = {};
        Body.data.templates = Body.data.templates.filter(e => !e.name.match(/主轮播图|保险推荐|专享|腰封轮播图|浮标配置|二楼营销位|首页主题/));
    },
    'myPageConfigList': () => {
        Body.data.YFList = [];
    }
};

const actionKey = Object.keys(actions).find(key => url.includes(key));
actions[actionKey]?.();

$done({ body: JSON.stringify(Body) });

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
if((true) && (match=new RegExp("^https://zgrb\\.epicc\\.com\\.cn/G-HAPP/a/config/homeInit/v3","i").exec(__url))){return __invoke(0,{},null,false,true);}
if((true) && (match=new RegExp("^https://zgrb\\.epicc\\.com\\.cn/G-HAPP/mpageconfig/myPageConfigList/v3","i").exec(__url))){return __invoke(1,{},null,false,true);}
__finish({});
})();
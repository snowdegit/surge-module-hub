(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
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
if((true) && (match=new RegExp("^https://(h3\\.)?open\\.taou\\.com/maimai/(feed|gossip)/v\\d/(focus_feed|gossip_detail_comment|feed_detail_comment?)\\?","i").exec(__url))){return __invoke(0,{},null,false,true);}
__finish({});
})();
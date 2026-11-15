(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
// 2024-10-27 21:09:24
const url = $request.url;
let obj;

try {
    obj = JSON.parse($response.body);
} catch (e) {
    console.error("Failed to parse JSON:", e);
    // 返回未修改的原对象并结束脚本执行
    $done({ body: $response.body });
} 

// 检查是否需要处理数据
if (url.includes("/mgapi/livenc/home/getRecV3")) {
    try {
        function removeAds(data) {
            return data.filter(item => !item.ad);
        }

        if (obj.data && obj.data.rec_cont) {
            obj.data.rec_cont = removeAds(obj.data.rec_cont);
        }
        if (obj.data && obj.data.rec_card) {
            for (let i in obj.data.rec_card) {
                let v = obj.data.rec_card[i];
                if (v.card_banner) {
                    v.card_banner = removeAds(v.card_banner);
                }
            }
        }
    } catch (e) {
        console.error("Error processing response data:", e);
        // 出现问题时返回未修改的原对象
        $done({ body: $response.body });
    }
} else {
    // 如果不需要处理数据，直接返回原对象
    $done({ body: $response.body });
}

// 正常返回修改后的对象
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
if((true) && (match=new RegExp("^https://apiv2\\.douyucdn\\.cn/mgapi/livenc/home/getRecV3","i").exec(__url))){return __invoke(0,{},null,false,true);}
__finish({});
})();
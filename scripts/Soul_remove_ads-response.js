(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/RuCu6/Loon/main/Scripts/soul.js
*/
// 2024-10-15 10:20

const url = $request.url;
if (!$response || !$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/chat/limitInfo")) {
  // 私聊限制
  if (obj?.data?.limit) {
    obj.data.limit = false;
  }
} else if (url.includes("/v6/planet/config")) {
  const gamesToRemove = ["异世界回响", "狼人魅影", "梦想海岛王", "幻想星球", "爆弹喵", "星球实验室", "兴趣群组", "群聊派对"];
  if (obj?.data?.gameInfo?.gameCards?.length > 0) {
    obj.data.gameInfo.gameCards = obj.data.gameInfo.gameCards.filter((card) => !gamesToRemove.includes(card.title));
  }
  if (obj.data?.coreCards?.length > 0) {
    obj.data.coreCards = obj.data.coreCards.filter((card) => !gamesToRemove.includes(card.title));
    obj.data.coreCards.forEach((card) => {
      if (card?.secondCards?.length > 0) {
        card.secondCards = card.secondCards.filter((sc) => !gamesToRemove.includes(sc.title));
      }
    });
    obj.data.coreCards = obj.data.coreCards.map((card) => {
      if (card.style === 2) {
        card.style = 1;
      }
      return card;
    });
  }
} else if (url.includes("/homepage/diamond/position/info")) {
  if (obj?.data?.length > 0) {
    obj.data = obj.data.filter((item) => !["GIFT_WALL", "PET_PLANET", "SHOP"]?.includes(item.code));
  }
} else if (url.includes("/chatroom/chatClassifyRoomList")) {
  if (obj?.data?.roomList?.length > 0) {
    obj.data.roomList = [];
  }
} else if (url.includes("/post/recSquare/subTabs")) {
  if (obj?.data?.length > 0) {
    obj.data = obj.data.filter((item) => [2, 6, 7].includes(item.tabType));
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
if((true) && (match=new RegExp("^https://(?:api-\\w+|chat-live|post)\\.soulapp\\.cn/(?:chat/limitInfo|chatroom/chatClassifyRoomList|homepage/diamond/position/info|v2/post/recSquare/subTabs|v6/planet/config)","i").exec(__url))){return __invoke(0,{},null,false,true);}
__finish({});
})();
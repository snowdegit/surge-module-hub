(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/kelv1n1n/script/main/js/pp.js
*/
let url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

const search = "/banner/search_component_banner";
const mine = "position_types=60%2C560%2C850%2C860%2C890%2C2400";
const search_hot = "/search/hot_keywords";
const recommend = "/resource_preload/list_h5_resource";
const recommendPro = "/recommendation/interests/products";
const adv = "/advertisement/v1";

if (url.indexOf(mine) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search_hot) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommend) != -1) {
  obj.data = obj.data.filter(item => item.filename !== "RecommendProduct.29e31893.js");
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommendPro) != -1) {
  //obj.data = {};
  obj.data.activities = [];
  obj.data.products = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(adv) != -1) {
  obj.data = obj.data.filter(item => ![30,50,90,320,100].includes(item.region_code)); 

  obj.data = obj.data.map(item => {  
  if (item.region_code === 2) {  
    // 过滤掉positions数组中component_code等于890和60的元素  
    item.positions = item.positions.filter(position => ![890, 60].includes(position.component_code));  
  }  
    // 返回最终的元素
    return item;  
  });
  
  body = JSON.stringify(obj);
  $done({body});
}

const typeArr = [50, 2, 90, 770, 80, 320];
obj.data = obj.data.filter(item => !typeArr.includes(item.position_type));

body = JSON.stringify(obj);
$done({body});
}
function __original1(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/kelv1n1n/script/main/js/pp.js
*/
let url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

const search = "/banner/search_component_banner";
const mine = "position_types=60%2C560%2C850%2C860%2C890%2C2400";
const search_hot = "/search/hot_keywords";
const recommend = "/resource_preload/list_h5_resource";
const recommendPro = "/recommendation/interests/products";
const adv = "/advertisement/v1";

if (url.indexOf(mine) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search_hot) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommend) != -1) {
  obj.data = obj.data.filter(item => item.filename !== "RecommendProduct.29e31893.js");
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommendPro) != -1) {
  //obj.data = {};
  obj.data.activities = [];
  obj.data.products = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(adv) != -1) {
  obj.data = obj.data.filter(item => ![30,50,90,320,100].includes(item.region_code)); 

  obj.data = obj.data.map(item => {  
  if (item.region_code === 2) {  
    // 过滤掉positions数组中component_code等于890和60的元素  
    item.positions = item.positions.filter(position => ![890, 60].includes(position.component_code));  
  }  
    // 返回最终的元素
    return item;  
  });
  
  body = JSON.stringify(obj);
  $done({body});
}

const typeArr = [50, 2, 90, 770, 80, 320];
obj.data = obj.data.filter(item => !typeArr.includes(item.position_type));

body = JSON.stringify(obj);
$done({body});
}
function __original2(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/kelv1n1n/script/main/js/pp.js
*/
let url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

const search = "/banner/search_component_banner";
const mine = "position_types=60%2C560%2C850%2C860%2C890%2C2400";
const search_hot = "/search/hot_keywords";
const recommend = "/resource_preload/list_h5_resource";
const recommendPro = "/recommendation/interests/products";
const adv = "/advertisement/v1";

if (url.indexOf(mine) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search_hot) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommend) != -1) {
  obj.data = obj.data.filter(item => item.filename !== "RecommendProduct.29e31893.js");
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommendPro) != -1) {
  //obj.data = {};
  obj.data.activities = [];
  obj.data.products = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(adv) != -1) {
  obj.data = obj.data.filter(item => ![30,50,90,320,100].includes(item.region_code)); 

  obj.data = obj.data.map(item => {  
  if (item.region_code === 2) {  
    // 过滤掉positions数组中component_code等于890和60的元素  
    item.positions = item.positions.filter(position => ![890, 60].includes(position.component_code));  
  }  
    // 返回最终的元素
    return item;  
  });
  
  body = JSON.stringify(obj);
  $done({body});
}

const typeArr = [50, 2, 90, 770, 80, 320];
obj.data = obj.data.filter(item => !typeArr.includes(item.position_type));

body = JSON.stringify(obj);
$done({body});
}
function __original3(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/kelv1n1n/script/main/js/pp.js
*/
let url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

const search = "/banner/search_component_banner";
const mine = "position_types=60%2C560%2C850%2C860%2C890%2C2400";
const search_hot = "/search/hot_keywords";
const recommend = "/resource_preload/list_h5_resource";
const recommendPro = "/recommendation/interests/products";
const adv = "/advertisement/v1";

if (url.indexOf(mine) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search_hot) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommend) != -1) {
  obj.data = obj.data.filter(item => item.filename !== "RecommendProduct.29e31893.js");
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommendPro) != -1) {
  //obj.data = {};
  obj.data.activities = [];
  obj.data.products = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(adv) != -1) {
  obj.data = obj.data.filter(item => ![30,50,90,320,100].includes(item.region_code)); 

  obj.data = obj.data.map(item => {  
  if (item.region_code === 2) {  
    // 过滤掉positions数组中component_code等于890和60的元素  
    item.positions = item.positions.filter(position => ![890, 60].includes(position.component_code));  
  }  
    // 返回最终的元素
    return item;  
  });
  
  body = JSON.stringify(obj);
  $done({body});
}

const typeArr = [50, 2, 90, 770, 80, 320];
obj.data = obj.data.filter(item => !typeArr.includes(item.position_type));

body = JSON.stringify(obj);
$done({body});
}
function __original4(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/kelv1n1n/script/main/js/pp.js
*/
let url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

const search = "/banner/search_component_banner";
const mine = "position_types=60%2C560%2C850%2C860%2C890%2C2400";
const search_hot = "/search/hot_keywords";
const recommend = "/resource_preload/list_h5_resource";
const recommendPro = "/recommendation/interests/products";
const adv = "/advertisement/v1";

if (url.indexOf(mine) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search_hot) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommend) != -1) {
  obj.data = obj.data.filter(item => item.filename !== "RecommendProduct.29e31893.js");
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommendPro) != -1) {
  //obj.data = {};
  obj.data.activities = [];
  obj.data.products = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(adv) != -1) {
  obj.data = obj.data.filter(item => ![30,50,90,320,100].includes(item.region_code)); 

  obj.data = obj.data.map(item => {  
  if (item.region_code === 2) {  
    // 过滤掉positions数组中component_code等于890和60的元素  
    item.positions = item.positions.filter(position => ![890, 60].includes(position.component_code));  
  }  
    // 返回最终的元素
    return item;  
  });
  
  body = JSON.stringify(obj);
  $done({body});
}

const typeArr = [50, 2, 90, 770, 80, 320];
obj.data = obj.data.filter(item => !typeArr.includes(item.position_type));

body = JSON.stringify(obj);
$done({body});
}
function __original5(__typedArgs,$argument,$request,$response,$done,$script){
/*
脚本引用 https://raw.githubusercontent.com/kelv1n1n/script/main/js/pp.js
*/
let url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

const search = "/banner/search_component_banner";
const mine = "position_types=60%2C560%2C850%2C860%2C890%2C2400";
const search_hot = "/search/hot_keywords";
const recommend = "/resource_preload/list_h5_resource";
const recommendPro = "/recommendation/interests/products";
const adv = "/advertisement/v1";

if (url.indexOf(mine) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(search_hot) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommend) != -1) {
  obj.data = obj.data.filter(item => item.filename !== "RecommendProduct.29e31893.js");
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(recommendPro) != -1) {
  //obj.data = {};
  obj.data.activities = [];
  obj.data.products = [];
  body = JSON.stringify(obj);
  $done({body});
}

if (url.indexOf(adv) != -1) {
  obj.data = obj.data.filter(item => ![30,50,90,320,100].includes(item.region_code)); 

  obj.data = obj.data.map(item => {  
  if (item.region_code === 2) {  
    // 过滤掉positions数组中component_code等于890和60的元素  
    item.positions = item.positions.filter(position => ![890, 60].includes(position.component_code));  
  }  
    // 返回最终的元素
    return item;  
  });
  
  body = JSON.stringify(obj);
  $done({body});
}

const typeArr = [50, 2, 90, 770, 80, 320];
obj.data = obj.data.filter(item => !typeArr.includes(item.position_type));

body = JSON.stringify(obj);
$done({body});
}
const __originals=[__original0,__original1,__original2,__original3,__original4,__original5];

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
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/marketing/banner/v7","i").exec(__url))){return __invoke(0,{},null,false,true);}
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/marketing/banner/search_component_banner","i").exec(__url))){return __invoke(1,{},null,false,true);}
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/search/hot_keywords/v3","i").exec(__url))){return __invoke(2,{},null,false,true);}
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/app_resource/resource_preload/list_h5_resource","i").exec(__url))){return __invoke(3,{},null,false,true);}
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/recommendation/interests/products","i").exec(__url))){return __invoke(4,{},null,false,true);}
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/marketing/advertisement/v1","i").exec(__url))){return __invoke(5,{},null,false,true);}
__finish({});
})();
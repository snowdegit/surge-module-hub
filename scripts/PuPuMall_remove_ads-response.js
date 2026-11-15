(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
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
function __original1(__typedArgs,$argument){
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
function __original2(__typedArgs,$argument){
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
function __original3(__typedArgs,$argument){
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
function __original4(__typedArgs,$argument){
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
function __original5(__typedArgs,$argument){
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
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/marketing/banner/v7","i").exec(__url))){return __invoke(0,{},null);}
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/marketing/banner/search_component_banner","i").exec(__url))){return __invoke(1,{},null);}
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/search/hot_keywords/v3","i").exec(__url))){return __invoke(2,{},null);}
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/app_resource/resource_preload/list_h5_resource","i").exec(__url))){return __invoke(3,{},null);}
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/recommendation/interests/products","i").exec(__url))){return __invoke(4,{},null);}
if((true) && (match=new RegExp("^https://j1\\.pupuapi\\.com/client/marketing/advertisement/v1","i").exec(__url))){return __invoke(5,{},null);}
__finish({});
})();
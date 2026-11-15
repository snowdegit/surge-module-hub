(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
// 2024-09-07 23:02:42
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/operation/home.json")) {
    // 遍历 func_list
    if (obj.response.list) {
      for (let i in obj.response.list) {
        obj.response.list[i].func_list = obj.response.list[i].func_list.filter(item => {
          return item.name !== "借钱" && item.name !== "AI剪辑";
        });
      }
    }

    // 遍历 func_bar_type
    if (obj.response.list && obj.response.list.func_bar_type) {
        obj.response.list.func_bar_type = obj.response.list.func_bar_type.filter(item => {
            return item.func_bar_type !== 8;
        });
    }
}
}
const __originals=[__original0];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://api\\.meiyan\\.com/operation/home\\.json\\?","i").exec(__url))){return __invoke(0,{},null);}
__finish({});
})();
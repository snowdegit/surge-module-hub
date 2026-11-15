(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
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
function __original1(__typedArgs,$argument){
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
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://zgrb\\.epicc\\.com\\.cn/G-HAPP/a/config/homeInit/v3","i").exec(__url))){return __invoke(0,{},null);}
if((true) && (match=new RegExp("^https://zgrb\\.epicc\\.com\\.cn/G-HAPP/mpageconfig/myPageConfigList/v3","i").exec(__url))){return __invoke(1,{},null);}
__finish({});
})();
(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
// 2024-07-19 09:51:31
const url = $request.url;
var newBody = {}

const processResponse = (regex, filterFunc) => {
    if (regex.test(url)) {
        let obj = JSON.parse($response.body);
        console.log($response.body)
        filterFunc(obj);
        console.log(JSON.stringify(obj))
        newBody = { body: JSON.stringify(obj) }
    }
};

const filterNewcomerAndMall = obj => {
    if (obj.data && obj.data.home_type) {
        obj.data.home_type = obj.data.home_type.filter(item => item.name !== "新人" && item.name !== "新作"); // 首页标签
    }
    if (obj.data && obj.data.home_feed) {
        obj.data.home_feed = obj.data.home_feed.filter(item => item.name !== "商城"); // 首页标签
    }
};

const filterNoTraffic = obj => {
    if (obj.data && obj.data.confs) {
        obj.data.confs = obj.data.confs.filter(item => item.title !== "漫画商城" && item.title !== "超漫俱乐部" && item.title !== "看漫免流量"); // 我的页面
    }
};

// const filterNovelBanners = obj => {
//     if (obj.data && obj.data.banners) {
//         delete obj.data.banners; // 小说列表横幅 - 删除会导致小说列表为空
//     }
// };

processResponse(/\/twirp\/comic\.v\d\.Comic\/GetClassPageAllTabs/, filterNewcomerAndMall);
processResponse(/\/twirp\/user\.v\d\.User\/UCenterConf/, filterNoTraffic);
// processResponse(/\/twirp\/novel\.v\d\.Home\/Home/, filterNovelBanners);

$done(newBody);
}
function __original1(__typedArgs,$argument){
// 2024-07-19 09:51:31
const url = $request.url;
var newBody = {}

const processResponse = (regex, filterFunc) => {
    if (regex.test(url)) {
        let obj = JSON.parse($response.body);
        console.log($response.body)
        filterFunc(obj);
        console.log(JSON.stringify(obj))
        newBody = { body: JSON.stringify(obj) }
    }
};

const filterNewcomerAndMall = obj => {
    if (obj.data && obj.data.home_type) {
        obj.data.home_type = obj.data.home_type.filter(item => item.name !== "新人" && item.name !== "新作"); // 首页标签
    }
    if (obj.data && obj.data.home_feed) {
        obj.data.home_feed = obj.data.home_feed.filter(item => item.name !== "商城"); // 首页标签
    }
};

const filterNoTraffic = obj => {
    if (obj.data && obj.data.confs) {
        obj.data.confs = obj.data.confs.filter(item => item.title !== "漫画商城" && item.title !== "超漫俱乐部" && item.title !== "看漫免流量"); // 我的页面
    }
};

// const filterNovelBanners = obj => {
//     if (obj.data && obj.data.banners) {
//         delete obj.data.banners; // 小说列表横幅 - 删除会导致小说列表为空
//     }
// };

processResponse(/\/twirp\/comic\.v\d\.Comic\/GetClassPageAllTabs/, filterNewcomerAndMall);
processResponse(/\/twirp\/user\.v\d\.User\/UCenterConf/, filterNoTraffic);
// processResponse(/\/twirp\/novel\.v\d\.Home\/Home/, filterNovelBanners);

$done(newBody);
}
const __originals=[__original0,__original1];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://manga\\.bilibili\\.com/twirp/comic\\.v\\d\\.Comic/GetClassPageAllTabs","i").exec(__url))){return __invoke(0,{},null);}
if((true) && (match=new RegExp("^https://manga\\.bilibili\\.com/twirp/user\\.v\\d\\.User/UCenterConf","i").exec(__url))){return __invoke(1,{},null);}
__finish({});
})();
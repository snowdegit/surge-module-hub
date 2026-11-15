(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
let obj = JSON.parse($response.body);
obj.data.config = JSON.stringify(JSON.parse(obj.data.config).filter(item => !item.id.includes("13502ede-f5fd-4d5c-90f5-f2454a30fda0")));
obj.data.config = JSON.stringify(JSON.parse(obj.data.config).filter(item => !item.id.includes("c1caaf62-e91d-4040-b533-dab39c0fec13")));
obj.data.config = JSON.stringify(JSON.parse(obj.data.config).filter(item => !item.id.includes("cc9d17ec-3ac5-494b-b82e-8d3c72c243d4")));
obj.data.config = JSON.stringify(JSON.parse(obj.data.config).filter(item => !item.id.includes("7bef8fe9-0daf-46b3-a2b0-dd9fba49423f")));
obj.data.config = JSON.stringify(JSON.parse(obj.data.config).filter(item => !item.id.includes("ff7e1263-d8d2-4f09-9947-d8c43c77bb10")));
obj.data.config = JSON.stringify(JSON.parse(obj.data.config).filter(item => !item.id.includes("874197b4-fe93-4a80-a555-8df1bc7e8211")));
obj.data.config = JSON.stringify(JSON.parse(obj.data.config).filter(item => !item.id.includes("0ba6a615-b7e9-48aa-afe7-329635385f2c")));
obj.data.config = JSON.stringify(JSON.parse(obj.data.config).filter(item => !item.id.includes("a11b0e7d-a162-4802-ac71-21d98e8adddf")));
$done({body: JSON.stringify(obj)});
}
function __original1(__typedArgs,$argument){
let obj = JSON.parse($response.body);
obj.info.moduleJson = JSON.stringify(JSON.parse(obj.info.moduleJson).filter(item => !item.moduleName.includes("广告")));
$done({body: JSON.stringify(obj)});
}
function __original2(__typedArgs,$argument){
if(-1!=$request.url.indexOf("main_page/index/getActivity")){
    let obj=JSON.parse($response.body);
    delete obj.data.p3;
    $done({body: JSON.stringify(obj)});
   }
   else if(-1!=$request.url.indexOf("mall/main")){
    let obj=JSON.parse($response.body);
    delete obj.data;
    $done({body: JSON.stringify(obj)});
   }
   else $done($response);
   
}
function __original3(__typedArgs,$argument){
let obj=JSON.parse($response.body);
delete obj.data.topBanner ;
$done({body: JSON.stringify(obj)});
}
function __original4(__typedArgs,$argument){
let obj=JSON.parse($response.body);
delete obj.data.homeButtonList ;
delete obj.data.dysmorphismPictureList ;
$done({body: JSON.stringify(obj)});
}
function __original5(__typedArgs,$argument){
let obj=JSON.parse($response.body);
delete obj.data.INDEX_SLOT_01;
delete obj.data.INDEX_SLOT_02;
obj.data?.INDEX_TOP_BANNER?.contents?.forEach(item => {
  delete item.bubble; 
  delete item.figure; 
  item.value = "https://kelee.one/Resource/Script/WexinMiniPrograms/chayanyuese/cyys1.jpg";
});
$done({body: JSON.stringify(obj)});
}
function __original6(__typedArgs,$argument){
let obj=JSON.parse($response.body);
delete obj.data.top_background_url ;
delete obj.data.bottom_banner_list ;
$done({body: JSON.stringify(obj)});
}
function __original7(__typedArgs,$argument){
let obj=JSON.parse($response.body);
delete obj.data.bannerInfoConfig ;
$done({body: JSON.stringify(obj)});
}
function __original8(__typedArgs,$argument){
let obj=JSON.parse($response.body);
delete obj.data;
$done({body: JSON.stringify(obj)});
}
function __original9(__typedArgs,$argument){
let obj=JSON.parse($response.body);
delete obj.data.homeNewsAdv.jumpValue ;
delete obj.data.homeDineInAdv ;
delete obj.data.homePickupAdv ;
delete obj.data.nearbyShopInfo ;
delete obj.data.homeEventThemesAdv ;
delete obj.data.eventThemes ;
delete obj.data.homeRootAdv ;
delete obj.data.homeTopAdv ;
delete obj.data.homeDialogAdv ;
delete obj.data.homeBannerAdv ;
delete obj.data.homeCouponAdv ;
delete obj.data.homeCompanyAdv ;
delete obj.data.homeDeliveryAdv ;
$done({body: JSON.stringify(obj)});

}
function __original10(__typedArgs,$argument){
let obj = JSON.parse($response.body);
delete obj.data;
$done({body: JSON.stringify(obj)});

}
function __original11(__typedArgs,$argument){
let obj=JSON.parse($response.body);
obj.data=[];
$done({body: JSON.stringify(obj)});
}
const __originals=[__original0,__original1,__original2,__original3,__original4,__original5,__original6,__original7,__original8,__original9,__original10,__original11];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://webapi\\.qmai\\.cn/web/catering/design/homePage-Config","i").exec(__url))){return __invoke(0,{},null);}
if((true) && (match=new RegExp("^https://ump\\.ems\\.com\\.cn/new-generation-extend/redis/pageInfoByChannel","i").exec(__url))){return __invoke(1,{},null);}
if((true) && (match=new RegExp("^https://mapi\\.xiaotucc\\.com/(mall/main|main_page/index/getActivity)","i").exec(__url))){return __invoke(2,{},null);}
if((true) && (match=new RegExp("^https://minifm\\.maxxipoint\\.com/banner/list","i").exec(__url))){return __invoke(3,{},null);}
if((true) && (match=new RegExp("^https://lawsonapi\\.yorentown\\.com/area/sh-lawson/app/v1/home","i").exec(__url))){return __invoke(4,{},null);}
if((true) && (match=new RegExp("^https://miniapp\\.sexytea2013\\.com/cms/slot/queryByCodes\\?codes=INDEX_TOP_BANNER","i").exec(__url))){return __invoke(5,{},null);}
if((true) && (match=new RegExp("^https://coco-com\\.e\\.verystar\\.net/v1/home/info","i").exec(__url))){return __invoke(6,{},null);}
if((true) && (match=new RegExp("^https://htwkop\\.xiaojukeji\\.com/gateway\\?api=hm\\.fa\\.homeConfig","i").exec(__url))){return __invoke(7,{},null);}
if((true) && (match=new RegExp("^https://cappapi\\.alittle-tea\\.com/open\\?method=catering\\.set\\.ad","i").exec(__url))){return __invoke(8,{},null);}
if((true) && (match=new RegExp("^https://api\\.prod\\.dj\\.mstand\\.cn/scrm/mini/app/index/info","i").exec(__url))){return __invoke(9,{},null);}
if((true) && (match=new RegExp("^https://passenger\\.t3go\\.cn/(solution\\-|common\\-)?(passenger\\-)?(activity\\-|app\\-)?api/notoken/(trip/)?api/(home/|common/)?(v[1-3]/)?(ad/getNegativescreen|solution/passenger/open/getHomeMenu|leftmenu|getHomeInfoGlobal)","i").exec(__url))){return __invoke(10,{},null);}
if((true) && (match=new RegExp("^https://newton\\.gumingnc\\.com/newton-buyer/newton/buyer/(ump|touch|external/front)","i").exec(__url))){return __invoke(11,{},null);}
__finish({});
})();
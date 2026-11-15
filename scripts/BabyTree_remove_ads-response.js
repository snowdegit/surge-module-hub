(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
/*
脚本引用https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/babytree.js
*/
// 2024-10-28 01:35

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/app_index/get_app_tab")) {
  // 底部tab
  if (obj?.data?.selected_list?.length > 0) {
    obj.data.selected_list = obj.data.selected_list.filter((i) => !["购物", "商城"]?.includes(i?.name));
  }
} else if (url.includes("/bafconfigcenter_intf/config/get")) {
  // 整体配置
  const items = [
    "pregnancy__find_group_guide_image_url", // 加入的圈子
    "pregnancy__home_left_icon", // 直播图标
    "pregnancy__home_left_icon_new", // 直播图标
    "pregnancy__home_left_icon_static", // 直播图标
    "pregnancy__video_white_list" // 宝宝视频
  ];
  if (obj?.data) {
    for (let i of items) {
      if (obj?.data?.[i]) {
        obj.data[i] = "";
      }
    }
  }
} else if (url.includes("/cms_column/get_column_list")) {
  // tab配置
  if (obj?.data?.list?.length > 0) {
    let newLists = [];
    for (let item of obj.data.list) {
      if (item?.data_source_list?.length > 0) {
        let newDatas = [];
        for (let i of item.data_source_list) {
          // 首页顶部tab
          if (i?.tab_name?.includes("精品秒杀")) {
            continue;
          } else {
            newDatas.push(i);
          }
        }
        item.data_source_list = newDatas;
      }
      if (["225", "226", "238", "239"]?.includes(item?.id)) {
        // 我的页面模块
        // 225我的福利 226banner轮播图 238美囤商城 239会员进群
        continue;
      }
      newLists.push(item);
    }
    obj.data.list = newLists;
  }
} else if (url.includes("/feeds/get_index_feeds_list")) {
  // 首页信息流
  if (obj?.data?.list?.length > 0) {
    obj.data.list = obj.data.list.filter(
      (i) => ["发表了", "提问了"]?.includes(i?.action_desc) && !i.hasOwnProperty("seeding_goods_info")
    );
  }
} else if (url.includes("/mobile_search_new/search_index")) {
  // 搜索列表
  if (obj?.data?.find_search) {
    delete obj.data.find_search; // 搜索发现
  }
} else if (url.includes("/user/get_user_info")) {
  // 我的页面
  if (obj?.data?.video_show) {
    delete obj.data.video_show; // 顶部婴儿视频
  }
}

$done({ body: JSON.stringify(obj) });
}
function __original1(__typedArgs,$argument){
/*
脚本引用https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/babytree.js
*/
// 2024-10-28 01:35

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/app_index/get_app_tab")) {
  // 底部tab
  if (obj?.data?.selected_list?.length > 0) {
    obj.data.selected_list = obj.data.selected_list.filter((i) => !["购物", "商城"]?.includes(i?.name));
  }
} else if (url.includes("/bafconfigcenter_intf/config/get")) {
  // 整体配置
  const items = [
    "pregnancy__find_group_guide_image_url", // 加入的圈子
    "pregnancy__home_left_icon", // 直播图标
    "pregnancy__home_left_icon_new", // 直播图标
    "pregnancy__home_left_icon_static", // 直播图标
    "pregnancy__video_white_list" // 宝宝视频
  ];
  if (obj?.data) {
    for (let i of items) {
      if (obj?.data?.[i]) {
        obj.data[i] = "";
      }
    }
  }
} else if (url.includes("/cms_column/get_column_list")) {
  // tab配置
  if (obj?.data?.list?.length > 0) {
    let newLists = [];
    for (let item of obj.data.list) {
      if (item?.data_source_list?.length > 0) {
        let newDatas = [];
        for (let i of item.data_source_list) {
          // 首页顶部tab
          if (i?.tab_name?.includes("精品秒杀")) {
            continue;
          } else {
            newDatas.push(i);
          }
        }
        item.data_source_list = newDatas;
      }
      if (["225", "226", "238", "239"]?.includes(item?.id)) {
        // 我的页面模块
        // 225我的福利 226banner轮播图 238美囤商城 239会员进群
        continue;
      }
      newLists.push(item);
    }
    obj.data.list = newLists;
  }
} else if (url.includes("/feeds/get_index_feeds_list")) {
  // 首页信息流
  if (obj?.data?.list?.length > 0) {
    obj.data.list = obj.data.list.filter(
      (i) => ["发表了", "提问了"]?.includes(i?.action_desc) && !i.hasOwnProperty("seeding_goods_info")
    );
  }
} else if (url.includes("/mobile_search_new/search_index")) {
  // 搜索列表
  if (obj?.data?.find_search) {
    delete obj.data.find_search; // 搜索发现
  }
} else if (url.includes("/user/get_user_info")) {
  // 我的页面
  if (obj?.data?.video_show) {
    delete obj.data.video_show; // 顶部婴儿视频
  }
}

$done({ body: JSON.stringify(obj) });
}
function __original2(__typedArgs,$argument){
/*
脚本引用https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/babytree.js
*/
// 2024-10-28 01:35

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/app_index/get_app_tab")) {
  // 底部tab
  if (obj?.data?.selected_list?.length > 0) {
    obj.data.selected_list = obj.data.selected_list.filter((i) => !["购物", "商城"]?.includes(i?.name));
  }
} else if (url.includes("/bafconfigcenter_intf/config/get")) {
  // 整体配置
  const items = [
    "pregnancy__find_group_guide_image_url", // 加入的圈子
    "pregnancy__home_left_icon", // 直播图标
    "pregnancy__home_left_icon_new", // 直播图标
    "pregnancy__home_left_icon_static", // 直播图标
    "pregnancy__video_white_list" // 宝宝视频
  ];
  if (obj?.data) {
    for (let i of items) {
      if (obj?.data?.[i]) {
        obj.data[i] = "";
      }
    }
  }
} else if (url.includes("/cms_column/get_column_list")) {
  // tab配置
  if (obj?.data?.list?.length > 0) {
    let newLists = [];
    for (let item of obj.data.list) {
      if (item?.data_source_list?.length > 0) {
        let newDatas = [];
        for (let i of item.data_source_list) {
          // 首页顶部tab
          if (i?.tab_name?.includes("精品秒杀")) {
            continue;
          } else {
            newDatas.push(i);
          }
        }
        item.data_source_list = newDatas;
      }
      if (["225", "226", "238", "239"]?.includes(item?.id)) {
        // 我的页面模块
        // 225我的福利 226banner轮播图 238美囤商城 239会员进群
        continue;
      }
      newLists.push(item);
    }
    obj.data.list = newLists;
  }
} else if (url.includes("/feeds/get_index_feeds_list")) {
  // 首页信息流
  if (obj?.data?.list?.length > 0) {
    obj.data.list = obj.data.list.filter(
      (i) => ["发表了", "提问了"]?.includes(i?.action_desc) && !i.hasOwnProperty("seeding_goods_info")
    );
  }
} else if (url.includes("/mobile_search_new/search_index")) {
  // 搜索列表
  if (obj?.data?.find_search) {
    delete obj.data.find_search; // 搜索发现
  }
} else if (url.includes("/user/get_user_info")) {
  // 我的页面
  if (obj?.data?.video_show) {
    delete obj.data.video_show; // 顶部婴儿视频
  }
}

$done({ body: JSON.stringify(obj) });
}
const __originals=[__original0,__original1,__original2];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^http://api\\.babytree\\.com/bafconfigcenter_intf/config/get\\?","i").exec(__url))){return __invoke(0,{},null);}
if((true) && (match=new RegExp("^http://go\\.babytree\\.com/go_pregnancy/api/(app_index/get_app_tab|cms_column/get_column_list|feeds/get_index_feeds_list|user/get_user_info)\\?","i").exec(__url))){return __invoke(1,{},null);}
if((true) && (match=new RegExp("^http://go\\.babytree\\.com/go_search/api/mobile_search_new/search_index","i").exec(__url))){return __invoke(2,{},null);}
__finish({});
})();
(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
/*
脚本引用https://raw.githubusercontent.com/Keywos/rule/main/JS/bdsrf.js
*/
const okk = JSON.parse($response.body);
if (/imrobot\/v1\/pub\/relation\/get_robot_list/.test($request.url)) {
  okk.data.robot_info.forEach((robot) => {
robot.friend_bg_img = `https://raw.githubusercontent.com/Keywos/rule/main/mocks/bd/robot${Math.floor(Math.random() * 12) + 1}.jpg`;});
} else if (/v5\/custom_page\/layout/.test($request.url)) {
  const keyi=["\u529f\u80fd\u5165\u53e3","\u8868\u60c5\u56fe\u6807iOSan","\u4e00\u4e22\u513f\u989c\u6587\u5b57\u6807\u9898\u680f-iOSan","\u6d3b\u52a8\u4e2d\u5fc3\u6807\u9898\u680fiOS","\u5b57\u4f53banner",];
  const keys = ["\u5b57\u4f53banner", "\u6d3b\u52a8\u4e2d\u5fc3\u6807\u9898\u680fiOS"];
  if (okk.data.page_layout_content && Array.isArray(okk.data.page_layout_content)) {
    okk.data.page_layout_content = okk.data.page_layout_content.filter(
      ({ module_desc }) => keyi.includes(module_desc));}
  if (okk.data.page_data_content && Array.isArray(okk.data.page_data_content)) {
    okk.data.page_data_content = okk.data.page_data_content.filter(
      ({ module_desc }) => keyi.includes(module_desc) && !keys.some((keyword) => module_desc.includes(keyword)));}
} else if (/v5\/custom_page\/getdata/.test($request.url)) {
  if (okk.data && Array.isArray(okk.data)) {
    okk.data.forEach((item) => {if (item.items) {item.items = [];}});}
}$done({ body: JSON.stringify(okk) });

}
const __originals=[__original0];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https?://mime\\.baidu\\.com/(imrobot/v1/pub/relation/get_robot_list|v5/custom_page/(layout|getdata))","i").exec(__url))){return __invoke(0,{},null);}
__finish({});
})();
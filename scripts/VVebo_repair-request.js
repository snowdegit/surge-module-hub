(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
/*
脚本引用https://raw.githubusercontent.com/suiyuran/stash/main/scripts/fix-vvebo-user-timeline.js
*/
// 2024-02-04 22:09:40

let url = $request.url;
let hasUid = (url) => url.includes("uid");
let getUid = (url) => (hasUid(url) ? url.match(/uid=(\d+)/)[1] : undefined);
if (url.includes("remind/unread_count")) {
  $persistentStore.write(getUid(url), "uid");
  $done({});
} else if (url.includes("statuses/user_timeline")) {
  let uid = getUid(url) || $persistentStore.read("uid");
  url = url.replace("statuses/user_timeline", "profile/statuses/tab").replace("max_id", "since_id");
  url = url + `&containerid=230413${uid}_-_WEIBO_SECOND_PROFILE_WEIBO`;
  $done({ url });
} else if (url.includes("profile/statuses/tab")) {
  let data = JSON.parse($response.body);
  let statuses = data.cards
    .map((card) => (card.card_group ? card.card_group : card))
    .flat()
    .filter((card) => card.card_type === 9)
    .map((card) => card.mblog)
    .map((status) => (status.isTop ? { ...status, label: "置顶" } : status));
  let sinceId = data.cardlistInfo.since_id;
  $done({ body: JSON.stringify({ statuses, since_id: sinceId, total_number: 100 }) });
} if (url.includes("selffans")) {
  let data = JSON.parse($response.body);
  let cards = data.cards.filter((card) => card.itemid !== "INTEREST_PEOPLE2");
  $done({ body: JSON.stringify({ ...data, cards }) });
} else {
  $done({});
}
}
function __original1(__typedArgs,$argument){
/*
脚本引用https://raw.githubusercontent.com/suiyuran/stash/main/scripts/fix-vvebo-user-timeline.js
*/
// 2024-02-04 22:09:40

let url = $request.url;
let hasUid = (url) => url.includes("uid");
let getUid = (url) => (hasUid(url) ? url.match(/uid=(\d+)/)[1] : undefined);
if (url.includes("remind/unread_count")) {
  $persistentStore.write(getUid(url), "uid");
  $done({});
} else if (url.includes("statuses/user_timeline")) {
  let uid = getUid(url) || $persistentStore.read("uid");
  url = url.replace("statuses/user_timeline", "profile/statuses/tab").replace("max_id", "since_id");
  url = url + `&containerid=230413${uid}_-_WEIBO_SECOND_PROFILE_WEIBO`;
  $done({ url });
} else if (url.includes("profile/statuses/tab")) {
  let data = JSON.parse($response.body);
  let statuses = data.cards
    .map((card) => (card.card_group ? card.card_group : card))
    .flat()
    .filter((card) => card.card_type === 9)
    .map((card) => card.mblog)
    .map((status) => (status.isTop ? { ...status, label: "置顶" } : status));
  let sinceId = data.cardlistInfo.since_id;
  $done({ body: JSON.stringify({ statuses, since_id: sinceId, total_number: 100 }) });
} if (url.includes("selffans")) {
  let data = JSON.parse($response.body);
  let cards = data.cards.filter((card) => card.itemid !== "INTEREST_PEOPLE2");
  $done({ body: JSON.stringify({ ...data, cards }) });
} else {
  $done({});
}
}
function __original2(__typedArgs,$argument){
/*
脚本引用https://raw.githubusercontent.com/suiyuran/stash/main/scripts/fix-vvebo-user-timeline.js
*/
// 2024-02-04 22:09:40

let url = $request.url;
let hasUid = (url) => url.includes("uid");
let getUid = (url) => (hasUid(url) ? url.match(/uid=(\d+)/)[1] : undefined);
if (url.includes("remind/unread_count")) {
  $persistentStore.write(getUid(url), "uid");
  $done({});
} else if (url.includes("statuses/user_timeline")) {
  let uid = getUid(url) || $persistentStore.read("uid");
  url = url.replace("statuses/user_timeline", "profile/statuses/tab").replace("max_id", "since_id");
  url = url + `&containerid=230413${uid}_-_WEIBO_SECOND_PROFILE_WEIBO`;
  $done({ url });
} else if (url.includes("profile/statuses/tab")) {
  let data = JSON.parse($response.body);
  let statuses = data.cards
    .map((card) => (card.card_group ? card.card_group : card))
    .flat()
    .filter((card) => card.card_type === 9)
    .map((card) => card.mblog)
    .map((status) => (status.isTop ? { ...status, label: "置顶" } : status));
  let sinceId = data.cardlistInfo.since_id;
  $done({ body: JSON.stringify({ statuses, since_id: sinceId, total_number: 100 }) });
} if (url.includes("selffans")) {
  let data = JSON.parse($response.body);
  let cards = data.cards.filter((card) => card.itemid !== "INTEREST_PEOPLE2");
  $done({ body: JSON.stringify({ ...data, cards }) });
} else {
  $done({});
}
}
function __original3(__typedArgs,$argument){
/*
脚本引用https://raw.githubusercontent.com/suiyuran/stash/main/scripts/fix-vvebo-user-timeline.js
*/
// 2024-02-04 22:09:40

let url = $request.url;
let hasUid = (url) => url.includes("uid");
let getUid = (url) => (hasUid(url) ? url.match(/uid=(\d+)/)[1] : undefined);
if (url.includes("remind/unread_count")) {
  $persistentStore.write(getUid(url), "uid");
  $done({});
} else if (url.includes("statuses/user_timeline")) {
  let uid = getUid(url) || $persistentStore.read("uid");
  url = url.replace("statuses/user_timeline", "profile/statuses/tab").replace("max_id", "since_id");
  url = url + `&containerid=230413${uid}_-_WEIBO_SECOND_PROFILE_WEIBO`;
  $done({ url });
} else if (url.includes("profile/statuses/tab")) {
  let data = JSON.parse($response.body);
  let statuses = data.cards
    .map((card) => (card.card_group ? card.card_group : card))
    .flat()
    .filter((card) => card.card_type === 9)
    .map((card) => card.mblog)
    .map((status) => (status.isTop ? { ...status, label: "置顶" } : status));
  let sinceId = data.cardlistInfo.since_id;
  $done({ body: JSON.stringify({ statuses, since_id: sinceId, total_number: 100 }) });
} if (url.includes("selffans")) {
  let data = JSON.parse($response.body);
  let cards = data.cards.filter((card) => card.itemid !== "INTEREST_PEOPLE2");
  $done({ body: JSON.stringify({ ...data, cards }) });
} else {
  $done({});
}
}
function __original4(__typedArgs,$argument){
/*
脚本引用https://raw.githubusercontent.com/suiyuran/stash/main/scripts/fix-vvebo-user-timeline.js
*/
// 2024-02-04 22:09:40

let url = $request.url;
let hasUid = (url) => url.includes("uid");
let getUid = (url) => (hasUid(url) ? url.match(/uid=(\d+)/)[1] : undefined);
if (url.includes("remind/unread_count")) {
  $persistentStore.write(getUid(url), "uid");
  $done({});
} else if (url.includes("statuses/user_timeline")) {
  let uid = getUid(url) || $persistentStore.read("uid");
  url = url.replace("statuses/user_timeline", "profile/statuses/tab").replace("max_id", "since_id");
  url = url + `&containerid=230413${uid}_-_WEIBO_SECOND_PROFILE_WEIBO`;
  $done({ url });
} else if (url.includes("profile/statuses/tab")) {
  let data = JSON.parse($response.body);
  let statuses = data.cards
    .map((card) => (card.card_group ? card.card_group : card))
    .flat()
    .filter((card) => card.card_type === 9)
    .map((card) => card.mblog)
    .map((status) => (status.isTop ? { ...status, label: "置顶" } : status));
  let sinceId = data.cardlistInfo.since_id;
  $done({ body: JSON.stringify({ statuses, since_id: sinceId, total_number: 100 }) });
} if (url.includes("selffans")) {
  let data = JSON.parse($response.body);
  let cards = data.cards.filter((card) => card.itemid !== "INTEREST_PEOPLE2");
  $done({ body: JSON.stringify({ ...data, cards }) });
} else {
  $done({});
}
}
const __originals=[__original0,__original1,__original2,__original3,__original4];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://api\\.weibo\\.cn/2/users/show\\?","i").exec(__url))){return __invoke(0,{},null);}
if((true) && (match=new RegExp("^https://api\\.weibo\\.cn/2/statuses/user_timeline\\?","i").exec(__url))){return __invoke(1,{},null);}
if((true) && (match=new RegExp("^https://api\\.weibo\\.cn/2/remind/unread_count\\?","i").exec(__url))){return __invoke(2,{},null);}
__finish({});
})();
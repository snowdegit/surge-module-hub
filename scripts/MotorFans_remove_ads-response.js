(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument,$request,$response,$done,$script){
// Loon 响应体修改脚本模板
// 适用于 Loon 的 HTTP 响应脚本

(() => {
    // 快速失败检查
    if (!$response?.body) return $done({});

    let body;
    try {
        body = JSON.parse($response.body);
    } catch (e) {
        console.log(`JSON解析失败: ${e.message}`);
        return $done({});
    }

    let modified = false;

    // 预定义过滤类型（避免重复创建数组）
    const UNWANTED_TAB_TYPES = new Set([2, 3]);

    // 命中关键字即移除对应字段（区分大小写）
    const REMOVED_KEYWORDS = [
        "_ad_",
        "splash",
        "adPatch",
        "AdFree",
        "adFeed",
        "AdTime",
        "AdAlert",
        "AdConfig",
        "cancelInspire",
        "financeAvoidChannel",
        "_popup_",
        "HomeKingKong",
        "MyWalletConfig",
        "insurance_product_url",
        "insurance_order_url",
    ];

    // 服务端 data 为空/null 时兜底为 3 个 Tab，避免客户端继续使用旧缓存
    const FALLBACK_TITLES = {
        0: "首页",
        1: "玩圈",
        4: "我的",
    };
    const FALLBACK_TAB_TYPES = [0, 1, 4];

    const fallbackTab = (type, light) => {
        const index = type === 4 ? 5 : type + 1;
        return {
            titleColor: light ? "#333333" : "#C7C9D0",
            imageUrl: light
                ? `https://imgs3.58moto.com/img/app/${index}@3x.png`
                : `https://imgs3.58moto.com/img/icon2/black_${index}@3x.png`,
            type,
            title: FALLBACK_TITLES[type],
            selectedImageUrl: light
                ? `https://imgs3.58moto.com/img/app/${index}_s@3x.png`
                : `https://imgs3.58moto.com/img/icon2/black_${index}_s@3x.png`,
            selectedTitleColor: light ? "#111111" : "#C7C9D0",
        };
    };

    const getFallbackData = () => ({
        dymaicTabBar: FALLBACK_TAB_TYPES.map((type) => fallbackTab(type, true)),
        blackDymaicTabBar: FALLBACK_TAB_TYPES.map((type) => fallbackTab(type, false)),
    });

    const shouldRemoveTab = (item) => {
        const type = item?.type;
        return UNWANTED_TAB_TYPES.has(type) || UNWANTED_TAB_TYPES.has(Number(type));
    };

    const shouldRemoveField = (key) => {
        return REMOVED_KEYWORDS.some((keyword) => key.includes(keyword));
    };

    // 递归移除命名字段
    const cleanFields = (node) => {
        if (Array.isArray(node)) {
            node.forEach(cleanFields);
            return;
        }
        if (!node || typeof node !== "object") return;

        for (const key of Object.keys(node)) {
            if (shouldRemoveField(key)) {
                delete node[key];
                modified = true;
            } else {
                cleanFields(node[key]);
            }
        }
    };

    // API路径处理映射
    const processData = () => {
        let dataPath = body?.data;
        if (dataPath === null || dataPath === undefined) {
            body.data = JSON.stringify(getFallbackData());
            modified = true;
            return;
        }

        if (typeof dataPath === "string") {
            try {
                dataPath = JSON.parse(dataPath);
            } catch (e) {
                console.log(`data JSON解析失败: ${e.message}`);
                return;
            }
        }
        if (typeof dataPath !== "object" || dataPath === null) return;

        // 数组过滤优化
        for (const tabKey of ["dymaicTabBar", "blackDymaicTabBar"]) {
            const items = dataPath[tabKey];
            if (!Array.isArray(items) || items.length === 0) continue;

            const filteredItems = items.filter((item) => !shouldRemoveTab(item));
            if (filteredItems.length !== items.length) {
                dataPath[tabKey] = filteredItems;
                modified = true;
            }
        }

        // 移除命名字段
        cleanFields(dataPath);

        // data 原本是字符串时同步写回
        if (typeof body.data === "string") {
            body.data = JSON.stringify(dataPath);
        }
    };

    // 返回结果
    processData();
    $done(modified ? { body: JSON.stringify(body) } : {});
})();
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
if((true) && (match=new RegExp("^https://api\\.58moto\\.com/expands/config/appWholeConfig\\?key=app_whole_config$","i").exec(__url))){return __invoke(0,{},null,false,true);}
__finish({});
})();
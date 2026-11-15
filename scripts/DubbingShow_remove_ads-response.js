(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
// 2024-08-28 08:57:11
const url = $request.url;
const body = $response.body;

if (!body) $done({});

function removeDataWithKeyword(array) {
    if (Array.isArray(array)) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i].data && array[i].data.includes("金币哦")) {
                array.splice(i, 1);
            }
        }
    }
}

try {
    let obj = JSON.parse(body);

    if (url.includes("/Api/Film/GetConfigValue")) {
        if (obj.data && Array.isArray(obj.data)) {
            removeDataWithKeyword(obj.data);
        }
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.error("JSON parsing error:", e);
    $done({});
}

}
const __originals=[__original0];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://iosapi\\.peiyinxiu\\.com/Api/Film/GetConfigValue","i").exec(__url))){return __invoke(0,{},null);}
__finish({});
})();
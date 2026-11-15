(function(){
// Generated compatibility/dispatch layer. Original authors retained below.
const __settings = (()=>{try{return JSON.parse(typeof $argument==='string'?$argument:'{}')}catch(e){console.log('Module argument JSON invalid: '+e);return {}}})();
const __finish=$done;
function __cast(value, fallback){if(value===undefined)return fallback;if(typeof fallback==='boolean')return value===true||value==='true';if(typeof fallback==='number')return Number(value);return value;}

function __original0(__typedArgs,$argument){
/*
https://t.me/ibilibili
2026-07-11 20:05:34
*/
let body = $response.body || "";

const oldChunk = "https://pfile.pddpic.com/mdkd/mdkd/_next/static/chunks/9410-b8806e870a26db7d.js";
const newChunk = "https://kelee.one/Resource/JavaScript/PinDuoDuo/9410-b8806e870a26db7d.js";

function replaceAllText(text, from, to) {
  let pos = text.indexOf(from);
  while (pos !== -1) {
    text = text.slice(0, pos) + to + text.slice(pos + from.length);
    pos = text.indexOf(from, pos + to.length);
  }
  return text;
}

function removeGifContainer(html) {
  const marker = "index_gif-container";
  let pos = html.indexOf(marker);

  while (pos !== -1) {
    const open = html.lastIndexOf("<div", pos);
    if (open === -1) break;

    let i = open;
    let depth = 0;
    let end = -1;

    while (i < html.length) {
      const nextOpen = html.indexOf("<div", i);
      const nextClose = html.indexOf("</div>", i);
      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        i = nextOpen + 4;
      } else {
        depth--;
        i = nextClose + 6;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }

    if (end === -1) break;

    html = html.slice(0, open) + html.slice(end);
    pos = html.indexOf(marker, open);
  }

  return html;
}

function trimNextData(html) {
  const idNeedle = 'id="__NEXT_DATA__"';
  const idPos = html.indexOf(idNeedle);
  if (idPos === -1) return html;

  const tagStart = html.lastIndexOf("<script", idPos);
  if (tagStart === -1) return html;

  const contentStart = html.indexOf(">", tagStart);
  if (contentStart === -1) return html;

  const tagEnd = html.indexOf("</script>", contentStart);
  if (tagEnd === -1) return html;

  const jsonText = html.slice(contentStart + 1, tagEnd);

  try {
    const data = JSON.parse(jsonText);
    const serverData = data &&
      data.props &&
      data.props.pageProps &&
      data.props.pageProps.serverData;

    if (Array.isArray(serverData)) {
      data.props.pageProps.serverData = serverData.filter(item =>
        item &&
        (item.key === "fastBindCMobilePreCheck" ||
         item.key === "queryStationPackageInfo")
      );
    }

    return html.slice(0, contentStart + 1) +
      JSON.stringify(data) +
      html.slice(tagEnd);
  } catch (e) {
    return html;
  }
}

body = replaceAllText(body, oldChunk, newChunk);
body = removeGifContainer(body);
body = trimNextData(body);

$done({ body });
}
const __originals=[__original0];
function __invoke(index,defaults,literal){const typed={};for(const k of Object.keys(defaults))typed[k]=__cast(__settings[k],defaults[k]);return __originals[index](typed,literal===null?JSON.stringify(typed):literal);}
const __url=$request.url;let match;
if((true) && (match=new RegExp("^https://m\\.pinduoduo\\.net/mdkd/package\\?from_app_scan","i").exec(__url))){return __invoke(0,{},null);}
__finish({});
})();
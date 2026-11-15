// Executed inside Surge's real JavaScript engine, with synthetic messages.
// Upstream functions are replaced by probes: no accounts or external requests.
function nativeDispatch(source, cases, entryBinary) {
  const probe = '\n__originals.forEach((_,i)=>{__originals[i]=function(typed,literal,request,response,done,script){done({probe:{index:i,typed,literal,hasRequestBody:Object.prototype.hasOwnProperty.call(request||{},"body"),hasResponseBody:Object.prototype.hasOwnProperty.call(response||{},"body"),requestBody:request&&request.body,responseBody:response&&response.body,mode:script&&script.binaryBodyMode}})}});';
  const substituted = source.replace(/\nconst __originals=\[[^\]\n]*\];/, m => m + probe);
  if (cases.length && substituted === source) throw Error('Probe substitution failed');
  const invoke = new Function('$request','$response','$argument','$done','$script','console',substituted);
  const results=[];
  const enabled=(c,settings)=>{
    let v=c.options.enable;
    if(!v)return true;
    const m=v.match(/^\$\{(.+)\}$/);
    if(m){v=settings[m[1]]===undefined?c.args[m[1]]:settings[m[1]];return v===true||v==='true'}
    return v==='true';
  };
  const assert=(v,message)=>{if(!v)throw Error(message)};
  for(const c of cases.filter(x=>x.action==='script')){
    const task=c.kind==='cron'||c.kind==='generic';
    for(const variant of task?['default','override']:['default','override','negative']){
      try{
        const settings={};
        if(variant==='override'){
          for(const k of Object.keys(c.args)){
            const v=c.args[k];settings[k]=typeof v==='boolean'?String(!v):typeof v==='number'?String(v+1):'override🙂';
          }
          const gate=(c.options.enable||'').match(/^\$\{(.+)\}$/);if(gate)settings[gate[1]]='true';
        }
        const url=variant==='negative'?'invalid://unrelated.invalid/':c.witness;
        assert(task||url,'Missing URL witness');
        const selected=task?(enabled(c,settings)?c:null):cases.find(x=>enabled(x,settings)&&new RegExp(x.pattern,x.flags).test(url));
        const payload=entryBinary?Uint8Array.from([228,184,173,230,150,135,240,159,153,130]):'中文🙂';
        const req={url,method:c.kind==='request'?'POST':'GET',headers:{'X-Keep':'yes'},body:payload};
        const res={status:200,headers:{},body:payload};
        let done=0,result;
        invoke(task?undefined:req,task?undefined:res,JSON.stringify(settings),r=>{done++;result=r},{binaryBodyMode:entryBinary},{log(){},error(){}});
        assert(done===1,'Expected exactly one completion');
        if(!selected)assert(Object.keys(result).length===0,'Unexpected route');
        else if(selected.action==='script'){
          assert(result.probe,'Missing probe');assert(result.probe.index===selected.index,'Wrong route index');
          for(const k of selected.argkeys){
            const fallback=selected.args[k],input=settings[k]===undefined?fallback:settings[k];
            const expected=typeof fallback==='boolean'?(input===true||input==='true'):typeof fallback==='number'?Number(input):input;
            assert(JSON.stringify(result.probe.typed[k])===JSON.stringify(expected),'Argument type/value: '+k);
          }
          if(!task){
            const needs=selected.options.requires_body==='true',binary=selected.options.binary_body_mode==='true';
            assert(result.probe.hasRequestBody===needs&&result.probe.hasResponseBody===needs,'Body availability');
            assert(result.probe.mode===binary,'Binary mode');
            if(needs){
              if(binary)assert(result.probe.responseBody instanceof Uint8Array&&Array.from(result.probe.responseBody).join(',')==='228,184,173,230,150,135,240,159,153,130','Binary payload');
              else assert(result.probe.responseBody==='中文🙂','Text payload');
            }
          }
        }else assert(result.response||result.url||result.headers||result.body!==undefined,'Missing builtin rewrite output');
        results.push({line:c.line,variant,passed:true});
      }catch(e){results.push({line:c.line,variant,passed:false,error:String(e)})}
    }
  }
  return results;
}

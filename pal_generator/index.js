const e=document.createElement("canvas"),t=[{colorSize:{x:32,y:32},backAreaColorOffset:{x:724,y:118}},{colorSize:{x:26,y:28},backAreaColorOffset:{x:598,y:104}},{colorSize:{x:24,y:23},backAreaColorOffset:{x:539,y:86}},{colorSize:{x:18,y:19},backAreaColorOffset:{x:421,y:72}},{colorSize:{x:16,y:16},backAreaColorOffset:{x:362,y:59}}];function o(e,t,o){return t>=0&&t<e.width&&o>=0&&o<e.height}function r({data:e,width:t},o,r){const n=4*(r*t+o);return[e[n],e[n+1],e[n+2]]}function n(e,t,n,a){const[l,c,i]=r(e,t,n);for(let s=0;s<a.colorSize.y;s+=1)for(let f=0;f<a.colorSize.x;f+=1){const a=t+f,u=n+s;if(!o(e,a,u))return!1;const[d,y,g]=r(e,a,u);if(l!==d||c!==y||i!==g)return!1}return!0}function a(e,t,r,a){for(let l=0;l<16;l+=1){const c=t+l*a.colorSize.x,i=r+l*a.colorSize.y;if(!o(e,c,i))return!1;if(!n(e,c,i,a))return!1}return!0}function l(e,t,n,a){const l=new Uint8Array(768),c=function(e,t,n,a){const l=t+a.backAreaColorOffset.x,c=n+a.backAreaColorOffset.y;if(o(e,l,c))return r(e,l,c)}(e,t,n,a);let i=0;for(let o=0;o<16;o+=1)for(let s=0;s<16;s+=1){const f=t+s*a.colorSize.x,u=n+o*a.colorSize.y;let d,y,g;[d,y,g]=0===s&&null!=c?c:r(e,f,u),l[i++]=255&d,l[i++]=255&y,l[i++]=255&g}return l}function c(o){const r=o.naturalWidth,n=o.naturalHeight;e.width=r,e.height=n;const c=e.getContext("2d");c.clearRect(0,0,r,n),c.drawImage(o,0,0);const i=c.getImageData(0,0,r,n),s=function(e){for(const o of t){const t=16*o.colorSize.x,r=16*o.colorSize.y;for(let n=0;n<=e.height-r;n+=1)for(let r=0;r<=e.width-t;r+=1)if(a(e,r,n,o))return{x:r,y:n,config:o}}return{error:"Nothing in that image looks like a palette from Lunar Magic."}}(i);return null!=s.error?s:{pal:l(i,s.x,s.y,s.config)}}export default function(e){const t=e.byID("file"),o=e.byID("output"),r=e.byID("preview");let n;async function a(t){e.setStatus({message:"⌛ Processing..."}),new Promise(((e,o)=>{const r=document.createElement("img");r.src=URL.createObjectURL(t),r.onload=()=>{URL.revokeObjectURL(r.src),e(c(r))},r.onerror=e=>{URL.revokeObjectURL(r.src),o(e)}})).then((a=>{if(e.setStatus(a),null!=a.pal){const e=t.name.lastIndexOf("."),l=`${-1===e?t.name:t.name.slice(0,e)}.pal`;n={name:l,blob:new Blob([a.pal],{type:"application/octet-stream"})},o.style.display="",function(e,t){const o=e.getContext("2d"),r=o.getImageData(0,0,16,16),{data:n}=r;for(let e=0,o=0;o<t.length;e+=4,o+=3)n[e]=t[o],n[e+1]=t[o+1],n[e+2]=t[o+2],n[e+3]=255;o.putImageData(r,0,0)}(r,a.pal)}})).catch((t=>{console.log(t),e.setStatus({error:"Internal error."})}))}t.addEventListener("change",(()=>{const r=t.files[0];if(n=void 0,o.style.display="none",null==r)return e.setStatus({error:"No file specified."});a(r)})),e.root.addEventListener("paste",(e=>{for(const r of e.clipboardData.files)r.type.startsWith("image/")&&(t.value=null,n=void 0,o.style.display="none",a(r))})),e.byID("download").addEventListener("click",(()=>{null!=n&&e.download(n.name,n.blob)}))}
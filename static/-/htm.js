var d=function(p,o,t,n){var v;o[0]=0;for(var u=1;u<o.length;u++){var g=o[u++],i=o[u]?(o[0]|=g?1:2,t[o[u++]]):o[++u];g===3?n[0]=i:g===4?n[1]=Object.assign(n[1]||{},i):g===5?(n[1]=n[1]||{})[o[++u]]=i:g===6?n[1][o[++u]]+=i+"":g?(v=p.apply(i,d(p,i,t,["",null])),n.push(v),i[0]?o[0]|=2:(o[u-2]=0,o[u]=v)):n.push(i)}return n},w=new Map;function M(p){var o=w.get(this);return o||(o=new Map,w.set(this,o)),(o=d(this,o.get(p)||(o.set(p,o=function(t){for(var n,v,u=1,g="",i="",f=[0],c=function(l){u===1&&(l||(g=g.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?f.push(0,l,g):u===3&&(l||g)?(f.push(3,l,g),u=2):u===2&&g==="..."&&l?f.push(4,l,0):u===2&&g&&!l?f.push(5,0,!0,g):u>=5&&((g||!l&&u===5)&&(f.push(u,0,g,v),u=6),l&&(f.push(u,l,0,v),u=6)),g=""},s=0;s<t.length;s++){s&&(u===1&&c(),c(s));for(var m=0;m<t[s].length;m++)n=t[s][m],u===1?n==="<"?(c(),f=[f],u=3):g+=n:u===4?g==="--"&&n===">"?(u=1,g=""):g=n+g[0]:i?n===i?i="":g+=n:n==='"'||n==="'"?i=n:n===">"?(c(),u=1):u&&(n==="="?(u=5,v=g,g=""):n==="/"&&(u<5||t[s][m+1]===">")?(c(),u===3&&(f=f[0]),u=f,(f=f[0]).push(2,0,u),u=0):n===" "||n==="	"||n===`
`||n==="\r"?(c(),u=2):g+=n),u===3&&g==="!--"&&(u=4,f=f[0])}return c(),f}(p)),o),arguments,[])).length>1?o:o[0]}export default M;
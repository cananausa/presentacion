// Generador de QR mínimo (modo byte, corrección L, versiones 1-5, máscara 0). Sin dependencias.
const QR=(()=>{const EXP=[],LOG=[];let x=1;for(let i=0;i<255;i++){EXP[i]=x;LOG[x]=i;x<<=1;if(x&256)x^=285}
const mul=(a,b)=>a&&b?EXP[(LOG[a]+LOG[b])%255]:0;
function rs(data,n){let g=[1];for(let i=0;i<n;i++){const h=[];for(let j=0;j<=g.length;j++)h[j]=(g[j]||0)^mul(g[j-1]||0,EXP[i]);g=h}
 const r=Array(n).fill(0);for(const d of data){const f=d^r[0];r.shift();r.push(0);for(let j=0;j<n;j++)r[j]^=mul(g[j+1],f)}return r}
const T=[0,[26,7],[44,10],[70,15],[100,20],[134,26]];
function make(text){const b=[...new TextEncoder().encode(text)];let v=1;while(v<5&&T[v][0]-T[v][1]-2<b.length)v++;
 if(T[v][0]-T[v][1]-2<b.length)throw Error('URL demasiado larga');
 const[tot,ec]=T[v],dc=tot-ec,bits=[],put=(n,l)=>{for(let i=l-1;i>=0;i--)bits.push((n>>i)&1)};
 put(4,4);put(b.length,8);b.forEach(c=>put(c,8));for(let i=0;i<4&&bits.length<dc*8;i++)bits.push(0);while(bits.length%8)bits.push(0);
 const data=[];for(let i=0;i<bits.length;i+=8)data.push(parseInt(bits.slice(i,i+8).join(''),2));
 for(let p=0;data.length<dc;p++)data.push(p%2?0x11:0xEC);
 const all=data.concat(rs(data,ec)),S=17+4*v,m=[...Array(S)].map(()=>Array(S).fill(0)),f=[...Array(S)].map(()=>Array(S).fill(0));
 const s=(x,y,val)=>{if(x>=0&&y>=0&&x<S&&y<S){m[y][x]=val?1:0;f[y][x]=1}};
 for(const[R,C]of[[0,0],[S-7,0],[0,S-7]])for(let dy=-1;dy<=7;dy++)for(let dx=-1;dx<=7;dx++){const i=dy>=0&&dy<=6&&dx>=0&&dx<=6&&(dy%6==0||dx%6==0||(dy>=2&&dy<=4&&dx>=2&&dx<=4));s(C+dx,R+dy,i)}
 for(let i=8;i<S-8;i++){s(6,i,i%2==0);s(i,6,i%2==0)}
 if(v>1){const c=S-7;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)s(c+dx,c+dy,Math.max(Math.abs(dx),Math.abs(dy))!=1)}
 let d=8,r=d;for(let i=0;i<10;i++)r=(r<<1)^((r>>>9)*0x537);const fb=((d<<10)|r)^0x5412,g=i=>(fb>>>i)&1;
 for(let i=0;i<6;i++)s(8,i,g(i));s(8,7,g(6));s(8,8,g(7));s(7,8,g(8));for(let i=9;i<15;i++)s(14-i,8,g(i));
 for(let i=0;i<8;i++)s(S-1-i,8,g(i));for(let i=8;i<15;i++)s(8,S-15+i,g(i));s(8,S-8,1);
 let k=0;for(let right=S-1;right>=1;right-=2){if(right==6)right=5;for(let vert=0;vert<S;vert++)for(let j=0;j<2;j++){const x=right-j,y=((right+1)&2)==0?S-1-vert:vert;
  if(!f[y][x]){if(k<all.length*8)m[y][x]=(all[k>>>3]>>>(7-(k&7)))&1;k++;if((x+y)%2==0)m[y][x]^=1}}}
 return m}
function draw(canvas,text,px=10){const m=make(text),q=4,S=m.length;canvas.width=canvas.height=(S+2*q)*px;const c=canvas.getContext('2d');
 c.fillStyle='#fff';c.fillRect(0,0,canvas.width,canvas.height);c.fillStyle='#000';
 m.forEach((row,y)=>row.forEach((v,x)=>{if(v)c.fillRect((x+q)*px,(y+q)*px,px,px)}))}
return{make,draw}})();
if(typeof module!=='undefined')module.exports=QR;

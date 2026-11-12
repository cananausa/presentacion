// Motor de presentación: navegación lineal por diapositivas y por pasos (data-step), transiciones, pantalla completa y control remoto. Incluye ganchos de sonido (sfx.js).
(()=>{const $=s=>document.querySelector(s),st=$('#stage'),box=$('#slides'),N=SL.length,X=(f,...a)=>window.SFX&&SFX[f]&&SFX[f](...a);let cur=-1,step=0,ws;
SL.forEach(s=>{const e=document.createElement('section');e.className='slide '+s.c;e.innerHTML=s.h();box.append(e);s.el=e;
 if(s.steps)e.querySelectorAll(s.steps).forEach(x=>x.setAttribute('data-step',''));      // marca los elementos-paso
 s.stepEls=[...e.querySelectorAll('[data-step]')];
 s.stepEls.forEach(x=>{x.removeAttribute('data-a');x.querySelectorAll('[data-a]').forEach(y=>y.removeAttribute('data-a'))});
 e.querySelectorAll('[data-a]').forEach(x=>x.style.setProperty('--d',(x.dataset.a||0)+'s'))});
$('#prog').innerHTML=SL.map((s,i)=>`<i title="${i+1}. ${s.t}" data-i="${i}"></i>`).join('');
function fit(){const k=Math.min(innerWidth/1920,innerHeight/1080);st.style.transform=`scale(${k}) translate(-50%,-50%)`;st.style.left='50%';st.style.top='50%';st.style.transformOrigin='0 0'}
addEventListener('resize',fit);document.addEventListener('fullscreenchange',fit);fit();
// count: el número empieza a contar cuando aparece su tarjeta (retraso = data-a del contenedor) y suena sincronizado.
function count(el,skipSteps){el.querySelectorAll('[data-count]').forEach(b=>{if(skipSteps&&b.closest('[data-step]'))return;const n=+b.dataset.count,dec=+(b.dataset.dec||0),dl=(+(b.closest('[data-a]')?.dataset.a)||0)*1000,t0=performance.now()+dl,f=x=>{const p=Math.min(1,Math.max(0,(x-t0)/1600)),e=1-Math.pow(1-p,3);
 b.textContent=(b.dataset.pre||'')+(n*e).toLocaleString('es-CO',{minimumFractionDigits:dec,maximumFractionDigits:dec})+(b.dataset.suf||'');if(p<1)requestAnimationFrame(f)};X('count',dl,1600);requestAnimationFrame(f)})}
// go(i,full): full=true muestra todas las tarjetas (saltos, retroceso); full=false entra con solo los elementos fijos.
const TX=[0,1,2,3,4,5,6,7,8,9]; // variedad: cada diapositiva usa un efecto de entrada distinto (0 = cortina original); reordena o repite números a gusto
function go(i,full=true){i=Math.max(0,Math.min(N-1,i));if(i===cur)return;const back=i<cur,old=cur>=0?SL[cur]:null,nw=SL[i],far=cur>=0&&Math.abs(i-cur)>1;
 box.querySelectorAll('.leave').forEach(e=>e.classList.remove('leave'));
 if(old){old.off&&old.off(old.el);old.el.classList.remove('active','enter','back');old.el.classList.add('leave');setTimeout(()=>old.el.classList.remove('leave'),900)}
 nw.stepEls.forEach(x=>x.classList.toggle('show',full));step=full?nw.stepEls.length:0;
 nw.el.classList.remove('leave');nw.el.classList.add('active');if(old){nw.el.className=nw.el.className.replace(/\s*tx\d+/g,'');nw.el.classList.add('enter','tx'+TX[i%TX.length]);back&&nw.el.classList.add('back');setTimeout(()=>nw.el.classList.remove('enter','back'),900)}
 old&&X('slide',TX[i%TX.length],back?-1:1,far,i===0,i===N-1);   // sonido de transición (debe ir antes de count)
 cur=i;nw.on&&nw.on(nw.el);count(nw.el,!full);
 old&&X('enter',nw.el,nw.t);                                       // sonidos de entrada escalonada
 document.querySelectorAll('#prog i').forEach((p,k)=>{p.className=k<i?'done':k===i?'cur':''});$('#cnt').textContent=`${i+1} / ${N}`;history.replaceState(null,'','#'+(i+1));report()}
const S=()=>SL[cur].stepEls;
function next(){if(step<S().length){const x=S()[step++];x.classList.add('show');X('card',step-1,cur,step===S().length);count(x);report()}else if(cur<N-1)go(cur+1,false);else X('play','limit')}
function prev(){if(step>0){S()[--step].classList.remove('show');X('cardOut');report()}else if(cur>0)go(cur-1,true);else X('play','limit')}
function report(){if(ws&&ws.readyState===1)ws.send(JSON.stringify({t:'state',i:cur,n:N,title:SL[cur].t,step,steps:S().length}))}
addEventListener('keydown',e=>{if(['ArrowRight',' ','PageDown','Enter'].includes(e.key)){e.preventDefault();next()}else if(['ArrowLeft','PageUp','Backspace'].includes(e.key)){e.preventDefault();prev()}
 else if(e.key==='Home')go(0);else if(e.key==='End')go(N-1);else if(e.key==='f'||e.key==='F')fs();else if(e.key==='q'||e.key==='Q')qr();else if(e.key==='Escape')$('#qrm').classList.remove('on')});
$('.nav.l').onclick=prev;$('.nav.r').onclick=next;$('#prog').onclick=e=>{if(e.target.dataset.i)go(+e.target.dataset.i)};
function fs(){X('play','fullscreen');document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}
$('#bf').onclick=fs;$('#bq').onclick=qr;$('#qrm').onclick=e=>{if(e.target.id==='qrm')e.currentTarget.classList.remove('on')};
async function qr(){X('play','qr');const m=$('#qrm');m.classList.toggle('on');if(!m.classList.contains('on'))return;
 try{const r=await (await fetch('/api/info')).json();QR.draw($('#qrc'),r.remote);$('#qru').textContent=r.remote}
 catch(e){$('#qru').textContent='Abre la presentación con «npm start» (servidor) para habilitar el control remoto.'}}
function conn(){if(location.protocol==='file:')return;ws=new WebSocket(`ws://${location.host}/ws?role=screen`);
 ws.onopen=()=>{$('#dot').classList.add('ok');X('play','connect');report()};ws.onclose=()=>{if($('#dot').classList.contains('ok'))X('play','disconnect');$('#dot').classList.remove('ok');setTimeout(conn,1500)};
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.t==='nav')m.d>0?next():prev();else if(m.t==='goto')go(m.i)}}
go(Math.max(0,(parseInt(location.hash.slice(1))||1)-1));conn()})();

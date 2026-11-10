// Contenido de las diapositivas. Cada una tiene su propia composición. Cifras: ver data.js (Excel definitivo) y Manual Cañaña.
const MK=(c='')=>`<svg class="mk ${c}" viewBox="0 0 100 130"><rect width="100" height="130" fill="var(--m1,#F92D1A)"/><polygon points="100,0 62,0 30,62 52,62 20,130 82,58 60,58" fill="var(--m2,#FFF3E1)"/>${[0,1,2,3,4,5,6,7].map(i=>`<rect x="70" y="${8+i*9}" width="22" height="5" rx="2.5" fill="var(--m1,#F92D1A)"/>`).join('')}</svg>`;
const A=d=>`data-a="${d}"`,N=(v,o={})=>`<b data-count="${v}" ${o.p?`data-pre="${o.p}"`:''} ${o.s?`data-suf="${o.s}"`:''} ${o.d?`data-dec="${o.d}"`:''}>0</b>`;
const COP=n=>'$'+Math.round(n).toLocaleString('es-CO');
const SL=[
{t:'Portada',c:'red cover',h:()=>`
 <div class="mkbox" ${A(.2)}>${MK()}</div>
 <div class="wm d cc" ${A(.4)}>ÑAPA</div>
 <p class="d" style="position:absolute;left:570px;top:690px;font-size:70px" ${A(.8)}>Un regalo para el barbero<br>y para su cliente.</p>
 <p class="sm" style="position:absolute;left:570px;top:900px;font-size:30px;letter-spacing:3px" ${A(1.1)}>CRM DE MEMBRESÍA DE BARRIO · SANTA MARTA · CAÑAÑA</p>
 <div class="bolt" style="left:1560px;top:120px" ${A(1)}>${MK()}</div>
 <div class="band"><span>ÑAPA ⚡ ÑAPA ⚡ ÑAPA ⚡ ÑAPA ⚡ ÑAPA ⚡ ÑAPA ⚡ ÑAPA ⚡ ÑAPA ⚡ ÑAPA ⚡ ÑAPA ⚡ ÑAPA ⚡ ÑAPA ⚡ </span></div>`},
{t:'El problema',c:'cream',h:()=>`
 <div class="ghost" style="right:-80px;top:-60px;width:700px;--m1:var(--b);--m2:var(--c)">${MK()}</div>
 <div class="kick rr" ${A(0)}>01 · El problema</div>
 <h2 ${A(.1)}>El cliente fijo se va <span class="rr">en silencio.</span></h2>
 <p style="max-width:1250px;margin-top:34px" ${A(.4)}>En las barberías y salones de barrio de Santa Marta, las citas viven en WhatsApp, en llamadas y en la memoria. Nadie sabe quién dejó de venir… hasta que ya está en la competencia.</p>
 <div class="shop" style="margin-top:50px" ${A(.7)}>${[0,0,0,1,0,0,0,0,0,0].map(h=>`<i class="${h?'hot':''}"></i>`).join('')}<span class="d bb" style="font-size:44px;margin-left:30px;align-self:center">10+ locales por barrio</span></div>
 <div class="row" style="margin-top:56px">
  <div class="card bg-b f" style="flex:1" ${A(.9)}><p><b>Sin seguimiento</b><br>no hay plan ni aviso para el cliente recurrente.</p></div>
  <div class="card bg-r f" style="flex:1" ${A(1.05)}><p><b>Demanda a ciegas</b><br>días saturados y franjas vacías.</p></div>
  <div class="card bg-o f" style="flex:1" ${A(1.2)}><p><b>Guerra de precios</b><br>bajar el corte para atraer, y ganar menos.</p></div></div>`},
{t:'Evidencia de campo',c:'blue',h:()=>`
 <div class="kick o" ${A(0)}>02 · El problema, comprobado en la calle</div>
 <div class="row" style="gap:70px">
  <div style="flex:1.1"><h2 style="font-size:92px" ${A(.1)}>«El negocio de barrio que triunfa vende <span class="o">una persona</span>, no una marca.»</h2>
   <p class="sm" style="margin-top:30px" ${A(.4)}>Hallazgo del análisis de competencia · Santa Marta</p></div>
  <div class="grid g2" style="flex:1;gap:24px">
   <div class="card bg-c stat" ${A(.5)}>${N(5)}<span>negocios entrevistados · 3 barberías y 2 salones, en 3 barrios</span></div>
   <div class="card bg-r stat" ${A(.65)}>${N(62)}<span>negocios rastreados en Google Maps; en barrio casi todos tienen 0–8 reseñas</span></div>
   <div class="card bg-o stat" ${A(.8)}><b style="font-size:64px;padding:22px 0">$15–25 mil</b><span>corte en barrio, contra $35–50 mil en zona turística</span></div>
   <div class="card bg-k stat" ${A(.95)}><b style="font-size:64px;padding:22px 0">Nº 1</b><span>queja en reseñas: la espera mal gestionada y sin claridad de cuánto tocará esperar</span></div></div></div>`},
{t:'Cliente y usuario',c:'cream',h:()=>`
 <div style="position:absolute;inset:0;display:flex">
  <div class="bg-r" style="flex:1;padding:100px 90px 100px 130px;position:relative" ${A(0)}>
   <div class="kick">03 · Cliente · quien paga</div><div class="d" style="font-size:130px" ${A(.3)}>El dueño</div>
   <p style="margin-top:30px" ${A(.5)}>Propietario/a de barbería o salón mediano de barrio en Santa Marta, de 28 a 50 años, con mentalidad de crecimiento. <b>Vive el problema</b> y paga <b>$50.000 al mes</b>.</p></div>
  <div class="bg-b" style="flex:1;padding:100px 130px 100px 90px" ${A(.2)}>
   <div class="kick o">Usuario · quien usa</div><div class="d o" style="font-size:130px" ${A(.5)}>Su cliente</div>
   <p style="margin-top:30px" ${A(.7)}>Cliente habitual, más su familia y amigos. Consulta su membresía desde el celular con su número y un código de 4 dígitos: <b>sin descargar nada</b>.</p></div></div>
 <div class="d" style="position:absolute;left:50%;top:50%;width:300px;height:300px;margin:-150px 0 0 -150px;border-radius:50%;background:var(--o);color:var(--k);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-size:52px;z-index:3;box-shadow:0 0 0 18px var(--c)" ${A(.9)}>2 modelos<br>1 negocio</div>
 <p class="sm" style="position:absolute;bottom:70px;left:130px;right:130px;text-align:center;z-index:3;color:var(--c)" ${A(1.2)}>El propietario compra la app · los clientes usan la membresía que el establecimiento ofrece.</p>`},
{t:'La solución',c:'red',h:()=>`
 <div class="ghost" style="left:-120px;bottom:-200px;width:620px;--m1:var(--c);--m2:var(--r)">${MK()}</div>
 <div class="kick" ${A(0)}>04 · La solución</div><h2 ${A(.1)}>ÑAPA: la membresía <span class="o">de barrio.</span></h2>
 <p style="max-width:1300px;margin:28px 0 60px" ${A(.3)}>Un CRM en el celular: el dueño registra visitas, ve quién vuelve y avisa por WhatsApp. El cliente recibe un carné digital con beneficios que crecen y que comparte con su familia.</p>
 <div class="flow">
  ${[['1','Registro del cliente'],['2','Membresía mensual o compartida'],['3','Beneficios y recompensas'],['4','Crecimiento del negocio']].map((s,i)=>`<div class="st" ${A(.6+i*.25)}><em>${s[0]}</em><p><b>${s[1]}</b></p></div>`).join('')}</div>
 <div class="chips" style="margin-top:50px;justify-content:center" ${A(1.8)}>${['Sin membresía','Personal','Familiar','VIP'].map(x=>`<span class="pill">${x}</span>`).join('')}</div>`},
{t:'Demostración',c:'blue',h:()=>`
 <div class="row" style="gap:110px;align-items:center;height:100%">
  <div class="phone" ${A(.2)} style="flex:none">
   <div class="scr on" data-s><h4>Barbería El Rodadero · DEMO</h4><div class="bx row" style="align-items:center;gap:20px"><div class="ring">17</div><div>Miembros activos<br><small>Te faltan 23 para tu meta (40)</small></div></div>
    <div class="row" style="gap:12px;margin-bottom:12px"><div class="btn r" style="flex:1">✂ Registrar visita</div><div class="btn" style="flex:1">⚡ Nuevo cliente</div></div>
    <div class="bx">¿Cómo están tus clientes?<br><small>Al día · Recordar · En riesgo · Perdidos</small></div></div>
   <div class="scr" data-s><h4>Registrar visita</h4><div class="bx">Andrés Barrios · Membresía Familiar</div><div class="bx">Lavado y cepillado <span style="float:right">$20.000</span></div><div class="bx" style="color:#1a7a43">Premio: servicio a mitad de precio −$10.000</div><div class="btn r" style="font-size:36px;margin-top:20px">Cobrar $10.000</div><p style="font-size:22px;margin-top:14px">Andrés gana 30 puntos</p></div>
   <div class="scr" data-s><h4>Avisos · Por enviar</h4><div class="bx">Hernán Díaz · <b>Membresía por vencer</b><br><small>«Renuévala y sigue disfrutando tus descuentos y los de tu familia»</small></div><div class="row" style="gap:12px"><div class="btn" style="flex:1;background:#1fb35a">Enviar</div><div class="btn" style="flex:1;background:#cbbfae;color:var(--b)">Descartar</div></div></div></div>
  <div style="flex:1"><div class="kick o" ${A(.2)}>05 · Demo · el MVP funcionando</div><h2 style="font-size:100px" ${A(.3)}>Registrar, ver quién vuelve, <span class="o">avisar.</span></h2>
   <p style="margin:34px 0" ${A(.6)}>Registrar una visita en 3 toques · tablero de clientes por estado · avisos de renovación por WhatsApp · carné «Mi membresía» para el cliente.</p>
   <div class="card bg-c" ${A(.9)}><p><b>Demo en vivo:</b> cananausa.github.io/MVP2<br>PIN de demostración <b class="rr">1234</b> <span class="sm">(datos de ejemplo)</span></p></div></div></div>`,
 on:r=>{const s=[...r.querySelectorAll('[data-s]')];let k=0;clearInterval(r._t);r._t=setInterval(()=>{s[k].classList.remove('on');k=(k+1)%s.length;s[k].classList.add('on')},3200)},off:r=>clearInterval(r._t)},
{t:'Validación',c:'cream',h:()=>`
 <div class="kick rr" ${A(0)}>06 · Validación · lo que encontramos y lo que respondió ÑAPA</div>
 <div class="col" style="gap:26px;margin-top:10px">
 ${[['Los barberos llevan las cuentas de cabeza: al final del día solo ven el efectivo, sin saber cuántos cortes hicieron.','Registro de visitas + membresía mensual: el ingreso se ordena desde que el cliente paga.','Entrevistado Jimmy'],
 ['Los sábados de alta afluencia, agendar de memoria traspapela citas y desordena los turnos.','Tablero de clientes y avisos que alivian la carga mental del barbero.','Entrevistado David'],
 ['La gente tradicional no quiere descargar apps; los avisos deben ser 100 % automáticos.','Cliente entra con celular y código de 4 dígitos, sin instalar. Automatizar el WhatsApp es la siguiente prueba.','Entrevistas 1–4 con el MVP']]
 .map((r,i)=>`<div class="row" style="gap:0;align-items:stretch" ${A(.2+i*.3)}><div class="card bg-b f" style="flex:1;border-radius:36px 0 0 36px"><p class="sm">ENCONTRAMOS · ${r[2]}</p><p>${r[0]}</p></div><div class="card bg-r f" style="flex:1;border-radius:0 36px 36px 0;position:relative"><p class="sm">LA SOLUCIÓN</p><p>${r[1]}</p></div></div>`).join('')}</div>
 <p class="sm bb" style="margin-top:26px" ${A(1.3)}>Resultado: afinamos el segmento hacia negocios con algo de infraestructura y capital; los puestos de calle donde el barbero trabaja solo quedaron fuera.</p>`},
{t:'Mercado',c:'blue',h:()=>{const L=v=>(Math.log10(v)/Math.log10(261000)*100).toFixed(1)+'%',rows=[['261.000','Peluquerías y salones en Colombia',261000,'var(--c)','var(--b)'],['44.432','Registrados en cámaras de comercio',44432,'var(--o)','var(--k)'],['≈2.838','Negocios en Santa Marta (estimado, con informales)',2838,'var(--c)','var(--b)'],['1.362','Alcanzables en Santa Marta: pueden pagar y usan celular',1362,'var(--r)','var(--c)'],['28','Pagan ÑAPA en el mes 12 · 2,1 % del alcanzable',28,'var(--o)','var(--k)']];
 return`<div class="kick o" ${A(0)}>07 · Mercado</div><h2 style="font-size:90px" ${A(.1)}>De 261.000 negocios a los <span class="o">28 primeros.</span></h2>
 <div class="col" style="gap:20px;margin-top:44px">${rows.map((r,i)=>`<div class="row" style="align-items:center;gap:24px"><div class="hb" style="--d:${.4+i*.2}s;width:${L(r[2])};min-width:230px;background:${r[3]};color:${r[4]}"><span class="d" style="font-size:42px">${r[0]}</span></div><span style="font-size:27px;max-width:760px;line-height:1.2" ${A(.7+i*.2)}>${r[1]}</span></div>`).join('')}</div>
 <p class="sm" style="position:absolute;left:130px;bottom:70px" ${A(1.8)}>Escala logarítmica. Cámara de Comercio de Santa Marta solo registra 290; los informales podrían ser ~10 veces más. Cifra a validar.</p>`}},
{t:'Precio y competencia',c:'cream',h:()=>`
 <div class="kick rr" ${A(0)}>08 · Precio · base de todos los cálculos</div>
 <h2 ${A(.1)}>Un solo plan: <span class="rr">$50.000</span> al mes.</h2>
 <div class="col" style="gap:30px;margin-top:56px">
  <div class="row" style="align-items:center;gap:30px"><span style="width:300px;font-size:30px;font-weight:700">Competencia<br><small>promedio mensual</small></span><div class="hb bg-b" style="--d:.5s;width:1100px"><span class="d" style="font-size:48px">${COP(D.compProm)}</span></div></div>
  <div class="row" style="align-items:center;gap:30px"><span style="width:300px;font-size:30px;font-weight:700" class="rr">ÑAPA<br><small>32 % de la competencia</small></span><div class="hb bg-r" style="--d:.8s;width:${(50000/D.compProm*1100).toFixed(0)}px;min-width:300px"><span class="d" style="font-size:48px">$50.000</span></div></div></div>
 <div class="row" style="margin-top:60px">
  <div class="card f bg-b" style="flex:1" ${A(1.2)}><p><b>Rango de la competencia</b><br>${COP(D.compMin)} – ${COP(D.compMax)} al mes (CRM de EE. UU. y de la región; casi no hay oferta local).</p></div>
  <div class="card f bg-o" style="flex:1" ${A(1.4)}><p><b>Al alcance del bolsillo</b><br>1,7 % del ingreso mensual estimado de una barbería pequeña ($3.000.000).</p></div></div>`},
{t:'Modelo de negocio',c:'black',h:()=>`
 <div class="kick o" ${A(0)}>09 · Modelo de negocio</div><h2 style="font-size:90px" ${A(.1)}>Suscripción mensual, vendida <span class="o">puerta a puerta.</span></h2>
 <div class="flow" style="margin:50px 0 40px">${[['1','Atracción','Visitas por barrio e Instagram'],['2','Demostración','Prueba en el celular'],['3','Venta','Se explican beneficios'],['4','Instalación','Misma visita · entrega del PIN'],['5','Posventa','Soporte y renovación']].map((s,i)=>`<div class="st" ${A(.4+i*.2)}><em style="width:110px;height:110px;font-size:52px">${s[0]}</em><p><b>${s[1]}</b></p><p class="sm">${s[2]}</p></div>`).join('')}</div>
 <div class="grid g4">${[['5','visitas por venta (tasa de éxito 20 %, supuesto)'],['8','negocios visitados por día de campo'],['$0','alojamiento: GitHub Pages + Google Sheets'],['$30.000','publicidad Instagram al mes']].map((x,i)=>`<div class="card bg-c f stat" ${A(1.4+i*.15)}><b class="bb" style="font-size:72px">${x[0]}</b><span class="bb">${x[1]}</span></div>`).join('')}</div>`},
{t:'Costo y utilidad por app',c:'cream',h:()=>{let a=0;const T=D.precioParts.reduce((s,p)=>s+p.v,0);
 const segs=D.precioParts.map((p,i)=>{const pc=p.v/T*100,o=`<circle class="seg" cx="200" cy="200" r="150" pathLength="100" fill="none" stroke="${p.c}" stroke-width="56" style="--p:${pc.toFixed(2)};--i:${i};stroke-dashoffset:${(-a).toFixed(2)}" transform="rotate(-90 200 200)"/>`;a+=pc;return o}).join('');
 return`<div class="row" style="gap:80px;align-items:center;height:100%"><div style="position:relative;width:700px;height:700px;flex:none" ${A(.2)}>
 <svg viewBox="0 0 400 400" width="700" height="700">${segs}</svg>
 <div class="d bb" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-size:66px">$50.000<br><span style="font-size:26px;font-family:var(--t);font-weight:700">precio de 1 app</span></div></div>
 <div style="flex:1"><div class="kick rr" ${A(.2)}>10 · De qué se compone el precio</div>
  ${D.precioParts.map((p,i)=>`<div class="row" style="align-items:center;gap:20px;margin-bottom:18px" ${A(.4+i*.15)}><i style="width:34px;height:34px;border-radius:10px;background:${p.c};flex:none"></i><span style="font-size:32px;flex:1">${p.n}</span><b class="d" style="font-size:44px">${COP(p.v)}</b></div>`).join('')}
  <div class="card bg-b f" style="margin-top:30px" ${A(1.1)}><p>Costo de producir y vender 1 app: <b class="o">$25.272</b>. Lo más caro es <b>conseguir al cliente</b>: $17.482 por venta (67 %).</p></div></div></div>`}},
{t:'Indicadores clave',c:'blue',h:()=>{const K=[['Precio','$50.000','por app al mes · base de todo','bg-r'],['Costo variable por app','$26.210','incluye $937 de depreciación','bg-c'],['Margen de contribución','$22.736','aporte de cada app a los fijos','bg-o'],['Margen bruto','74,7 %','ventas − costos directos · $7.470.004','bg-c'],['Utilidad neta','37,5 %','$3.747.514 en 12 meses*','bg-c'],['Utilidad líquida','31,9 %','$3.185.276 tras depreciación y reservas','bg-r'],['Punto de equilibrio','4 apps/mes','= $200.000 en ventas · fijos $84.000/mes','bg-o'],['Inversión necesaria','$3.549.055','pagos únicos + colchón + imprevistos','bg-c']];
 return`<div class="kick o" ${A(0)}>11 · Resumen financiero · los indicadores se encadenan</div>
 <div class="grid g4" style="gap:22px;margin-top:6px">${K.map((k,i)=>`<div class="card f ${k[3]}" style="padding:30px 30px;min-height:300px" ${A(.15+i*.1)}><p class="sm" style="font-weight:700;letter-spacing:1px">${k[0].toUpperCase()}</p><div class="d" style="font-size:${k[1].length>9?58:76}px;margin:16px 0 10px">${k[1]}</div><p class="sm" style="line-height:1.25">${k[2]}</p></div>`).join('')}</div>
 <p class="sm" style="margin-top:26px" ${A(1.2)}>Precio → margen de contribución → punto de equilibrio. *El modelo no incluye impuesto de renta: la utilidad neta equivale al resultado operacional. Validar con el asesor contable.</p>`}},
{t:'Proyección 12 meses',c:'cream',h:()=>{const W=1660,H=470,bw=78,g=(W-60)/12,mx=1500000,y=v=>H-v/mx*H;
 const bars=D.ingresos.map((v,i)=>`<rect class="bar" style="--i:${i}" x="${30+i*g+(g-bw)/2}" y="${y(v)}" width="${bw}" height="${v/mx*H}" rx="10" fill="var(--b)"/><text x="${30+i*g+g/2}" y="${H+36}" text-anchor="middle" font-size="24" fill="var(--b)" font-weight="700">${D.meses[i]}</text>`).join('');
 const pts=D.utilLiq.map((v,i)=>`${30+i*g+g/2},${y(v)}`).join(' L');
 return`<div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="kick rr" ${A(0)}>12 · Proyección dic 2026 – nov 2027 (supuestos del equipo)</div><h2 style="font-size:84px" ${A(.1)}>Ningún mes en pérdida.</h2></div>
 <div class="stat" ${A(.3)} style="text-align:right"><b class="rr">${N(200)}</b><span>suscripciones cobradas en 12 meses</span></div></div>
 <svg viewBox="0 -10 ${W} ${H+60}" width="${W}" style="margin-top:20px" ${A(.4)}>${bars}<path class="line" pathLength="1" d="M${pts}" fill="none" stroke="var(--r)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
 <rect x="30" y="4" width="26" height="26" rx="6" fill="var(--b)"/><text x="68" y="26" font-size="26" fill="var(--b)" font-weight="700">Ingresos: $10.000.000</text><rect x="420" y="12" width="40" height="10" rx="5" fill="var(--r)"/><text x="472" y="26" font-size="26" fill="var(--r)" font-weight="700">Utilidad líquida: $3.185.276</text></svg>
 <div class="row" style="margin-top:8px"><div class="card f bg-b" style="flex:1" ${A(1)}><p class="sm">Mes 1 → mes 12</p><p><b>8 → 28 apps</b> · $400.000 → $1.400.000 al mes</p></div>
 <div class="card f bg-r" style="flex:1" ${A(1.15)}><p class="sm">Caja (con inversión inicial)</p><p><b>$2.194.307</b> mínima · <b>$5.291.484</b> al mes 12</p></div></div>`}},
{t:'Inversión',c:'red',h:()=>{const I=[['Registro de marca ante la SIC',1347500,'var(--c)','var(--r)'],['Trámites S.A.S. (matrícula $0)',95347,'var(--o)','var(--k)'],['Colchón: 5 meses de operación',1783566,'var(--b)','var(--c)'],['Imprevistos (10 %)',322641,'var(--k)','var(--c)']],T=3549055;
 return`<div class="kick" ${A(0)}>13 · ¿Cuánta plata necesitan?</div><h2 style="font-size:150px" ${A(.1)}><span class="cc">${N(3549055,{p:'$'})}</span></h2>
 <div style="display:flex;height:190px;margin:48px 0 28px;border-radius:30px;overflow:hidden">${I.map((x,i)=>`<div class="hb" style="--d:${.5+i*.2}s;width:${x[1]/T*100}%;background:${x[2]};color:${x[3]};border-radius:0;height:100%;padding:0 14px;overflow:hidden;font-size:24px">${(x[1]/T*100).toFixed(0)}%</div>`).join('')}</div>
 <div class="grid g2" style="gap:12px 50px">${I.map((x,i)=>`<div class="row" style="align-items:center;gap:16px" ${A(.9+i*.12)}><i style="width:28px;height:28px;border-radius:8px;background:${x[2]};flex:none;border:3px solid var(--c)"></i><span style="font-size:30px;flex:1">${x[0]}</span><b class="d" style="font-size:36px">${COP(x[1])}</b></div>`).join('')}</div>
 <p style="margin-top:36px;max-width:1600px" ${A(1.5)}>Pagos únicos $1.442.847 + colchón $1.783.566 + imprevistos $322.641. Caja de arranque: $2.106.208. La utilidad líquida acumulada ($3.185.276) <b>iguala la inyección después del mes 12</b>.</p>`}},
{t:'Recomendaciones',c:'blue',h:()=>`
 <div class="kick o" ${A(0)}>14 · Recomendaciones · qué probar antes de escalar</div>
 <div class="grid g2" style="gap:26px;margin-top:8px">
 ${[['bg-r','Validar la disposición de pago','Un entrevistado sugirió que costara ≈ un corte al mes; $50.000 equivale a 2–3 cortes. Probar con pilotos reales.'],
 ['bg-c','Medir los supuestos de fe','Tasa de éxito de 20 % y crecimiento de 10 % mensual: medirlos en las primeras visitas y recalibrar el modelo.'],
 ['bg-o','Cerrar el ciclo del WhatsApp','Los avisos deben salir 100 % automáticos; hoy el envío no está comprobado. Es la función que más pidieron.'],
 ['bg-c','Enfocar y respaldar la cifra','Vender a negocios con infraestructura; conseguir una cifra oficial de negocios en Santa Marta (hoy: 290 registrados) y vigilar la dependencia de Google Sheets.']]
 .map((x,i)=>`<div class="card f ${x[0]}" style="min-height:360px" ${A(.2+i*.2)}><div class="d" style="font-size:80px;opacity:.35">${i+1}</div><p style="font-weight:800;font-size:40px;margin:6px 0 12px">${x[1]}</p><p class="sm" style="font-size:28px">${x[2]}</p></div>`).join('')}</div>`},
{t:'Preguntas',c:'red',h:()=>`
 <div class="mkbox2" style="position:absolute;right:140px;top:120px;width:330px;height:430px;--m1:var(--c);--m2:var(--r);transform:rotate(5deg)" ${A(.2)}>${MK()}</div>
 <div class="d cc" style="font-size:300px;position:absolute;left:130px;top:80px" ${A(.1)}>¿Hablamos?</div>
 <div class="row" style="position:absolute;left:130px;top:560px;gap:26px">${[['Juan Domingo Vilá Cortés','CEO · Desarrollador web'],['Santiago de Jesús Sanjuan Pacheco','Diseñador sénior · Desarrollador web'],['Valentina Martínez García','Diseñadora sénior · Gerente de marketing']].map((p,i)=>`<div class="card bg-c f" style="width:520px" ${A(.5+i*.2)}><p style="font-weight:800;font-size:32px;line-height:1.15">${p[0]}</p><p class="sm">${p[1]}</p></div>`).join('')}</div>
 <p class="d" style="position:absolute;left:130px;bottom:90px;font-size:44px;max-width:1500px" ${A(1.3)}>«Pensamos que la respuesta más sencilla suele ser la correcta.»</p>
 <p class="sm" style="position:absolute;left:130px;bottom:44px" ${A(1.5)}>Cañaña · Universidad Sergio Arboleda · Santa Marta</p>`}
];

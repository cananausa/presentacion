// Servidor ÑAPA: estáticos + WebSocket (RFC 6455 implementado a mano, CERO dependencias).
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto'),os=require('os');
const PORT=+process.env.PORT||3000,ROOT=__dirname;
const TOKEN=process.env.TOKEN||crypto.randomBytes(3).toString('hex');
const MIME={'.html':'text/html;charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4','.webm':'video/webm','.m4v':'video/mp4','.gif':'image/gif','.webp':'image/webp','.ico':'image/x-icon','.json':'application/json','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.otf':'font/otf'};
function lanIP(){let c=[];for(const l of Object.values(os.networkInterfaces()))for(const a of l||[])if(a.family==='IPv4'&&!a.internal)c.push(a.address);
  return c.find(a=>/^(192\.168|10\.|172\.(1[6-9]|2\d|3[01]))/.test(a))||c[0]||'localhost'}
const IP=lanIP(),REMOTE=`http://${IP}:${PORT}/remote.html?k=${TOKEN}`;
const srv=http.createServer((q,r)=>{
  let u=decodeURIComponent(q.url.split('?')[0]);
  if(u==='/api/info'){r.writeHead(200,{'content-type':'application/json'});return r.end(JSON.stringify({remote:REMOTE,ip:IP}))}
  if(u==='/')u='/index.html';
  const f=path.normalize(path.join(ROOT,u));
  if(!f.startsWith(ROOT)){r.writeHead(403);return r.end()}
  fs.stat(f,(e,st)=>{
    if(e||!st.isFile()){r.writeHead(404);return r.end('404')}
    const type=MIME[path.extname(f).toLowerCase()]||'application/octet-stream',h={'content-type':type,'accept-ranges':'bytes','cache-control':'no-store'};
    const m=/^bytes=(\d*)-(\d*)$/.exec(q.headers.range||'');   // Range: el video (mp4) lo necesita para reproducir y reiniciar
    if(m&&(m[1]||m[2])){
      let a=m[1]===''?Math.max(st.size-(+m[2]),0):+m[1],b=m[1]===''||m[2]===''?st.size-1:Math.min(+m[2],st.size-1);
      if(a>b||a>=st.size){r.writeHead(416,{'content-range':`bytes */${st.size}`});return r.end()}
      r.writeHead(206,{...h,'content-range':`bytes ${a}-${b}/${st.size}`,'content-length':b-a+1});
      return fs.createReadStream(f,{start:a,end:b}).on('error',()=>r.destroy()).pipe(r)}
    r.writeHead(200,{...h,'content-length':st.size});
    fs.createReadStream(f).on('error',()=>r.destroy()).pipe(r)})});
const clients=new Set();let state={t:'state',i:0,n:0,title:''};
const send=(s,str)=>{const p=Buffer.from(str);let h;if(p.length<126)h=Buffer.from([0x81,p.length]);else{h=Buffer.alloc(4);h[0]=0x81;h[1]=126;h.writeUInt16BE(p.length,2)}try{s.write(Buffer.concat([h,p]))}catch{}};
const to=(role,m)=>{for(const c of clients)if(c.role===role)send(c.sock,JSON.stringify(m))};
function onMsg(c,txt){let m;try{m=JSON.parse(txt)}catch{return}
  if(c.role==='screen'&&m.t==='state'){state=m;to('remote',state)}            // pantalla -> celulares
  else if(c.role==='remote'&&(m.t==='nav'||m.t==='goto')){to('screen',m)}}   // celular -> pantalla
srv.on('upgrade',(q,sock)=>{
  const url=new URL(q.url,'http://x'),role=url.searchParams.get('role'),k=url.searchParams.get('k');
  const loop=/^(::1|127\.0\.0\.1|::ffff:127\.0\.0\.1)$/.test(q.socket.remoteAddress);
  if(url.pathname!=='/ws'||!['screen','remote'].includes(role)||(k!==TOKEN&&!(role==='screen'&&loop))){sock.destroy();return}
  const acc=crypto.createHash('sha1').update(q.headers['sec-websocket-key']+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  sock.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${acc}\r\n\r\n`);
  const c={sock,role};clients.add(c);if(role==='remote')send(sock,JSON.stringify(state));
  let buf=Buffer.alloc(0);
  sock.on('data',d=>{buf=Buffer.concat([buf,d]);
    while(buf.length>=2){const op=buf[0]&15,mk=buf[1]&128;let len=buf[1]&127,off=2;
      if(len===126){if(buf.length<4)return;len=buf.readUInt16BE(2);off=4}else if(len===127){sock.destroy();return}
      const need=off+(mk?4:0)+len;if(buf.length<need)return;
      let p=buf.subarray(off+(mk?4:0),need);if(mk){const m=buf.subarray(off,off+4);p=Buffer.from(p.map((b,i)=>b^m[i&3]))}
      buf=buf.subarray(need);
      if(op===8){sock.end();return}if(op===9)sock.write(Buffer.from([0x8A,0]));else if(op===1)onMsg(c,p.toString())}});
  const bye=()=>clients.delete(c);sock.on('close',bye);sock.on('error',bye)});
srv.listen(PORT,'0.0.0.0',()=>console.log(`\n  ÑAPA lista\n  Pantalla (abrir en el computador): http://localhost:${PORT}\n  Control remoto (QR dentro de la presentación, tecla Q):\n  ${REMOTE}\n`));

/* ÑAPA · Efectos de sonido v3 (Web Audio API, sin archivos de audio, sin dependencias)
 * Ubicación: public/js/sfx.js  (reemplaza la versión anterior)
 *
 * Esta versión se conecta directamente a app.js (no adivina nada):
 *  - 10 sonidos de transición, uno por cada efecto de entrada (tx0…tx9), con versión "al revés" al retroceder.
 *  - 4 timbres de tarjeta, con tono que sube en cada paso y un acorde suave en la última.
 *  - Conteo de números: ticks que siguen la curva real del contador y campanazo al terminar.
 *  - Entrada escalonada: barras, embudo, donut, línea y tarjetas suenan sincronizadas con su animación.
 * Tecla M = silenciar / activar.
 */
(function () {
  'use strict';

  var VOL = 0.25;                  // volumen general (0 a 1)
  var ctx = null, master = null, scene = null, muted = false, unlocked = false;
  try { muted = localStorage.getItem('napa_mute') === '1'; } catch (e) {}

  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return ctx; }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = VOL;
    var comp = ctx.createDynamicsCompressor();
    master.connect(comp); comp.connect(ctx.destination);
    return ctx;
  }
  function ready() { return !muted && unlocked && !!init(); }

  // "Escena": canal para los sonidos programados de la diapositiva actual; se corta al cambiar de diapositiva.
  function newScene() {
    if (!ctx) return;
    if (scene) {
      var old = scene;
      try { old.gain.cancelScheduledValues(ctx.currentTime); old.gain.setTargetAtTime(0, ctx.currentTime, 0.04); } catch (e) {}
      setTimeout(function () { try { old.disconnect(); } catch (e) {} }, 700);
    }
    scene = ctx.createGain();
    scene.connect(master);
  }
  function dest(o) { return (o.scene && scene) ? scene : master; }

  function tone(o) {
    var t0 = ctx.currentTime + (o.delay || 0);
    var osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(o.f, t0);
    if (o.f2) osc.frequency.exponentialRampToValueAtTime(o.f2, t0 + o.dur);
    var a = o.attack || 0.008, v = o.vol || 0.5;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(v, t0 + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
    osc.connect(g); g.connect(dest(o));
    osc.start(t0); osc.stop(t0 + o.dur + 0.05);
  }

  function whoosh(o) {
    var t0 = ctx.currentTime + (o.delay || 0), dur = o.dur;
    var len = Math.floor(ctx.sampleRate * dur);
    var buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var src = ctx.createBufferSource(); src.buffer = buf;
    var bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = o.q || 1.2;
    bp.frequency.setValueAtTime(o.f1, t0);
    bp.frequency.exponentialRampToValueAtTime(o.f2, t0 + dur);
    var g = ctx.createGain(), v = o.vol || 0.3;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(v, t0 + dur * (o.peak || 0.35));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(bp); bp.connect(g); g.connect(dest(o));
    src.start(t0); src.stop(t0 + dur + 0.05);
  }

  var PENTA = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.5];
  var PS = [0, 2, 4, 7, 9];
  function scaleNote(i, base) { return base * Math.pow(2, (PS[i % 5] + 12 * Math.floor(i / 5)) / 12); }

  /* ---------- 4 timbres de tarjeta ---------- */
  var CARD = [
    function (f) { tone({ f: f * 0.8, f2: f, dur: 0.22, vol: 0.28, attack: 0.01 }); },                                       // burbuja
    function (f) { tone({ f: f, dur: 0.35, vol: 0.3, attack: 0.004 }); tone({ f: f * 4, dur: 0.07, vol: 0.07 }); },         // marimba
    function (f) { tone({ f: f * 2, dur: 0.5, vol: 0.14, attack: 0.005 }); tone({ f: f * 3.01, dur: 0.3, vol: 0.06 }); },    // cristal
    function (f) { tone({ f: f, f2: f * 0.98, dur: 0.26, vol: 0.22, type: 'triangle', attack: 0.004 }); }                   // pluck
  ];

  /* ---------- 10 transiciones (una por efecto tx0…tx9). dir = 1 avanzar, -1 retroceder ---------- */
  var TRANS = [
    function (d) { var s = sw(d, 300, 2200); whoosh({ f1: s[0], f2: s[1], dur: 0.45, vol: 0.2 }); tone({ f: 110, f2: 70, dur: 0.25, vol: 0.22, delay: d > 0 ? 0.04 : 0.2 }); },        // 0 cortina
    function (d) { var s = sw(d, 600, 3000); whoosh({ f1: s[0], f2: s[1], dur: 0.3, vol: 0.18, q: 3 }); tone({ f: 900, dur: 0.06, vol: 0.1, type: 'triangle', delay: 0.22 }); },       // 1 deslizar
    function (d) { var s = sw(d, 250, 900), w = sw(d, 1000, 4000); tone({ f: s[0], f2: s[1], dur: 0.45, vol: 0.15, attack: 0.06 }); whoosh({ f1: w[0], f2: w[1], dur: 0.35, vol: 0.1, q: 2 }); }, // 2 zoom
    function (d) { var s = sw(d, 500, 1800); tone({ f: 1200, dur: 0.04, vol: 0.14, type: 'triangle' }); tone({ f: 800, dur: 0.05, vol: 0.12, type: 'triangle', delay: 0.12 }); whoosh({ f1: s[0], f2: s[1], dur: 0.3, vol: 0.12 }); }, // 3 giro
    function (d) { [392, 494, 587].forEach(function (f, i) { tone({ f: f, dur: 0.8, vol: 0.09, attack: 0.12, delay: (d > 0 ? i : 2 - i) * 0.06 }); }); },                              // 4 desvanecer
    function (d) { var s = sw(d, 300, 1400), w = sw(d, 700, 2500); tone({ f: s[0], f2: s[1], dur: 0.5, vol: 0.1, type: 'triangle', attack: 0.05 }); whoosh({ f1: w[0], f2: w[1], dur: 0.45, vol: 0.12, q: 4 }); }, // 5 giro
    function (d) { for (var i = 0; i < 5; i++) tone({ f: 700 + (d > 0 ? i : 4 - i) * 110, dur: 0.05, vol: 0.12, type: 'triangle', delay: i * 0.055 }); whoosh({ f1: 600, f2: 2000, dur: 0.3, vol: 0.06 }); }, // 6 persianas
    function (d) { var u = d > 0 ? 1 : -1; [0, 0.14, 0.24].forEach(function (t, i) { var b = 600 * (u > 0 ? Math.pow(0.8, i) : Math.pow(1.25, i) * 0.6); tone({ f: b, f2: b * 0.7, dur: 0.12, vol: 0.2 - i * 0.05, delay: t }); }); }, // 7 rebote
    function (d) { var s = sw(d, 300, 1100); tone({ f: s[0], f2: s[1], dur: 0.3, vol: 0.2 }); tone({ f: s[1] * 1.5, dur: 0.2, vol: 0.08, delay: 0.1 }); whoosh({ f1: 200, f2: 800, dur: 0.3, vol: 0.06 }); }, // 8 iris
    function (d) { var w = sw(d, 2000, 5000); for (var i = 0; i < 5; i++) tone({ f: 1500 + Math.random() * 2000, dur: 0.14, vol: 0.06, delay: i * 0.06 }); whoosh({ f1: w[0], f2: w[1], dur: 0.35, vol: 0.08, q: 5 }); } // 9 destello
  ];
  function sw(d, a, b) { return d > 0 ? [a, b] : [b, a]; }

  /* ---------- sonidos sueltos ---------- */
  var SOUNDS = {
    cardOut: function () { tone({ f: 600, f2: 360, dur: 0.16, vol: 0.18 }); },
    jump: function () { tone({ f: 700, dur: 0.07, vol: 0.18, type: 'triangle' }); tone({ f: 1050, dur: 0.1, vol: 0.16, type: 'triangle', delay: 0.07 }); },
    swipe: function () { whoosh({ f1: 800, f2: 2200, dur: 0.18, vol: 0.12 }); },
    pop: function () { tone({ f: 380, f2: 820, dur: 0.1, vol: 0.22 }); },
    sparkle: function () { for (var i = 0; i < 4; i++) tone({ f: 1500 + Math.random() * 1800, dur: 0.14, vol: 0.06, delay: i * 0.06 }); },
    fullscreen: function () { tone({ f: 120, f2: 70, dur: 0.3, vol: 0.4 }); whoosh({ f1: 300, f2: 1200, dur: 0.25, vol: 0.1 }); },
    qr: function () { tone({ f: 880, dur: 0.08, vol: 0.18 }); tone({ f: 1318.5, dur: 0.14, vol: 0.16, delay: 0.08 }); },
    connect: function () { tone({ f: 659.25, dur: 0.15, vol: 0.2 }); tone({ f: 987.77, dur: 0.3, vol: 0.2, delay: 0.12 }); },
    disconnect: function () { tone({ f: 659.25, dur: 0.15, vol: 0.18 }); tone({ f: 440, dur: 0.3, vol: 0.18, delay: 0.12 }); },
    limit: function () { tone({ f: 180, f2: 140, dur: 0.12, vol: 0.2, type: 'triangle' }); }
  };

  function dly(el) {
    var cs = getComputedStyle(el);
    var v = Math.max(parseFloat(cs.animationDelay) || 0, parseFloat(cs.transitionDelay) || 0);
    if (!v) {
      var a = parseFloat(el.getAttribute('data-a'));
      if (a) v = a;
      else { var dd = parseFloat(el.style.getPropertyValue('--d')); if (dd) v = dd; }
    }
    return v;
  }
  function all(root, sel) { return [].slice.call(root.querySelectorAll(sel)); }

  var SFX = {
    play: function (name, a, b) {
      if (!ready() || !SOUNDS[name]) return;
      try { SOUNDS[name](a, b); } catch (e) {}
    },

    // Cambio de diapositiva: tx = efecto de entrada (0-9), dir = 1 / -1
    slide: function (tx, dir, far, first, last) {
      if (!ready()) return;
      try {
        newScene();
        dir = dir || 1;
        if (far) SOUNDS.jump(); else TRANS[(tx || 0) % 10](dir);
        if (first) [392, 523.25, 659.25].forEach(function (f, i) { tone({ f: f, dur: 0.7, vol: 0.1, attack: 0.04, delay: 0.2 + i * 0.07 }); });
        if (last && dir > 0) [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) { tone({ f: f, dur: 0.9, vol: 0.1, attack: 0.03, delay: 0.2 + i * 0.09 }); });
      } catch (e) {}
    },

    // Aparece una tarjeta: n = número de paso, v = diapositiva (define el timbre), last = es la última
    card: function (n, v, last) {
      if (!ready()) return;
      try {
        CARD[(v || 0) % 4](PENTA[(n || 0) % 8]);
        if (last) { tone({ f: 1568, dur: 0.5, vol: 0.07, delay: 0.1 }); tone({ f: 2093, dur: 0.6, vol: 0.05, delay: 0.17 }); }
      } catch (e) {}
    },
    cardOut: function () { this.play('cardOut'); },

    // Conteo de un número: los ticks siguen la curva real del contador (ease-out) y termina con campanazo
    count: function (delayMs, durMs) {
      if (!ready()) return;
      try {
        var N = 13, d0 = (delayMs || 0) / 1000, dur = (durMs || 1600) / 1000;
        for (var k = 1; k <= N; k++) {
          var f = k / (N + 1), p = 1 - Math.pow(1 - f, 1 / 3);
          tone({ f: 480 + f * 760, dur: 0.05, vol: 0.09, type: 'triangle', attack: 0.002, delay: d0 + p * dur, scene: 1 });
        }
        var te = d0 + dur * 0.82;
        tone({ f: 988, dur: 0.35, vol: 0.12, delay: te, scene: 1 });
        tone({ f: 1318.5, dur: 0.45, vol: 0.1, delay: te + 0.07, scene: 1 });
      } catch (e) {}
    },

    // Entrada escalonada de una diapositiva, sincronizada con sus animaciones (lee los retrasos reales del CSS)
    enter: function (root, title) {
      if (!ready() || !root) return;
      try {
        var i, d;
        // barras de la gráfica
        var bars = all(root, '.bar'), bd = bars.map(dly);
        var flat = bd.every(function (x) { return x === bd[0]; });
        bars.forEach(function (b, k) { tone({ f: scaleNote(k, 392), dur: 0.25, vol: 0.08, delay: flat ? 0.2 + k * 0.07 : bd[k], scene: 1 }); });
        // barras horizontales / embudo
        var hbs = all(root, '.hb'), desc = title === 'Mercado';
        hbs.forEach(function (h, k) {
          var f = PENTA[(desc ? hbs.length - 1 - k : k) % 8] * 0.6;
          d = dly(h);
          tone({ f: f * 0.8, f2: f, dur: 0.3, vol: 0.12, type: 'triangle', delay: d, scene: 1 });
          whoosh({ f1: 200, f2: 900, dur: 0.35, vol: 0.05, delay: d, scene: 1 });
        });
        // donut
        all(root, '.seg').forEach(function (s, k) {
          tone({ f: PENTA[k % 8], dur: 0.5, vol: 0.1, attack: 0.005, delay: dly(s), scene: 1 });
          tone({ f: PENTA[k % 8] * 2.01, dur: 0.3, vol: 0.04, delay: dly(s), scene: 1 });
        });
        // línea de la gráfica
        all(root, '.line').forEach(function (l) { whoosh({ f1: 300, f2: 2400, dur: 0.9, vol: 0.08, q: 1.5, delay: dly(l), scene: 1 }); });
        // resto de elementos (títulos, textos, tarjetas fijas…): máximo 6 toques suaves
        var gen = all(root, '[data-a]').filter(function (e) {
          return !e.matches('.bar,.hb,.seg,.line,.ghost,.mk,.mkbox') && !e.closest('.hb,[data-step]');
        });
        var ds = [];
        gen.forEach(function (e) { var v = Math.round(dly(e) * 20) / 20; if (ds.indexOf(v) < 0) ds.push(v); });
        ds.sort(function (a, b) { return a - b; });
        if (ds.length > 6) { var pick = []; for (i = 0; i < 6; i++) pick.push(ds[Math.round(i * (ds.length - 1) / 5)]); ds = pick; }
        ds.forEach(function (v, k) {
          var f = PENTA[k % 5] * 0.5;
          tone({ f: f, f2: f * 0.98, dur: 0.22, vol: 0.09, type: 'triangle', delay: v, scene: 1 });
          tone({ f: f * 4, dur: 0.08, vol: 0.03, delay: v, scene: 1 });
        });
      } catch (e) {}
    },

    mute: function (m) {
      muted = (m === undefined) ? !muted : !!m;
      try { localStorage.setItem('napa_mute', muted ? '1' : '0'); } catch (e) {}
      if (!muted) { unlocked = true; if (init()) SOUNDS.connect(); }
      return muted;
    },
    setVolume: function (v) { VOL = Math.max(0, Math.min(1, v)); if (master) master.gain.value = VOL; },
    isMuted: function () { return muted; }
  };
  window.SFX = SFX;

  // Los navegadores bloquean el audio hasta la primera interacción (clic, tecla o toque) en el computador.
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, function () { unlocked = true; init(); }, { once: true, capture: true, passive: true });
  });
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'm' || e.key === 'M') SFX.mute();
  });
})();

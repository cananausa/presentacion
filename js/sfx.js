/* ÑAPA · Efectos de sonido sutiles (Web Audio API, sin archivos de audio, sin dependencias)
 * Ubicación: public/js/sfx.js
 *
 * API manual (para llamar desde app.js):
 *   SFX.play('next')       avanzar de diapositiva
 *   SFX.play('prev')       retroceder de diapositiva
 *   SFX.play('card', n)    aparece una tarjeta (n = 0,1,2... sube un poco el tono)
 *   SFX.play('cardOut')    se oculta una tarjeta
 *   SFX.play('jump')       salto directo (barra inferior, Inicio, Fin)
 *   SFX.play('first')      llegada a la primera diapositiva
 *   SFX.play('last')       llegada a la última diapositiva
 *   SFX.play('fullscreen') pantalla completa
 *   SFX.play('qr')         se abre/cierra el QR
 *   SFX.play('connect')    celular conectado
 *   SFX.play('limit')      intento de pasar del inicio/fin
 *
 * Teclas: M = silenciar / activar sonido.
 * Modo automático (por teclado) activado por defecto. Si conectas las llamadas
 * manuales en app.js, desactívalo con:  SFX.setAuto(false)
 */
(function () {
  'use strict';

  var VOL = 0.25;          // volumen general (0 a 1). Mantenlo bajo para que sea sutil.
  var ctx = null, master = null, muted = false, auto = true;
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

  // Tono con envolvente suave
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
    osc.connect(g); g.connect(master);
    osc.start(t0); osc.stop(t0 + o.dur + 0.05);
  }

  // Ruido filtrado (efecto "whoosh")
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
    g.gain.linearRampToValueAtTime(v, t0 + dur * 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(bp); bp.connect(g); g.connect(master);
    src.start(t0); src.stop(t0 + dur + 0.05);
  }

  // Escala pentatónica para que las tarjetas suenen "musicales" y nunca desafinen
  var PENTA = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.5];

  var SOUNDS = {
    next: function () {
      whoosh({ f1: 500, f2: 2600, dur: 0.38, vol: 0.22 });
      tone({ f: 440, f2: 660, dur: 0.18, vol: 0.12, delay: 0.05 });
    },
    prev: function () {
      whoosh({ f1: 2400, f2: 450, dur: 0.38, vol: 0.2 });
      tone({ f: 660, f2: 440, dur: 0.18, vol: 0.1, delay: 0.05 });
    },
    card: function (n) {
      var f = PENTA[(n || 0) % PENTA.length];
      tone({ f: f * 0.9, f2: f, dur: 0.22, vol: 0.28, attack: 0.01 });
      tone({ f: f * 2, dur: 0.12, vol: 0.06, delay: 0.02, type: 'triangle' });
    },
    cardOut: function () {
      tone({ f: 600, f2: 360, dur: 0.16, vol: 0.18 });
    },
    jump: function () {
      tone({ f: 700, dur: 0.07, vol: 0.18, type: 'triangle' });
      tone({ f: 1050, dur: 0.1, vol: 0.16, type: 'triangle', delay: 0.07 });
    },
    first: function () {
      [392, 523.25, 659.25].forEach(function (f, i) {
        tone({ f: f, dur: 0.7, vol: 0.14, attack: 0.04, delay: i * 0.07 });
      });
    },
    last: function () {
      [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) {
        tone({ f: f, dur: 0.9, vol: 0.14, attack: 0.03, delay: i * 0.09 });
      });
    },
    fullscreen: function () {
      tone({ f: 120, f2: 70, dur: 0.3, vol: 0.4 });
      whoosh({ f1: 300, f2: 1200, dur: 0.25, vol: 0.1 });
    },
    qr: function () {
      tone({ f: 880, dur: 0.08, vol: 0.18 });
      tone({ f: 1318.5, dur: 0.14, vol: 0.16, delay: 0.08 });
    },
    connect: function () {
      tone({ f: 659.25, dur: 0.15, vol: 0.2 });
      tone({ f: 987.77, dur: 0.3, vol: 0.2, delay: 0.12 });
    },
    limit: function () {
      tone({ f: 180, f2: 140, dur: 0.12, vol: 0.2, type: 'triangle' });
    }
  };

  var SFX = {
    play: function (name, arg) {
      if (muted || !SOUNDS[name]) return;
      if (!init()) return;
      try { SOUNDS[name](arg); } catch (e) {}
    },
    mute: function (m) {
      muted = (m === undefined) ? !muted : !!m;
      try { localStorage.setItem('napa_mute', muted ? '1' : '0'); } catch (e) {}
      if (!muted) { init(); SOUNDS.connect(); }
      return muted;
    },
    setVolume: function (v) { VOL = Math.max(0, Math.min(1, v)); if (master) master.gain.value = VOL; },
    setAuto: function (on) { auto = !!on; },
    isMuted: function () { return muted; }
  };
  window.SFX = SFX;

  // Los navegadores bloquean el audio hasta la primera interacción: se activa aquí.
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, init, { once: true, passive: true });
  });

  // Modo automático por teclado (sirve sin tocar app.js)
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key;
    if (k === 'm' || k === 'M') { SFX.mute(); return; }
    if (!auto) return;
    if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'ArrowDown') SFX.play('next');
    else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'ArrowUp') SFX.play('prev');
    else if (k === 'Home') SFX.play('first');
    else if (k === 'End') SFX.play('last');
    else if (k === 'f' || k === 'F') SFX.play('fullscreen');
    else if (k === 'q' || k === 'Q') SFX.play('qr');
  });
})();

import React, { useState, useEffect } from 'react';
import { HERO_CONTENT } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

/* ═══════════════════════════════════════
   Browser animation state machine
   idle → typing → enter → loading → site → idle
═══════════════════════════════════════ */
const URL_STR    = "mohamad-ibrahim.com";
const CHAR_DELAY = 95;

function useBrowserAnimation() {
  const [phase,      setPhase]      = useState('idle');
  const [typedChars, setTypedChars] = useState(0);
  const [activeKey,  setActiveKey]  = useState(null);

  useEffect(() => {
    let t;
    if (phase === 'idle') {
      t = setTimeout(() => { setTypedChars(0); setPhase('typing'); }, 1200);
    } else if (phase === 'typing') {
      if (typedChars < URL_STR.length) {
        t = setTimeout(() => {
          const ch = URL_STR[typedChars].toUpperCase();
          setActiveKey(ch === '-' || ch === '.' ? null : ch);
          setTypedChars(c => c + 1);
        }, CHAR_DELAY);
      } else {
        t = setTimeout(() => { setActiveKey('ENTER'); setPhase('enter'); }, 350);
      }
    } else if (phase === 'enter') {
      t = setTimeout(() => { setActiveKey(null); setPhase('loading'); }, 280);
    } else if (phase === 'loading') {
      t = setTimeout(() => setPhase('site'), 1300);
    } else if (phase === 'site') {
      t = setTimeout(() => { setTypedChars(0); setPhase('idle'); }, 6000);
    }
    return () => clearTimeout(t);
  }, [phase, typedChars]);

  return { phase, typedChars, activeKey };
}

/* ═══════════════════════════════════════
   Browser screen content
═══════════════════════════════════════ */
function BrowserScreen({ phase, typedChars }) {
  const displayUrl = URL_STR.slice(0, typedChars);
  const isTyping   = phase === 'typing' || phase === 'idle';
  const isSite     = phase === 'site';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#080808' }}>

      {/* ── Top chrome ── */}
      <div style={{ background: '#101010', borderBottom: '1px solid rgba(255,215,0,0.12)', padding: '5px 8px 0', flexShrink: 0 }}>
        {/* Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
          {['#f87171','#fbbf24','#4ade80'].map((c,i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
          <div style={{
            marginLeft: 6, background: 'rgba(255,215,0,0.07)',
            border: '1px solid rgba(255,215,0,0.13)', borderRadius: '3px 3px 0 0',
            padding: '3px 12px', fontFamily: 'monospace', fontSize: '0.5rem',
            color: 'rgba(255,215,0,0.45)', maxWidth: 150, overflow: 'hidden', whiteSpace: 'nowrap',
          }}>
            {isSite ? 'Muhammad Ibrahim | Full Stack Dev' : 'New Tab'}
          </div>
        </div>

        {/* Address bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${phase === 'typing' || phase === 'enter' ? 'rgba(255,215,0,0.55)' : 'rgba(255,215,0,0.13)'}`,
          borderRadius: 4, padding: '4px 10px', marginBottom: 5,
          transition: 'border-color 0.25s',
          boxShadow: phase === 'typing' || phase === 'enter' ? '0 0 8px rgba(255,215,0,0.1)' : 'none',
        }}>
          <span style={{ fontSize: '0.55rem', color: isSite ? '#4ade80' : 'rgba(255,215,0,0.3)', flexShrink: 0 }}>🔒</span>
          <span style={{
            fontFamily: 'monospace', fontSize: '0.6rem', flex: 1,
            color: isSite ? '#4ade80' : 'rgba(255,255,255,0.75)',
            letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden',
          }}>
            {isSite ? URL_STR : displayUrl}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.65, repeat: Infinity }}
                style={{ borderRight: '1.5px solid #FFD700', marginLeft: 1 }}
              >&nbsp;</motion.span>
            )}
          </span>
          {phase === 'loading' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
              style={{ width: 8, height: 8, border: '1.5px solid rgba(255,215,0,0.25)', borderTopColor: '#FFD700', borderRadius: '50%', flexShrink: 0 }}
            />
          )}
        </div>

        {/* Loading progress bar */}
        {phase === 'loading' && (
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ height: 2, background: 'linear-gradient(to right, #FFD700, rgba(255,215,0,0.5))', borderRadius: 1, marginBottom: 0 }}
          />
        )}
      </div>

      {/* ── Page content ── */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {isSite ? (
            <motion.div
              key="site"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
            >
              {/* Live iframe — scaled to fit the small screen */}
              <iframe
                src="https://mohamad-ibrahem.com"
                title="mohamad-ibrahem.com"
                scrolling="no"
                style={{
                  width: '200%',
                  height: '200%',
                  border: 'none',
                  transform: 'scale(0.5)',
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                  display: 'block',
                }}
              />
              {/* Scanlines */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.05) 3px,rgba(0,0,0,0.05) 4px)',
              }} />
            </motion.div>
          ) : (
            <motion.div
              key="new-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}
            >
              {/* Google logo */}
              <div style={{ fontFamily: 'serif', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.02em' }}>
                {[['G','#4285f4'],['o','#ea4335'],['o','#fbbc04'],['g','#4285f4'],['l','#34a853'],['e','#ea4335']].map(([l,c],i) => (
                  <span key={i} style={{ color: c, opacity: 0.55 }}>{l}</span>
                ))}
              </div>
              <div style={{ width: '75%', height: 16, border: '1px solid rgba(255,215,0,0.12)', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }} />
              <div style={{ display: 'flex', gap: 8 }}>
                {[70, 80].map((w,i) => (
                  <div key={i} style={{ width: w, height: 12, background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.1)', borderRadius: 3 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Keyboard visual
═══════════════════════════════════════ */
const KB_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
];

function KeyboardVisual({ activeKey }) {
  return (
    <div style={{
      background: 'linear-gradient(to bottom, #161616, #0d0d0d)',
      border: '1.5px solid rgba(255,215,0,0.32)',
      borderTop: 'none',
      borderRadius: '0 0 8px 8px',
      padding: '7px 12px 9px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.75), 0 0 18px rgba(255,215,0,0.05)',
    }}>
      {KB_ROWS.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: 3, marginBottom: 3 }}>
          {row.map((key) => {
            const on = activeKey === key;
            return (
              <motion.div
                key={key}
                animate={on
                  ? { scale: 0.85, background: 'rgba(255,215,0,0.3)', borderColor: 'rgba(255,215,0,0.7)' }
                  : { scale: 1,    background: 'rgba(255,215,0,0.05)', borderColor: 'rgba(255,215,0,0.14)' }
                }
                transition={{ duration: 0.07 }}
                style={{
                  width: 16, height: 13,
                  border: '1px solid rgba(255,215,0,0.14)',
                  borderRadius: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'monospace', fontSize: '0.37rem',
                  color: on ? '#FFD700' : 'rgba(255,215,0,0.3)',
                  boxShadow: on ? '0 0 8px rgba(255,215,0,0.45)' : 'none',
                }}
              >
                {key}
              </motion.div>
            );
          })}
        </div>
      ))}
      {/* Bottom row: space + enter */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 1 }}>
        {[16,16,16,16].map((_,i) => (
          <div key={i} style={{ width: 16, height: 9, background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.12)', borderRadius: 2 }} />
        ))}
        <motion.div
          animate={activeKey === 'ENTER'
            ? { background: 'rgba(255,215,0,0.35)', borderColor: 'rgba(255,215,0,0.7)' }
            : { background: 'rgba(255,215,0,0.05)', borderColor: 'rgba(255,215,0,0.14)' }
          }
          style={{ width: 60, height: 9, border: '1px solid rgba(255,215,0,0.14)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          transition={{ duration: 0.07 }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: '0.35rem', color: activeKey === 'ENTER' ? '#FFD700' : 'rgba(255,215,0,0.25)' }}>ENTER</span>
        </motion.div>
        {[16,16].map((_,i) => (
          <div key={i} style={{ width: 16, height: 9, background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.12)', borderRadius: 2 }} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Mouse cursor SVG with idle drift
═══════════════════════════════════════ */
function MouseCursor({ phase }) {
  const isClicking = phase === 'enter';
  return (
    <motion.div
      animate={{ x: [0, 6, 2, -4, 0], y: [0, -4, 6, 1, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      style={{ position: 'absolute', right: -36, bottom: 28, zIndex: 10 }}
    >
      <motion.svg
        width="22" height="34" viewBox="0 0 22 34" fill="none"
        animate={{ scale: isClicking ? 0.9 : 1 }}
        transition={{ duration: 0.1 }}
      >
        <rect x="1" y="1" width="20" height="32" rx="10"
          stroke="rgba(255,215,0,0.6)" strokeWidth="1.5" fill="rgba(0,0,0,0.85)" />
        <line x1="11" y1="1" x2="11" y2="14" stroke="rgba(255,215,0,0.35)" strokeWidth="1" />
        <motion.rect x="7" y="4" width="4" height="7" rx="2" fill="#FFD700"
          animate={{ opacity: isClicking ? 1 : [0.8, 0.2, 0.8] }}
          transition={isClicking ? { duration: 0.1 } : { duration: 1.8, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   Full laptop assembly
═══════════════════════════════════════ */
function Laptop3D() {
  const { phase, typedChars, activeKey } = useBrowserAnimation();

  return (
    <motion.div
      animate={{ y: [0, -13, 0] }}
      transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', position: 'relative' }}
    >
      {/* Ambient glow behind screen */}
      <motion.div
        animate={{ opacity: phase === 'site' ? 0.75 : 0.35 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute', top: '5%', left: '50%',
          transform: 'translateX(-50%)',
          width: 340, height: 240,
          background: 'radial-gradient(ellipse, rgba(255,215,0,0.15) 0%, transparent 70%)',
          filter: 'blur(22px)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* Screen lid */}
      <div style={{
        position: 'relative', width: 320, height: 210,
        borderRadius: '10px 10px 0 0', overflow: 'hidden',
        border: '2px solid rgba(255,215,0,0.52)',
        borderBottom: 'none',
        boxShadow: '0 0 35px rgba(255,215,0,0.14), inset 0 0 20px rgba(0,0,0,0.6)',
        zIndex: 1,
        transform: 'rotateX(-4deg)', transformOrigin: 'bottom center',
      }}>
        <BrowserScreen phase={phase} typedChars={typedChars} />

        {/* Scanlines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)',
        }} />
        {/* Screen top glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,215,0,0.04) 0%, transparent 70%)',
        }} />

        {/* Corner brackets */}
        {[
          { top: 5, left: 5, borderTop: '2px solid #FFD700', borderLeft: '2px solid #FFD700' },
          { top: 5, right: 5, borderTop: '2px solid #FFD700', borderRight: '2px solid #FFD700' },
          { bottom: 5, left: 5, borderBottom: '2px solid #FFD700', borderLeft: '2px solid #FFD700' },
          { bottom: 5, right: 5, borderBottom: '2px solid #FFD700', borderRight: '2px solid #FFD700' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 13, height: 13, pointerEvents: 'none', ...s }} />
        ))}
      </div>

      {/* Hinge */}
      <div style={{ width: 316, height: 4, background: 'linear-gradient(to bottom, rgba(255,215,0,0.3), transparent)', zIndex: 2 }} />

      {/* Keyboard base */}
      <div style={{ width: 320, zIndex: 1 }}>
        <KeyboardVisual activeKey={activeKey} />
      </div>

      {/* Trackpad */}
      <div style={{
        width: 82, height: 11,
        background: 'rgba(255,215,0,0.04)',
        border: '1px solid rgba(255,215,0,0.16)',
        borderTop: 'none', borderRadius: '0 0 5px 5px',
      }} />

      {/* Surface reflection */}
      <div style={{
        width: 320, height: 6, marginTop: 1,
        background: 'linear-gradient(to bottom, rgba(255,215,0,0.07), transparent)',
        filter: 'blur(2px)', borderRadius: '0 0 4px 4px',
      }} />

      {/* Floating mouse */}
      <MouseCursor phase={phase} />

      {/* AVAILABLE badge */}
      <motion.div
        animate={{ opacity: [1, 0.45, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        style={{
          marginTop: 20,
          display: 'flex', alignItems: 'center', gap: 7,
          fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.1em',
          background: 'rgba(0,0,0,0.88)',
          border: '1px solid rgba(255,215,0,0.38)',
          color: '#4ade80', padding: '5px 14px', borderRadius: 2,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
        AVAILABLE FOR HIRE
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   Hero background
═══════════════════════════════════════ */
/* ═══════════════════════════════════════
   Hero background — full-section IDE wallpaper
═══════════════════════════════════════ */
const BG_CODE_LINES = [
  { n:  1, tokens: [{ c:'#6272a4', t:'// Muhammad Ibrahim — Full Stack Developer' }] },
  { n:  2, tokens: [] },
  { n:  3, tokens: [{ c:'#ff79c6', t:'import' }, { c:'#f8f8f2', t:' { ' }, { c:'#8be9fd', t:'React' }, { c:'#f8f8f2', t:', ' }, { c:'#8be9fd', t:'useState' }, { c:'#f8f8f2', t:' } ' }, { c:'#ff79c6', t:"from" }, { c:'#f1fa8c', t:" 'react'" }] },
  { n:  4, tokens: [{ c:'#ff79c6', t:'import' }, { c:'#f8f8f2', t:' { ' }, { c:'#8be9fd', t:'NextJS' }, { c:'#f8f8f2', t:', ' }, { c:'#8be9fd', t:'MongoDB' }, { c:'#f8f8f2', t:', ' }, { c:'#8be9fd', t:'Node' }, { c:'#f8f8f2', t:' } ' }, { c:'#ff79c6', t:"from" }, { c:'#f1fa8c', t:" '@stack/core'" }] },
  { n:  5, tokens: [] },
  { n:  6, tokens: [{ c:'#6272a4', t:'// AI-powered development workflow' }] },
  { n:  7, tokens: [{ c:'#ff79c6', t:'const' }, { c:'#f8f8f2', t:' ' }, { c:'#8be9fd', t:'developer' }, { c:'#f8f8f2', t:' = {' }] },
  { n:  8, tokens: [{ c:'#f8f8f2', t:'  name: ' }, { c:'#f1fa8c', t:'"Muhammad Ibrahim"' }, { c:'#f8f8f2', t:',' }] },
  { n:  9, tokens: [{ c:'#f8f8f2', t:'  role: ' }, { c:'#f1fa8c', t:'"Full Stack Developer"' }, { c:'#f8f8f2', t:',' }] },
  { n: 10, tokens: [{ c:'#f8f8f2', t:'  exp:  ' }, { c:'#bd93f9', t:'"2–3 years"' }, { c:'#f8f8f2', t:',' }] },
  { n: 11, tokens: [{ c:'#f8f8f2', t:'  ai:   [' }, { c:'#f1fa8c', t:'"Claude Code"' }, { c:'#f8f8f2', t:', ' }, { c:'#f1fa8c', t:'"Codex"' }, { c:'#f8f8f2', t:'],' }] },
  { n: 12, tokens: [{ c:'#f8f8f2', t:'  stack:[' }, { c:'#f1fa8c', t:'"Next.js"' }, { c:'#f8f8f2', t:',' }, { c:'#f1fa8c', t:'"React"' }, { c:'#f8f8f2', t:',' }, { c:'#f1fa8c', t:'"Node"' }, { c:'#f8f8f2', t:',' }, { c:'#f1fa8c', t:'"Mongo"' }, { c:'#f8f8f2', t:'],' }] },
  { n: 13, tokens: [{ c:'#50fa7b', t:'  status:' }, { c:'#f1fa8c', t:' "available"' }, { c:'#f8f8f2', t:',' }] },
  { n: 14, tokens: [{ c:'#f8f8f2', t:'}' }] },
  { n: 15, tokens: [] },
  { n: 16, tokens: [{ c:'#ff79c6', t:'async function' }, { c:'#50fa7b', t:' buildProject' }, { c:'#f8f8f2', t:'(spec) {' }] },
  { n: 17, tokens: [{ c:'#8be9fd', t:'  const' }, { c:'#f8f8f2', t:' plan  = ' }, { c:'#ff79c6', t:'await' }, { c:'#50fa7b', t:' Claude' }, { c:'#f8f8f2', t:'.analyze(spec)' }] },
  { n: 18, tokens: [{ c:'#8be9fd', t:'  const' }, { c:'#f8f8f2', t:' code  = ' }, { c:'#ff79c6', t:'await' }, { c:'#50fa7b', t:' Codex' }, { c:'#f8f8f2', t:'.generate(plan)' }] },
  { n: 19, tokens: [{ c:'#8be9fd', t:'  const' }, { c:'#f8f8f2', t:' result= ' }, { c:'#ff79c6', t:'await' }, { c:'#50fa7b', t:' deploy' }, { c:'#f8f8f2', t:'(code)' }] },
  { n: 20, tokens: [{ c:'#ff79c6', t:'  return' }, { c:'#f8f8f2', t:' { result, ' }, { c:'#50fa7b', t:'quality' }, { c:'#f8f8f2', t:': ' }, { c:'#bd93f9', t:'"production"' }, { c:'#f8f8f2', t:' }' }] },
  { n: 21, tokens: [{ c:'#f8f8f2', t:'}' }] },
  { n: 22, tokens: [] },
  { n: 23, tokens: [{ c:'#6272a4', t:'// Projects shipped to production' }] },
  { n: 24, tokens: [{ c:'#ff79c6', t:'const' }, { c:'#f8f8f2', t:' projects = [' }] },
  { n: 25, tokens: [{ c:'#f1fa8c', t:'  "LegaliSync"' }, { c:'#f8f8f2', t:',' }, { c:'#f1fa8c', t:' "OpportunityRadar"' }, { c:'#f8f8f2', t:',' }] },
  { n: 26, tokens: [{ c:'#f1fa8c', t:'  "NextNDesign"' }, { c:'#f8f8f2', t:',' }, { c:'#f1fa8c', t:' "GS Luxury"' }, { c:'#f8f8f2', t:',' }, { c:'#f1fa8c', t:' "Math4U"' }] },
  { n: 27, tokens: [{ c:'#f8f8f2', t:']' }] },
  { n: 28, tokens: [] },
  { n: 29, tokens: [{ c:'#6272a4', t:'// Always learning, always shipping 🚀' }] },
];

/* ── Floating code card that types itself then fades ── */
const CODE_SNIPPETS = [
  {
    label: '● Claude Code',
    labelColor: '#a78bfa',
    lines: [
      { t: 'claude',  c: '#a78bfa', tx: '> Analyzing project structure...' },
      { t: 'ok',      c: '#4ade80', tx: '✓ Components mapped (12 files)' },
      { t: 'claude',  c: '#a78bfa', tx: '> Optimizing performance...' },
      { t: 'ok',      c: '#4ade80', tx: '✓ Bundle size reduced 40%' },
    ],
  },
  {
    label: '◆ Codex',
    labelColor: '#38bdf8',
    lines: [
      { t: 'codex', c: '#38bdf8', tx: '> Building API routes...' },
      { t: 'code',  c: '#FFD700', tx: 'app.post("/api/sign", async...)' },
      { t: 'ok',    c: '#4ade80', tx: '✓ 6 endpoints deployed' },
      { t: 'codex', c: '#38bdf8', tx: '> Auth middleware ready' },
    ],
  },
  {
    label: '⬡ Next.js',
    labelColor: '#FFD700',
    lines: [
      { t: 'cmd',  c: 'rgba(255,215,0,0.5)', tx: '$ next build' },
      { t: 'info', c: 'rgba(255,255,255,0.5)', tx: 'Route (app)  Size' },
      { t: 'ok',   c: '#4ade80', tx: '○ /  1.2 kB' },
      { t: 'ok',   c: '#4ade80', tx: '✓ Build completed in 4.2s' },
    ],
  },
  {
    label: '◉ MongoDB',
    labelColor: '#86efac',
    lines: [
      { t: 'db',   c: '#86efac', tx: '> db.users.insertOne({...})' },
      { t: 'ok',   c: '#4ade80', tx: '✓ acknowledged: true' },
      { t: 'db',   c: '#86efac', tx: '> db.contracts.find()' },
      { t: 'info', c: 'rgba(255,255,255,0.45)', tx: '← 248 documents' },
    ],
  },
  {
    label: '✦ Claude AI',
    labelColor: '#f9a8d4',
    lines: [
      { t: 'ai',  c: '#f9a8d4', tx: '> Review code quality...' },
      { t: 'ok',  c: '#4ade80', tx: '✓ No issues found' },
      { t: 'ai',  c: '#f9a8d4', tx: '> Suggest optimizations...' },
      { t: 'res', c: 'rgba(255,255,255,0.55)', tx: 'Use useMemo on line 42' },
    ],
  },
];

function FloatingCodeCard({ snippet, x, y, delay, duration }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeouts = [];
    const cycle = () => {
      setVisible(false);
      setVisibleLines(0);
      const t0 = setTimeout(() => {
        setVisible(true);
        snippet.lines.forEach((_, i) => {
          const t = setTimeout(() => setVisibleLines(i + 1), 300 + i * 420);
          timeouts.push(t);
        });
        const tFade = setTimeout(() => {
          setVisible(false);
          const tNext = setTimeout(cycle, 800);
          timeouts.push(tNext);
        }, 300 + snippet.lines.length * 420 + 1800);
        timeouts.push(tFade);
      }, delay * 1000);
      timeouts.push(t0);
    };
    cycle();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="card"
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', left: x, top: y,
            background: 'rgba(6,6,6,0.88)',
            border: '1px solid rgba(255,215,0,0.18)',
            borderRadius: 6,
            padding: '8px 12px',
            minWidth: 210,
            backdropFilter: 'blur(4px)',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, borderBottom: '1px solid rgba(255,215,0,0.08)', paddingBottom: 5 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {['#f87171','#fbbf24','#4ade80'].map((c,i) => (
                <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: c, opacity: 0.7 }} />
              ))}
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.52rem', color: snippet.labelColor, letterSpacing: '0.1em' }}>
              {snippet.label}
            </span>
          </div>
          {/* Lines */}
          {snippet.lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.25 }}
              style={{ fontFamily: 'monospace', fontSize: '0.55rem', color: line.c, lineHeight: 1.7, whiteSpace: 'nowrap' }}
            >
              {line.tx}
              {i === visibleLines - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}
                  style={{ borderRight: `1px solid ${line.c}`, marginLeft: 2 }}
                >&nbsp;</motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── AI status chips that float up ── */
const AI_CHIPS = [
  { text: 'Claude ✓ refactored',  color: '#a78bfa', x: '4%',  delay: 0    },
  { text: 'Codex ⚡ building...',  color: '#38bdf8', x: '62%', delay: 2.5  },
  { text: 'Claude ✓ reviewed',    color: '#a78bfa', x: '28%', delay: 5    },
  { text: 'Codex ✓ deployed',     color: '#38bdf8', x: '75%', delay: 7.5  },
  { text: 'AI ✓ optimized',       color: '#4ade80', x: '14%', delay: 10   },
  { text: 'Claude ⚡ analyzing',  color: '#f9a8d4', x: '50%', delay: 12.5 },
];

function FloatingChip({ chip }) {
  return (
    <motion.div
      animate={{ y: [60, -80], opacity: [0, 0.8, 0.8, 0] }}
      transition={{ duration: 5, delay: chip.delay, repeat: Infinity, repeatDelay: 8, ease: 'easeOut', times: [0, 0.15, 0.8, 1] }}
      style={{
        position: 'absolute', left: chip.x, bottom: '8%',
        fontFamily: 'monospace', fontSize: '0.52rem', letterSpacing: '0.08em',
        color: chip.color,
        background: 'rgba(0,0,0,0.75)',
        border: `1px solid ${chip.color}44`,
        padding: '3px 9px', borderRadius: 20,
        whiteSpace: 'nowrap',
        boxShadow: `0 0 10px ${chip.color}22`,
      }}
    >
      {chip.text}
    </motion.div>
  );
}

/* ── Falling matrix chars in left strip ── */
function MatrixStrip() {
  const CHARS = '01アイウエカサタナハマクスコソトノホモ{}[]<>/=+*';
  const cols = 8;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 52, overflow: 'hidden', opacity: 0.35 }}>
      {Array.from({ length: cols }).map((_, ci) => (
        <motion.div
          key={ci}
          animate={{ y: ['-100%', '120%'] }}
          transition={{ duration: 4 + ci * 0.7, delay: ci * 0.5, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: ci * 7,
            top: 0,
            display: 'flex', flexDirection: 'column', gap: 2,
          }}
        >
          {Array.from({ length: 12 }).map((_, ri) => (
            <div key={ri} style={{
              fontFamily: 'monospace', fontSize: '0.45rem',
              color: ri === 0 ? '#FFD700' : `rgba(255,215,0,${0.5 - ri * 0.04})`,
              lineHeight: 1.4,
            }}>
              {CHARS[Math.floor((ci * 13 + ri * 7) % CHARS.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function HeroBG() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>

      {/* ── Full-section IDE code editor wallpaper ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex',
        opacity: 0.13,
      }}>
        {/* Line-number gutter */}
        <div style={{
          width: 42, flexShrink: 0,
          background: 'rgba(30,31,41,0.8)',
          borderRight: '1px solid rgba(255,215,0,0.08)',
          paddingTop: 14,
        }}>
          {BG_CODE_LINES.map(l => (
            <div key={l.n} style={{
              height: 22, display: 'flex', alignItems: 'center',
              justifyContent: 'flex-end', paddingRight: 8,
              fontFamily: 'monospace', fontSize: '0.62rem',
              color: 'rgba(255,215,0,0.3)',
            }}>{l.n}</div>
          ))}
        </div>

        {/* Code content */}
        <div style={{ flex: 1, paddingTop: 14, paddingLeft: 16, overflow: 'hidden' }}>
          {BG_CODE_LINES.map((line, i) => (
            <motion.div
              key={line.n}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
              style={{ height: 22, display: 'flex', alignItems: 'center', gap: 0, whiteSpace: 'nowrap' }}
            >
              {line.tokens.map((tok, j) => (
                <span key={j} style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: tok.c }}>
                  {tok.t}
                </span>
              ))}
              {/* Blinking cursor on last real line */}
              {i === BG_CODE_LINES.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  style={{ width: 7, height: 14, background: '#FFD700', display: 'inline-block', marginLeft: 2, borderRadius: 1 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient mask — fades left/right so code doesn't fight text */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to right,
            rgba(5,5,5,0.92) 0%,
            rgba(5,5,5,0.55) 22%,
            rgba(5,5,5,0.25) 48%,
            rgba(5,5,5,0.55) 72%,
            rgba(5,5,5,0.92) 100%
          ),
          linear-gradient(to bottom,
            rgba(5,5,5,0.5) 0%,
            transparent 15%,
            transparent 80%,
            rgba(5,5,5,0.7) 100%
          )
        `,
      }} />

      {/* Active line highlight — scrolls slowly */}
      <motion.div
        animate={{ y: ['8%', '82%', '8%'] }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
        style={{
          position: 'absolute', left: 0, right: 0, height: 22,
          background: 'rgba(255,215,0,0.025)',
          borderTop: '1px solid rgba(255,215,0,0.06)',
          borderBottom: '1px solid rgba(255,215,0,0.06)',
        }}
      />

      {/* Glows */}
      <div style={{ position: 'absolute', top: '5%', right: '5%', width: '40%', height: '75%', background: 'radial-gradient(ellipse, rgba(255,215,0,0.055) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '30%', height: '45%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)' }} />

      {/* Sweeping scan line */}
      <motion.div
        animate={{ x: ['-2%', '102%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear', repeatDelay: 7 }}
        style={{ position: 'absolute', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.18) 40%, rgba(255,215,0,0.18) 60%, transparent)' }}
      />

      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: 14, left: 14, width: 36, height: 36, borderTop: '1.5px solid rgba(255,215,0,0.2)', borderLeft: '1.5px solid rgba(255,215,0,0.2)' }} />
      <div style={{ position: 'absolute', bottom: 14, right: 14, width: 36, height: 36, borderBottom: '1.5px solid rgba(255,215,0,0.2)', borderRight: '1.5px solid rgba(255,215,0,0.2)' }} />
    </div>
  );
}

/* ═══════════════════════════════════════
   Hero section
═══════════════════════════════════════ */
function Hero() {
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStartTyping(true), 600);
    return () => clearTimeout(t);
  }, []);

  const [text] = useTypewriter({
    words: startTyping ? ['Full Stack Developer', 'React Developer', 'NodeJS Developer'] : [''],
    loop: true, typeSpeed: 80, deleteSpeed: 40, delaySpeed: 2000,
  });

  return (
    <div className="pb-4 lg:mb-20" style={{ borderBottom: '1px solid rgba(255,215,0,0.1)', position: 'relative' }}>
      <HeroBG />

      <div className="flex flex-wrap justify-between items-center" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Left — text ── */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">

            <motion.div
              initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }} className="pb-6 lg:mt-16"
            >
              <h1
                className="glitch-wrapper text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight font-mono"
                data-text="Muhammad Ibrahim"
                style={{ color: '#FFD700', animation: 'neon-pulse 3s ease-in-out infinite' }}
              >
                Muhammad Ibrahim
              </h1>
            </motion.div>

            <motion.div
              initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-6 font-mono text-base sm:text-xl lg:text-2xl tracking-widest"
              style={{ color: 'rgba(255,215,0,0.75)' }}
            >
              <span>&gt; </span><span>{text}</span><Cursor cursorColor="#FFD700" />
            </motion.div>

            <motion.p
              initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="max-w-xl py-4 font-light tracking-wide leading-relaxed text-sm"
              style={{ color: 'rgba(200,200,200,0.7)', borderLeft: '2px solid rgba(255,215,0,0.3)', paddingLeft: '1rem' }}
            >
              {HERO_CONTENT}
            </motion.p>

            <motion.div
              initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex gap-4 mt-6"
            >
              <a
                href="#best-projects"
                onClick={e => { e.preventDefault(); document.getElementById('best-projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-6 py-2 font-mono text-sm tracking-widest transition-all duration-300"
                style={{ border: '1px solid rgba(255,215,0,0.5)', color: '#FFD700', background: 'rgba(255,215,0,0.05)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,215,0,0.15)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(255,215,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,215,0,0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                [ VIEW PROJECTS ]
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── Right — laptop with browser animation ── */}
        <div className="w-full lg:w-1/2 lg:p-8 mb-20 mt-12 lg:mt-0">
          <div className="flex justify-center items-center">
            <motion.div
              initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ perspective: 1000 }}
            >
              <Laptop3D />
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hero;

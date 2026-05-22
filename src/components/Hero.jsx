import React, { useState, useEffect } from 'react';
import { HERO_CONTENT } from '../constants';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const CODE_LINES = [
  { indent: 0, color: "#FFD700",            text: "const dev = {" },
  { indent: 1, color: "rgba(255,215,0,0.6)", text: 'name: "Muhammad",' },
  { indent: 1, color: "rgba(255,215,0,0.6)", text: 'stack: "Full Stack",' },
  { indent: 1, color: "#4ade80",             text: 'status: "available",' },
  { indent: 1, color: "rgba(255,215,0,0.6)", text: 'ai: ["Claude","Codex"],' },
  { indent: 0, color: "#FFD700",            text: "};" },
  { indent: 0, color: "rgba(255,215,0,0.35)", text: "// building..." },
];

function Laptop3D() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", userSelect: "none" }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        width: 340, height: 220,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(255,215,0,0.12) 0%, transparent 70%)",
        filter: "blur(20px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Laptop lid (screen) */}
      <div style={{
        position: "relative",
        width: 320,
        height: 210,
        background: "linear-gradient(160deg, #111 0%, #080808 100%)",
        border: "2px solid rgba(255,215,0,0.55)",
        borderRadius: "10px 10px 0 0",
        boxShadow: "0 0 30px rgba(255,215,0,0.15), 0 0 80px rgba(255,215,0,0.06), inset 0 0 20px rgba(0,0,0,0.8)",
        zIndex: 1,
        overflow: "hidden",
        transform: "rotateX(-6deg)",
        transformOrigin: "bottom center",
      }}>
        {/* Screen bezel top bar */}
        <div style={{
          display: "flex", alignItems: "center",
          padding: "7px 12px", gap: 6,
          borderBottom: "1px solid rgba(255,215,0,0.15)",
          background: "rgba(255,215,0,0.03)",
        }}>
          {["#f87171","#fbbf24","#4ade80"].map((c,i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.85 }} />
          ))}
          <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: "0.55rem", color: "rgba(255,215,0,0.4)", letterSpacing: "0.12em" }}>
            ~/portfolio/dev.js
          </span>
        </div>

        {/* Screen content — code editor */}
        <div style={{ padding: "12px 14px" }}>
          {/* Line numbers + code */}
          {CODE_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.18, duration: 0.35 }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}
            >
              <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "rgba(255,215,0,0.2)", minWidth: 14, textAlign: "right" }}>
                {i + 1}
              </span>
              <span style={{
                fontFamily: "monospace",
                fontSize: "0.62rem",
                color: line.color,
                paddingLeft: line.indent * 14,
                letterSpacing: "0.03em",
              }}>
                {line.text}
              </span>
            </motion.div>
          ))}

          {/* Blinking cursor */}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              display: "inline-block",
              width: 7, height: 13,
              background: "#FFD700",
              marginLeft: 28,
              marginTop: 2,
              borderRadius: 1,
            }}
          />
        </div>

        {/* Scanline overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
        }} />

        {/* Screen glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(255,215,0,0.04) 0%, transparent 70%)",
        }} />

        {/* Corner brackets */}
        {[
          { top: 6, left: 6, borderTop: "2px solid #FFD700", borderLeft: "2px solid #FFD700" },
          { top: 6, right: 6, borderTop: "2px solid #FFD700", borderRight: "2px solid #FFD700" },
          { bottom: 6, left: 6, borderBottom: "2px solid #FFD700", borderLeft: "2px solid #FFD700" },
          { bottom: 6, right: 6, borderBottom: "2px solid #FFD700", borderRight: "2px solid #FFD700" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 14, height: 14, pointerEvents: "none", ...s }} />
        ))}
      </div>

      {/* Hinge shadow */}
      <div style={{
        width: 316,
        height: 5,
        background: "linear-gradient(to bottom, rgba(255,215,0,0.3), transparent)",
        zIndex: 2,
      }} />

      {/* Base (keyboard) */}
      <div style={{
        width: 330,
        height: 20,
        background: "linear-gradient(to bottom, #1a1a1a, #0d0d0d)",
        border: "2px solid rgba(255,215,0,0.4)",
        borderTop: "none",
        borderRadius: "0 0 6px 6px",
        zIndex: 1,
        position: "relative",
        boxShadow: "0 8px 30px rgba(0,0,0,0.6), 0 0 20px rgba(255,215,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        padding: "0 20px",
      }}>
        {/* Keyboard keys row */}
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} style={{
            flex: i === 10 ? 3 : 1,
            height: 7,
            background: "rgba(255,215,0,0.08)",
            border: "1px solid rgba(255,215,0,0.15)",
            borderRadius: 2,
          }} />
        ))}
      </div>

      {/* Trackpad strip */}
      <div style={{
        width: 90, height: 12,
        background: "rgba(255,215,0,0.05)",
        border: "1px solid rgba(255,215,0,0.2)",
        borderTop: "none",
        borderRadius: "0 0 6px 6px",
        zIndex: 1,
      }} />

      {/* Surface reflection */}
      <div style={{
        width: 330, height: 8,
        background: "linear-gradient(to bottom, rgba(255,215,0,0.06), transparent)",
        borderRadius: "0 0 4px 4px",
        marginTop: 1,
        filter: "blur(2px)",
      }} />

      {/* AVAILABLE FOR HIRE badge */}
      <motion.div
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          marginTop: 18,
          display: "flex", alignItems: "center", gap: 7,
          fontFamily: "monospace", fontSize: "0.7rem",
          background: "rgba(0,0,0,0.85)",
          border: "1px solid rgba(255,215,0,0.4)",
          color: "#4ade80",
          padding: "5px 14px",
          borderRadius: 2,
          letterSpacing: "0.1em",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
        AVAILABLE FOR HIRE
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const [text] = useTypewriter({
    words: startTyping ? ['Full Stack Developer', 'React Developer', 'NodeJS Developer'] : [''],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 40,
    delaySpeed: 2000,
  });

  return (
    <div className="pb-4 lg:mb-20" style={{ borderBottom: '1px solid rgba(255,215,0,0.1)' }}>
      <div className="flex flex-wrap justify-between items-center">

        {/* Left — text */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">

            {/* Glitch name */}
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="pb-6 lg:mt-16"
            >
              <h1
                className="glitch-wrapper text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight font-mono"
                data-text="Muhammad Ibrahim"
                style={{ color: '#FFD700', animation: 'neon-pulse 3s ease-in-out infinite' }}
              >
                Muhammad Ibrahim
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-6 font-mono text-base sm:text-xl lg:text-2xl tracking-widest"
              style={{ color: 'rgba(255,215,0,0.75)' }}
            >
              <span>&gt; </span>
              <span>{text}</span>
              <Cursor cursorColor="#FFD700" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="max-w-xl py-4 font-light tracking-wide leading-relaxed text-sm"
              style={{ color: 'rgba(200,200,200,0.7)', borderLeft: '2px solid rgba(255,215,0,0.3)', paddingLeft: '1rem' }}
            >
              {HERO_CONTENT}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex gap-4 mt-6"
            >
              <a
                href="#best-projects"
                onClick={e => { e.preventDefault(); document.getElementById('best-projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-6 py-2 font-mono text-sm tracking-widest transition-all duration-300"
                style={{
                  border: '1px solid rgba(255,215,0,0.5)',
                  color: '#FFD700',
                  background: 'rgba(255,215,0,0.05)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,215,0,0.15)';
                  e.currentTarget.style.boxShadow = '0 0 14px rgba(255,215,0,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,215,0,0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                [ VIEW PROJECTS ]
              </a>
            </motion.div>

          </div>
        </div>

        {/* Right — 3D Laptop illustration */}
        <div className="w-full lg:w-1/2 lg:p-8 mb-20 mt-12 lg:mt-0">
          <div className="flex justify-center items-center">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
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

import React, { useState, useEffect } from 'react';
import { HERO_CONTENT } from '../constants';
import Muhammad from '../assets/Muhammad.png';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

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

        {/* Right — photo */}
        <div className="w-full lg:w-1/2 lg:p-8 mb-20 mt-12 lg:mt-0">
          <div className="flex justify-center">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'radial-gradient(circle at 50% 100%, rgba(255,215,0,0.15), transparent 70%)',
                  transform: 'scale(1.05)',
                }}
              />
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-6 h-6" style={{ borderTop: '2px solid #FFD700', borderLeft: '2px solid #FFD700' }} />
              <div className="absolute top-0 right-0 w-6 h-6" style={{ borderTop: '2px solid #FFD700', borderRight: '2px solid #FFD700' }} />
              <div className="absolute bottom-0 left-0 w-6 h-6" style={{ borderBottom: '2px solid #FFD700', borderLeft: '2px solid #FFD700' }} />
              <div className="absolute bottom-0 right-0 w-6 h-6" style={{ borderBottom: '2px solid #FFD700', borderRight: '2px solid #FFD700' }} />

              <img
                src={Muhammad}
                alt="Muhammad Ibrahim"
                className="rounded-3xl object-cover h-96 w-72 relative z-10"
                style={{ filter: 'contrast(1.05) brightness(0.95)' }}
              />

              {/* Status badge */}
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1 font-mono text-xs"
                style={{
                  background: 'rgba(0,0,0,0.85)',
                  border: '1px solid rgba(255,215,0,0.4)',
                  color: '#4ade80',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                AVAILABLE FOR HIRE
              </motion.div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hero;

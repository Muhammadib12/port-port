import React from 'react';
import { ABOUT_TEXT } from '../constants';
import { motion } from 'framer-motion';
import aboutImg from '../assets/about.jpg';

function About() {
  return (
    <div
      className="pb-16 pt-4 relative overflow-hidden"
      style={{ borderBottom: '1px solid rgba(255,215,0,0.1)' }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${aboutImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.18) saturate(0.4)',
          zIndex: 0,
        }}
      />

      {/* Gold gradient overlay — fades image at edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.2) 40%, rgba(5,5,5,0.2) 60%, rgba(5,5,5,0.85) 100%)',
          zIndex: 1,
        }}
      />
      {/* Side fades */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(5,5,5,0.7) 0%, transparent 30%, transparent 70%, rgba(5,5,5,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.7 }}
          className="my-16 text-center"
        >
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: 'rgba(255,215,0,0.5)' }}
          >
            // section_01
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 font-mono"
            style={{ color: '#FFD700' }}
          >
            ABOUT<span style={{ color: 'rgba(255,255,255,0.2)' }}>.me</span>
          </h2>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto p-8 rounded relative"
          style={{
            background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,215,0,0.18)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          {/* Corner brackets */}
          <div style={{ position: 'absolute', top: -1, left: -1, width: 18, height: 18, borderTop: '2px solid #FFD700', borderLeft: '2px solid #FFD700' }} />
          <div style={{ position: 'absolute', bottom: -1, right: -1, width: 18, height: 18, borderBottom: '2px solid #FFD700', borderRight: '2px solid #FFD700' }} />

          <p
            className="leading-relaxed tracking-wide"
            style={{ color: 'rgba(225,225,225,0.88)', lineHeight: '1.9' }}
          >
            {ABOUT_TEXT}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default About;

import React, { useState, useEffect } from "react";
import MuhammadLogo from "../assets/MuhammadLogo.webp";
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["M.Ibrahim", "Full Stack", "Developer", "React · Next", "Node · Mongo"];

// Random delay per character for organic feel
const randDelay = (i) => i * 0.06 + Math.random() * 0.04;

function AnimatedName() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show word → wait → hide → next word
    const showTimer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(showTimer);
  }, [wordIndex]);

  useEffect(() => {
    if (!visible) {
      const next = setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 400);
      return () => clearTimeout(next);
    }
  }, [visible]);

  const word = WORDS[wordIndex];
  const chars = word.split("");

  return (
    <span
      className="hidden sm:inline-flex font-mono tracking-widest uppercase text-sm"
      style={{ color: "rgba(255,215,0,0.85)", minWidth: "9ch", letterSpacing: "0.15em" }}
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span key={word} style={{ display: "inline-flex" }}>
            {chars.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{
                  delay: randDelay(i),
                  duration: 0.18,
                  ease: "easeOut",
                }}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {ch}
              </motion.span>
            ))}
            {/* blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ color: "#FFD700", marginLeft: 1 }}
            >
              _
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-10 lg:mb-20 flex items-center justify-between py-5 lg:py-8"
      style={{
        borderBottom: '1px solid rgba(255,215,0,0.12)',
      }}
    >
      {/* Logo */}
      <div id="home" className="flex items-center gap-3">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: '0 0 16px rgba(255,215,0,0.4)', borderRadius: '50%' }}
          />
          <img
            src={MuhammadLogo}
            className="h-14 w-14 rounded-full object-cover relative z-10"
            style={{ border: '2px solid rgba(255,215,0,0.5)' }}
            alt="Logo"
          />
        </div>
        <AnimatedName />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-5 text-xl">
        {[
          { href: "https://www.linkedin.com/in/muhammad-ibrahem-0b22002a3/", icon: <FaLinkedin />, color: '#60a5fa' },
          { href: "https://github.com/Muhammadib12", icon: <FaGithub />, color: '#e5e7eb' },
          { href: "https://www.instagram.com/muhammadibra403/profilecard/?igsh=YXRoNXg1ZXM3d3gz", icon: <FaInstagram />, color: '#fb923c' },
        ].map(({ href, icon, color }, i) => (
          <motion.a
            key={i}
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ color }}
          >
            {icon}
          </motion.a>
        ))}
        <motion.a
          href="https://wa.me/972506567035"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -3, scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ color: '#4ade80' }}
        >
          <FaWhatsapp />
        </motion.a>
      </div>
    </motion.nav>
  );
}

export default Navbar;

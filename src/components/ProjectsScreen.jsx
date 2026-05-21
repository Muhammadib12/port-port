import React, { useState, useEffect, useRef } from "react";
import { PROJECTS } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const INTERVAL = 4000;

export default function ProjectsScreen() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const go = (idx, dir) => {
    setDirection(dir);
    setCurrent((idx + PROJECTS.length) % PROJECTS.length);
  };

  const next = () => go(current + 1, 1);
  const prev = () => go(current - 1, -1);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % PROJECTS.length);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % PROJECTS.length);
    }, INTERVAL);
  };

  const handleNext = () => { next(); resetTimer(); };
  const handlePrev = () => { prev(); resetTimer(); };

  const project = PROJECTS[current];

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const infoVariants = {
    enter: { opacity: 0, y: 18 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -18 },
  };

  return (
    <div
      className="pb-20 pt-4 relative overflow-hidden"
      style={{ borderBottom: "1px solid rgba(255,215,0,0.1)" }}
    >
      {/* ── Showcase background ── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>

        {/* Stage curtain left */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "12%", height: "100%",
          background: "linear-gradient(to right, rgba(120,0,0,0.13) 0%, rgba(80,0,0,0.06) 60%, transparent 100%)",
        }} />
        {/* Stage curtain right */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: "12%", height: "100%",
          background: "linear-gradient(to left, rgba(120,0,0,0.13) 0%, rgba(80,0,0,0.06) 60%, transparent 100%)",
        }} />

        {/* Spotlight from top-center */}
        <div style={{
          position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
          width: "70%", height: "85%",
          background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,215,0,0.07) 0%, transparent 70%)",
        }} />

        {/* Stage floor reflection at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
          background: "linear-gradient(to top, rgba(255,215,0,0.04) 0%, transparent 100%)",
        }} />

        {/* Horizontal scan lines (cinema feel) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: "5%", right: "5%",
            top: `${10 + i * 11}%`,
            height: "1px",
            background: `rgba(255,215,0,${i % 2 === 0 ? 0.04 : 0.02})`,
          }} />
        ))}

        {/* Left spotlight beam */}
        <div style={{
          position: "absolute", top: 0, left: "8%",
          width: "20%", height: "60%",
          background: "linear-gradient(160deg, rgba(255,215,0,0.05) 0%, transparent 70%)",
          transformOrigin: "top left",
        }} />
        {/* Right spotlight beam */}
        <div style={{
          position: "absolute", top: 0, right: "8%",
          width: "20%", height: "60%",
          background: "linear-gradient(200deg, rgba(255,215,0,0.05) 0%, transparent 70%)",
          transformOrigin: "top right",
        }} />

        {/* Audience dots (rows of faint circles at bottom) */}
        {Array.from({ length: 3 }).map((_, row) =>
          Array.from({ length: 18 }).map((_, col) => (
            <div key={`${row}-${col}`} style={{
              position: "absolute",
              bottom: `${4 + row * 4}%`,
              left: `${3 + col * 5.5}%`,
              width: 6, height: 6,
              borderRadius: "50%",
              background: `rgba(255,215,0,${0.03 + Math.sin(row + col) * 0.015})`,
            }} />
          ))
        )}

        {/* Edge fades */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(5,5,5,0.65) 0%, transparent 18%, transparent 75%, rgba(5,5,5,0.8) 100%)",
        }} />
      </div>

      {/* Content above bg */}
      <div style={{ position: "relative", zIndex: 1 }}>
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.7 }}
        className="my-16 text-center"
      >
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: "rgba(255,215,0,0.5)" }}
        >
          // live_showcase
        </span>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 font-mono"
          style={{ color: "#FFD700" }}
        >
          SHOWCASE
          <span style={{ color: "rgba(255,255,255,0.2)" }}>.display</span>
        </h2>
      </motion.div>

      {/* Bouncing screen wrapper */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        className="mx-auto"
        style={{ maxWidth: 860 }}
      >
        {/* Monitor frame */}
        <div
          style={{
            position: "relative",
            background: "rgba(8,8,8,0.95)",
            border: "2px solid rgba(255,215,0,0.45)",
            borderRadius: "10px",
            boxShadow:
              "0 0 40px rgba(255,215,0,0.12), 0 0 80px rgba(255,215,0,0.05), inset 0 0 30px rgba(0,0,0,0.8)",
            overflow: "hidden",
          }}
        >
          {/* Top bar — "bezel" */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 14px",
              borderBottom: "1px solid rgba(255,215,0,0.15)",
              background: "rgba(255,215,0,0.03)",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {["#f87171", "#fbbf24", "#4ade80"].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
              ))}
            </div>
            <span style={{ fontFamily: "monospace", fontSize: "clamp(0.5rem, 1.5vw, 0.7rem)", color: "rgba(255,215,0,0.5)", letterSpacing: "0.1em" }}>
              M.IBRAHIM — PROJECTS
            </span>
            <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(255,215,0,0.35)" }}>
              {String(current + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>

          {/* Image area */}
          <div style={{ position: "relative", width: "100%", height: "clamp(200px, 45vw, 420px)", overflow: "hidden", background: "#000" }}>
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.img
                key={project.id}
                src={project.image}
                alt={project.title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.7)",
                }}
              />
            </AnimatePresence>

            {/* Scanline overlay on image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                pointerEvents: "none",
              }}
            />

            {/* Bottom gradient so text is always readable */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "55%",
                background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Corner brackets */}
            {[
              { top: 12, left: 12, borderTop: "2px solid #FFD700", borderLeft: "2px solid #FFD700" },
              { top: 12, right: 12, borderTop: "2px solid #FFD700", borderRight: "2px solid #FFD700" },
              { bottom: 12, left: 12, borderBottom: "2px solid #FFD700", borderLeft: "2px solid #FFD700" },
              { bottom: 12, right: 12, borderBottom: "2px solid #FFD700", borderRight: "2px solid #FFD700" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: 20, height: 20, ...s, pointerEvents: "none" }} />
            ))}

            {/* Project info overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id + "-info"}
                variants={infoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "20px 24px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#FFD700",
                    marginBottom: 6,
                    textShadow: "0 0 20px rgba(255,215,0,0.5)",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(230,230,230,0.9)",
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    maxWidth: 600,
                    textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                  }}
                >
                  {project.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next arrows */}
            {[
              { side: "left", action: handlePrev, icon: <ChevronLeft size={22} /> },
              { side: "right", action: handleNext, icon: <ChevronRight size={22} /> },
            ].map(({ side, action, icon }) => (
              <button
                key={side}
                onClick={action}
                style={{
                  position: "absolute",
                  top: "50%",
                  [side]: 12,
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,215,0,0.3)",
                  color: "#FFD700",
                  padding: "8px",
                  cursor: "pointer",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  transition: "background 0.2s",
                  zIndex: 10,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,215,0,0.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.6)")}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Bottom info bar */}
          <div
            style={{
              padding: "14px 20px",
              borderTop: "1px solid rgba(255,215,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
              background: "rgba(255,215,0,0.02)",
            }}
          >
            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {project.technologies.slice(0, 5).map((tech, j) => (
                <span
                  key={j}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.65rem",
                    padding: "2px 8px",
                    border: "1px solid rgba(255,215,0,0.22)",
                    color: "rgba(255,215,0,0.75)",
                    background: "rgba(255,215,0,0.04)",
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(255,215,0,0.35)" }}>
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>

            {/* Visit link */}
            {project.url && project.url !== "home" && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  color: "#FFD700",
                  border: "1px solid rgba(255,215,0,0.4)",
                  padding: "4px 12px",
                  background: "rgba(255,215,0,0.05)",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,215,0,0.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,215,0,0.05)")}
              >
                <ExternalLink size={12} /> VISIT SITE
              </a>
            )}
          </div>
        </div>

        {/* Monitor stand */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 60, height: 20, background: "linear-gradient(to bottom, rgba(255,215,0,0.2), rgba(255,215,0,0.05))", clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }} />
          <div style={{ width: 120, height: 6, background: "rgba(255,215,0,0.15)", borderRadius: 4 }} />
        </div>
      </motion.div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => { go(i, i > current ? 1 : -1); resetTimer(); }}
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? "#FFD700" : "rgba(255,215,0,0.2)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      </div> {/* end content z:1 */}
    </div>
  );
}

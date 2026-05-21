import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Floating particles on canvas ── */
function ParticleCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 90;
    const particles = Array.from({ length: COUNT }, () => ({
      x:      Math.random() * window.innerWidth,
      y:      Math.random() * window.innerHeight,
      r:      Math.random() * 1.4 + 0.3,
      vx:     (Math.random() - 0.5) * 0.25,
      vy:     (Math.random() - 0.5) * 0.25,
      alpha:  Math.random() * 0.5 + 0.1,
      pulse:  Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.pulse += 0.012;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,0,${a})`;
        ctx.fill();
      });

      // Draw faint lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,215,0,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -5,
        pointerEvents: "none",
        opacity: 0.55,
      }}
    />
  );
}

/* ── Left side decorative strip ── */
function LeftStrip() {
  return (
    <div
      className="hidden lg:flex"
      style={{
        position: "fixed",
        left: 18,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {/* Vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 2 }}
        style={{
          width: 1,
          height: 90,
          background: "linear-gradient(to bottom, transparent, rgba(255,215,0,0.4), transparent)",
          transformOrigin: "top",
        }}
      />

      {/* Rotating hex */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{
          width: 18,
          height: 18,
          border: "1px solid rgba(255,215,0,0.4)",
          transform: "rotate(0deg)",
          clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
        }}
      />

      {/* Blinking dots */}
      {[0.3, 0.6, 0.9].map((delay, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
          transition={{ duration: 2, delay, repeat: Infinity }}
          style={{ width: 4, height: 4, borderRadius: "50%", background: "#FFD700" }}
        />
      ))}

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 2 }}
        style={{
          width: 1,
          height: 90,
          background: "linear-gradient(to bottom, transparent, rgba(255,215,0,0.4), transparent)",
          transformOrigin: "bottom",
        }}
      />

      {/* Vertical text */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{
          fontFamily: "monospace",
          fontSize: "0.55rem",
          color: "rgba(255,215,0,0.3)",
          writingMode: "vertical-rl",
          letterSpacing: "0.2em",
          marginTop: 8,
        }}
      >
        PORTFOLIO · 2025
      </motion.span>
    </div>
  );
}

/* ── Right side decorative strip ── */
function RightStrip() {
  return (
    <div
      className="hidden lg:flex"
      style={{
        position: "fixed",
        right: 18,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 2.2 }}
        style={{
          width: 1,
          height: 90,
          background: "linear-gradient(to bottom, transparent, rgba(255,215,0,0.3), transparent)",
          transformOrigin: "top",
        }}
      />

      {/* Pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.15, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: "1px solid rgba(255,215,0,0.6)",
        }}
      />

      {/* Small squares */}
      {[0, 0.4, 0.8].map((delay, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [0, 90, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, delay, repeat: Infinity }}
          style={{
            width: 5,
            height: 5,
            border: "1px solid rgba(255,215,0,0.5)",
          }}
        />
      ))}

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 2.2 }}
        style={{
          width: 1,
          height: 90,
          background: "linear-gradient(to bottom, transparent, rgba(255,215,0,0.3), transparent)",
          transformOrigin: "bottom",
        }}
      />

      {/* Vertical text */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7 }}
        style={{
          fontFamily: "monospace",
          fontSize: "0.55rem",
          color: "rgba(255,215,0,0.3)",
          writingMode: "vertical-rl",
          letterSpacing: "0.2em",
          transform: "rotate(180deg)",
          marginTop: 8,
        }}
      >
        FULL · STACK · DEV
      </motion.span>
    </div>
  );
}

/* ── Corner ornaments ── */
function CornerOrbs() {
  return (
    <>
      {/* Top-left glow orb */}
      <motion.div
        animate={{ opacity: [0.06, 0.14, 0.06], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: -120,
          left: -120,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)",
          zIndex: -4,
          pointerEvents: "none",
        }}
      />
      {/* Bottom-right glow orb */}
      <motion.div
        animate={{ opacity: [0.04, 0.1, 0.04], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, delay: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          bottom: -150,
          right: -150,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
          zIndex: -4,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

/* ── Floating cyber shapes (left & right edges) ── */
const shapes = [
  { size: 30, top: "15%", left: 8,  rotate: 45,  delay: 0   },
  { size: 16, top: "28%", left: 40, rotate: 20,  delay: 1   },
  { size: 22, top: "55%", left: 12, rotate: 70,  delay: 0.5 },
  { size: 12, top: "72%", left: 45, rotate: 30,  delay: 1.5 },
  { size: 20, top: "88%", left: 20, rotate: 55,  delay: 0.8 },
  { size: 28, top: "10%", right: 10, rotate: 30, delay: 0.3 },
  { size: 14, top: "35%", right: 44, rotate: 60, delay: 1.2 },
  { size: 24, top: "60%", right: 8,  rotate: 15, delay: 0.7 },
  { size: 10, top: "80%", right: 38, rotate: 80, delay: 1.8 },
];

function FloatingShapes() {
  return (
    <>
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.18, 0.08, 0.18, 0],
            y: [0, -18, 0],
            rotate: [s.rotate, s.rotate + 90, s.rotate],
          }}
          transition={{
            duration: 7 + i * 0.7,
            delay: s.delay + 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "fixed",
            top: s.top,
            left: s.left ?? undefined,
            right: s.right ?? undefined,
            width: s.size,
            height: s.size,
            border: "1px solid rgba(255,215,0,0.55)",
            borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? 2 : 0,
            zIndex: -3,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

export default function BackgroundFX() {
  return (
    <>
      <ParticleCanvas />
      <CornerOrbs />
      <FloatingShapes />
      <LeftStrip />
      <RightStrip />
    </>
  );
}

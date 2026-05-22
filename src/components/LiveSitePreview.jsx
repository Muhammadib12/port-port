import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Monitor, Globe, RefreshCw, ExternalLink, Smartphone } from "lucide-react";

const SITE_URL    = "https://mohamad-ibrahem.com";
const DISPLAY_URL = "mohamad-ibrahem.com";

/* ── dimensions ── */
const MON_W = 860, MON_H = 500;
const PHN_W = 240, PHN_H = 480;
const SCALE = 0.5;

/* ── Scroll animation hook ──
   cycles: scroll-down → hold → flash-transition → back to top → hold → repeat */
function useScrollCycle(totalPx, duration = 26) {
  const [phase, setPhase] = useState("scrolling"); // scrolling | flash | reset
  const [y,     setY]     = useState(0);

  useEffect(() => {
    let raf, start, fromY = 0, toY = -totalPx;
    const SCROLL_FRAC = 0.7;   // 70% of duration = scroll
    const HOLD_MS     = 0;     // no pause — reveal immediately after scroll
    const FLASH_MS    = 3200;  // domain reveal screen duration
    const RESET_HOLD  = 300;   // pause at top before next cycle

    function scrollAnim(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const scrollDur = duration * 1000 * SCROLL_FRAC;
      const t = Math.min(elapsed / scrollDur, 1);
      // ease-in-out cubic
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setY(fromY + (toY - fromY) * ease);
      if (t < 1) { raf = requestAnimationFrame(scrollAnim); }
      else {
        setY(toY);
        setTimeout(() => {
          setPhase("flash");
          setTimeout(() => {
            setPhase("reset");
            setY(0);
            setTimeout(() => {
              setPhase("scrolling");
              start = null;
              fromY = 0;
              raf = requestAnimationFrame(scrollAnim);
            }, RESET_HOLD);
          }, FLASH_MS);
        }, HOLD_MS);
      }
    }

    raf = requestAnimationFrame(scrollAnim);
    return () => cancelAnimationFrame(raf);
  }, [totalPx, duration]);

  return { y, phase };
}

/* ── Domain reveal overlay (shown during "flash" phase) ── */
const DOMAIN = "mohamad-ibrahem.com";

function DomainReveal({ phase }) {
  const [chars,    setChars]    = useState(0);
  const [showCheck,setShowCheck] = useState(false);

  useEffect(() => {
    if (phase !== "flash") { setChars(0); setShowCheck(false); return; }
    let i = 0;
    const t = setInterval(() => {
      i++;
      setChars(i);
      if (i >= DOMAIN.length) {
        clearInterval(t);
        setTimeout(() => setShowCheck(true), 80);
      }
    }, 28);
    return () => clearInterval(t);
  }, [phase]);

  /* star positions — fixed so they don't re-randomize */
  const STARS = [
    { x: "12%", y: "22%", s: 14, d: 0    },
    { x: "82%", y: "18%", s: 10, d: 0.1  },
    { x: "6%",  y: "68%", s: 12, d: 0.2  },
    { x: "90%", y: "72%", s: 10, d: 0.15 },
    { x: "50%", y: "10%", s: 8,  d: 0.05 },
    { x: "48%", y: "88%", s: 9,  d: 0.25 },
    { x: "25%", y: "80%", s: 7,  d: 0.3  },
    { x: "74%", y: "82%", s: 8,  d: 0.1  },
    { x: "18%", y: "42%", s: 6,  d: 0.2  },
    { x: "80%", y: "44%", s: 6,  d: 0.35 },
  ];

  return (
    <AnimatePresence>
      {phase === "flash" && (
        <motion.div
          key="domain-reveal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "absolute", inset: 0, zIndex: 20,
            background: "radial-gradient(ellipse at center, rgba(8,8,8,0.97) 0%, rgba(3,3,3,0.99) 100%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 18, pointerEvents: "none",
          }}
        >
          {/* Stars */}
          {STARS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1], scale: [0, 1.2, 0.9, 1] }}
              transition={{ delay: s.d, duration: 0.5 }}
              style={{
                position: "absolute", left: s.x, top: s.y,
                fontSize: s.s, color: "#FFD700",
                textShadow: "0 0 8px #FFD700",
                lineHeight: 1,
              }}
            >
              ★
            </motion.div>
          ))}

          {/* Domain text — chars appear one by one */}
          <div style={{
            fontFamily: "monospace", fontSize: "clamp(0.85rem, 3vw, 1.35rem)",
            letterSpacing: "0.12em", color: "#FFD700",
            textShadow: "0 0 24px rgba(255,215,0,0.55)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span>
              {DOMAIN.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={i < chars ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>

            {/* Checkmark */}
            <AnimatePresence>
              {showCheck && (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: [0, 1.4, 1], rotate: [- 30, 10, 0] }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 18 }}
                  style={{
                    width: 28, height: 28,
                    borderRadius: "50%",
                    background: "rgba(74,222,128,0.15)",
                    border: "2px solid #4ade80",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#4ade80", fontSize: "0.85rem",
                    boxShadow: "0 0 14px rgba(74,222,128,0.4)",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          {showCheck && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: "monospace", fontSize: "clamp(0.5rem, 1.5vw, 0.65rem)",
                letterSpacing: "0.18em", color: "rgba(255,215,0,0.4)",
              }}
            >
              FULL STACK DEVELOPER · AVAILABLE FOR HIRE
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Shared iframe content ── */
function ScreenContent({ loaded, error, setLoaded, setError, scrollY, phase, ifw, ifh, scale }) {
  return (
    <>
      {/* Loading */}
      {!loaded && !error && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 14,
          background: "#050505",
        }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ width: 32, height: 32, border: "2.5px solid rgba(255,215,0,0.12)", borderTopColor: "#FFD700", borderRadius: "50%" }}
          />
          <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(255,215,0,0.4)", letterSpacing: "0.12em" }}>
            LOADING LIVE PREVIEW...
          </span>
          <motion.div
            initial={{ width: 0 }} animate={{ width: "55%" }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            style={{ height: 2, background: "#FFD700", borderRadius: 1, maxWidth: 180 }}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 12,
          background: "#050505", padding: 20, textAlign: "center",
        }}>
          <Monitor size={36} style={{ color: "rgba(255,215,0,0.25)" }} />
          <p style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "rgba(255,215,0,0.4)", lineHeight: 1.8 }}>
            Preview blocked by browser security.<br />
            <a href={SITE_URL} target="_blank" rel="noreferrer" style={{ color: "#FFD700", textDecoration: "underline" }}>
              Open {DISPLAY_URL} →
            </a>
          </p>
        </div>
      )}

      {/* iframe */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }}>
        <div style={{ transform: `translateY(${scrollY}px)` }}>
          <iframe
            src={SITE_URL}
            title="Live Portfolio"
            scrolling="no"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            style={{
              width: ifw, height: ifh,
              border: "none", display: "block",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              pointerEvents: "none",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          />
        </div>
      </div>

      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5,
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)",
      }} />
      {/* Vignette */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5, boxShadow: "inset 0 0 50px rgba(0,0,0,0.45)" }} />

      {/* Domain reveal on loop end */}
      <DomainReveal phase={phase} />

      {/* LIVE badge */}
      <div style={{
        position: "absolute", top: 10, left: 10, zIndex: 8,
        display: "flex", alignItems: "center", gap: 5,
        fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.1em", color: "#4ade80",
        background: "rgba(0,0,0,0.82)", border: "1px solid rgba(74,222,128,0.3)",
        padding: "2px 8px", borderRadius: 2,
      }}>
        <motion.span
          animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
          style={{ width: 4, height: 4, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 5px #4ade80" }}
        />
        LIVE
      </div>

      {/* Corner brackets */}
      {[
        { top: 8, left: 8,   borderTop: "1.5px solid #FFD700", borderLeft: "1.5px solid #FFD700" },
        { top: 8, right: 8,  borderTop: "1.5px solid #FFD700", borderRight: "1.5px solid #FFD700" },
        { bottom: 8, left: 8,  borderBottom: "1.5px solid #FFD700", borderLeft: "1.5px solid #FFD700" },
        { bottom: 8, right: 8, borderBottom: "1.5px solid #FFD700", borderRight: "1.5px solid #FFD700" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 14, height: 14, zIndex: 6, pointerEvents: "none", ...s }} />
      ))}
    </>
  );
}

/* ══════════════════════════════════════
   DESKTOP — Monitor frame
══════════════════════════════════════ */
function DesktopMonitor({ loaded, error, setLoaded, setError }) {
  const IFW = MON_W / SCALE;
  const IFH = 12000;
  const SCROLL_TOTAL = IFH - MON_H / SCALE;
  const { y, phase } = useScrollCycle(SCROLL_TOTAL, 26);

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Glow behind monitor */}
      <div style={{
        position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)",
        width: "75%", height: "65%",
        background: "radial-gradient(ellipse, rgba(255,215,0,0.09) 0%, transparent 70%)",
        filter: "blur(20px)", pointerEvents: "none",
      }} />

      {/* Frame */}
      <div className="w-full mx-auto" style={{
        maxWidth: MON_W,
        background: "rgba(6,6,6,0.98)",
        border: "2px solid rgba(255,215,0,0.5)",
        borderRadius: "12px 12px 5px 5px",
        boxShadow: "0 0 0 1px rgba(255,215,0,0.07), 0 0 60px rgba(255,215,0,0.13), 0 0 120px rgba(255,215,0,0.05), inset 0 0 40px rgba(0,0,0,0.7)",
        overflow: "hidden",
      }}>
        {/* Top bar */}
        <div style={{
          padding: "9px 14px", borderBottom: "1px solid rgba(255,215,0,0.14)",
          background: "rgba(255,215,0,0.03)", display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ display: "flex", gap: 5 }}>
            {["#f87171","#fbbf24","#4ade80"].map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.85 }} />
            ))}
          </div>
          {/* Address bar */}
          <div style={{
            flex: 1, display: "flex", alignItems: "center", gap: 7,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,215,0,0.18)",
            borderRadius: 5, padding: "5px 12px", maxWidth: 460, margin: "0 auto",
          }}>
            <Globe size={10} style={{ color: "#4ade80", flexShrink: 0 }} />
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#4ade80", flex: 1 }}>
              {DISPLAY_URL}
            </span>
            <motion.div animate={{ rotate: loaded ? 0 : 360 }} transition={{ duration: 1, repeat: loaded ? 0 : Infinity, ease: "linear" }}>
              <RefreshCw size={10} style={{ color: "rgba(255,215,0,0.35)" }} />
            </motion.div>
          </div>
          <a href={SITE_URL} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", gap: 4,
            fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(255,215,0,0.5)",
            background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.18)",
            padding: "4px 10px", borderRadius: 4, textDecoration: "none", flexShrink: 0, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "#FFD700"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,215,0,0.5)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.18)"; }}
          >
            <ExternalLink size={9} /> OPEN
          </a>
        </div>

        {/* Screen */}
        <div style={{ position: "relative", width: "100%", paddingTop: `${(MON_H / MON_W) * 100}%` }}>
          <div style={{ position: "absolute", inset: 0, background: "#050505", overflow: "hidden" }}>
            <ScreenContent
              loaded={loaded} error={error} setLoaded={setLoaded} setError={setError}
              scrollY={y} phase={phase}
              ifw={IFW} ifh={IFH} scale={SCALE}
            />
          </div>
        </div>
      </div>

      {/* Stand */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 70, height: 24,
          background: "linear-gradient(to bottom, rgba(255,215,0,0.22), rgba(255,215,0,0.06))",
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        }} />
        <div style={{ width: 140, height: 7, background: "rgba(255,215,0,0.11)", borderRadius: 4 }} />
      </div>
      {/* Reflection */}
      <div className="w-full mx-auto" style={{
        maxWidth: MON_W * 0.8, height: 28, marginTop: 2,
        background: "linear-gradient(to bottom, rgba(255,215,0,0.04), transparent)",
        filter: "blur(5px)", borderRadius: "0 0 50% 50%",
      }} />
    </motion.div>
  );
}

/* ══════════════════════════════════════
   MOBILE — Phone frame
══════════════════════════════════════ */
function MobilePhone({ loaded, error, setLoaded, setError }) {
  const PH_SCALE = 0.38;
  const IFW = PHN_W / PH_SCALE;
  const IFH = 12000;
  const SCROLL_TOTAL = IFH - PHN_H / PH_SCALE;
  const { y, phase } = useScrollCycle(SCROLL_TOTAL, 24);

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
        width: 260, height: 380,
        background: "radial-gradient(ellipse, rgba(255,215,0,0.1) 0%, transparent 70%)",
        filter: "blur(18px)", pointerEvents: "none",
      }} />

      {/* Phone outer shell */}
      <div style={{
        width: PHN_W + 16,
        background: "linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 100%)",
        border: "2px solid rgba(255,215,0,0.5)",
        borderRadius: 34,
        padding: "14px 8px",
        boxShadow: "0 0 50px rgba(255,215,0,0.13), 0 0 100px rgba(255,215,0,0.05), inset 0 0 20px rgba(0,0,0,0.6)",
        position: "relative",
      }}>
        {/* Earpiece */}
        <div style={{
          width: 50, height: 5, background: "rgba(255,215,0,0.15)",
          borderRadius: 3, margin: "0 auto 10px",
        }} />
        {/* Camera dot */}
        <div style={{
          position: "absolute", top: 17, right: 22,
          width: 8, height: 8, borderRadius: "50%",
          background: "rgba(255,215,0,0.2)", border: "1px solid rgba(255,215,0,0.3)",
        }} />

        {/* Screen notch cutout area */}
        <div style={{
          width: PHN_W,
          height: PHN_H,
          borderRadius: 20,
          overflow: "hidden",
          background: "#050505",
          position: "relative",
          border: "1px solid rgba(255,215,0,0.2)",
        }}>
          {/* Status bar */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "5px 12px",
            background: "rgba(0,0,0,0.9)",
            borderBottom: "1px solid rgba(255,215,0,0.1)",
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 9,
          }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.45rem", color: "rgba(255,215,0,0.5)" }}>9:41</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <Globe size={7} style={{ color: "#4ade80" }} />
              <span style={{ fontFamily: "monospace", fontSize: "0.42rem", color: "#4ade80" }}>{DISPLAY_URL}</span>
            </div>
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {[3,4,5,6].map((h,i) => (
                <div key={i} style={{ width: 2.5, height: h, background: `rgba(255,215,0,${0.3+i*0.15})`, borderRadius: 1 }} />
              ))}
            </div>
          </div>

          {/* Screen content */}
          <div style={{ position: "absolute", inset: 0, paddingTop: 22, overflow: "hidden" }}>
            <ScreenContent
              loaded={loaded} error={error} setLoaded={setLoaded} setError={setError}
              scrollY={y} phase={phase}
              ifw={IFW} ifh={IFH} scale={PH_SCALE}
            />
          </div>
        </div>

        {/* Home button */}
        <div style={{
          width: 36, height: 5, background: "rgba(255,215,0,0.12)",
          borderRadius: 3, margin: "10px auto 0",
          border: "1px solid rgba(255,215,0,0.2)",
        }} />
      </div>

      {/* Phone stand shadow */}
      <div style={{
        width: 80, height: 12, marginTop: 8,
        background: "radial-gradient(ellipse, rgba(255,215,0,0.08) 0%, transparent 70%)",
        filter: "blur(4px)",
      }} />

      {/* Open link */}
      <a href={SITE_URL} target="_blank" rel="noreferrer" style={{
        marginTop: 16,
        display: "flex", alignItems: "center", gap: 6,
        fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.1em",
        color: "rgba(255,215,0,0.6)", textDecoration: "none",
        border: "1px solid rgba(255,215,0,0.2)", padding: "6px 14px", borderRadius: 3,
        transition: "all 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.color = "#FFD700"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,215,0,0.6)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.2)"; }}
      >
        <ExternalLink size={11} /> OPEN SITE
      </a>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function LiveSitePreview() {
  const [loaded,   setLoaded]   = useState(false);
  const [error,    setError]    = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="pb-20 pt-4"
      style={{ borderBottom: "1px solid rgba(255,215,0,0.1)", position: "relative", overflow: "hidden" }}
    >
      {/* BG */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
          width: "70%", height: "70%",
          background: "radial-gradient(ellipse, rgba(255,215,0,0.055) 0%, transparent 70%)",
        }} />
        {[12, 48, 84].map((t, i) => (
          <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${t}%`, height: 1, background: `rgba(255,215,0,${0.018 + i * 0.008})` }} />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="my-16 text-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(255,215,0,0.5)" }}>// live_preview</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 font-mono" style={{ color: "#FFD700" }}>
          LIVE<span style={{ color: "rgba(255,255,255,0.2)" }}>.site_preview</span>
        </h2>
        <p className="mt-3 font-mono text-xs tracking-widest" style={{ color: "rgba(255,215,0,0.35)" }}>
          [ SCROLLING THROUGH THE REAL PORTFOLIO — LIVE ]
        </p>
      </motion.div>

      {/* Device — monitor on md+, phone on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Desktop monitor — hidden on small screens */}
        <div className="hidden sm:block">
          <DesktopMonitor
            loaded={loaded} error={error}
            setLoaded={setLoaded} setError={setError}
          />
        </div>

        {/* Mobile phone — shown on small screens only */}
        <div className="flex justify-center sm:hidden">
          <MobilePhone
            loaded={loaded} error={error}
            setLoaded={setLoaded} setError={setError}
          />
        </div>
      </motion.div>
    </section>
  );
}

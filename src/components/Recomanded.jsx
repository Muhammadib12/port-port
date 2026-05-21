import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Download, Maximize2, X } from "lucide-react";
import RecomandationPDF from "../assets/pdfs/Recomandation.pdf";

function DocIcon() {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
      style={{ position: "relative", width: 72, height: 88, margin: "0 auto" }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", inset: -12,
        background: "radial-gradient(circle, rgba(255,215,0,0.18) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(8px)",
      }} />

      {/* Document SVG */}
      <svg viewBox="0 0 72 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}>
        {/* Shadow */}
        <rect x="6" y="6" width="60" height="80" rx="4" fill="rgba(255,215,0,0.06)" />
        {/* Page body */}
        <rect x="2" y="2" width="60" height="80" rx="4" fill="rgba(10,10,10,0.95)" stroke="rgba(255,215,0,0.5)" strokeWidth="1.5" />
        {/* Folded corner */}
        <path d="M44 2 L62 18 L44 18 Z" fill="rgba(255,215,0,0.15)" stroke="rgba(255,215,0,0.5)" strokeWidth="1" />
        <path d="M44 2 L62 18" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />

        {/* Seal circle */}
        <circle cx="31" cy="28" r="12" stroke="rgba(255,215,0,0.5)" strokeWidth="1" fill="rgba(255,215,0,0.04)" />
        <circle cx="31" cy="28" r="8" stroke="rgba(255,215,0,0.3)" strokeWidth="0.8" fill="none" />
        {/* Star inside seal */}
        <path d="M31 21 L32.4 25.8 L37 25.8 L33.3 28.6 L34.7 33.4 L31 30.6 L27.3 33.4 L28.7 28.6 L25 25.8 L29.6 25.8 Z"
          fill="rgba(255,215,0,0.55)" />

        {/* Text lines */}
        <rect x="10" y="46" width="44" height="2" rx="1" fill="rgba(255,215,0,0.35)" />
        <rect x="10" y="52" width="38" height="1.5" rx="1" fill="rgba(255,215,0,0.2)" />
        <rect x="10" y="57" width="42" height="1.5" rx="1" fill="rgba(255,215,0,0.2)" />
        <rect x="10" y="62" width="34" height="1.5" rx="1" fill="rgba(255,215,0,0.15)" />
        <rect x="10" y="67" width="40" height="1.5" rx="1" fill="rgba(255,215,0,0.15)" />

        {/* Signature line */}
        <rect x="10" y="75" width="28" height="1" rx="0.5" fill="rgba(255,215,0,0.3)" />
        <rect x="42" y="75" width="18" height="1" rx="0.5" fill="rgba(255,215,0,0.2)" />
      </svg>

      {/* PDF badge */}
      <div style={{
        position: "absolute", bottom: -6, right: -8,
        background: "linear-gradient(135deg, #b45309, #FFD700)",
        color: "#000",
        fontFamily: "monospace",
        fontSize: "0.55rem",
        fontWeight: "bold",
        padding: "2px 6px",
        borderRadius: 2,
        letterSpacing: "0.1em",
        boxShadow: "0 0 10px rgba(255,215,0,0.4)",
        zIndex: 2,
      }}>
        PDF
      </div>
    </motion.div>
  );
}

function Recomanded() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="pb-16 pt-4 relative overflow-hidden" style={{ borderBottom: "1px solid rgba(255,215,0,0.1)" }}>

      {/* ── Decorative document background ── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>

        {/* Parchment base */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,215,0,0.04) 0%, transparent 70%)",
        }} />

        {/* Horizontal text lines (document feel) */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: "10%", right: "10%",
            top: `${18 + i * 5}%`,
            height: 1,
            background: `rgba(255,215,0,${i % 3 === 0 ? 0.07 : 0.03})`,
            borderRadius: 1,
          }} />
        ))}

        {/* Big faint seal — center */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 260, height: 260,
          borderRadius: "50%",
          border: "2px solid rgba(255,215,0,0.06)",
          boxShadow: "0 0 0 10px rgba(255,215,0,0.025), 0 0 0 22px rgba(255,215,0,0.015)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Inner circle */}
          <div style={{
            width: 180, height: 180, borderRadius: "50%",
            border: "1px solid rgba(255,215,0,0.05)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* Star burst lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                width: 90, height: 1,
                background: "rgba(255,215,0,0.05)",
                transformOrigin: "left center",
                transform: `rotate(${i * 30}deg)`,
                left: "50%", top: "50%",
              }} />
            ))}
            {/* Center emblem text */}
            <div style={{
              fontFamily: "monospace", textAlign: "center", zIndex: 1,
              color: "rgba(255,215,0,0.07)", lineHeight: 1.4, userSelect: "none",
            }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em" }}>OFFICIAL</div>
              <div style={{ fontSize: "0.9rem", fontWeight: "bold", letterSpacing: "0.2em" }}>✦</div>
              <div style={{ fontSize: "0.55rem", letterSpacing: "0.25em" }}>RECOMMENDATION</div>
            </div>
          </div>
        </div>

        {/* Top-left corner ornament */}
        <div style={{ position: "absolute", top: 24, left: 40 }}>
          <div style={{ width: 50, height: 50, border: "1px solid rgba(255,215,0,0.08)", borderRadius: "50%", position: "relative" }}>
            <div style={{ position: "absolute", inset: 6, border: "1px solid rgba(255,215,0,0.05)", borderRadius: "50%" }} />
          </div>
        </div>
        {/* Top-right corner ornament */}
        <div style={{ position: "absolute", top: 24, right: 40 }}>
          <div style={{ width: 50, height: 50, border: "1px solid rgba(255,215,0,0.08)", borderRadius: "50%", position: "relative" }}>
            <div style={{ position: "absolute", inset: 6, border: "1px solid rgba(255,215,0,0.05)", borderRadius: "50%" }} />
          </div>
        </div>

        {/* Signature line — bottom center */}
        <div style={{ position: "absolute", bottom: "14%", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{ width: 120, height: 1, background: "rgba(255,215,0,0.08)", margin: "0 auto" }} />
          <div style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "rgba(255,215,0,0.06)", letterSpacing: "0.25em", marginTop: 4 }}>
            SIGNATURE
          </div>
        </div>

        {/* Side gradient fades */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(5,5,5,0.8) 0%, transparent 25%, transparent 75%, rgba(5,5,5,0.8) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.6) 100%)",
        }} />
      </div>

      {/* All real content sits above z:1 */}
      <div style={{ position: "relative", zIndex: 1 }}>

      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.7 }}
        className="my-16 text-center"
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(255,215,0,0.5)" }}>
          // document
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 font-mono" style={{ color: "#FFD700" }}>
          RECOMMENDATION<span style={{ color: "rgba(255,255,255,0.2)" }}>.pdf</span>
        </h2>
      </motion.div>

      {/* Doc icon */}
      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-10"
      >
        <DocIcon />
      </motion.div>

      {/* PDF Viewer Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto"
        style={{ maxWidth: 720 }}
      >
        {/* Card frame */}
        <div
          style={{
            background: "rgba(6,6,6,0.97)",
            border: "1px solid rgba(255,215,0,0.3)",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(255,215,0,0.06), 0 0 80px rgba(255,215,0,0.03)",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: "1px solid rgba(255,215,0,0.12)",
              background: "rgba(255,215,0,0.03)",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {["#f87171", "#fbbf24", "#4ade80"].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
              ))}
            </div>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(255,215,0,0.55)", letterSpacing: "0.12em" }}>
              RECOMMENDATION — FRONTEND POSITION
            </span>
            <button
              onClick={() => setFullscreen(true)}
              title="Fullscreen"
              style={{
                background: "none",
                border: "1px solid rgba(255,215,0,0.25)",
                color: "rgba(255,215,0,0.6)",
                padding: "3px 6px",
                cursor: "pointer",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#FFD700"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,215,0,0.6)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.25)"; }}
            >
              <Maximize2 size={13} />
            </button>
          </div>

          {/* Embedded PDF — clickable to open */}
          <a
            href={RecomandationPDF}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", cursor: "pointer", position: "relative" }}
          >
            <iframe
              src={`${RecomandationPDF}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              title="Recommendation Letter"
              style={{
                width: "100%",
                height: 520,
                border: "none",
                display: "block",
                pointerEvents: "none",
              }}
            />
            {/* Click overlay hint */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
            >
              <div
                style={{
                  background: "rgba(0,0,0,0.75)",
                  border: "1px solid rgba(255,215,0,0.5)",
                  color: "#FFD700",
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  padding: "10px 20px",
                  letterSpacing: "0.1em",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ExternalLink size={14} /> OPEN FULL DOCUMENT
              </div>
            </div>
          </a>

          {/* Bottom action bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderTop: "1px solid rgba(255,215,0,0.1)",
              background: "rgba(255,215,0,0.02)",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(255,215,0,0.35)" }}>
              Recomandation.pdf
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              <a
                href={RecomandationPDF}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "monospace",
                  fontSize: "0.72rem",
                  color: "#FFD700",
                  border: "1px solid rgba(255,215,0,0.45)",
                  padding: "5px 14px",
                  background: "rgba(255,215,0,0.05)",
                  textDecoration: "none",
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,215,0,0.15)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(255,215,0,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,215,0,0.05)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <ExternalLink size={13} /> Open
              </a>
              <a
                href={RecomandationPDF}
                download="Recomandation.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "monospace",
                  fontSize: "0.72rem",
                  color: "rgba(200,200,200,0.75)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "5px 14px",
                  background: "rgba(255,255,255,0.03)",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
              >
                <Download size={13} /> Download
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen modal */}
      {fullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Modal top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px",
              borderBottom: "1px solid rgba(255,215,0,0.2)",
              background: "rgba(6,6,6,0.98)",
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(255,215,0,0.6)", letterSpacing: "0.12em" }}>
              RECOMMENDATION — FRONTEND POSITION
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              <a
                href={RecomandationPDF}
                download="Recomandation.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  color: "rgba(200,200,200,0.7)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "4px 12px",
                  background: "rgba(255,255,255,0.04)",
                  textDecoration: "none",
                }}
              >
                <Download size={12} /> Download
              </a>
              <button
                onClick={() => setFullscreen(false)}
                style={{
                  background: "rgba(248,113,113,0.1)",
                  border: "1px solid rgba(248,113,113,0.4)",
                  color: "#f87171",
                  padding: "4px 10px",
                  cursor: "pointer",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                }}
              >
                <X size={13} /> Close
              </button>
            </div>
          </div>
          {/* Full PDF */}
          <iframe
            src={`${RecomandationPDF}#toolbar=1&view=FitH`}
            title="Recommendation Letter Fullscreen"
            style={{ flex: 1, border: "none", width: "100%" }}
          />
        </motion.div>
      )}

      </div> {/* end content z:1 */}
    </div>
  );
}

export default Recomanded;

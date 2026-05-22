import React, { useState } from "react";
import { PROJECTS } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Star, X, ChevronLeft, ChevronRight } from "lucide-react";

const BEST_IDS = [18, 17, 16, 15, 14];
const best = BEST_IDS.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean);

/* ── Modal overlay for full detail ── */
function ProjectModal({ project, onClose, onPrev, onNext, index, total }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(0,0,0,0.88)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px",
        }}
      >
        <motion.div
          key="card"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "rgba(8,8,8,0.99)",
            border: "1px solid rgba(255,215,0,0.35)",
            borderRadius: 12,
            maxWidth: 680,
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
            boxShadow: "0 0 60px rgba(255,215,0,0.12)",
          }}
        >
          {/* Corner brackets */}
          {[
            { top: -1, left: -1, borderTop: "2px solid #FFD700", borderLeft: "2px solid #FFD700" },
            { top: -1, right: -1, borderTop: "2px solid #FFD700", borderRight: "2px solid #FFD700" },
            { bottom: -1, left: -1, borderBottom: "2px solid #FFD700", borderLeft: "2px solid #FFD700" },
            { bottom: -1, right: -1, borderBottom: "2px solid #FFD700", borderRight: "2px solid #FFD700" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: 18, height: 18, zIndex: 2, ...s }} />
          ))}

          {/* Top bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 16px",
            borderBottom: "1px solid rgba(255,215,0,0.1)",
            background: "rgba(255,215,0,0.025)",
          }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["#f87171","#fbbf24","#4ade80"].map((c, i) => (
                <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.8 }} />
              ))}
            </div>
            <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(255,215,0,0.45)", letterSpacing: "0.14em" }}>
              {String(index + 1).padStart(2,"0")} / {String(total).padStart(2,"0")}
            </span>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,215,0,0.5)", cursor: "pointer", lineHeight: 1 }}>
              <X size={16} />
            </button>
          </div>

          {/* Image */}
          <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
            <img src={project.image} alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(8,8,8,1) 0%, transparent 55%)",
            }} />
          </div>

          {/* Body */}
          <div style={{ padding: "20px 22px 24px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontFamily: "monospace", fontSize: "0.58rem", letterSpacing: "0.18em",
              color: "#FFD700", background: "rgba(255,215,0,0.07)",
              border: "1px solid rgba(255,215,0,0.25)", padding: "3px 10px", borderRadius: 2, marginBottom: 12,
            }}>
              <Star size={8} fill="#FFD700" /> PROUD OF THIS
            </div>

            <h3 style={{ fontFamily: "monospace", fontWeight: "bold", fontSize: "1.1rem", color: "#FFD700", marginBottom: 12, lineHeight: 1.35 }}>
              {project.title}
            </h3>
            <p style={{ fontSize: "0.8rem", color: "rgba(215,215,215,0.78)", lineHeight: 1.8, marginBottom: 18 }}>
              {project.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
              {project.technologies.map((tech, j) => (
                <span key={j} style={{
                  fontFamily: "monospace", fontSize: "0.62rem",
                  padding: "3px 9px",
                  border: "1px solid rgba(255,215,0,0.22)",
                  color: "rgba(255,215,0,0.75)",
                  background: "rgba(255,215,0,0.04)",
                }}>{tech}</span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              {project.url && project.url !== "home" && (
                <a href={project.url} target="_blank" rel="noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    fontFamily: "monospace", fontSize: "0.72rem", letterSpacing: "0.1em",
                    color: "#000", background: "#FFD700", padding: "9px 20px",
                    textDecoration: "none", fontWeight: "bold",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.boxShadow = "0 0 20px rgba(255,215,0,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <ExternalLink size={13} /> VISIT SITE
                </a>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={onPrev} style={{
                  display: "flex", alignItems: "center", gap: 4,
                  fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(255,215,0,0.6)",
                  background: "none", border: "1px solid rgba(255,215,0,0.2)",
                  padding: "7px 12px", cursor: "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,215,0,0.5)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,215,0,0.2)"}
                >
                  <ChevronLeft size={13} /> PREV
                </button>
                <button onClick={onNext} style={{
                  display: "flex", alignItems: "center", gap: 4,
                  fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(255,215,0,0.6)",
                  background: "none", border: "1px solid rgba(255,215,0,0.2)",
                  padding: "7px 12px", cursor: "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,215,0,0.5)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,215,0,0.2)"}
                >
                  NEXT <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Grid card (compact) ── */
function BestCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(6,6,6,0.97)",
        border: `1px solid ${hovered ? "rgba(255,215,0,0.5)" : "rgba(255,215,0,0.18)"}`,
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? "0 0 28px rgba(255,215,0,0.12)" : "none",
        height: "100%",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 160, overflow: "hidden", flexShrink: 0 }}>
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: hovered ? "brightness(0.7)" : "brightness(0.45)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(6,6,6,1) 0%, rgba(6,6,6,0.3) 55%, transparent 100%)",
        }} />
        {/* Scanlines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
        }} />
        {/* Corner brackets */}
        {[
          { top: 8, left: 8, borderTop: "1.5px solid #FFD700", borderLeft: "1.5px solid #FFD700" },
          { bottom: 8, right: 8, borderBottom: "1.5px solid #FFD700", borderRight: "1.5px solid #FFD700" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 14, height: 14, ...s }} />
        ))}
        {/* Index badge */}
        <div style={{
          position: "absolute", top: 10, right: 10,
          fontFamily: "monospace", fontSize: "0.58rem",
          color: "rgba(255,215,0,0.6)", background: "rgba(0,0,0,0.75)",
          border: "1px solid rgba(255,215,0,0.2)", padding: "2px 7px", letterSpacing: "0.1em",
        }}>
          {String(index + 1).padStart(2,"0")}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.16em",
          color: "#FFD700", background: "rgba(255,215,0,0.06)",
          border: "1px solid rgba(255,215,0,0.22)", padding: "2px 8px", borderRadius: 2,
          marginBottom: 10, width: "fit-content",
        }}>
          <Star size={7} fill="#FFD700" /> PROUD OF THIS
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "monospace", fontWeight: "bold",
          fontSize: "0.88rem", color: "#FFD700",
          marginBottom: 8, lineHeight: 1.4,
          textShadow: hovered ? "0 0 16px rgba(255,215,0,0.35)" : "none",
          transition: "text-shadow 0.3s",
        }}>
          {project.title}
        </h3>

        {/* Description — 3 lines max */}
        <p style={{
          fontSize: "0.73rem", color: "rgba(200,200,200,0.7)",
          lineHeight: 1.65, marginBottom: 12, flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {project.description}
        </p>

        {/* Tech tags — up to 4 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
          {project.technologies.slice(0, 4).map((tech, j) => (
            <span key={j} style={{
              fontFamily: "monospace", fontSize: "0.58rem",
              padding: "2px 7px",
              border: "1px solid rgba(255,215,0,0.2)",
              color: "rgba(255,215,0,0.7)",
              background: "rgba(255,215,0,0.03)",
            }}>{tech}</span>
          ))}
          {project.technologies.length > 4 && (
            <span style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "rgba(255,215,0,0.3)" }}>
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {project.url && project.url !== "home" ? (
            <a
              href={project.url} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.08em",
                color: "#000", background: "#FFD700", padding: "6px 14px",
                textDecoration: "none", fontWeight: "bold",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
            >
              <ExternalLink size={11} /> VISIT
            </a>
          ) : <div />}
          <span style={{
            fontFamily: "monospace", fontSize: "0.6rem",
            color: "rgba(255,215,0,0.35)", letterSpacing: "0.1em",
          }}>
            DETAILS →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BestProjects() {
  const [modal, setModal] = useState(null); // index in `best`

  const openModal = (i) => setModal(i);
  const closeModal = () => setModal(null);
  const prevModal = () => setModal((m) => (m - 1 + best.length) % best.length);
  const nextModal = () => setModal((m) => (m + 1) % best.length);

  return (
    <div
      id="best-projects"
      className="pb-20 pt-4"
      style={{ borderBottom: "1px solid rgba(255,215,0,0.1)" }}
    >
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="my-16 text-center"
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(255,215,0,0.5)" }}>
          // my_best
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 font-mono" style={{ color: "#FFD700" }}>
          MY BEST<span style={{ color: "rgba(255,255,255,0.2)" }}>.projects</span>
        </h2>
        <p className="mt-3 font-mono text-xs tracking-widest" style={{ color: "rgba(255,215,0,0.35)" }}>
          [ PROJECTS I'M TRULY PROUD OF — CLICK TO EXPAND ]
        </p>
      </motion.div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
          gap: "20px",
          maxWidth: 1100,
          margin: "0 auto",
          alignItems: "stretch",
        }}
      >
        {best.map((project, i) => (
          <BestCard key={project.id} project={project} index={i} onClick={() => openModal(i)} />
        ))}
      </div>

      {/* Modal */}
      {modal !== null && (
        <ProjectModal
          project={best[modal]}
          index={modal}
          total={best.length}
          onClose={closeModal}
          onPrev={prevModal}
          onNext={nextModal}
        />
      )}
    </div>
  );
}

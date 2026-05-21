import React, { useState } from "react";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";

// IDs of the best projects in display order
const BEST_IDS = [17, 16, 15, 14];

const best = BEST_IDS.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean);

function BestCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.65, delay: index * 0.12 }}
      className="relative overflow-hidden"
      style={{
        background: "rgba(6,6,6,0.97)",
        border: "1px solid rgba(255,215,0,0.2)",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated border glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 12,
          background: "transparent",
          boxShadow: "0 0 30px rgba(255,215,0,0.18), 0 0 60px rgba(255,215,0,0.07)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Image side ── */}
      <div
        className="relative overflow-hidden w-full"
        style={{ height: 220 }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            inset: 0,
            filter: hovered ? "brightness(0.65)" : "brightness(0.5)",
          }}
        />

        {/* Gradient toward bottom for mobile */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(6,6,6,0.95) 100%)",
          }}
        />

        {/* Scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
            pointerEvents: "none",
          }}
        />

        {/* Corner brackets */}
        {[
          { top: 12, left: 12, borderTop: "2px solid #FFD700", borderLeft: "2px solid #FFD700" },
          { bottom: 12, right: 12, borderBottom: "2px solid #FFD700", borderRight: "2px solid #FFD700" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 18, height: 18, ...s }} />
        ))}

        {/* Index badge */}
        <div
          style={{
            position: "absolute",
            top: 16,
            [isEven ? "left" : "right"]: 16,
            fontFamily: "monospace",
            fontSize: "0.65rem",
            color: "rgba(255,215,0,0.6)",
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,215,0,0.2)",
            padding: "3px 8px",
            letterSpacing: "0.12em",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(best.length).padStart(2, "0")}
        </div>
      </div>

      {/* ── Info side ── */}
      <div
        className="relative z-10 flex flex-col justify-center w-full"
        style={{ padding: "24px 20px" }}
      >
        {/* "PROUD OF THIS" badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            color: "#FFD700",
            background: "rgba(255,215,0,0.07)",
            border: "1px solid rgba(255,215,0,0.25)",
            padding: "3px 10px",
            borderRadius: 2,
            marginBottom: 14,
            width: "fit-content",
          }}
        >
          <Star size={9} fill="#FFD700" />
          PROUD OF THIS
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "1.15rem",
            color: "#FFD700",
            marginBottom: 12,
            lineHeight: 1.35,
            textShadow: hovered ? "0 0 20px rgba(255,215,0,0.4)" : "none",
            transition: "text-shadow 0.3s",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.8rem",
            color: "rgba(215,215,215,0.78)",
            lineHeight: 1.75,
            marginBottom: 18,
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
          {project.technologies.map((tech, j) => (
            <span
              key={j}
              style={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                padding: "3px 9px",
                border: "1px solid rgba(255,215,0,0.22)",
                color: "rgba(255,215,0,0.78)",
                background: "rgba(255,215,0,0.04)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        {project.url && project.url !== "home" && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              fontFamily: "monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              color: "#000",
              background: "#FFD700",
              padding: "9px 20px",
              width: "fit-content",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "opacity 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,215,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <ExternalLink size={14} /> VISIT SITE
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function BestProjects() {
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
        transition={{ duration: 0.7 }}
        className="my-16 text-center"
      >
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: "rgba(255,215,0,0.5)" }}
        >
          // my_best
        </span>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 font-mono"
          style={{ color: "#FFD700" }}
        >
          MY BEST
          <span style={{ color: "rgba(255,255,255,0.2)" }}>.projects</span>
        </h2>
        <p
          className="mt-3 font-mono text-xs tracking-widest"
          style={{ color: "rgba(255,215,0,0.35)" }}
        >
          [ PROJECTS I'M TRULY PROUD OF ]
        </p>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-col gap-6">
        {best.map((project, i) => (
          <BestCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

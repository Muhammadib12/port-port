import React, { useState } from "react";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

function FlipCard({ project, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="cursor-pointer"
      style={{ perspective: "1000px", width: "100%", height: "260px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── FRONT: Image ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(255,215,0,0.18)",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.75)",
            }}
          />

          {/* Overlay gradient at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "55%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
            }}
          />

          {/* Corner brackets */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              width: 16,
              height: 16,
              borderTop: "2px solid #FFD700",
              borderLeft: "2px solid #FFD700",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              width: 16,
              height: 16,
              borderBottom: "2px solid #FFD700",
              borderRight: "2px solid #FFD700",
            }}
          />

          {/* Title at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "12px 14px",
            }}
          >
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.75rem",
                color: "rgba(255,215,0,0.5)",
                marginBottom: "3px",
                letterSpacing: "0.1em",
              }}
            >
              CLICK TO VIEW
            </p>
            <h3
              style={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "0.85rem",
                color: "#FFD700",
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* ── BACK: Description ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "8px",
            background: "rgba(6,6,6,0.97)",
            border: "1px solid rgba(255,215,0,0.35)",
            padding: "18px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          {/* Top corner */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 16,
              height: 16,
              borderTop: "2px solid #FFD700",
              borderLeft: "2px solid #FFD700",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 16,
              height: 16,
              borderBottom: "2px solid #FFD700",
              borderRight: "2px solid #FFD700",
            }}
          />

          {/* Title */}
          <div>
            <h3
              style={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "0.82rem",
                color: "#FFD700",
                marginBottom: "8px",
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: "0.72rem",
                color: "rgba(210,210,210,0.8)",
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Tech tags */}
          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                marginBottom: "10px",
              }}
            >
              {project.technologies.slice(0, 4).map((tech, j) => (
                <span
                  key={j}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.62rem",
                    padding: "2px 7px",
                    border: "1px solid rgba(255,215,0,0.25)",
                    color: "rgba(255,215,0,0.8)",
                    background: "rgba(255,215,0,0.04)",
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.62rem",
                    padding: "2px 7px",
                    color: "rgba(255,215,0,0.4)",
                  }}
                >
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>

            {/* Link */}
            {project.url && project.url !== "home" && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: "monospace",
                  fontSize: "0.68rem",
                  color: "#FFD700",
                  border: "1px solid rgba(255,215,0,0.4)",
                  padding: "4px 10px",
                  background: "rgba(255,215,0,0.06)",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,215,0,0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,215,0,0.06)")
                }
              >
                <ExternalLink size={11} />
                VISIT SITE
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectsShowcase() {
  return (
    <div
      className="pb-16 pt-4"
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
          // section_03
        </span>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 font-mono"
          style={{ color: "#FFD700" }}
        >
          PROJECTS
          <span style={{ color: "rgba(255,255,255,0.2)" }}>
            .showcase({PROJECTS.length})
          </span>
        </h2>
        <p
          className="mt-3 font-mono text-xs tracking-widest"
          style={{ color: "rgba(255,215,0,0.35)" }}
        >
          [ CLICK ANY CARD TO FLIP ]
        </p>
      </motion.div>

      {/* Grid */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
        }}
      >
        {PROJECTS.map((project, i) => (
          <FlipCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsShowcase;

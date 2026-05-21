import React, { useState, useEffect } from "react";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";
import axios from "axios";

axios.defaults.baseURL = "https://backtoport-1.onrender.com";

const formatLikes = (n) => {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
};

function Projects() {
  const [likedProjects, setLikedProjects] = useState([]);
  const [likesMap, setLikesMap] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedProjects")) || [];
    setLikedProjects(stored);

    const fetchLikes = async () => {
      try {
        const res = await axios.get("/api/projects/like");
        const likeData = {};
        res.data.forEach((item) => { likeData[item.projectId] = item.likes; });
        setLikesMap(likeData);
      } catch {}
    };
    fetchLikes();
  }, []);

  const handleLike = async (projectId) => {
    const isLiked = likedProjects.includes(projectId);
    const updated = isLiked
      ? likedProjects.filter((id) => id !== projectId)
      : [...likedProjects, projectId];

    setLikedProjects(updated);
    localStorage.setItem("likedProjects", JSON.stringify(updated));

    try {
      await axios.post("/api/projects/like", { projectId, action: isLiked ? "unlike" : "like" });
      setLikesMap((prev) => ({ ...prev, [projectId]: (prev[projectId] || 0) + (isLiked ? -1 : 1) }));
    } catch {
      setLikedProjects(likedProjects);
    }
  };

  return (
    <div className="pb-16" style={{ borderBottom: '1px solid rgba(255,215,0,0.1)' }}>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.7 }}
        className="my-16 text-center"
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(255,215,0,0.5)' }}>// section_03</span>
        <h2 className="text-4xl font-bold mt-2 font-mono" style={{ color: '#FFD700' }}>
          PROJECTS<span style={{ color: 'rgba(255,255,255,0.2)' }}>({PROJECTS.length})</span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="cyber-card rounded-lg flex flex-wrap lg:flex-nowrap gap-6 p-6"
          >
            {/* Image */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <a
                href={project.url !== "home" ? project.url : undefined}
                onClick={project.url === "home" ? (e) => { e.preventDefault(); document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }); } : undefined}
                target={project.url !== "home" ? "_blank" : undefined}
                rel="noreferrer"
                className="block relative group"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded object-cover w-40 h-28 transition-all duration-300 group-hover:brightness-110"
                  style={{ border: '1px solid rgba(255,215,0,0.15)' }}
                />
                <div className="absolute inset-0 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <ExternalLink size={20} style={{ color: '#FFD700' }} />
                </div>
              </a>

              {/* Like */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleLike(project.id)}
                  className="focus:outline-none"
                >
                  <Heart
                    size={18}
                    className="transition-all duration-300"
                    style={likedProjects.includes(project.id) ? { color: '#f87171', fill: '#f87171' } : { color: 'rgba(255,215,0,0.4)' }}
                  />
                </motion.button>
                <span className="font-mono text-xs" style={{ color: 'rgba(255,215,0,0.6)' }}>
                  {formatLikes(likesMap[project.id] || 0)}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-mono font-bold text-lg mb-2" style={{ color: '#FFD700' }}>
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(200,200,200,0.7)' }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, j) => (
                  <span
                    key={j}
                    className="px-2 py-0.5 font-mono text-xs"
                    style={{
                      border: '1px solid rgba(255,215,0,0.25)',
                      color: 'rgba(255,215,0,0.8)',
                      background: 'rgba(255,215,0,0.04)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

export default Projects;

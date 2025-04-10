import React, { useState, useEffect } from "react";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import axios from "axios";

axios.defaults.baseURL = "https://backtoport-1.onrender.com";

const formatLikes = (number) => {
  if (number >= 1e6) return (number / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (number >= 1e3) return (number / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return number.toString();
};

function Projects() {
  const [likedProjects, setLikedProjects] = useState([]);
  const [likesMap, setLikesMap] = useState({});

  useEffect(() => {
    // تحميل المشاريع المعجبة من localStorage
    const storedLikes = JSON.parse(localStorage.getItem("likedProjects")) || [];
    setLikedProjects(storedLikes);

    // جلب عدد الإعجابات من الخادم
    const fetchLikes = async () => {
      try {
        const res = await axios.get("/api/projects/like");
        const likeData = {};
        res.data.forEach((item) => {
          likeData[item.projectId] = item.likes;
        });
        setLikesMap(likeData);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, []);

  const handleLike = async (projectId) => {
    const isLiked = likedProjects.includes(projectId);
    const updatedLikes = isLiked
      ? likedProjects.filter((id) => id !== projectId)
      : [...likedProjects, projectId];

    setLikedProjects(updatedLikes);
    localStorage.setItem("likedProjects", JSON.stringify(updatedLikes));

    try {
      await axios.post("/api/projects/like", {
        projectId,
        action: isLiked ? "unlike" : "like",
      });

      setLikesMap((prev) => ({
        ...prev,
        [projectId]: (prev[projectId] || 0) + (isLiked ? -1 : 1),
      }));
    } catch (error) {
      console.error("Failed to update like:", error);
      // استعادة الحالة السابقة في حالة الخطأ
      setLikedProjects(likedProjects);
    }
  };

  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="text-center my-20 text-4xl text-neutral-400"
      >
        Projects {`(${PROJECTS.length})`}
      </motion.h2>

      <div>
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="flex flex-wrap mb-8 lg:justify-center"
          >
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.5 }}
              className="w-full lg:w-1/4 relative"
            >
              <a
                href={project.url !== "home" ? project.url : undefined}
                onClick={
                  project.url === "home"
                    ? (e) => {
                        e.preventDefault();
                        document
                          .getElementById("home")
                          .scrollIntoView({ behavior: "smooth" });
                      }
                    : undefined
                }
                target={project.url !== "home" ? "_blank" : undefined}
                rel="noreferrer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  height={150}
                  width={150}
                  className="mb-6 rounded object-contain h-30 w-40 md:hover:scale-110 transition ease-in-out duration-200 cursor-pointer"
                />
              </a>

              <div className="flex items-center gap-2 mb-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLike(project.id)}
                  className="focus:outline-none"
                >
                  <Heart
                    size={20}
                    className={`transition-all duration-300 ${
                      likedProjects.includes(project.id)
                        ? "text-red-500 fill-red-500"
                        : "text-neutral-400"
                    }`}
                  />
                </motion.button>
                <span className="text-neutral-400">
                  {formatLikes(likesMap[project.id] || 0)}
                </span>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1.5 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h6 className="mb-2 font-semibold">{project.title}</h6>
              <p className="mb-4 text-neutral-400">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, j) => (
                  <span
                    key={j}
                    className="py-1 px-2 bg-neutral-800 rounded text-sm text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

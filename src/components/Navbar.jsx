import React from "react";
import MuhammadLogo from "../assets/MuhammadLogo.webp";
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import SmallIcon from "./SmallIcon";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});
function Navbar() {
  return (
    <motion.nav
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="mb-20  flex items-center justify-between py-10"
    >
      <div id="home" className="flex  flex-shrink-0 items-center">
        <img
          src={MuhammadLogo}
          className="h-15 w-15 mx-2 filter brightness-70 border-none rounded-full  transform transition-transform duration-500 hover:rotate-360"
          alt="Logo"
        />
      </div>

      {/* Icons */}
      <div className="flex space-x-4 gap-4  text-2xl">
      

        <a
          href="https://www.linkedin.com/in/muhammad-ibrahem-0b22002a3/"
          target="_blank"
        >
          <FaLinkedin className="text-blue-400 cursor-pointer hover:-translate-y-1 transition-transform duration-300" />
        </a>
        <a href="https://github.com/Muhammadib12" target="_blank">
          <FaGithub className="cursor-pointer hover:translate-y-1 transition-transform duration-300" />
        </a>
        <a
          href="https://www.instagram.com/muhammadibra403/profilecard/?igsh=YXRoNXg1ZXM3d3gz"
          target="_blank"
        >
          <FaInstagram className="text-orange-600 cursor-pointer hover:-translate-y-1 transition-transform duration-300" />
        </a>
        <a
          href="https://www.alljobs.co.il/user/profile/full-profile"
          target="_blank"
          className=" cursor-pointer hover:translate-y-1 transition-transform duration-300"
        >
          <SmallIcon />
        </a>
      </div>
    </motion.nav>
  );
}

export default Navbar;

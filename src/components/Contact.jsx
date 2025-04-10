import React from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import SmallIcon from "./SmallIcon";
import { motion } from "framer-motion";

function Contact() {
  return (
    <>
      <div className="flex space-x-4 gap-4  text-2xl p-5  items-center justify-center">
        <a
          href="https://api.whatsapp.com/send?phone=972506567035&text= שלום מוחמד
  "
          target="_blank"
        >
          <FaWhatsapp className="text-green-400 cursor-pointer hover:-translate-y-1 transition-transform duration-300" />
        </a>

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
    </>
  );
}

export default Contact;

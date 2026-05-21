import React from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const links = [
  { href: "https://wa.me/972506567035", icon: <FaWhatsapp />, color: '#4ade80', label: 'WhatsApp' },
  { href: "https://www.linkedin.com/in/muhammad-ibrahem-0b22002a3/", icon: <FaLinkedin />, color: '#60a5fa', label: 'LinkedIn' },
  { href: "https://github.com/Muhammadib12", icon: <FaGithub />, color: '#e5e7eb', label: 'GitHub' },
  { href: "https://www.instagram.com/muhammadibra403/profilecard/?igsh=YXRoNXg1ZXM3d3gz", icon: <FaInstagram />, color: '#fb923c', label: 'Instagram' },
];

function Contact() {
  return (
    <div className="py-16">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(255,215,0,0.5)' }}>// section_04 — contact</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 font-mono" style={{ color: '#FFD700' }}>
          CONTACT<span style={{ color: 'rgba(255,255,255,0.2)' }}>.me</span>
        </h2>
      </motion.div>

      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="flex justify-center gap-6 flex-wrap"
      >
        {links.map(({ href, icon, color, label }, i) => (
          <motion.a
            key={i}
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -6, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className="cyber-card rounded-lg p-4 text-2xl transition-all duration-300"
              style={{ color }}
            >
              {icon}
            </div>
            <span className="font-mono text-xs" style={{ color: 'rgba(255,215,0,0.5)' }}>{label}</span>
          </motion.a>
        ))}
      </motion.div>

      <motion.p
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-center mt-12 font-mono text-xs"
        style={{ color: 'rgba(255,215,0,0.25)' }}
      >
        &copy; {new Date().getFullYear()} Muhammad Ibrahim — All rights reserved
      </motion.p>
    </div>
  );
}

export default Contact;

import React from 'react';
import { HERO_CONTENT } from '../constants';
import Muhammad from '../assets/Muhammad.png';
import { motion } from 'framer-motion';

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: delay,
      duration: 0.5,
    },
  },
});

function Hero() {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-wrap justify-between lg:justify-between items-center">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
            >
              Muhammad Ibrahim
            </motion.h1>
            <motion.span
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-400 bg-clip-text text-3xl tracking-tight text-transparent"
            >
              Full Stack Developer
            </motion.span>
            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-2 max-w-xl py-6 font-light tracking-tight"
            >
              {HERO_CONTENT.split("Java Spring Boot developer")[0]}
              <span className="font-bold bg-gradient-to-r from-pink-300 via-slate-500 to-green-400 bg-clip-text text-transparent tracking-tight">
                Java Spring Boot Developer
              </span>
              {HERO_CONTENT.split("Java Spring Boot developer")[1]}
            </motion.p>

          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:p-8 mb-20">
          <div className="flex justify-center items-end">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="relative bg-gradient-to-b from-gray-800 via-gray-900 to-black p-4 rounded-3xl shadow-xl"
            >
              <img
                src={Muhammad}
                alt="Muhammad Ibrahim"
                className="rounded-3xl object-cover h-96 w-72"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

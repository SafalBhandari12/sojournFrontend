"use client";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className='relative h-screen flex items-center' id='home'>
      {/* Background Image */}
      <div
        className='absolute inset-0 z-0 bg-cover bg-center'
        style={{ backgroundImage: `url(/landing/Trek.webp)` }}
      >
        {/* Overlay */}
        <div className='absolute inset-0 bg-black bg-opacity-30'></div>
      </div>

      {/* Content */}
      <div className='container mx-auto px-4 md:px-6 relative z-10'>
        <div className='max-w-3xl'>
          <motion.h1
            className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Meet Your Travel Companion
          </motion.h1>

          <motion.p
            className='text-xl md:text-2xl text-white mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Presenting the SoJourn App, a digital guide that simplifies travel,
            connects you to authentic experiences and lets you explore Jammu and
            Kashmir without worries.
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href='#download' className='btn-primary'>
              Download the App
            </a>
            <a href='#features' className='btn-secondary bg-opacity-95'>
              Explore Features
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className='absolute bottom-10 left-1/2 transform -translate-x-1/2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className='w-8 h-12 rounded-full border-2 border-white flex justify-center'>
          <motion.div
            className='w-1 h-3 bg-white rounded-full mt-2'
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

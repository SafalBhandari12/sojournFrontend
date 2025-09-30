"use client";
import React from "react";
import { motion } from "framer-motion";

const destinations = [
  { name: "Gulmarg", activity: "Skiing" },
  { name: "Dal Lake", activity: "Shikara Ride" },
  { name: "Sonmarg", activity: "River Rafting" },
  { name: "Pahalgam", activity: "Trekking" },
  { name: "Amarnath", activity: "Pilgrimage" },
  { name: "Vaishno Devi", activity: "Religious Insights" },
];

const Destinations = () => {
  return (
    <section className='py-16 md:py-24 relative' id='destinations'>
      {/* Background Image with overlay */}
      <div
        className='absolute inset-0 z-0 bg-cover bg-center'
        style={{ backgroundImage: `url(/landing/Hike.webp)` }}
      >
        <div className='absolute inset-0 bg-green-800 bg-opacity-80'></div>
      </div>

      <div className='container mx-auto px-4 md:px-6 relative z-10'>
        <div className='text-center max-w-3xl mx-auto mb-12'>
          <motion.h2
            className='text-3xl md:text-4xl font-bold text-white mb-6'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Explore Top Destinations
          </motion.h2>
          <motion.p
            className='text-lg text-white'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover the magic of Jammu and Kashmir with our curated experiences
          </motion.p>
        </div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {destinations.map((destination, index) => (
            <div
              key={index}
              className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all cursor-pointer'
            >
              <h3 className='text-xl font-semibold text-white mb-2'>
                {destination.name}
              </h3>
              <p className='text-amber-100'>
                Famous for: {destination.activity}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className='mt-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href='#download'
            className='btn-secondary bg-white text-green-800 border-0'
          >
            Plan Your Journey Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Destinations;

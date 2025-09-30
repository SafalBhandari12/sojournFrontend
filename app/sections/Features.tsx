"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiMapPin,
  FiHome,
  FiLifeBuoy,
  FiPackage,
  FiMap,
  FiUser,
} from "react-icons/fi";
import { TfiCar } from "react-icons/tfi";

const features = [
  {
    icon: FiShield,
    title: "Safety Alerts and Local Advisories",
    description:
      "Stay informed with real-time safety updates and travel advisories throughout your journey.",
  },
  {
    icon: TfiCar,
    title: "Effortless Cab Bookings",
    description:
      "Book verified cabs and car-pooling services with just a few taps.",
  },
  {
    icon: FiHome,
    title: "Easy Hotel and Resort Reservations",
    description:
      "Find and book accommodations that suit your preferences and budget.",
  },
  {
    icon: FiPackage,
    title: "Customizable Packages",
    description:
      "Create your perfect trip with packages tailored to your budget and interests.",
  },
  {
    icon: FiMap,
    title: "Offline Navigation",
    description:
      "Navigate through remote areas without worrying about connectivity issues.",
  },
  {
    icon: FiLifeBuoy,
    title: "Women Safety and Emergency Services",
    description:
      "Access emergency health services and women safety features with priority assistance.",
  },
  {
    icon: FiMapPin,
    title: "Activity Bookings",
    description:
      "Book authentic experiences like Shikara rides, houseboats, gondola, and more.",
  },
  {
    icon: FiUser,
    title: "Personalized Itineraries",
    description:
      "Get custom itineraries based on your preferences with local insights.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
}) => {
  return (
    <motion.div
      className='feature-card'
      variants={fadeInUp}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className='flex items-start'>
        <div className='bg-green-100 p-3 rounded-lg mb-4'>
          <Icon className='w-6 h-6 text-green-800' />
        </div>
      </div>
      <h3 className='text-xl font-semibold text-green-800 mb-2'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className='py-16 md:py-24 bg-gray-50' id='features'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center max-w-3xl mx-auto mb-12'>
          <motion.h2
            className='section-title'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Features in Brief
          </motion.h2>
          <motion.p
            className='text-lg text-gray-600'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to explore Jammu and Kashmir, just a tap away.
          </motion.p>
        </div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </motion.div>

        <motion.div
          className='mt-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className='text-xl font-medium text-green-800 mb-6'>
            "Everything you need, just a tap away."
          </p>
          <a href='#download' className='btn-primary'>
            Experience All Features
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

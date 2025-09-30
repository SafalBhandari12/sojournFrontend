"use client";
import React from "react";
import Hero from "./Hero";
import Features from "../sections/Features";
import Destinations from "../sections/Destinations";
import Download from "../sections/Download";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LandingPageProps {
  onLogin: () => void;
  onGetStarted?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onGetStarted }) => (
  <div className='App'>
    <Navbar onLogin={onLogin} />
    <Hero />
    <div className='max-w-full'>
      <Features />
      <Destinations />
      <Download />
      <Footer />
    </div>
  </div>
);

export default LandingPage;

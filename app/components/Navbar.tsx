"use client";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface NavbarProps {
  onLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <div className='w-24 h-12 md:w-40 md:h-14 overflow-hidden rounded-lg border-2'>
            <img
              src='/landing/logo.jpeg'
              alt='SoJourn Logo'
              className='w-full h-full object-cover'
            />
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <a
              href='#features'
              className='font-medium text-color-primary hover:text-teal-600 transition-colors'
            >
              Features
            </a>
            <a
              href='#destinations'
              className='font-medium text-color-primary transition-colors'
            >
              Destinations
            </a>
            <a href='#download' className='btn-primary'>
              Download Now
            </a>
            <button className='btn-primary' onClick={onLogin}>
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-green-800 focus:outline-none'
            >
              {isMenuOpen ? (
                <FiX className='h-6 w-6' />
              ) : (
                <FiMenu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden bg-white absolute top-full left-0 w-full shadow-lg py-4 px-6 space-y-4 transition-all'>
            <a
              href='#features'
              className='block font-medium text-green-800 hover:text-teal-600 transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href='#destinations'
              className='block font-medium text-green-800 hover:text-teal-600 transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </a>
            <button
              className='block bg-green-800 text-amber-50 btn-secondary px-4'
              onClick={() => {
                setIsMenuOpen(false);
                onLogin();
              }}
            >
              Login
            </button>
            <a
              href='#download'
              className='btn-primary inline-block'
              onClick={() => setIsMenuOpen(false)}
            >
              Download Now
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

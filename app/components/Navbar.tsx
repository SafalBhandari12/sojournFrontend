"use client";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

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

  const handleVendorRegistration = () => {
    router.push("/auth/vendorRegistration");
  };

  const handleDashboard = () => {
    if (user) {
      // Always redirect to vendor status page for all users
      router.push("/dashboard/vendor-status");
    }
  };

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

            {user ? (
              <div className='flex items-center space-x-4'>
                <button
                  className='btn-secondary text-sm hover:curs'
                  onClick={handleDashboard}
                >
                  Dashboard
                </button>
                <button className='btn-primary text-sm' onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className='flex items-center space-x-4'>
                <button
                  className='btn-secondary'
                  onClick={handleVendorRegistration}
                >
                  Become a Vendor
                </button>
                <button className='btn-primary' onClick={onLogin}>
                  Login
                </button>
              </div>
            )}
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
            <a
              href='#download'
              className='btn-primary inline-block mb-2'
              onClick={() => setIsMenuOpen(false)}
            >
              Download Now
            </a>

            {user ? (
              <div className='space-y-2'>
                <div className='text-sm text-gray-600 py-2'>
                  Welcome, {user.phoneNumber}
                </div>
                <button
                  className='block w-full bg-blue-600 text-white px-4 py-2 rounded btn-secondary'
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleDashboard();
                  }}
                >
                  Dashboard
                </button>
                <button
                  className='block w-full bg-red-600 text-white px-4 py-2 rounded btn-primary'
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className='space-y-2'>
                <button
                  className='block w-full bg-green-600 text-white px-4 py-2 rounded btn-secondary'
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleVendorRegistration();
                  }}
                >
                  Become a Vendor
                </button>
                <button
                  className='block w-full bg-green-800 text-amber-50 px-4 py-2 rounded btn-primary'
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLogin();
                  }}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

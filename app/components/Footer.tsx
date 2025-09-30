"use client";
import React from "react";
import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className='bg-gray-700 text-white'>
      <div className='container mx-auto px-4 md:px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='md:col-span-2'>
            <div className='flex items-center mb-4'>
              <img
                src='/landing/logo.jpeg'
                alt='SoJourn Logo'
                className='h-10 mr-3'
              />
            </div>
            <p className='text-gray-300 mb-4 max-w-md'>
              Your trusted travel companion for exploring the beauty of Jammu
              and Kashmir. Discover authentic experiences with safety and
              confidence.
            </p>
            <div className='flex space-x-4'>
              <a href='https://www.facebook.com/share/1CuwQFBzar/?mibextid=wwXIfr'>
                <FiFacebook className='w-5 h-5' />
              </a>
              <a href='https://x.com/shoqeen_n?s=21'>
                <FiTwitter className='w-5 h-5' />
              </a>
              <a href='https://www.instagram.com/go.sojourn?igsh=Mjc3dTJ5bzJ0bWo2&utm_source=qr'>
                <FiInstagram className='w-5 h-5' />
              </a>
              <a href='https://www.linkedin.com/in/shoqeen-nabi-70b23527b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'>
                <FiLinkedin className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div></div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact</h3>
            <div className='space-y-3'>
              <div className='flex items-center'>
                <FiMail className='w-4 h-4 mr-3 text-teal-400' />
                <span className='text-gray-300'>sojournhelpdesk@gmail.com</span>
              </div>
              <div className='flex items-center'>
                <FiPhone className='w-4 h-4 mr-3 text-teal-400' />
                <span className='text-gray-300'>+91 91496 71541</span>
              </div>
              <div className='flex items-center'>
                <FiMapPin className='w-4 h-4 mr-3 text-teal-400' />
                <span className='text-gray-300'>Jammu & Kashmir, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-400 text-sm'>
            © 2024 SoJourn. All rights reserved.
          </p>
          <div className='flex space-x-6 mt-4 md:mt-0'>
            <Link
              href='/privacy-policy'
              className='text-gray-300 hover:text-white transition-colors'
            >
              Privacy Policy
            </Link>
            <Link
              href='/terms-of-service'
              className='text-gray-300 hover:text-white transition-colors'
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

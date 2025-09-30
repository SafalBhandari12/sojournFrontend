'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSmartphone, FiDownload } from "react-icons/fi";
import api from "../../lib/api";

const Download = () => {
  return (
    <section
      className="py-16 md:py-24 bg-green-800 text-white"
      id="download"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-5 rounded-full">
              <FiSmartphone className="w-12 h-12 text-green-800" />
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Explore Jammu & Kashmir?
          </motion.h2>

          <motion.p
            className="text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Download the SoJourn app now and start your journey with confidence.
            Available for iOS and Android devices.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="/"
              className="bg-white text-green-800 px-8 py-4 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md flex items-center justify-center group"
            >
              <svg
                className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.09,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="text-lg font-semibold -mt-1">App Store</div>
              </div>
            </a>

            <a
              href="/"
              className="bg-white text-green-800 px-8 py-4 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md flex items-center justify-center group"
            >
              <svg
                className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">Get it on</div>
                <div className="text-lg font-semibold -mt-1">Google Play</div>
              </div>
            </a>
          </motion.div>

          <motion.div
            className="mt-8 text-center text-sm opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>Coming soon on App Store and Google Play Store</p>
          </motion.div>

          {/* Additional Features Highlight */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm">
              <FiDownload className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Free Download</h3>
              <p className="text-sm opacity-90">
                No hidden charges, completely free to download and use
              </p>
            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm">
              <FiSmartphone className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Works Offline</h3>
              <p className="text-sm opacity-90">
                Access maps and guides even without internet connection
              </p>
            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm">
              <svg
                className="w-8 h-8 mx-auto mb-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
              </svg>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm opacity-90">
                Round the clock assistance for all your travel needs
              </p>
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            className="mt-12 bg-white bg-opacity-10 p-8 rounded-xl backdrop-filter backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="mb-6 opacity-90">
              Get notified when the app launches and receive exclusive travel
              tips for Jammu & Kashmir
            </p>
            <NotifyBox />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function NotifyBox() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNotify = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("api/notify", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg sm:rounded-r-none text-green-800 focus:outline-none focus:ring-2 focus:ring-white"
          disabled={loading}
        />
        <button
          className="bg-teal-600 text-white px-6 py-3 rounded-lg sm:rounded-l-none hover:bg-opacity-90 transition-all mt-2 sm:mt-0"
          onClick={handleNotify}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Notify Me"}
        </button>
      </div>
      {message && (
        <div className="w-full mt-2 text-center text-white font-semibold">
          {message}
        </div>
      )}
    </div>
  );
}

export default Download;

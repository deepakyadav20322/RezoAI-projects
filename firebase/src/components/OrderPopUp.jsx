import React from "react";  
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes as X } from "react-icons/fa";


export default function ThankYouPopup({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000); // Auto-close after 3s
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-2xl shadow-xl w-96 flex flex-col items-center relative"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-semibold">🎉 Thank You! 🎉</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Your purchase was successful.
            </p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="mt-4 text-4xl"
            >
              🛍️
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

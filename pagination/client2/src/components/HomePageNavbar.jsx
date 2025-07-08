import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { Hammer, Menu,X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
const HomePageNavbar = ({scrolled}) => {

      const navItems = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#process" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
         <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
        // initial={{ y: -20, opacity: 0 }}
        // animate={{ y: 0, opacity: 1 }}
        // transition={{ duration: 0.4 }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              when: "beforeChildren",
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Hammer className="w-4 h-4 text-white" />
              </div>
               <span className="flex items-center">
    <span className="text-blue-500 text-3xl">{'{'}</span>
    <span className="text-base">OpenJson</span>
    <span className="text-blue-500 text-3xl">{'}'}</span>
  </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-black font-medium transition-colors duration-200 relative group"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                  <div className="absolute -bottom-1 left-0 right-0 h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <motion.button
                className="px-6 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-900 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                <Link to="/table">Get Started</Link>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-gray-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 py-4 space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-gray-600 hover:text-black font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <button className="w-full mt-4 px-6 py-2 bg-black text-white font-medium rounded-md">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}

export default HomePageNavbar
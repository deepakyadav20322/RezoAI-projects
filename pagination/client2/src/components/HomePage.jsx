
import React,{ useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link  } from "react-router-dom"
import {
  Hammer,
  Globe,
  Code,
  Filter,
  Columns,
  Zap,
  ArrowRight,
  Database,
  Sparkles,
  Target,
  Users,
  TrendingUp,
  Shield,
  Menu,
  X,
  Play,
  Upload,
  Settings,
  BarChart3,
  FileText,
  Download,
 LinkIcon,
} from "lucide-react"

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#process" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ]

  const features = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Smart JSON Validation",
      description: "Advanced validation with auto-wrap functionality and structural consistency checking",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "URL Data Integration",
      description: "Seamlessly fetch and process data from any API endpoint with real-time validation",
    },
    {
      icon: <Filter className="w-5 h-5" />,
      title: "Advanced Filtering",
      description: "Powerful query-based filtering system to find exactly what you need",
    },
    {
      icon: <Columns className="w-5 h-5" />,
      title: "Dynamic Columns",
      description: "Toggle column visibility and customize your data view on the fly",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Auto-Fix Technology",
      description: "Intelligent error detection and automatic data structure correction",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Error Recovery",
      description: "Comprehensive error handling with detailed guidance and quick fixes",
    },
  ]

  const stats = [
    { number: "99.9%", label: "Data Accuracy", icon: <Target className="w-4 h-4" /> },
    { number: "10x", label: "Faster Processing", icon: <TrendingUp className="w-4 h-4" /> },
    { number: "50K+", label: "Records Handled", icon: <Database className="w-4 h-4" /> },
    { number: "1000+", label: "Happy Users", icon: <Users className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation Bar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-100" : "bg-transparent"
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
              <span className="text-lg font-semibold text-black">Feature Enrich</span>
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
                 <Link to='/table'>
                Get Started
              </Link>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
               <div className="w-14 h-14 text-blue-500 rounded-lg flex items-center justify-center mb-4 bg-blue-200/60 group-hover:text-blue-500 transition-all duration-200">
                <Hammer className="w-8 h-8" />
              </div>
            </motion.div>

            {/* Main Headline */}
           <div className="text-center">
      <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl mx-auto">
        <motion.div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1"     initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
          <span>Turn Your JSON Instantly into</span>

          {/* Animated word block with blur and no overlap */}
          <span
            className="relative inline-block mx-2 text-[#000000] dark:text-[#6b9fff]"
            style={{
              width: "9ch", // fits longest word comfortably
              height: "1.3em",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            {["Insightful", "Interactive", "Powerful", "Beautiful"].map((word, i) => (
              <motion.span
                key={word}
                className="absolute inset-0 flex justify-center items-center"
                initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"],
                  y: [10, 0, 0, -10],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 12,
                  times: [0, 0.1, 0.9, 1],
                  delay: i * 4,
                  ease: "easeInOut",
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>

          <span>Tables</span>
        </motion.div>
      </h1>
    </div>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Transform your data with intelligent validation, seamless integration, and powerful management tools.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                className="px-8 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-900 transition-colors duration-200 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                 <Link to='/table'>
                 <span className="flex gap-4 "></span>
                Get Started Free

                <ArrowRight className="w-4 h-4 inline pl-1" />
                </Link>
              </motion.button>

              <motion.button
                className="px-8 py-3 border border-blue-300 cursor-pointer text-black font-medium rounded-md hover:border-blue-500 transition-colors duration-200 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={'/table'}>
                <Play className="w-4 h-4 inline" />
                <span className="pl-4">Watch Demo</span>
                </Link>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group cursor-default"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-center mb-2 text-gray-400 group-hover:text-black transition-colors duration-200">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-black mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technology to handle complex data scenarios with ease and precision.
            </p>
          </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {features.map((feature, index) => (
    <motion.div
      key={index}
      className="bg-white p-6 rounded-lg border border-gray-100 transition-all duration-100 group cursor-pointer bg-gradient-to-br from-white to-indigo-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.1 }}
      whileHover={{ 
     
        borderColor: "#3b82f6" // blue-500 color
      }}
    >
      <div className="w-10 h-10 text-blue-500 rounded-lg flex items-center justify-center mb-4 bg-blue-200/60 group-hover:text-blue-500 transition-all duration-200">
        {feature.icon}
      </div>

      <h3 className="text-lg font-semibold text-black mb-2">{feature.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to transform your data from raw input to powerful insights.
            </p>
          </motion.div>

          <div className="space-y-16">
            <MinimalDataInputDemo />
            <MinimalProcessingDemo />
            <MinimalTableDemo />
            <MinimalExportDemo />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Data?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have revolutionized their data workflow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free Trial
              </motion.button>
              <motion.button
                className="px-8 py-3 border border-gray-600 text-white font-medium rounded-md hover:border-white transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
             <div className="w-8 h-8 text-blue-500 rounded-lg flex items-center justify-center  bg-blue-200/60 group-hover:text-blue-500 transition-all duration-200 mr-2">
                <Hammer className="w-4 h-4" />
              </div>
              <span className="text-lg font-semibold text-black">Feature Enrich</span>
            </div>
            <div className="text-gray-500 text-sm">© 2024 Feature Enrich. Built with precision.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Minimal Demo Components
const MinimalDataInputDemo = () => {
  const [activeMode, setActiveMode] = useState("json")

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center gap-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
       <div className="flex-1 space-y-4">
      <div className="flex items-center gap-3">
       <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-400 shadow-sm flex items-center justify-center hover:bg-blue-200 transition-colors duration-200">
  <Upload className="w-5 h-5 text-blue-700" />
</div>


        <span className="text-xs font-medium text-gray-500 tracking-wider">STEP 01</span>
      </div>

      <h3 className="text-2xl font-bold text-black">Data Input & Validation</h3>
      <p className="text-gray-600 leading-relaxed">
        Choose between URL endpoints or direct JSON input. Our system validates and fixes common issues automatically.
      </p>

      <motion.div
        className="space-y-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
      >
        {[
          "URL endpoint integration",
          "Direct JSON validation",
          "Auto-wrap functionality",
          "Real-time error detection",
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-1 h-1 bg-black rounded-full" />
            <span className="text-gray-700">{feature}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  

      <div className="flex-1">
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-2 mb-4">
            <motion.button
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeMode === "url" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
              }`}
              onClick={() => setActiveMode("url")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              URL
            </motion.button>
            <motion.button
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeMode === "json" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
              }`}
              onClick={() => setActiveMode("json")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              JSON
            </motion.button>
          </div>

          <div className="bg-gray-50 rounded p-3 font-mono text-sm">
            {activeMode === "url" ? (
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">https://api.example.com/data</span>
              </div>
            ) : (
              <div className="text-gray-600">
                {`{
  "id": 1,
  "name": "Sample Data",
  "status": "active"
}`}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const MinimalProcessingDemo = () => {
  return (
    <motion.div
      className="flex flex-col lg:flex-row-reverse items-center gap-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
          
        <div className="w-10 h-10 rounded-xl bg-green-100 border border-green-400 shadow-sm flex items-center justify-center hover:bg-green-200 transition-colors duration-200">
  <Settings className="w-4 h-4 text-green-400" />
</div>
<span className="text-xs font-medium text-gray-500 tracking-wider">STEP 02</span>
</div>


        <h3 className="text-2xl font-bold text-black">Smart Processing</h3>
        <p className="text-gray-600 leading-relaxed">
          Advanced algorithms analyze your data structure and provide intelligent optimization suggestions.
        </p>

        <div className="space-y-2">
          {["Structure validation", "Type consistency checking", "Performance optimization", "Error correction"].map(
            (feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1 h-1 bg-black rounded-full" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="flex-1">
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="font-medium text-black">Processing</span>
          </div>

          <div className="space-y-3">
            {[
              { label: "Validating structure", status: "complete" },
              { label: "Checking consistency", status: "complete" },
              { label: "Optimizing performance", status: "processing" },
              { label: "Generating insights", status: "pending" },
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    step.status === "complete"
                      ? "bg-black"
                      : step.status === "processing"
                        ? "bg-gray-400"
                        : "bg-gray-200"
                  }`}
                />
                <span className={`text-sm ${step.status === "complete" ? "text-black" : "text-gray-600"}`}>
                  {step.label}
                  {step.status === "complete" && " ✓"}
                  {step.status === "processing" && "..."}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const MinimalTableDemo = () => {
  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center gap-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-400 shadow-sm flex items-center justify-center hover:bg-red-200 transition-colors duration-200">
   <BarChart3 className="w-4 h-4 text-red-700" />
</div>

          
          <span className="text-xs font-medium text-gray-500 tracking-wider">STEP 03</span>
        </div>

        <h3 className="text-2xl font-bold text-black">Table Management</h3>
        <p className="text-gray-600 leading-relaxed">
          Comprehensive filtering, search, and column management for precise data analysis.
        </p>

        <div className="space-y-2">
          {["Advanced filtering", "Column management", "Search functionality", "Real-time updates"].map(
            (feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1 h-1 bg-black rounded-full" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="flex-1">
        <motion.div
          className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex gap-2 mb-3">
              <button className="px-2 py-1 bg-black text-white text-xs rounded">All</button>
              <button className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Active</button>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-1 border border-gray-200 rounded text-sm"
            />
          </div>

          <div className="divide-y divide-gray-100">
            <div className="px-4 py-2 bg-gray-50 text-xs font-medium text-gray-500">ID | Name | Status</div>
            {[
              { id: 1, name: "John Doe", status: "Active" },
              { id: 2, name: "Jane Smith", status: "Active" },
              { id: 3, name: "Bob Johnson", status: "Inactive" },
            ].map((item) => (
              <div key={item.id} className="px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                <span className="text-gray-600">{item.id}</span> |<span className="text-black mx-2">{item.name}</span> |
                <span className={item.status === "Active" ? "text-black" : "text-gray-400"}>{item.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const MinimalExportDemo = () => {
  const [selectedFormat, setSelectedFormat] = useState("json")

  return (
    <motion.div
      className="flex flex-col lg:flex-row-reverse items-center gap-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
         <div className="w-10 h-10 rounded-xl bg-yellow-100 border border-yellow-400 shadow-sm flex items-center justify-center hover:bg-yellow-200 transition-colors duration-200">
   <Download className="w-4 h-4 text-yellow-700" />
</div>

           
          <span className="text-xs font-medium text-gray-500 tracking-wider">STEP 04</span>
        </div>

        <h3 className="text-2xl font-bold text-black">Export & Integration</h3>
        <p className="text-gray-600 leading-relaxed">
          Export your processed data in multiple formats or integrate with existing workflows.
        </p>

        <div className="space-y-2">
          {["Multiple export formats", "API integration", "Batch processing", "Custom transformations"].map(
            (feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1 h-1 bg-black rounded-full" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="flex-1">
        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-6"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-4 h-4 text-black" />
            <span className="font-medium text-black">Export Options</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { id: "json", name: "JSON", icon: <Code className="w-4 h-4" /> },
              { id: "csv", name: "CSV", icon: <FileText className="w-4 h-4" /> },
              { id: "excel", name: "Excel", icon: <FileText className="w-4 h-4" /> },
            ].map((format) => (
              <motion.button
                key={format.id}
                className={`p-3 border rounded text-center ${
                  selectedFormat === format.id
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedFormat(format.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-center mb-1">{format.icon}</div>
                <div className="text-xs font-medium">{format.name}</div>
              </motion.button>
            ))}
          </div>

          <motion.button
            className="w-full py-2 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Export as {selectedFormat.toUpperCase()}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HomePage

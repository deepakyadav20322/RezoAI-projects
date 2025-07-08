import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
    FileJson,
     FileCode2,
  FileSpreadsheet,
  Search,

} from "lucide-react";
import {

Code2 ,

 
  Link2,

  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  
} from "lucide-react";

import HomePageNavbar from "./HomePageNavbar";
import MinimalTableDemo from "./MinimalTableDemo";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const SvgNetPattern = () => (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[15%]"
      style={{ zIndex: 0 }}
    >
      <pattern
        id="netPattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#netPattern)" />
    </svg>
  );

  const features = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Smart JSON Validation",
      description:
        "Advanced validation with auto-wrap functionality and structural consistency checking",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "URL Data Integration",
      description:
        "Seamlessly fetch and process data from any API endpoint with real-time validation",
    },
    {
      icon: <Filter className="w-5 h-5" />,
      title: "Advanced Filtering",
      description:
        "Powerful query-based filtering system to find exactly what you need",
    },
    {
      icon: <Columns className="w-5 h-5" />,
      title: "Dynamic Columns",
      description:
        "Toggle column visibility and customize your data view on the fly",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Auto-Fix Technology",
      description:
        "Intelligent error detection and automatic data structure correction",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Error Recovery",
      description:
        "Comprehensive error handling with detailed guidance and quick fixes",
    },
  ];

  const stats = [
    {
      number: "99.9%",
      label: "Data Accuracy",
      icon: <Target className="w-4 h-4" />,
    },
    {
      number: "10x",
      label: "Faster Processing",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      number: "50K+",
      label: "Records Handled",
      icon: <Database className="w-4 h-4" />,
    },
    {
      number: "1000+",
      label: "Happy Users",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation Bar */}
     
<HomePageNavbar scrolled={scrolled}/>
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <SvgNetPattern />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Logo */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-[#155dfc] bg-[#155dfc]/10 px-3 py-1 text-sm text-[#155dfc] dark:text-[#6b9fff] backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5 text-[#155dfc] dark:text-[#6b9fff]" />
            Decode JSON Hierarchy with Ease
          </motion.div>


            {/* Main Headline */}
            <div className="text-center">
              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl mx-auto">
                <motion.div
                  className="flex flex-wrap justify-center items-center gap-y-1 font-bold bricolage-grotesque"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span>Turn Your JSON Instantly into</span>

                  {/* Animated word block with blur and no overlap */}
                  <span
                    className="relative inline-block text-[#000000] dark:text-[#6b9fff]"
                    style={{
                      width: "9ch", // fits longest word comfortably
                      height: "1.3em",
                      textAlign: "center",
                      overflow: "hidden",
                    }}
                  >
                    {["Insightful", "Interactive", "Powerful", "Beautiful"].map(
                      (word, i) => (
                        <motion.span
                          key={word}
                          className="absolute inset-0 flex justify-center items-center text-[#155dfc]"
                          initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            filter: [
                              "blur(8px)",
                              "blur(0px)",
                              "blur(0px)",
                              "blur(8px)",
                            ],
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
                      )
                    )}
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
              Transform your data with intelligent validation, seamless
              integration, and powerful management tools.
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
                <Link to="/table">
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
                <Link to={"/table"}>
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
                  <div className="text-2xl font-bold text-black mb-1">
                    {stat.number}
                  </div>
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
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 bricolage-grotesque">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technology to handle complex data
              scenarios with ease and precision.
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
                  borderColor: "#3b82f6", // blue-500 color
                }}
              >
                <div className="w-10 h-10 text-blue-500 rounded-lg flex items-center justify-center mb-4 bg-blue-200/60 group-hover:text-blue-500 transition-all duration-200">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 How It Works">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to transform your data from raw input to powerful
              insights.
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
      <section className="py-20 bg-slate-100 text-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black bricolage-grotesque mb-4">
              Ready to Transform Your Data?
            </h2>
            <p className="text-lg text-black mb-8 max-w-2xl mx-auto font-medium font-[bricolage-grotesque]">
              Join thousands of users who have revolutionized their data
              workflow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-3 bg-gray-200 text-black font-medium rounded-md hover:bg-gray-200 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free Trial
              </motion.button>
              <motion.button
                className="px-8 py-3 border border-gray-600 text-white font-medium rounded-md hover:border-white transition-colors duration-200 bg-black"
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
              <span className="text-lg font-semibold text-black">
                Open Json
              </span>
            </div>
            <div className="text-gray-500 text-sm">
             © 2025 Open Json. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Minimal Demo Components
const MinimalDataInputDemo = () => {
  const [activeMode, setActiveMode] = useState("json");

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

          <span className="text-xs font-medium text-gray-500 tracking-wider">
            STEP 01
          </span>
        </div>

        <h3 className="text-2xl font-bold text-black bricolage-grotesque">
          Data Input & Validation
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Choose between URL endpoints or direct JSON input. Our system
          validates and fixes common issues automatically.
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
          className="bg-white border border-blue-300 rounded-lg p-6"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-2 mb-4">
            <motion.button
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeMode === "url"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
              onClick={() => setActiveMode("url")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              URL
            </motion.button>
            <motion.button
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeMode === "json"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600"
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
                <span className="text-gray-600">
                  https://api.example.com/data
                </span>
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
  );
};

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
          <span className="text-xs font-medium text-gray-500 tracking-wider">
            STEP 02
          </span>
        </div>

        <h3 className="text-2xl font-bold text-black bricolage-grotesque">Smart Processing</h3>
        <p className="text-gray-600 leading-relaxed">
          Advanced algorithms analyze your data structure and provide
          intelligent optimization suggestions.
        </p>

        <div className="space-y-2">
          {[
            "Structure validation",
            "Type consistency checking",
            "Performance optimization",
            "Error correction",
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1 h-1 bg-black rounded-full" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <motion.div
          className="bg-white border border-green-400  rounded-lg p-6"
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
                <span
                  className={`text-sm ${
                    step.status === "complete" ? "text-black" : "text-gray-600"
                  }`}
                >
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
  );
};

// const MinimalTableDemo = () => {
//   const [viewType, setViewType] = useState("url");
//   const [page, setPage] = useState(1);

//   const data = [
//     {
//       id: 1,
//       name: "Leanne Graham",
//       username: "Bret",
//       email: "Sincere@april.biz",
//       phone: "1-770-736-8031 x56442",
//       address: "View Details",
//       website: "hildegard.org",
//       company: "View Details",
//     },
//     {
//       id: 2,
//       name: "Ervin Howell",
//       username: "Antonette",
//       email: "Shanna@melissa.tv",
//       phone: "010-692-6593 x09125",
//       address: "View Details",
//       website: "anastasia.net",
//       company: "View Details",
//     },
//     {
//       id: 3,
//       name: "Clementine Bauch",
//       username: "Samantha",
//       email: "Nathan@yesenia.net",
//       phone: "1-463-123-4447",
//       address: "View Details",
//       website: "ramiro.info",
//       company: "View Details",
//     },
//   ];

//   return (
//     <motion.div
//       className="flex flex-col lg:flex-row items-center gap-12"
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* LEFT PANEL */}
//       <div className="flex-1 space-y-4">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-400 shadow-sm flex items-center justify-center hover:bg-red-200 transition-colors duration-200">
//             <BarChart3 className="w-4 h-4 text-red-700" />
//           </div>
//           <span className="text-xs font-medium text-gray-500 tracking-wider">
//             STEP 03
//           </span>
//         </div>

//         <h3 className="text-2xl font-bold text-black">Table Management</h3>
//         <p className="text-gray-600 leading-relaxed">
//           Powerful table with export, filtering, pagination, and real-time control.
//         </p>

//         <div className="space-y-2">
//           {[
//             "Export in various formats",
//             "Toggle column visibility",
//             "Paginated views",
//             "Interactive filters",
//           ].map((feature, index) => (
//             <div key={index} className="flex items-center gap-2 text-sm">
//               <div className="w-1.5 h-1.5 bg-black rounded-full" />
//               <span className="text-gray-700">{feature}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT TABLE PANEL */}
//       <div className="flex-1 w-full">
//         <motion.div
//           className="bg-white border border-red-300 rounded-lg shadow-sm overflow-hidden"
//           whileHover={{ y: -2 }}
//           transition={{ duration: 0.2 }}
//         >
//           {/* Top Controls */}
//           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setViewType("url")}
//                 className={`flex items-center gap-1 px-3 py-1 text-xs rounded border ${
//                   viewType === "url"
//                     ? "bg-blue-100 border-blue-400 text-blue-700"
//                     : "bg-white border-gray-200 text-gray-600"
//                 }`}
//               >
//                 <Globe className="w-4 h-4" />
//                 URL
//               </button>

//               <button
//                 onClick={() => setViewType("json")}
//                 className={`flex items-center gap-1 px-3 py-1 text-xs rounded border ${
//                   viewType === "json"
//                     ? "bg-blue-100 border-blue-400 text-blue-700"
//                     : "bg-white border-gray-200 text-gray-600"
//                 }`}
//               >
//                 <Code2 className="w-4 h-4" />
//                 JSON
//               </button>

//               <button className="flex items-center justify-center w-8 h-8 border border-gray-200 rounded hover:bg-gray-50">
//                 <Link2 className="w-4 h-4 text-gray-500" />
//               </button>
//             </div>

//             <div className="flex items-center gap-2">
//               <motion.button className="flex items-center gap-1 px-3 py-1 text-xs rounded bg-black text-white hover:bg-gray-800 transition">
//                 <Download className="w-3 h-3" />
//                 Export
//               </motion.button>

//               <button className="px-3 py-1 text-xs rounded border border-gray-200 hover:bg-gray-50 flex items-center gap-1">
//                 <Filter className="w-3 h-3" />
//                 Filters
//               </button>

//               <button className="px-3 py-1 text-xs rounded border border-gray-200 hover:bg-gray-50 flex items-center gap-1">
//                 <LayoutGrid className="w-3 h-3" />
//                 Columns
//               </button>
//             </div>
//           </div>

//           {/* Search */}
//           <div className="px-4 py-3 border-b border-gray-200">
//             <div className="relative">
//               <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
//               />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-50 text-gray-600 text-xs uppercase text-left">
//                 <tr>
//                   {[
//                     "ID",
//                     "Name",
//                     "Username",
//                     "Email",
//                     "Address",
//                     "Phone",
//                     "Website",
//                     "Company",
//                   ].map((col) => (
//                     <th key={col} className="px-4 py-2 font-medium">
//                       {col}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((row) => (
//                   <tr
//                     key={row.id}
//                     className="hover:bg-gray-50 transition-colors border-t border-gray-100"
//                   >
//                     <td className="px-4 py-2">{row.id}</td>
//                     <td className="px-4 py-2 font-medium text-gray-800">{row.name}</td>
//                     <td className="px-4 py-2">{row.username}</td>
//                     <td className="px-4 py-2 text-blue-700 underline cursor-pointer">
//                       {row.email}
//                     </td>
//                     <td className="px-4 py-2">
//                       <button className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded">
//                         {row.address}
//                       </button>
//                     </td>
//                     <td className="px-4 py-2">{row.phone}</td>
//                     <td className="px-4 py-2">{row.website}</td>
//                     <td className="px-4 py-2">
//                       <button className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded">
//                         {row.company}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 text-sm">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               className="px-3 py-1 rounded bg-black text-white hover:bg-gray-900 flex items-center gap-1"
//             >
//               <ChevronLeft className="w-3 h-3" />
//               Previous
//             </button>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 value={30}
//                 readOnly
//                 className="w-12 px-2 py-1 text-center border rounded text-xs"
//               />
//               <span className="text-gray-600">Page {page} of 1</span>
//             </div>
//             <button
//               onClick={() => setPage((p) => p + 1)}
//               className="px-3 py-1 rounded bg-black text-white hover:bg-gray-900 flex items-center gap-1"
//             >
//               Next
//               <ChevronRight className="w-3 h-3" />
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

const MinimalExportDemo = () => {
  const [selectedFormat, setSelectedFormat] = useState("json");
  const [isExporting, setIsExporting] = useState(false)
    const handleExport = async () => {
    setIsExporting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsExporting(false)
  }
const exportOptions = [
  {
    id: "csv",
    name: "CSV",
    icon: <FileText className="w-4 h-4" />,
    bg: "bg-green-100",
    active: "bg-green-600 text-white",
  },
  {
    id: "excel",
    name: "Excel",
    icon: <FileSpreadsheet className="w-4 h-4" />,
    bg: "bg-blue-100",
    active: "bg-blue-600 text-white",
  },
  {
    id: "json",
    name: "JSON",
    icon: <Code className="w-4 h-4" />,
    bg: "bg-yellow-100",
    active: "bg-yellow-600 text-white",
  },
  {
    id: "minifiedJson",
    name: "Minified JSON",
    icon: <FileJson className="w-4 h-4" />,
    bg: "bg-purple-100",
    active: "bg-purple-600 text-white",
  },
  {
    id: "xml",
    name: "XML",
    icon: <FileCode2 className="w-4 h-4" />,
    bg: "bg-pink-100",
    active: "bg-pink-600 text-white",
  },
];
  return (
    <motion.div
      className="flex flex-col lg:flex-row-reverse items-center gap-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Left: Info Section */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-100 border border-yellow-400 shadow-sm flex items-center justify-center hover:bg-yellow-200 transition-colors duration-200">
            <Download className="w-4 h-4 text-yellow-700" />
          </div>

          <span className="text-xs font-medium text-gray-500 tracking-wider">
            STEP 04
          </span>
        </div>

        <h3 className="text-2xl font-bold text-black bricolage-grotesque">Export & Integration</h3>
        <p className="text-gray-600 leading-relaxed">
          Export your processed data in multiple formats or integrate with
          existing workflows.
        </p>

        <div className="space-y-2">
          {[
            "Multiple export formats",
            "API integration",
            "Batch processing",
            "Custom transformations",
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-black rounded-full" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Export UI */}
      <div className="flex-1 w-full">
        <motion.div
          className="bg-white border border-yellow-300 rounded-lg p-6 shadow-sm"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-4 h-4 text-black" />
            <span className="font-medium text-black">Export Options</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {exportOptions.map((format) => (
              <motion.button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`p-3 rounded text-center transition-all duration-200 cursor-pointer ${
                  selectedFormat === format.id
                    ? `${format.active} font-semibold`
                    : `${format.bg} text-black hover:opacity-90`
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex justify-center mb-1">{format.icon}</div>
                <div className="text-xs font-medium">{format.name}</div>
              </motion.button>
            ))}
          </div>

          {/* <motion.button
            className="w-full py-2 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Export as {selectedFormat.replace(/([A-Z])/g, " $1").toUpperCase()}
          </motion.button> */}

            {/* Export Button */}
            <motion.button
              className="w-full py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              onClick={handleExport}
              disabled={isExporting}
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isExporting ? (
                  <motion.div
                    key="exporting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Exporting...
                  </motion.div>
                ) : (
                  <motion.div
                    key="export"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export as {exportOptions.find((opt) => opt.id === selectedFormat)?.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;

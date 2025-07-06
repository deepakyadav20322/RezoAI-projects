import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Table, BarChart3 ,Filter, Download, Eye, Columns3 } from "lucide-react"

const MinimalTableDemo = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [selectedFormat, setSelectedFormat] = useState("URL")

  // Simplified data matching your actual table structure
  const data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      website: "hildegard.org",
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      website: "anastasia.net",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      username: "Samantha",
      email: "Nathan@yesenia.net",
      website: "ramiro.info",
    },
   
  ]

  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center gap-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Left: Description */}
        {/* LEFT PANEL */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-400 shadow-sm flex items-center justify-center hover:bg-red-200 transition-colors duration-200">
            <BarChart3 className="w-4 h-4 text-red-700" />
          </div>
          <span className="text-xs font-medium text-gray-500 tracking-wider">
            STEP 03
          </span>
        </div>

        <h3 className="text-2xl font-bold text-black">Table Management</h3>
        <p className="text-gray-600 leading-relaxed">
          Powerful table with export, filtering, pagination, and real-time control.
        </p>

        <div className="space-y-2">
          {[
            "Export in various formats",
            "Toggle column visibility",
            "Paginated views",
            "Interactive filters",
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-black rounded-full" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Compact Table Demo */}
      <div className="flex-1 w-full max-w-lg">
        <motion.div
          className="bg-white border border-red-400 rounded-xl  overflow-hidden"
          whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Toolbar - matching your actual interface */}
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    selectedFormat === "URL" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedFormat("URL")}
                >
                  URL
                </button>
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    selectedFormat === "JSON" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedFormat("JSON")}
                >
                  JSON
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1 bg-black text-white text-xs font-medium rounded hover:bg-gray-800 transition-colors">
                  <Download className="w-3 h-3" />
                  Export
                </button>
                <button className="flex items-center gap-1 px-3 py-1 border border-gray-300 text-gray-600 text-xs font-medium rounded hover:bg-gray-50 transition-colors">
                  <Filter className="w-3 h-3" />
                  Filters
                </button>
                <button className="flex items-center gap-1 px-3 py-1 border border-gray-300 text-gray-600 text-xs font-medium rounded hover:bg-gray-50 transition-colors">
                  <Columns3 className="w-3 h-3" />
                  Columns
                </button>
              </div>
            </div>
          </div>

          {/* Compact Table */}
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div className="col-span-1">ID</div>
                <div className="col-span-4">NAME</div>
                <div className="col-span-4">EMAIL</div>
                <div className="col-span-3">WEBSITE</div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-100">
              {filtered.slice(0, 4).map((row, index) => (
                <motion.div
                  key={row.id}
                  className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="col-span-1 text-sm text-gray-900">{row.id}</div>
                  <div className="col-span-4">
                    <div className="text-sm font-medium text-gray-900">{row.name}</div>
                    <div className="text-xs text-gray-500">@{row.username}</div>
                  </div>
                  <div className="col-span-4">
                    <div className="text-sm text-gray-600 truncate">{row.email}</div>
                  </div>
                  <div className="col-span-3">
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pagination - matching your interface */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
            <button
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">30</span>
              <span className="text-gray-900 font-medium">Page {page} of 1</span>
            </div>
            <button
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MinimalTableDemo

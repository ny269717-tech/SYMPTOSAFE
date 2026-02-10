'use client'

import { motion } from 'framer-motion'
import { Shield, Heart } from 'lucide-react'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Shield className="w-12 h-12 text-medical-600" />
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-medical-600 to-medical-400 bg-clip-text text-transparent">
          SymptоSafe
        </h1>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="w-10 h-10 text-red-500 fill-red-500" />
        </motion.div>
      </div>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Failure-aware AI symptom checker designed for safe, transparent preliminary guidance
      </p>
      
      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Privacy-First
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          No Data Storage
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          Explainable AI
        </span>
      </div>
    </motion.header>
  )
}

'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Phone, MapPin } from 'lucide-react'

interface Props {
  symptoms: string[]
}

export default function EmergencyAlert({ symptoms }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="emergency-pulse bg-red-50 border-2 border-red-500 rounded-2xl p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-12 h-12 text-red-600" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-red-900 mb-2">
            ⚠️ EMERGENCY DETECTED
          </h2>
          
          <p className="text-red-800 mb-4 font-medium">
            Your symptoms indicate a potentially serious condition requiring immediate medical attention.
          </p>

          <div className="bg-white rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-red-900 mb-2">Critical Symptoms Detected:</h3>
            <ul className="list-disc list-inside space-y-1">
              {symptoms.map((symptom, index) => (
                <li key={index} className="text-red-800">{symptom}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Emergency Services
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Find Nearest Hospital
            </motion.button>
          </div>

          <p className="text-sm text-red-700 mt-4 italic">
            Do not wait for this analysis. Seek immediate medical care.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

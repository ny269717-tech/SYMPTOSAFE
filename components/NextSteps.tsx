'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'

interface Props {
  steps: string[]
  isEmergency: boolean
}

export default function NextSteps({ steps, isEmergency }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`mb-6 p-4 rounded-xl border ${
        isEmergency 
          ? 'bg-red-50 border-red-200' 
          : 'bg-green-50 border-green-200'
      }`}
    >
      <h3 className={`font-semibold mb-3 ${
        isEmergency ? 'text-red-900' : 'text-green-900'
      }`}>
        Recommended Next Steps
      </h3>
      
      <div className="space-y-2">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-start gap-3"
          >
            {isEmergency ? (
              <ArrowRight className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${
              isEmergency ? 'text-red-800' : 'text-green-800'
            }`}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

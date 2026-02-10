'use client'

import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'

interface Props {
  uncertainties: string[]
}

export default function UncertaintyPanel({ uncertainties }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
    >
      <div className="flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-blue-900 mb-2">What the AI is Unsure About</h3>
          <ul className="space-y-1">
            {uncertainties.map((uncertainty, index) => (
              <li key={index} className="text-sm text-blue-800">
                • {uncertainty}
              </li>
            ))}
          </ul>
          <p className="text-xs text-blue-700 mt-2 italic">
            These uncertainties affect the confidence score. Consider providing more details or consulting a healthcare professional.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

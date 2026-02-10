'use client'

import { motion } from 'framer-motion'
import { Condition } from '../types'
import { AlertCircle, Activity } from 'lucide-react'

interface Props {
  condition: Condition
  index: number
}

export default function ConditionCard({ condition, index }: Props) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-green-600 bg-green-50 border-green-200'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-medical-600" />
          <h4 className="font-semibold text-gray-800">{condition.name}</h4>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(condition.severity)}`}>
          {condition.severity.toUpperCase()}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-600">Confidence</span>
          <span className="text-sm font-semibold text-gray-800">{condition.confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${condition.confidence}%` }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            className={`h-full rounded-full ${
              condition.confidence >= 70 ? 'bg-green-500' :
              condition.confidence >= 50 ? 'bg-yellow-500' : 'bg-orange-500'
            }`}
          />
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-700 leading-relaxed">{condition.reasoning}</p>
      </div>

      <div className="flex items-start gap-2 text-xs text-gray-600">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-medium">Contributing symptoms: </span>
          {condition.contributingSymptoms.join(', ')}
        </div>
      </div>
    </motion.div>
  )
}

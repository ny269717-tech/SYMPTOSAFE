'use client'

import { motion } from 'framer-motion'
import { AnalysisResult } from '../types'
import ConditionCard from './ConditionCard'
import ConfidenceGauge from './ConfidenceGauge'
import NextSteps from './NextSteps'
import UncertaintyPanel from './UncertaintyPanel'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

interface Props {
  result: AnalysisResult
  onReset: () => void
}

export default function ResultsPanel({ result }: Props) {
  return (
    <div className="glass-card rounded-3xl p-6 h-[600px] overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Analysis Results</h2>
        <p className="text-sm text-gray-600">{result.disclaimer}</p>
      </div>

      <ConfidenceGauge confidence={result.overallConfidence} />

      {result.overallConfidence < 60 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">Low Confidence Warning</h3>
            <p className="text-sm text-yellow-800">
              The AI has low confidence in this analysis. Please consult a healthcare professional for accurate diagnosis.
            </p>
          </div>
        </motion.div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Possible Conditions</h3>
        <div className="space-y-3">
          {result.conditions.map((condition, index) => (
            <ConditionCard key={index} condition={condition} index={index} />
          ))}
        </div>
      </div>

      {result.uncertainties.length > 0 && (
        <UncertaintyPanel uncertainties={result.uncertainties} />
      )}

      <NextSteps steps={result.nextSteps} isEmergency={result.isEmergency} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-medical-50 border border-medical-200 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-medical-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-medical-900 mb-1">AI Reasoning</h3>
            <p className="text-sm text-medical-800">{result.reasoning}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

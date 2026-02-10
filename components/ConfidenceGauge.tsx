'use client'

import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface Props {
  confidence: number
}

export default function ConfidenceGauge({ confidence }: Props) {
  const data = [
    { name: 'Confidence', value: confidence },
    { name: 'Uncertainty', value: 100 - confidence }
  ]

  const getColor = () => {
    if (confidence >= 70) return '#10b981'
    if (confidence >= 50) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-6 p-6 bg-gradient-to-br from-medical-50 to-white rounded-xl border border-medical-200"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Overall Confidence</h3>
      
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                <Cell fill={getColor()} />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="text-4xl font-bold"
                style={{ color: getColor() }}
              >
                {confidence}%
              </motion.div>
              <div className="text-xs text-gray-500 mt-1">Confidence</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatInterface from '../components/ChatInterface'
import ResultsPanel from '../components/ResultsPanel'
import EmergencyAlert from '../components/EmergencyAlert'
import PrivacyNotice from '../components/PrivacyNotice'
import Header from '../components/Header'
import { AnalysisResult } from '../types'

export default function Home() {
  const [showResults, setShowResults] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isEmergency, setIsEmergency] = useState(false)

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result)
    setIsEmergency(result.isEmergency)
    setShowResults(true)
  }

  const handleReset = () => {
    setShowResults(false)
    setAnalysisResult(null)
    setIsEmergency(false)
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <AnimatePresence mode="wait">
          {isEmergency && analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <EmergencyAlert symptoms={analysisResult.emergencySymptoms || []} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChatInterface 
              onAnalysisComplete={handleAnalysisComplete}
              onReset={handleReset}
              disabled={showResults}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {showResults && analysisResult ? (
              <ResultsPanel 
                result={analysisResult}
                onReset={handleReset}
              />
            ) : (
              <PrivacyNotice />
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}

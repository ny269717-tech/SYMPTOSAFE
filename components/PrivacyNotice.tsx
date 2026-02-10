'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, AlertCircle } from 'lucide-react'

export default function PrivacyNotice() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card rounded-3xl p-6 h-[600px] overflow-y-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacy & Safety</h2>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-medical-100 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-medical-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Privacy-First Design</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your health information is processed in real-time and never stored. We use session-based processing only, ensuring complete privacy.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Lock className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">No Data Storage</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We don't collect, store, or share any personal health information. No login required, no tracking, no databases.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Eye className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Explainable AI</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our AI explains its reasoning in simple language. You'll understand why certain conditions are suggested and what symptoms contributed.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Safety-First Approach</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              When uncertain or detecting high-risk symptoms, we escalate instead of guessing. Your safety is our priority.
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Important Disclaimer</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-medical-600 mt-1">•</span>
              <span>This tool provides preliminary guidance only and is NOT a substitute for professional medical advice</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-medical-600 mt-1">•</span>
              <span>Always consult qualified healthcare professionals for diagnosis and treatment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-medical-600 mt-1">•</span>
              <span>In case of emergency, call emergency services immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-medical-600 mt-1">•</span>
              <span>AI can make mistakes - use this as one input among many</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-medical-50 rounded-xl border border-medical-200">
          <h3 className="font-semibold text-medical-900 mb-2">How It Works</h3>
          <ol className="space-y-2 text-sm text-medical-800">
            <li className="flex gap-2">
              <span className="font-semibold">1.</span>
              <span>Describe your symptoms in natural language</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">2.</span>
              <span>AI asks clarifying questions to understand better</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">3.</span>
              <span>Receive confidence-scored possible conditions with explanations</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">4.</span>
              <span>Get clear next steps based on severity and confidence</span>
            </li>
          </ol>
        </div>
      </div>
    </motion.div>
  )
}

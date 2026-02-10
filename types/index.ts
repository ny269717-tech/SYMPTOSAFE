export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

export interface Condition {
  name: string
  confidence: number
  reasoning: string
  contributingSymptoms: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export interface AnalysisResult {
  conditions: Condition[]
  overallConfidence: number
  isEmergency: boolean
  emergencySymptoms?: string[]
  nextSteps: string[]
  uncertainties: string[]
  reasoning: string
  disclaimer: string
}

export interface ChatMessage extends Message {
  isTyping?: boolean
}

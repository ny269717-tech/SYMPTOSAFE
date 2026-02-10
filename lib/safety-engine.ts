import { ChatMessage } from '@/types'

const EMERGENCY_KEYWORDS = [
  'chest pain', 'heart attack', 'can\'t breathe', 'difficulty breathing',
  'severe bleeding', 'heavy bleeding', 'unconscious', 'passed out',
  'stroke', 'paralysis', 'can\'t move', 'severe head injury',
  'suicide', 'self harm', 'overdose', 'poisoning',
  'severe burn', 'choking', 'seizure', 'convulsion',
  'severe allergic reaction', 'anaphylaxis', 'swelling throat',
  'coughing blood', 'vomiting blood', 'severe abdominal pain',
  'broken bone', 'compound fracture', 'severe trauma'
]

export function detectEmergency(messages: ChatMessage[]): {
  isEmergency: boolean
  symptoms: string[]
} {
  const detectedSymptoms: string[] = []
  
  const userMessages = messages
    .filter(m => m.role === 'user')
    .map(m => m.content.toLowerCase())
    .join(' ')

  for (const keyword of EMERGENCY_KEYWORDS) {
    if (userMessages.includes(keyword)) {
      detectedSymptoms.push(keyword)
    }
  }

  return {
    isEmergency: detectedSymptoms.length > 0,
    symptoms: detectedSymptoms
  }
}

export function calculateRiskLevel(symptoms: string[]): 'low' | 'medium' | 'high' | 'critical' {
  const emergencyCheck = detectEmergency(
    symptoms.map(s => ({ id: '1', role: 'user', content: s, timestamp: new Date() }))
  )

  if (emergencyCheck.isEmergency) return 'critical'
  
  const highRiskKeywords = ['severe', 'intense', 'unbearable', 'sudden', 'acute']
  const hasHighRisk = symptoms.some(s => 
    highRiskKeywords.some(k => s.toLowerCase().includes(k))
  )

  if (hasHighRisk) return 'high'
  if (symptoms.length >= 5) return 'medium'
  return 'low'
}

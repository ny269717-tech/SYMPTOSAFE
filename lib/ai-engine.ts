import { ChatMessage, AnalysisResult, Condition } from '../types'
import { calculateRiskLevel } from './safety-engine'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are a medical AI assistant for SymptоSafe, a failure-aware symptom checker.

CORE PRINCIPLES:
1. Safety first - when uncertain, escalate
2. Never sound overconfident
3. Explain reasoning clearly
4. Be transparent about limitations
5. Provide confidence scores honestly

YOUR ROLE:
- Analyze symptoms and suggest possible conditions
- Ask clarifying questions when needed
- Provide confidence-scored assessments
- Explain your reasoning in simple language
- Identify what you're unsure about

RESPONSE FORMAT:
If you need more information, respond with:
{
  "needsMoreInfo": true,
  "followUpQuestion": "Your question here"
}

If you have enough information, provide a complete analysis.`

export async function analyzeSymptoms(messages: ChatMessage[]): Promise<any> {
  const userSymptoms = messages
    .filter(m => m.role === 'user')
    .map(m => m.content)
    .join('. ')

  // Need more information if conversation is too short
  if (messages.length < 3 || userSymptoms.split(' ').length < 10) {
    return {
      needsMoreInfo: true,
      followUpQuestion: getFollowUpQuestion(messages)
    }
  }

  // Use mock analysis for now (OpenAI integration ready but using mock for demo)
  // To enable OpenAI, uncomment the code below and comment out the mock analysis
  
  const mockAnalysis = generateMockAnalysis(userSymptoms)
  
  return {
    needsMoreInfo: false,
    result: mockAnalysis
  }
  
  /* Uncomment to use OpenAI API:
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ],
      temperature: 0.7,
    })

    const response = completion.choices[0].message.content
    // Parse AI response and return analysis
    // For now using mock data
    return {
      needsMoreInfo: false,
      result: generateMockAnalysis(userSymptoms)
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    // Fallback to mock analysis
    return {
      needsMoreInfo: false,
      result: generateMockAnalysis(userSymptoms)
    }
  }
  */
}

function getFollowUpQuestion(messages: ChatMessage[]): string {
  const questions = [
    'How long have you been experiencing these symptoms?',
    'On a scale of 1-10, how severe is the discomfort?',
    'Have you noticed any other symptoms?',
    'Does anything make the symptoms better or worse?',
    'Have you had similar symptoms before?'
  ]
  
  const askedQuestions = messages
    .filter(m => m.role === 'assistant')
    .map(m => m.content)

  for (const q of questions) {
    if (!askedQuestions.some(asked => asked.includes(q))) {
      return q
    }
  }

  return 'Can you provide any additional details about your symptoms?'
}

function generateMockAnalysis(symptoms: string): AnalysisResult {
  const conditions: Condition[] = []
  const symptomLower = symptoms.toLowerCase()
  
  if (symptomLower.includes('headache') || symptomLower.includes('head')) {
    conditions.push({
      name: 'Tension Headache',
      confidence: 72,
      reasoning: 'Common headache type often caused by stress, poor posture, or muscle tension',
      contributingSymptoms: ['headache', 'head pain'],
      severity: 'low'
    })
    conditions.push({
      name: 'Migraine',
      confidence: 45,
      reasoning: 'Possible if headache is severe, one-sided, or accompanied by nausea',
      contributingSymptoms: ['headache'],
      severity: 'medium'
    })
  }

  if (symptomLower.includes('fever') || symptomLower.includes('temperature')) {
    conditions.push({
      name: 'Viral Infection',
      confidence: 68,
      reasoning: 'Fever is commonly associated with viral infections like flu or common cold',
      contributingSymptoms: ['fever'],
      severity: 'low'
    })
  }

  if (symptomLower.includes('cough') || symptomLower.includes('throat')) {
    conditions.push({
      name: 'Upper Respiratory Infection',
      confidence: 65,
      reasoning: 'Cough and throat symptoms suggest respiratory tract involvement',
      contributingSymptoms: ['cough', 'sore throat'],
      severity: 'low'
    })
  }

  if (conditions.length === 0) {
    conditions.push({
      name: 'General Malaise',
      confidence: 50,
      reasoning: 'Symptoms are non-specific and could indicate various conditions',
      contributingSymptoms: ['general symptoms'],
      severity: 'low'
    })
  }

  const overallConfidence = Math.round(
    conditions.reduce((sum, c) => sum + c.confidence, 0) / conditions.length
  )

  const uncertainties: string[] = []
  if (overallConfidence < 70) {
    uncertainties.push('Symptoms are non-specific and could match multiple conditions')
  }
  if (!symptomLower.includes('duration') && !symptomLower.includes('day')) {
    uncertainties.push('Duration of symptoms not specified')
  }
  if (!symptomLower.includes('severe') && !symptomLower.includes('mild')) {
    uncertainties.push('Severity level unclear')
  }

  return {
    conditions: conditions.sort((a, b) => b.confidence - a.confidence),
    overallConfidence,
    isEmergency: false,
    nextSteps: generateNextSteps(overallConfidence, conditions),
    uncertainties,
    reasoning: `Based on the symptoms described, I've identified ${conditions.length} possible condition(s). The analysis considers symptom patterns and common medical presentations.`,
    disclaimer: '⚠️ This is NOT a medical diagnosis. Always consult a healthcare professional for accurate diagnosis and treatment.'
  }
}

function generateNextSteps(confidence: number, conditions: Condition[]): string[] {
  const steps: string[] = []
  
  const hasHighSeverity = conditions.some(c => 
    c.severity === 'high' || c.severity === 'critical'
  )

  if (confidence < 50 || hasHighSeverity) {
    steps.push('Consult a healthcare professional for proper diagnosis')
  } else if (confidence < 70) {
    steps.push('Monitor symptoms for 24-48 hours')
    steps.push('Consult a doctor if symptoms worsen or persist')
  } else {
    steps.push('Monitor your symptoms')
    steps.push('Rest and stay hydrated')
    steps.push('Seek medical care if symptoms worsen')
  }

  steps.push('Keep track of any new symptoms that develop')
  
  return steps
}

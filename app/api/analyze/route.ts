import { NextRequest, NextResponse } from 'next/server'
import { analyzeSymptoms } from '../../../lib/ai-engine'
import { detectEmergency } from '../../../lib/safety-engine'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'No messages provided' },
        { status: 400 }
      )
    }

    const emergencyCheck = detectEmergency(messages)
    
    if (emergencyCheck.isEmergency) {
      return NextResponse.json({
        needsMoreInfo: false,
        result: {
          conditions: [{
            name: 'Emergency Condition Detected',
            confidence: 95,
            reasoning: 'Critical symptoms require immediate medical attention',
            contributingSymptoms: emergencyCheck.symptoms,
            severity: 'critical'
          }],
          overallConfidence: 95,
          isEmergency: true,
          emergencySymptoms: emergencyCheck.symptoms,
          nextSteps: [
            'Call emergency services immediately (911 or local emergency number)',
            'Do not drive yourself - call an ambulance',
            'Stay calm and follow emergency dispatcher instructions',
            'Have someone stay with you until help arrives'
          ],
          uncertainties: [],
          reasoning: 'Emergency symptoms detected that require immediate professional medical intervention.',
          disclaimer: '⚠️ EMERGENCY: This is not a diagnosis. Seek immediate medical care.'
        }
      })
    }

    const analysis = await analyzeSymptoms(messages)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze symptoms' },
      { status: 500 }
    )
  }
}

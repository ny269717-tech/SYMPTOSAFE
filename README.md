# 🛡️ SymptоSafe - Failure-Aware AI Symptom Checker

**Award-winning, hackathon-grade healthcare safety system**

SymptоSafe is a safety-first AI symptom checker designed for high-risk healthcare scenarios. It provides transparent, confidence-driven preliminary guidance while explicitly handling uncertainty and failure cases.

## 🎯 Core Philosophy

- **Safety-First Thinking**: Escalates instead of guessing when uncertain
- **Explicit Uncertainty Handling**: Shows what the AI knows vs. what it's unsure about
- **Explainability Over Accuracy**: Clear reasoning in simple language
- **Failure-Aware Decision Flow**: Detects and handles edge cases gracefully
- **Ethical AI Boundaries**: Never replaces doctors, always disclaims limitations

## ✨ Key Features

### 1️⃣ Conversational Symptom Input
- Natural language chat interface
- Smart follow-up questions
- Smooth animations and transitions
- Calm, trustworthy medical design

### 2️⃣ AI Understanding & Reasoning
- LLM-powered symptom interpretation
- Step-by-step reasoning
- Human-friendly explanations
- No medical jargon overload

### 3️⃣ Confidence & Probability Engine
- Visual confidence scores (progress bars, radial charts)
- Probability rankings for conditions
- Low confidence warnings
- Explicit "This is not a diagnosis" disclaimers

### 4️⃣ Failure-Aware Safety System
- Red-flag symptom detection (chest pain, severe bleeding, etc.)
- Immediate emergency mode escalation
- Critical UI changes (red accents, bold alerts)
- Emergency action guidance

### 5️⃣ Explainable Output
- Ranked list of possible conditions
- Reasoning for each suggestion
- Contributing symptoms highlighted
- Clear next-step guidance

### 6️⃣ Privacy-First Design
- Session-based processing only
- No personal data storage
- No login required
- Clear privacy notices

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your OpenAI API key to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/symptosafe)

**Quick Deployment Steps:**

1. Click the "Deploy" button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add environment variable: `OPENAI_API_KEY` (get from [OpenAI](https://platform.openai.com/api-keys))
4. Click "Deploy"
5. Your app will be live at `https://your-project.vercel.app`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🏗️ Tech Stack

**Frontend:**
- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Recharts (confidence visualizations)

**Backend:**
- Next.js API Routes
- AI processing endpoints
- Rule-based safety engine

**AI/ML:**
- LLM for symptom understanding
- Probabilistic confidence scoring
- Rule-based red-flag detection
- Explainability logic

## 📁 Project Structure

```
symptosafe/
├── app/
│   ├── api/analyze/      # AI analysis endpoint
│   ├── page.tsx          # Main application
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ChatInterface.tsx
│   ├── ResultsPanel.tsx
│   ├── EmergencyAlert.tsx
│   ├── ConfidenceGauge.tsx
│   └── ...
├── lib/
│   ├── ai-engine.ts      # AI logic
│   └── safety-engine.ts  # Emergency detection
└── types/
    └── index.ts          # TypeScript definitions
```

## 🎨 UI/UX Highlights

- **Premium Medical Theme**: Soft gradients (blue/teal/white)
- **Glassmorphism Cards**: Modern, clean aesthetic
- **Smooth Animations**: Framer Motion micro-interactions
- **Emergency Mode**: Pulsing red alerts for critical symptoms
- **Fully Responsive**: Mobile-first design
- **Accessibility**: High contrast, clear hierarchy

## 🔒 Safety Features

### Emergency Detection
Automatically detects critical symptoms:
- Chest pain / heart attack symptoms
- Severe bleeding
- Difficulty breathing
- Stroke symptoms
- Severe allergic reactions
- And more...

### Confidence Thresholds
- **High (70%+)**: Green indicators, monitor symptoms
- **Medium (50-69%)**: Yellow indicators, consult doctor
- **Low (<50%)**: Orange/red indicators, seek professional care

## 🧠 System Architecture

```
User Input → Chat Interface
    ↓
Symptom Analysis
    ↓
Emergency Detection ← Safety Engine
    ↓
[Emergency?]
    ├─ Yes → Emergency Alert + Immediate Actions
    └─ No → AI Analysis
        ↓
    Confidence Scoring
        ↓
    Explainable Results
        ↓
    Next Steps Guidance
```

## 🌟 Judge-Winning Features

- **Transparency**: Shows AI uncertainties explicitly
- **Ethical Design**: Clear disclaimers, never overconfident
- **Accessibility**: WCAG compliant, screen reader friendly
- **Scalability**: Stateless architecture, easy to scale
- **Future-Ready**: Multi-language support ready, API-first design

## 📊 Future Scope

- Multi-language support for global accessibility
- Integration with rural healthcare systems
- Public health deployment capabilities
- Telemedicine platform integration
- Symptom tracking over time
- Integration with wearable devices

## ⚠️ Important Disclaimer

**This tool is NOT a substitute for professional medical advice, diagnosis, or treatment.**

- Always consult qualified healthcare professionals
- In emergencies, call emergency services immediately
- AI can make mistakes - use as preliminary guidance only
- Never delay seeking medical care based on this tool

## 📄 License

MIT License - Built for educational and hackathon purposes

## 🏆 Built With Responsibility

SymptоSafe represents what happens when engineers understand the weight of healthcare technology. Every design decision prioritizes user safety over technical sophistication.

---

**Made with ❤️ for safer healthcare technology**

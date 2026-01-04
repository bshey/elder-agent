# Eldercare Concierge Demo

A voice-first, permission-controlled concierge platform prototype for adults 60+ to live independently.

## Features

- **Six-Button Interface**: Simple navigation to Health, Daily Life, People, Services, Home, and Help
- **Voice Interaction**: Gemini-powered natural language conversations
- **Modern Design**: Premium glassmorphism UI with smooth animations
- **Mock Data**: Realistic demo data for all modules

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local

# Run development server
npm run dev

# Open in browser
open http://localhost:3000
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home (six-button grid)
│   ├── health/            # Health module
│   ├── daily-life/        # Daily Life module
│   ├── people/            # People module
│   ├── services/          # Services module
│   ├── home-control/      # Smart Home module
│   └── help/              # Help module
├── components/            # UI components
│   ├── ModuleButton.tsx   # Navigation buttons
│   ├── VoiceButton.tsx    # Voice activation
│   ├── VoiceOverlay.tsx   # Voice interaction modal
│   ├── Header.tsx         # Page headers
│   └── Card.tsx           # Glass card components
└── lib/                   # Utilities and data
    ├── utils.ts           # Helper functions
    └── mock-data.ts       # Demo data
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **LLM**: Google Gemini API
- **State**: Zustand

## Demo Notes

This is a prototype demonstrating the core UX concept. In this demo:

- ✅ **Real**: UI/navigation, voice overlay states
- 🎭 **Mocked**: Voice recognition, LLM responses, all data
- 📋 **Planned**: Real Gemini integration, Web Speech API

---

Built for the Eldercare Concierge Platform demo.

"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, Sun, Users, Wrench, Home, HelpCircle } from "lucide-react";
import { ModuleButton } from "@/components/ModuleButton";
import { VoiceButton } from "@/components/VoiceButton";
import { VoiceOverlay } from "@/components/VoiceOverlay";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";
import { getGreeting } from "@/lib/utils";
import { mockUserProfile } from "@/lib/mock-data";

export default function HomePage() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  // Use refs to track state for the effect to avoid dependency cycles or stale closures if we were using callbacks
  const isVoiceOpenRef = useRef(isVoiceOpen);

  // Update ref when state changes
  useEffect(() => {
    isVoiceOpenRef.current = isVoiceOpen;
  }, [isVoiceOpen]);

  const {
    state,
    transcript,
    response,
    error,
    isSupported,
    startListening,
    stop,
  } = useVoiceAssistant();

  // Auto-restart listening loop
  useEffect(() => {
    if (state === "idle" && isVoiceOpen && response) {
      const timer = setTimeout(() => {
        if (isVoiceOpenRef.current) {
          startListening();
        }
      }, 800); // Slightly longer delay for natural pacing
      return () => clearTimeout(timer);
    }
  }, [state, isVoiceOpen, response, startListening]);

  const greeting = getGreeting();

  const handleOpenVoice = () => {
    setIsVoiceOpen(true);
    // Auto-start listening when opening
    setTimeout(() => {
      startListening();
    }, 100);
  };

  const handleCloseVoice = () => {
    stop();
    setIsVoiceOpen(false);
  };

  const handleStartListening = () => {
    startListening();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="status-bar">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center font-bold text-lg">
            {mockUserProfile.preferredName.charAt(0)}
          </div>
          <div>
            <p className="text-muted text-sm">{greeting}</p>
            <p className="font-semibold text-lg">
              {mockUserProfile.preferredName}
            </p>
          </div>
        </div>
        <div className="text-right text-muted">
          <p className="text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col">
        {/* Six-Button Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto w-full">
          <ModuleButton
            title="Health"
            icon={<Heart />}
            href="/health"
            variant="health"
            delay={1}
          />
          <ModuleButton
            title="Daily Life"
            icon={<Sun />}
            href="/daily-life"
            variant="daily"
            delay={2}
          />
          <ModuleButton
            title="People"
            icon={<Users />}
            href="/people"
            variant="people"
            delay={3}
          />
          <ModuleButton
            title="Services"
            icon={<Wrench />}
            href="/services"
            variant="services"
            delay={4}
          />
          <ModuleButton
            title="Home"
            icon={<Home />}
            href="/home-control"
            variant="home"
            delay={5}
          />
          <ModuleButton
            title="Help"
            icon={<HelpCircle />}
            href="/help"
            variant="help"
            delay={6}
          />
        </div>

        {/* Voice Section */}
        {/* Voice Section */}
        <div className={`mt-auto pt-8 flex flex-col items-center z-10 w-full transition-opacity duration-300 ${isVoiceOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <p className="text-muted text-lg mb-4 text-center animate-fade-in opacity-0 stagger-6">
            {isSupported
              ? "Tap to ask me anything"
              : "Voice not available in this browser"}
          </p>
          <VoiceButton
            isListening={state === "listening"}
            isProcessing={state === "processing"}
            onClick={handleOpenVoice}
          />
        </div>
      </main>

      {/* Voice Overlay */}
      <VoiceOverlay
        isOpen={isVoiceOpen}
        onClose={handleCloseVoice}
        state={state}
        transcript={transcript}
        response={response}
        error={error}
        onStartListening={handleStartListening}
        isSupported={isSupported}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Heart, Sun, Users, Wrench, Home, HelpCircle } from "lucide-react";
import { ModuleButton } from "@/components/ModuleButton";
import { VoiceButton } from "@/components/VoiceButton";
import { VoiceOverlay } from "@/components/VoiceOverlay";
import { getGreeting } from "@/lib/utils";
import { mockUserProfile } from "@/lib/mock-data";

export default function HomePage() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [voiceState, setVoiceState] = useState<
    "idle" | "listening" | "processing" | "speaking"
  >("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const greeting = getGreeting();

  const handleVoiceStart = () => {
    setVoiceState("listening");
    setTranscript("");
    setResponse("");

    // Simulated voice flow for demo
    setTimeout(() => {
      setTranscript("What's on my calendar today?");
      setVoiceState("processing");

      setTimeout(() => {
        setResponse(
          "You have a quiet day today. Your next appointment is Friday at 10 AM with Dr. Smith for your annual checkup."
        );
        setVoiceState("speaking");

        setTimeout(() => {
          setVoiceState("idle");
        }, 3000);
      }, 1500);
    }, 2000);
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
        <div className="mt-auto pt-8 flex flex-col items-center">
          <p className="text-muted text-lg mb-4 text-center animate-fade-in opacity-0 stagger-6">
            How can I help you today?
          </p>
          <VoiceButton
            isListening={voiceState === "listening"}
            isProcessing={voiceState === "processing"}
            onClick={() => setIsVoiceOpen(true)}
          />
        </div>
      </main>

      {/* Voice Overlay */}
      <VoiceOverlay
        isOpen={isVoiceOpen}
        onClose={() => {
          setIsVoiceOpen(false);
          setVoiceState("idle");
          setTranscript("");
          setResponse("");
        }}
        state={voiceState}
        transcript={transcript}
        response={response}
        onStartListening={handleVoiceStart}
      />
    </div>
  );
}

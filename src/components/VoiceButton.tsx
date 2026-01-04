"use client";

import { Mic, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
    isListening: boolean;
    isProcessing: boolean;
    onClick: () => void;
    className?: string;
}

export function VoiceButton({
    isListening,
    isProcessing,
    onClick,
    className,
}: VoiceButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={isProcessing}
            className={cn(
                "voice-button",
                isListening && "listening",
                className
            )}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
        >
            {isProcessing ? (
                <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
                <Mic className="w-8 h-8" />
            )}
        </button>
    );
}

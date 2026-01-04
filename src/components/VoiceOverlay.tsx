"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Mic, Loader2, Volume2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type VoiceState = "idle" | "listening" | "processing" | "speaking";

interface VoiceOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    state: VoiceState;
    transcript: string;
    response: string;
    onStartListening: () => void;
}

export function VoiceOverlay({
    isOpen,
    onClose,
    state,
    transcript,
    response,
    onStartListening,
}: VoiceOverlayProps) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
                <Dialog.Content
                    className={cn(
                        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                        "w-[90vw] max-w-md p-8 rounded-3xl",
                        "glass-card animate-scale-in",
                        "focus:outline-none"
                    )}
                >
                    <Dialog.Title className="sr-only">Voice Assistant</Dialog.Title>
                    <Dialog.Description className="sr-only">
                        Speak to interact with your eldercare assistant
                    </Dialog.Description>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6 text-muted" />
                    </button>

                    <div className="flex flex-col items-center text-center py-4">
                        {/* State indicator */}
                        <div className="relative mb-6">
                            {state === "listening" && (
                                <div className="absolute inset-0 animate-ping rounded-full bg-primary-500/30" />
                            )}
                            <div
                                className={cn(
                                    "relative w-24 h-24 rounded-full flex items-center justify-center",
                                    state === "idle" && "bg-secondary-700",
                                    state === "listening" && "bg-primary-500",
                                    state === "processing" && "bg-secondary-600",
                                    state === "speaking" && "bg-green-500"
                                )}
                            >
                                {state === "idle" && <Mic className="w-10 h-10" />}
                                {state === "listening" && (
                                    <Mic className="w-10 h-10 animate-pulse" />
                                )}
                                {state === "processing" && (
                                    <Loader2 className="w-10 h-10 animate-spin" />
                                )}
                                {state === "speaking" && <Volume2 className="w-10 h-10" />}
                            </div>
                        </div>

                        {/* Status text */}
                        <p className="text-2xl font-medium mb-4">
                            {state === "idle" && "Tap to speak"}
                            {state === "listening" && "Listening..."}
                            {state === "processing" && "Thinking..."}
                            {state === "speaking" && "Speaking..."}
                        </p>

                        {/* Transcript */}
                        {transcript && (
                            <div className="w-full p-4 rounded-2xl bg-secondary-800/50 mb-4">
                                <p className="text-muted text-sm mb-1">You said:</p>
                                <p className="text-lg">&ldquo;{transcript}&rdquo;</p>
                            </div>
                        )}

                        {/* Response */}
                        {response && (
                            <div className="w-full p-4 rounded-2xl bg-primary-900/30 border border-primary-500/30">
                                <p className="text-xl leading-relaxed">{response}</p>
                            </div>
                        )}

                        {/* Action button */}
                        {state === "idle" && (
                            <button
                                onClick={onStartListening}
                                className="mt-6 px-8 py-4 rounded-2xl bg-primary-500 hover:bg-primary-600 font-semibold text-lg transition-colors"
                            >
                                Start Speaking
                            </button>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

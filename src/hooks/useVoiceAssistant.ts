"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export type VoiceState = "idle" | "listening" | "processing" | "speaking" | "error";

interface Message {
    role: "user" | "model";
    text: string;
}

interface UseVoiceAssistantOptions {
    onTranscript?: (text: string) => void;
    onResponse?: (text: string) => void;
    onStateChange?: (state: VoiceState) => void;
    onError?: (error: string) => void;
}

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
    onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
    onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => void) | null;
    onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognitionInstance;
        webkitSpeechRecognition: new () => SpeechRecognitionInstance;
    }
}

export function useVoiceAssistant(options: UseVoiceAssistantOptions = {}) {
    const [state, setState] = useState<VoiceState>("idle");
    const [transcript, setTranscript] = useState("");
    const [response, setResponse] = useState("");
    const [isSupported, setIsSupported] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const historyRef = useRef<Message[]>([]);
    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Check browser support on mount
    useEffect(() => {
        const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognitionClass) {
            setIsSupported(false);
            setError("Speech recognition not supported in this browser. Try Chrome or Edge.");
        }
    }, []);

    const updateState = useCallback((newState: VoiceState) => {
        setState(newState);
        options.onStateChange?.(newState);
    }, [options]);

    const speak = useCallback((text: string): Promise<void> => {
        return new Promise((resolve) => {
            if (!window.speechSynthesis) {
                resolve();
                return;
            }

            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);

            // Configure for elderly-friendly speech
            utterance.rate = 0.9; // Slightly slower
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            // Try to find a natural-sounding voice
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(
                (v) => v.name.includes("Samantha") ||
                    v.name.includes("Google") ||
                    v.name.includes("Female") ||
                    v.lang.startsWith("en")
            );
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            utterance.onend = () => resolve();
            utterance.onerror = () => resolve();

            window.speechSynthesis.speak(utterance);
        });
    }, []);

    const sendToGemini = useCallback(async (text: string) => {
        try {
            updateState("processing");

            // Abort any previous request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();

            const res = await fetch("/api/voice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text,
                    history: historyRef.current.slice(-10), // Last 10 messages for context
                }),
                signal: abortControllerRef.current.signal,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "API request failed");
            }

            const data = await res.json();
            const responseText = data.response;

            // Update history
            historyRef.current.push({ role: "user", text });
            historyRef.current.push({ role: "model", text: responseText });

            setResponse(responseText);
            options.onResponse?.(responseText);

            // Speak the response
            updateState("speaking");
            await speak(responseText);
            updateState("idle");

        } catch (err) {
            if (err instanceof Error && err.name === "AbortError") {
                return; // Ignore aborted requests
            }
            console.error("Gemini error:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to get response";
            setError(errorMessage);
            options.onError?.(errorMessage);
            updateState("error");

            // Reset to idle after showing error
            setTimeout(() => {
                updateState("idle");
                setError(null);
            }, 3000);
        }
    }, [options, speak, updateState]);

    const startListening = useCallback(() => {
        const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognitionClass) {
            setError("Speech recognition not supported");
            return;
        }

        // Stop any ongoing speech
        window.speechSynthesis?.cancel();

        const recognition = new SpeechRecognitionClass();
        recognitionRef.current = recognition;

        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            updateState("listening");
            setTranscript("");
            setResponse("");
            setError(null);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const results = Array.from(event.results);
            const currentTranscript = results
                .map((result) => result[0].transcript)
                .join("");

            setTranscript(currentTranscript);
            options.onTranscript?.(currentTranscript);

            // Check if final result
            const lastResult = event.results[event.results.length - 1];
            if (lastResult.isFinal) {
                sendToGemini(currentTranscript);
            }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error("Speech recognition error:", event.error);
            if (event.error === "no-speech") {
                setError("No speech detected. Please try again.");
            } else if (event.error === "not-allowed") {
                setError("Microphone access denied. Please enable it in your browser settings.");
            } else {
                setError(`Speech error: ${event.error}`);
            }
            updateState("error");
            setTimeout(() => {
                updateState("idle");
                setError(null);
            }, 3000);
        };

        recognition.onend = () => {
            if (state === "listening") {
                // If we're still in listening state when recognition ends,
                // it means no final result was captured
                if (!transcript) {
                    updateState("idle");
                }
            }
        };

        recognition.start();
    }, [options, sendToGemini, state, transcript, updateState]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }
        window.speechSynthesis?.cancel();
        updateState("idle");
    }, [updateState]);

    const stop = useCallback(() => {
        stopListening();
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setTranscript("");
        setResponse("");
    }, [stopListening]);

    return {
        state,
        transcript,
        response,
        error,
        isSupported,
        startListening,
        stopListening,
        stop,
    };
}

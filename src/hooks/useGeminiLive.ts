// ==========================================
// GEMINI LIVE AUDIO HOOK
// Handles real-time voice interaction with Gemini
// ==========================================

"use client";

import { useCallback, useRef, useState } from "react";

export type VoiceState = "idle" | "connecting" | "listening" | "processing" | "speaking";

interface UseGeminiLiveOptions {
    onTranscript?: (text: string) => void;
    onResponse?: (text: string) => void;
    onStateChange?: (state: VoiceState) => void;
    onError?: (error: string) => void;
}

export function useGeminiLive(options: UseGeminiLiveOptions = {}) {
    const [state, setState] = useState<VoiceState>("idle");
    const [transcript, setTranscript] = useState("");
    const [response, setResponse] = useState("");
    const [isSupported, setIsSupported] = useState(true);

    const mediaStreamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const audioQueueRef = useRef<ArrayBuffer[]>([]);
    const playbackContextRef = useRef<AudioContext | null>(null);

    const updateState = useCallback((newState: VoiceState) => {
        setState(newState);
        options.onStateChange?.(newState);
    }, [options]);

    const playAudioChunk = useCallback(async (audioData: ArrayBuffer) => {
        if (!playbackContextRef.current) {
            playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
        }

        const ctx = playbackContextRef.current;

        // Convert PCM16 to Float32
        const int16Array = new Int16Array(audioData);
        const float32Array = new Float32Array(int16Array.length);
        for (let i = 0; i < int16Array.length; i++) {
            float32Array[i] = int16Array[i] / 32768;
        }

        const audioBuffer = ctx.createBuffer(1, float32Array.length, 24000);
        audioBuffer.getChannelData(0).set(float32Array);

        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start();
    }, []);

    const startSession = useCallback(async () => {
        try {
            updateState("connecting");

            // Check for microphone support
            if (!navigator.mediaDevices?.getUserMedia) {
                setIsSupported(false);
                options.onError?.("Microphone not supported in this browser");
                updateState("idle");
                return;
            }

            // Get microphone access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    sampleRate: 16000,
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });
            mediaStreamRef.current = stream;

            // Create audio context for capturing at 16kHz
            const audioContext = new AudioContext({ sampleRate: 16000 });
            audioContextRef.current = audioContext;

            const source = audioContext.createMediaStreamSource(stream);
            const processor = audioContext.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            // Connect to our API route which proxies to Gemini
            const ws = new WebSocket(
                `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}/api/voice/ws`
            );
            wsRef.current = ws;

            ws.onopen = () => {
                console.log("WebSocket connected");
                updateState("listening");
                setTranscript("");
                setResponse("");
            };

            ws.onmessage = async (event) => {
                try {
                    const message = JSON.parse(event.data);

                    if (message.type === "transcript") {
                        setTranscript(message.text);
                        options.onTranscript?.(message.text);
                    } else if (message.type === "response") {
                        setResponse(message.text);
                        options.onResponse?.(message.text);
                        updateState("speaking");
                    } else if (message.type === "audio") {
                        // Decode base64 audio and play
                        const audioData = Uint8Array.from(atob(message.data), c => c.charCodeAt(0));
                        await playAudioChunk(audioData.buffer);
                    } else if (message.type === "done") {
                        updateState("listening");
                    } else if (message.type === "error") {
                        options.onError?.(message.message);
                        updateState("idle");
                    }
                } catch {
                    console.error("Failed to parse message");
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                options.onError?.("Connection error");
                updateState("idle");
            };

            ws.onclose = () => {
                console.log("WebSocket closed");
                updateState("idle");
            };

            // Process audio and send to WebSocket
            processor.onaudioprocess = (e) => {
                if (ws.readyState !== WebSocket.OPEN) return;

                const inputData = e.inputBuffer.getChannelData(0);

                // Convert Float32 to Int16
                const int16Array = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) {
                    const s = Math.max(-1, Math.min(1, inputData[i]));
                    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
                }

                // Convert to base64
                const uint8Array = new Uint8Array(int16Array.buffer);
                let binary = "";
                for (let i = 0; i < uint8Array.length; i++) {
                    binary += String.fromCharCode(uint8Array[i]);
                }
                const base64Audio = btoa(binary);

                // Send audio data
                ws.send(JSON.stringify({
                    type: "audio",
                    data: base64Audio,
                }));
            };

            source.connect(processor);
            processor.connect(audioContext.destination);

        } catch (error) {
            console.error("Failed to start session:", error);
            options.onError?.(error instanceof Error ? error.message : "Failed to start");
            updateState("idle");
        }
    }, [options, updateState, playAudioChunk]);

    const stopSession = useCallback(() => {
        // Stop microphone
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }

        // Close audio context
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }

        // Disconnect processor
        if (processorRef.current) {
            processorRef.current.disconnect();
            processorRef.current = null;
        }

        // Close WebSocket
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }

        // Close playback context
        if (playbackContextRef.current) {
            playbackContextRef.current.close();
            playbackContextRef.current = null;
        }

        updateState("idle");
        setTranscript("");
        setResponse("");
    }, [updateState]);

    const toggleSession = useCallback(() => {
        if (state === "idle") {
            startSession();
        } else {
            stopSession();
        }
    }, [state, startSession, stopSession]);

    return {
        state,
        transcript,
        response,
        isSupported,
        startSession,
        stopSession,
        toggleSession,
    };
}

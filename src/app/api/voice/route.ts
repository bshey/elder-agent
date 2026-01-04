// ==========================================
// GEMINI VOICE API - TEXT-BASED
// Uses standard Gemini API with function calling
// ==========================================

import { GoogleGenerativeAI, FunctionResponsePart } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { functionDeclarations, executeFunction } from "@/lib/gemini-functions";
import { mockUserProfile } from "@/lib/mock-data";

const SYSTEM_PROMPT = `You are an eldercare concierge assistant named Heidi, designed for ${mockUserProfile.name}, an adult aged 60+.

Your personality:
- Warm, patient, and respectful
- Speak clearly and concisely - keep responses to 1-3 sentences
- Always confirm important actions before executing
- Never rush the user

Your capabilities (use the provided functions):
- View and discuss medical appointments and medications
- Check the calendar and manage reminders
- Look up contacts and help make calls
- View and control smart home devices (lights, locks, thermostat)
- Find service providers and request services
- Connect to a human concierge when needed

Rules:
- Keep responses SHORT and conversational (1-3 sentences max)
- Speak in a warm, friendly tone suitable for voice
- If a request seems complex, ask for clarification
- Always offer to help with something else after completing a task
- If you can't help, offer to connect to a human concierge

Current date: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
Current time: ${new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY not configured. Add it to your .env.local file." },
                { status: 500 }
            );
        }

        const { text, history = [] } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: "No text provided" },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: SYSTEM_PROMPT,
            tools: [{ functionDeclarations }],
        });

        const chat = model.startChat({
            history: history.map((msg: { role: string; text: string }) => ({
                role: msg.role,
                parts: [{ text: msg.text }],
            })),
        });

        let result = await chat.sendMessage(text);
        let response = result.response;

        // Handle function calls
        const functionCalls = response.functionCalls();
        if (functionCalls && functionCalls.length > 0) {
            const functionResults: FunctionResponsePart[] = [];

            for (const fc of functionCalls) {
                const fnResult = executeFunction(fc.name, fc.args as Record<string, unknown>);
                functionResults.push({
                    functionResponse: {
                        name: fc.name,
                        response: fnResult as object,
                    },
                });
            }

            // Send function results back to get natural language response
            result = await chat.sendMessage(functionResults);
            response = result.response;
        }

        const responseText = response.text();

        return NextResponse.json({
            response: responseText,
            functionsCalled: functionCalls?.map((fc) => fc.name) || [],
        });

    } catch (error) {
        console.error("Gemini API error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "API error" },
            { status: 500 }
        );
    }
}

"use client";

import { useState } from "react";
import {
    Phone,
    AlertTriangle,
    HelpCircle,
    ChevronRight,
    Loader2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";

export default function HelpPage() {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const handleConnectConcierge = () => {
        setIsConnecting(true);
        // Simulate connection
        setTimeout(() => {
            setIsConnecting(false);
            setIsConnected(true);
        }, 2000);
    };

    const faqs = [
        {
            question: "How do I add a new contact?",
            answer: 'Say "Add a new contact" or go to People and tap Add.',
        },
        {
            question: "How do I book a ride?",
            answer: 'Say "Book me a ride" or go to Daily Life > Transportation.',
        },
        {
            question: "Who can see my information?",
            answer: "Go to People > Who Can See What to view and manage permissions.",
        },
        {
            question: "How do I change my medications?",
            answer: "Contact your healthcare provider to update your medication list.",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header title="Help" />

            <main className="flex-1 p-6 space-y-6 max-w-2xl mx-auto w-full">
                {/* Emergency */}
                <button className="w-full p-6 rounded-2xl bg-gradient-to-r from-red-500/30 to-red-600/30 border border-red-500/50 hover:border-red-400/70 transition-colors animate-slide-up opacity-0">
                    <div className="flex items-center justify-center gap-4">
                        <AlertTriangle className="w-10 h-10 text-red-400" />
                        <div className="text-left">
                            <span className="text-2xl font-bold text-red-400">Emergency</span>
                            <p className="text-muted text-sm">
                                Alert family and call for help
                            </p>
                        </div>
                    </div>
                </button>

                {/* Connect to Concierge */}
                <Card className="animate-slide-up opacity-0 stagger-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Phone className="w-6 h-6 text-red-400" />
                            Talk to a Person
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isConnected ? (
                            <div className="p-6 rounded-xl bg-green-500/20 border border-green-500/30 text-center">
                                <div className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center mx-auto mb-4">
                                    <Phone className="w-8 h-8 text-green-400" />
                                </div>
                                <p className="text-xl font-semibold text-green-400 mb-2">
                                    Connected!
                                </p>
                                <p className="text-muted">
                                    A concierge will be with you shortly...
                                </p>
                                <button
                                    onClick={() => setIsConnected(false)}
                                    className="mt-4 px-6 py-2 rounded-xl bg-secondary-700 hover:bg-secondary-600 transition-colors"
                                >
                                    End Call
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleConnectConcierge}
                                disabled={isConnecting}
                                className="w-full p-6 rounded-xl bg-primary-600 hover:bg-primary-500 disabled:opacity-50 transition-colors"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    {isConnecting ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            <span className="text-xl font-semibold">
                                                Connecting...
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <Phone className="w-6 h-6" />
                                            <span className="text-xl font-semibold">
                                                Connect to Concierge
                                            </span>
                                        </>
                                    )}
                                </div>
                            </button>
                        )}
                    </CardContent>
                </Card>

                {/* FAQ */}
                <Card className="animate-slide-up opacity-0 stagger-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <HelpCircle className="w-6 h-6 text-red-400" />
                            Common Questions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="group list-item cursor-pointer [&[open]]:bg-secondary-700/50"
                            >
                                <summary className="flex items-center justify-between list-none">
                                    <span className="font-medium">{faq.question}</span>
                                    <ChevronRight className="w-5 h-5 text-muted group-open:rotate-90 transition-transform" />
                                </summary>
                                <p className="mt-3 text-muted text-sm pl-0">{faq.answer}</p>
                            </details>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

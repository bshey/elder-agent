"use client";

import { Heart, Calendar, Pill, ClipboardList } from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { mockAppointments, mockMedications } from "@/lib/mock-data";
import { formatDate, formatTime } from "@/lib/utils";

export default function HealthPage() {
    const upcomingAppointments = mockAppointments.slice(0, 2);

    return (
        <div className="min-h-screen flex flex-col">
            <Header title="Health" />

            <main className="flex-1 p-6 space-y-6 max-w-2xl mx-auto w-full">
                {/* Upcoming Appointments */}
                <Card className="animate-slide-up opacity-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-pink-400" />
                            Upcoming Appointments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {upcomingAppointments.map((apt) => (
                            <div
                                key={apt.id}
                                className="list-item"
                            >
                                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-pink-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{apt.title}</p>
                                    <p className="text-muted text-sm">{apt.provider}</p>
                                    <p className="text-primary-400 text-sm mt-1">
                                        {formatDate(apt.date)} at {formatTime(apt.time)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Medications */}
                <Card className="animate-slide-up opacity-0 stagger-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Pill className="w-6 h-6 text-purple-400" />
                            Medications
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {mockMedications.map((med) => (
                            <div
                                key={med.id}
                                className="list-item"
                            >
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                    <Pill className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">
                                        {med.name} - {med.dosage}
                                    </p>
                                    <p className="text-muted text-sm">{med.schedule}</p>
                                    <p className="text-muted text-sm">{med.purpose}</p>
                                </div>
                                {med.nextDue && (
                                    <div className="text-right">
                                        <p className="text-xs text-muted">Next</p>
                                        <p className="text-primary-400 font-medium">
                                            {formatTime(med.nextDue)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Care Plan */}
                <Card className="animate-slide-up opacity-0 stagger-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <ClipboardList className="w-6 h-6 text-teal-400" />
                            Care Plan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 rounded-xl bg-secondary-800/50 text-muted">
                            <p className="mb-2">
                                <strong className="text-foreground">From Dr. Smith (Dec 15):</strong>
                            </p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Continue current medication regimen</li>
                                <li>Blood pressure check weekly</li>
                                <li>30 minutes of light exercise daily</li>
                                <li>Low sodium diet recommended</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

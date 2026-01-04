"use client";

import { Calendar, Clock, Bell, Car } from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { mockCalendarEvents, mockReminders } from "@/lib/mock-data";
import { formatDate, formatTime } from "@/lib/utils";

export default function DailyLifePage() {
    // Sort events by date
    const sortedEvents = [...mockCalendarEvents].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "health":
                return "bg-pink-500/20 text-pink-400";
            case "family":
                return "bg-blue-500/20 text-blue-400";
            case "personal":
                return "bg-amber-500/20 text-amber-400";
            case "service":
                return "bg-purple-500/20 text-purple-400";
            default:
                return "bg-secondary-500/20 text-secondary-400";
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header title="Daily Life" />

            <main className="flex-1 p-6 space-y-6 max-w-2xl mx-auto w-full">
                {/* Calendar */}
                <Card className="animate-slide-up opacity-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-amber-400" />
                            Upcoming Events
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {sortedEvents.map((event) => (
                            <div key={event.id} className="list-item">
                                <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${getCategoryColor(event.category)}`}
                                >
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{event.title}</p>
                                    <p className="text-primary-400 text-sm">
                                        {formatDate(event.date)} at {formatTime(event.time)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Reminders */}
                <Card className="animate-slide-up opacity-0 stagger-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Bell className="w-6 h-6 text-amber-400" />
                            Reminders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {mockReminders.map((reminder) => (
                            <div key={reminder.id} className="list-item">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-amber-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{reminder.text}</p>
                                    <p className="text-muted text-sm">
                                        {formatTime(reminder.time)}
                                        {reminder.recurring && " • Daily"}
                                    </p>
                                </div>
                                <div
                                    className={`w-3 h-3 rounded-full ${reminder.enabled ? "bg-green-400" : "bg-secondary-500"}`}
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Transportation */}
                <Card className="animate-slide-up opacity-0 stagger-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Car className="w-6 h-6 text-amber-400" />
                            Transportation
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 rounded-xl bg-secondary-800/50">
                            <p className="text-muted mb-3">No rides scheduled</p>
                            <button className="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-500 font-semibold transition-colors">
                                Book a Ride
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

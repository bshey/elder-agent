"use client";

import { User, Phone, Star, Shield } from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { mockContacts } from "@/lib/mock-data";

export default function PeoplePage() {
    const favorites = mockContacts.filter((c) => c.favorite);
    const others = mockContacts.filter((c) => !c.favorite);

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "B":
                return { label: "Partner", color: "bg-green-500/20 text-green-400" };
            case "C":
                return { label: "Advocate", color: "bg-blue-500/20 text-blue-400" };
            case "D":
                return { label: "Healthcare", color: "bg-pink-500/20 text-pink-400" };
            case "F":
                return { label: "Service", color: "bg-purple-500/20 text-purple-400" };
            default:
                return { label: "", color: "" };
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header title="People" />

            <main className="flex-1 p-6 space-y-6 max-w-2xl mx-auto w-full">
                {/* Favorites */}
                <Card className="animate-slide-up opacity-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Star className="w-6 h-6 text-blue-400" />
                            Favorites
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {favorites.map((contact) => {
                            const badge = getRoleBadge(contact.role);
                            return (
                                <button
                                    key={contact.id}
                                    className="list-item w-full text-left"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-bold text-lg">
                                        {contact.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{contact.name}</p>
                                        <p className="text-muted text-sm">{contact.relationship}</p>
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}
                                    >
                                        {badge.label}
                                    </span>
                                    <Phone className="w-5 h-5 text-primary-400" />
                                </button>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* All Contacts */}
                <Card className="animate-slide-up opacity-0 stagger-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <User className="w-6 h-6 text-blue-400" />
                            All Contacts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {others.map((contact) => {
                            const badge = getRoleBadge(contact.role);
                            return (
                                <button
                                    key={contact.id}
                                    className="list-item w-full text-left"
                                >
                                    <div className="w-12 h-12 rounded-full bg-secondary-600 flex items-center justify-center font-bold text-lg">
                                        {contact.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{contact.name}</p>
                                        <p className="text-muted text-sm">{contact.relationship}</p>
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}
                                    >
                                        {badge.label}
                                    </span>
                                    <Phone className="w-5 h-5 text-muted" />
                                </button>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Permissions */}
                <Card className="animate-slide-up opacity-0 stagger-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Shield className="w-6 h-6 text-blue-400" />
                            Who Can See What
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="p-3 rounded-xl bg-secondary-800/50">
                                <p className="font-medium">Robert (Partner)</p>
                                <p className="text-muted text-sm">
                                    Full access to health, calendar, and home
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-secondary-800/50">
                                <p className="font-medium">Sarah & Michael (Advocates)</p>
                                <p className="text-muted text-sm">
                                    Can view calendar and receive emergency alerts
                                </p>
                            </div>
                            <button className="w-full py-3 px-4 rounded-xl border border-dashed border-secondary-500 text-muted hover:border-primary-500 hover:text-primary-400 transition-colors">
                                Manage Permissions
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

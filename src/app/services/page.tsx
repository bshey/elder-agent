"use client";

import { Briefcase, Star, Clock, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { mockServiceProviders } from "@/lib/mock-data";

export default function ServicesPage() {
    const renderStars = (rating?: number) => {
        if (!rating) return null;
        return (
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-secondary-600"}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header title="Services" />

            <main className="flex-1 p-6 space-y-6 max-w-2xl mx-auto w-full">
                {/* Request Service */}
                <button className="w-full p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 hover:border-purple-400/50 transition-colors animate-slide-up opacity-0">
                    <div className="flex items-center justify-center gap-3">
                        <Plus className="w-8 h-8 text-purple-400" />
                        <span className="text-xl font-semibold">Request a Service</span>
                    </div>
                </button>

                {/* My Vendors */}
                <Card className="animate-slide-up opacity-0 stagger-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Briefcase className="w-6 h-6 text-purple-400" />
                            My Vendors
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {mockServiceProviders.map((provider) => (
                            <div key={provider.id} className="list-item">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{provider.name}</p>
                                    <p className="text-muted text-sm">{provider.service}</p>
                                    {renderStars(provider.rating)}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Recent Services */}
                <Card className="animate-slide-up opacity-0 stagger-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Clock className="w-6 h-6 text-purple-400" />
                            Recent Services
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {mockServiceProviders
                            .filter((p) => p.lastVisit)
                            .map((provider) => (
                                <div key={provider.id} className="list-item">
                                    <div className="w-12 h-12 rounded-xl bg-secondary-700 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-muted" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{provider.service}</p>
                                        <p className="text-muted text-sm">{provider.name}</p>
                                    </div>
                                    <p className="text-muted text-sm">{provider.lastVisit}</p>
                                </div>
                            ))}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

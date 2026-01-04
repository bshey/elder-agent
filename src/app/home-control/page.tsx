"use client";

import { useState } from "react";
import {
    Lightbulb,
    Thermometer,
    Lock,
    Activity,
    Power,
    LockOpen,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { mockDevices, SmartDevice } from "@/lib/mock-data";

export default function HomeControlPage() {
    const [devices, setDevices] = useState(mockDevices);

    const toggleDevice = (id: string) => {
        setDevices((prev) =>
            prev.map((d) => {
                if (d.id === id) {
                    if (d.type === "light") {
                        return { ...d, state: d.state === "on" ? "off" : "on" };
                    }
                    if (d.type === "lock") {
                        return { ...d, state: d.state === "locked" ? "unlocked" : "locked" };
                    }
                }
                return d;
            })
        );
    };

    const getDeviceIcon = (device: SmartDevice) => {
        switch (device.type) {
            case "light":
                return (
                    <Lightbulb
                        className={`w-6 h-6 ${device.state === "on" ? "text-amber-400" : "text-muted"}`}
                    />
                );
            case "thermostat":
                return <Thermometer className="w-6 h-6 text-blue-400" />;
            case "lock":
                return device.state === "locked" ? (
                    <Lock className="w-6 h-6 text-green-400" />
                ) : (
                    <LockOpen className="w-6 h-6 text-red-400" />
                );
            case "sensor":
                return <Activity className="w-6 h-6 text-purple-400" />;
            default:
                return <Power className="w-6 h-6" />;
        }
    };

    const lights = devices.filter((d) => d.type === "light");
    const locks = devices.filter((d) => d.type === "lock");
    const thermostat = devices.find((d) => d.type === "thermostat");
    const sensors = devices.filter((d) => d.type === "sensor");

    return (
        <div className="min-h-screen flex flex-col">
            <Header title="Home" />

            <main className="flex-1 p-6 space-y-6 max-w-2xl mx-auto w-full">
                {/* Climate */}
                {thermostat && (
                    <Card className="animate-slide-up opacity-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Thermometer className="w-6 h-6 text-blue-400" />
                                Climate
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary-800/50">
                                <div>
                                    <p className="text-4xl font-bold">{thermostat.value}°F</p>
                                    <p className="text-muted capitalize">{thermostat.state}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="w-14 h-14 rounded-xl bg-secondary-700 hover:bg-secondary-600 flex items-center justify-center text-2xl font-bold transition-colors">
                                        −
                                    </button>
                                    <button className="w-14 h-14 rounded-xl bg-secondary-700 hover:bg-secondary-600 flex items-center justify-center text-2xl font-bold transition-colors">
                                        +
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Lights */}
                <Card className="animate-slide-up opacity-0 stagger-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Lightbulb className="w-6 h-6 text-amber-400" />
                            Lights
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {lights.map((device) => (
                            <button
                                key={device.id}
                                className="list-item w-full"
                                onClick={() => toggleDevice(device.id)}
                            >
                                <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${device.state === "on" ? "bg-amber-500/20" : "bg-secondary-700"}`}
                                >
                                    {getDeviceIcon(device)}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-semibold">{device.name}</p>
                                    <p className="text-muted text-sm">{device.location}</p>
                                </div>
                                <div
                                    className={`px-4 py-2 rounded-full font-medium text-sm ${device.state === "on"
                                            ? "bg-amber-500/20 text-amber-400"
                                            : "bg-secondary-700 text-muted"
                                        }`}
                                >
                                    {device.state.toUpperCase()}
                                </div>
                            </button>
                        ))}
                    </CardContent>
                </Card>

                {/* Locks */}
                <Card className="animate-slide-up opacity-0 stagger-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Lock className="w-6 h-6 text-green-400" />
                            Doors
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {locks.map((device) => (
                            <button
                                key={device.id}
                                className="list-item w-full"
                                onClick={() => toggleDevice(device.id)}
                            >
                                <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${device.state === "locked"
                                            ? "bg-green-500/20"
                                            : "bg-red-500/20"
                                        }`}
                                >
                                    {getDeviceIcon(device)}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-semibold">{device.name}</p>
                                    <p className="text-muted text-sm">{device.lastActivity}</p>
                                </div>
                                <div
                                    className={`px-4 py-2 rounded-full font-medium text-sm ${device.state === "locked"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    {device.state.toUpperCase()}
                                </div>
                            </button>
                        ))}
                    </CardContent>
                </Card>

                {/* Sensors */}
                {sensors.length > 0 && (
                    <Card className="animate-slide-up opacity-0 stagger-5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Activity className="w-6 h-6 text-purple-400" />
                                Sensors
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {sensors.map((device) => (
                                <div key={device.id} className="list-item">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                        {getDeviceIcon(device)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{device.name}</p>
                                        <p className="text-muted text-sm">{device.location}</p>
                                    </div>
                                    <p className="text-muted text-sm">{device.lastActivity}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}

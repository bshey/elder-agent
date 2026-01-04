// ==========================================
// GEMINI LIVE API - FUNCTION DEFINITIONS
// These functions provide access to mock data
// ==========================================

import { SchemaType, type FunctionDeclaration } from "@google/generative-ai";
import {
    mockAppointments,
    mockMedications,
    mockContacts,
    mockCalendarEvents,
    mockReminders,
    mockDevices,
    mockServiceProviders,
    mockUserProfile,
} from "./mock-data";

// Function declarations for Gemini
export const functionDeclarations: FunctionDeclaration[] = [
    {
        name: "get_appointments",
        description: "Get upcoming medical appointments for the user",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                days_ahead: {
                    type: SchemaType.NUMBER,
                    description: "Number of days to look ahead (default 30)",
                },
            },
        },
    },
    {
        name: "get_medications",
        description: "Get the user's current medication schedule",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {},
        },
    },
    {
        name: "get_contacts",
        description: "Get contacts list, optionally filtered by search term or relationship",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                search: {
                    type: SchemaType.STRING,
                    description: "Search term to filter contacts by name",
                },
                favorites_only: {
                    type: SchemaType.BOOLEAN,
                    description: "Only return favorite contacts",
                },
            },
        },
    },
    {
        name: "get_calendar",
        description: "Get calendar events for a specific date or upcoming events",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                date: {
                    type: SchemaType.STRING,
                    description: "Specific date in YYYY-MM-DD format, or 'today', 'tomorrow'",
                },
            },
        },
    },
    {
        name: "get_reminders",
        description: "Get active reminders",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {},
        },
    },
    {
        name: "get_device_status",
        description: "Get smart home device status",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                device_type: {
                    type: SchemaType.STRING,
                    description: "Type of device to check: 'light', 'thermostat', 'lock', 'sensor', or 'all' for all devices",
                },
            },
        },
    },
    {
        name: "control_device",
        description: "Control a smart home device (turn on/off, lock/unlock, adjust temperature)",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                device_name: {
                    type: SchemaType.STRING,
                    description: "Name of the device to control",
                },
                action: {
                    type: SchemaType.STRING,
                    description: "Action to perform: 'on', 'off', 'lock', 'unlock', or temperature number",
                },
            },
            required: ["device_name", "action"],
        },
    },
    {
        name: "create_reminder",
        description: "Create a new reminder for the user",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                text: {
                    type: SchemaType.STRING,
                    description: "The reminder text",
                },
                time: {
                    type: SchemaType.STRING,
                    description: "Time for the reminder in HH:MM format",
                },
            },
            required: ["text", "time"],
        },
    },
    {
        name: "get_service_providers",
        description: "Get list of service providers/vendors",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                service_type: {
                    type: SchemaType.STRING,
                    description: "Filter by service type",
                },
            },
        },
    },
    {
        name: "connect_concierge",
        description: "Connect the user to a human concierge for assistance",
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                reason: {
                    type: SchemaType.STRING,
                    description: "Reason for needing human assistance",
                },
            },
        },
    },
];

// Function implementations
export function executeFunction(name: string, args: Record<string, unknown>): unknown {
    switch (name) {
        case "get_appointments": {
            return {
                appointments: mockAppointments,
                message: `Found ${mockAppointments.length} upcoming appointments`,
            };
        }

        case "get_medications": {
            return {
                medications: mockMedications,
                message: `${mockUserProfile.name} has ${mockMedications.length} medications`,
            };
        }

        case "get_contacts": {
            let contacts = mockContacts;
            if (args.search) {
                const search = (args.search as string).toLowerCase();
                contacts = contacts.filter(
                    (c) =>
                        c.name.toLowerCase().includes(search) ||
                        c.relationship.toLowerCase().includes(search)
                );
            }
            if (args.favorites_only) {
                contacts = contacts.filter((c) => c.favorite);
            }
            return { contacts, count: contacts.length };
        }

        case "get_calendar": {
            const today = new Date();
            let events = mockCalendarEvents;

            if (args.date === "today") {
                const todayStr = today.toISOString().split("T")[0];
                events = events.filter((e) => e.date === todayStr);
            } else if (args.date === "tomorrow") {
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowStr = tomorrow.toISOString().split("T")[0];
                events = events.filter((e) => e.date === tomorrowStr);
            } else if (args.date) {
                events = events.filter((e) => e.date === args.date);
            }

            return { events, count: events.length };
        }

        case "get_reminders": {
            const activeReminders = mockReminders.filter((r) => r.enabled);
            return { reminders: activeReminders, count: activeReminders.length };
        }

        case "get_device_status": {
            let devices = mockDevices;
            if (args.device_type && args.device_type !== "all") {
                devices = devices.filter((d) => d.type === args.device_type);
            }
            return { devices, count: devices.length };
        }

        case "control_device": {
            const deviceName = (args.device_name as string).toLowerCase();
            const action = args.action as string;
            const device = mockDevices.find(
                (d) => d.name.toLowerCase().includes(deviceName)
            );

            if (!device) {
                return { success: false, message: `Device '${args.device_name}' not found` };
            }

            // Simulate control
            if (device.type === "light") {
                const newState = action === "on" ? "on" : "off";
                return {
                    success: true,
                    message: `${device.name} turned ${newState}`,
                    device: { ...device, state: newState },
                };
            } else if (device.type === "lock") {
                const newState = action === "lock" ? "locked" : "unlocked";
                return {
                    success: true,
                    message: `${device.name} ${newState}`,
                    device: { ...device, state: newState },
                };
            } else if (device.type === "thermostat") {
                const temp = parseInt(action) || 72;
                return {
                    success: true,
                    message: `Thermostat set to ${temp}°F`,
                    device: { ...device, value: temp },
                };
            }

            return { success: false, message: "Cannot control this device type" };
        }

        case "create_reminder": {
            const newReminder = {
                id: `rem-${Date.now()}`,
                text: args.text as string,
                time: args.time as string,
                recurring: false,
                enabled: true,
            };
            return {
                success: true,
                message: `Reminder created for ${args.time}: "${args.text}"`,
                reminder: newReminder,
            };
        }

        case "get_service_providers": {
            let providers = mockServiceProviders;
            if (args.service_type) {
                const serviceType = (args.service_type as string).toLowerCase();
                providers = providers.filter(
                    (p) => p.service.toLowerCase().includes(serviceType)
                );
            }
            return { providers, count: providers.length };
        }

        case "connect_concierge": {
            return {
                success: true,
                message: "Connecting you to a concierge now. Please hold...",
                reason: args.reason || "General assistance",
            };
        }

        default:
            return { error: `Unknown function: ${name}` };
    }
}

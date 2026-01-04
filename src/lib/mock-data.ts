// ==========================================
// ELDERCARE CONCIERGE - MOCK DATA
// Static data for demo purposes
// ==========================================

export interface Appointment {
    id: string;
    title: string;
    provider: string;
    location: string;
    date: string;
    time: string;
    type: "routine" | "specialist" | "urgent";
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    schedule: string;
    purpose: string;
    nextDue?: string;
}

export interface Contact {
    id: string;
    name: string;
    relationship: string;
    phone: string;
    favorite: boolean;
    role: "B" | "C" | "D" | "F";
    avatar?: string;
}

export interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    time: string;
    category: "health" | "personal" | "family" | "service";
}

export interface Reminder {
    id: string;
    text: string;
    time: string;
    recurring: boolean;
    enabled: boolean;
}

export interface SmartDevice {
    id: string;
    type: "light" | "thermostat" | "lock" | "sensor";
    name: string;
    location: string;
    state: string;
    value?: number;
    lastActivity?: string;
}

export interface ServiceProvider {
    id: string;
    name: string;
    service: string;
    phone: string;
    lastVisit?: string;
    rating?: number;
}

// ==========================================
// MOCK DATA INSTANCES
// ==========================================

export const mockAppointments: Appointment[] = [
    {
        id: "apt-1",
        title: "Annual Checkup",
        provider: "Dr. Sarah Smith",
        location: "Primary Care Clinic, Suite 200",
        date: "2026-01-10",
        time: "10:00",
        type: "routine",
    },
    {
        id: "apt-2",
        title: "Eye Examination",
        provider: "Dr. Michael Johnson",
        location: "Vision Center, 3rd Floor",
        date: "2026-01-15",
        time: "14:30",
        type: "specialist",
    },
    {
        id: "apt-3",
        title: "Cardiology Follow-up",
        provider: "Dr. Emily Chen",
        location: "Heart Health Center",
        date: "2026-01-22",
        time: "09:00",
        type: "specialist",
    },
];

export const mockMedications: Medication[] = [
    {
        id: "med-1",
        name: "Lisinopril",
        dosage: "10mg",
        schedule: "Once daily, morning",
        purpose: "Blood pressure",
        nextDue: "08:00",
    },
    {
        id: "med-2",
        name: "Metformin",
        dosage: "500mg",
        schedule: "Twice daily, with meals",
        purpose: "Blood sugar",
        nextDue: "12:00",
    },
    {
        id: "med-3",
        name: "Vitamin D",
        dosage: "2000 IU",
        schedule: "Once daily, with food",
        purpose: "Supplement",
        nextDue: "08:00",
    },
    {
        id: "med-4",
        name: "Aspirin",
        dosage: "81mg",
        schedule: "Once daily, evening",
        purpose: "Heart health",
        nextDue: "20:00",
    },
];

export const mockContacts: Contact[] = [
    {
        id: "c-1",
        name: "Sarah",
        relationship: "Daughter",
        phone: "(555) 123-4567",
        favorite: true,
        role: "C",
    },
    {
        id: "c-2",
        name: "Michael",
        relationship: "Son",
        phone: "(555) 234-5678",
        favorite: true,
        role: "C",
    },
    {
        id: "c-3",
        name: "Robert",
        relationship: "Spouse",
        phone: "(555) 345-6789",
        favorite: true,
        role: "B",
    },
    {
        id: "c-4",
        name: "Dr. Smith's Office",
        relationship: "Healthcare",
        phone: "(555) 456-7890",
        favorite: false,
        role: "D",
    },
    {
        id: "c-5",
        name: "Mary",
        relationship: "Friend",
        phone: "(555) 567-8901",
        favorite: false,
        role: "C",
    },
    {
        id: "c-6",
        name: "City Pharmacy",
        relationship: "Pharmacy",
        phone: "(555) 678-9012",
        favorite: false,
        role: "F",
    },
];

export const mockCalendarEvents: CalendarEvent[] = [
    {
        id: "ev-1",
        title: "Checkup with Dr. Smith",
        date: "2026-01-10",
        time: "10:00",
        category: "health",
    },
    {
        id: "ev-2",
        title: "Lunch with Sarah",
        date: "2026-01-06",
        time: "12:30",
        category: "family",
    },
    {
        id: "ev-3",
        title: "Book Club Meeting",
        date: "2026-01-08",
        time: "14:00",
        category: "personal",
    },
    {
        id: "ev-4",
        title: "Cleaning Service",
        date: "2026-01-07",
        time: "09:00",
        category: "service",
    },
];

export const mockReminders: Reminder[] = [
    {
        id: "rem-1",
        text: "Take morning medications",
        time: "08:00",
        recurring: true,
        enabled: true,
    },
    {
        id: "rem-2",
        text: "Water the plants",
        time: "10:00",
        recurring: false,
        enabled: true,
    },
    {
        id: "rem-3",
        text: "Call insurance company",
        time: "14:00",
        recurring: false,
        enabled: true,
    },
];

export const mockDevices: SmartDevice[] = [
    {
        id: "dev-1",
        type: "light",
        name: "Living Room Lights",
        location: "Living Room",
        state: "on",
        value: 80,
    },
    {
        id: "dev-2",
        type: "light",
        name: "Bedroom Lights",
        location: "Bedroom",
        state: "off",
        value: 0,
    },
    {
        id: "dev-3",
        type: "thermostat",
        name: "Main Thermostat",
        location: "Hallway",
        state: "heating",
        value: 72,
    },
    {
        id: "dev-4",
        type: "lock",
        name: "Front Door",
        location: "Entry",
        state: "locked",
        lastActivity: "3 hours ago",
    },
    {
        id: "dev-5",
        type: "lock",
        name: "Back Door",
        location: "Kitchen",
        state: "locked",
        lastActivity: "Yesterday",
    },
    {
        id: "dev-6",
        type: "sensor",
        name: "Motion Sensor",
        location: "Hallway",
        state: "inactive",
        lastActivity: "2 minutes ago",
    },
];

export const mockServiceProviders: ServiceProvider[] = [
    {
        id: "sp-1",
        name: "CleanPro Services",
        service: "House Cleaning",
        phone: "(555) 111-2222",
        lastVisit: "December 28, 2025",
        rating: 5,
    },
    {
        id: "sp-2",
        name: "City Cab Co.",
        service: "Transportation",
        phone: "(555) 333-4444",
        lastVisit: "January 2, 2026",
        rating: 4,
    },
    {
        id: "sp-3",
        name: "Handy Home Repairs",
        service: "Handyman",
        phone: "(555) 555-6666",
        lastVisit: "November 15, 2025",
        rating: 5,
    },
    {
        id: "sp-4",
        name: "Green Thumb Lawn Care",
        service: "Landscaping",
        phone: "(555) 777-8888",
        rating: 4,
    },
];

// User profile for personalization
export const mockUserProfile = {
    name: "Margaret",
    preferredName: "Margaret",
    role: "A" as const,
    household: "Home",
};

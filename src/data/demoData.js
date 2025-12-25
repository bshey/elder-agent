/**
 * Demo Data for Silvermaner
 * 
 * This file contains all the hardcoded demo data used to demonstrate
 * the app's functionality without a backend.
 */

// Generate dates relative to today
const today = new Date()
const formatDate = (date) => date.toISOString().split('T')[0]
const addDays = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

// Elder user profile
export const elderProfile = {
    id: 'elder-001',
    name: 'Zia',
    fullName: 'Zia Müller',
    age: 78,
    avatar: '👴',
    language: 'de-CH',
}

// Advocate profile
export const advocateProfile = {
    id: 'advocate-001',
    name: 'Maria',
    fullName: 'Maria Müller',
    relationship: 'Daughter',
    relationshipDe: 'Tochter',
    phone: '+41 79 123 4567',
    email: 'maria@example.com',
    avatar: '👩',
}

// Care circle contacts
export const familyContacts = [
    {
        id: 'family-001',
        name: 'Maria Müller',
        relationship: 'Daughter',
        relationshipDe: 'Tochter',
        phone: '+41 79 123 4567',
        avatar: '👩',
        isAdvocate: true,
    },
    {
        id: 'family-002',
        name: 'Thomas Müller',
        relationship: 'Son',
        relationshipDe: 'Sohn',
        phone: '+41 79 234 5678',
        avatar: '👨',
        isAdvocate: false,
    },
    {
        id: 'family-003',
        name: 'Anna Müller',
        relationship: 'Wife',
        relationshipDe: 'Ehefrau',
        phone: '+41 79 345 6789',
        avatar: '👵',
        isAdvocate: false,
    },
]

// Doctor contacts
export const doctorContacts = [
    {
        id: 'doctor-001',
        name: 'Dr. Peter Weber',
        specialty: 'General Practitioner',
        specialtyDe: 'Hausarzt',
        clinic: 'Hausarztpraxis Zürich',
        phone: '+41 44 123 4567',
        address: 'Bahnhofstrasse 10, 8001 Zürich',
        avatar: '👨‍⚕️',
    },
    {
        id: 'doctor-002',
        name: 'Dr. Eva Schneider',
        specialty: 'Cardiologist',
        specialtyDe: 'Kardiologin',
        clinic: 'Herzzentrum Zürich',
        phone: '+41 44 234 5678',
        address: 'Spitalstrasse 25, 8001 Zürich',
        avatar: '👩‍⚕️',
    },
]

// Generate sample check-in history (last 14 days)
export const generateCheckInHistory = () => {
    const history = []
    const moods = [3, 3, 2, 3, 3, 2, 3, 1, 2, 3, 3, 2, 3, 3] // 1=not well, 2=okay, 3=good

    for (let i = 13; i >= 1; i--) {
        const date = addDays(today, -i)
        const moodIndex = 13 - i

        // Skip some days randomly to make it realistic
        if (i === 5 || i === 11) continue

        history.push({
            id: `checkin-${formatDate(date)}`,
            date: formatDate(date),
            mood: moods[moodIndex] || 3,
            time: '09:30',
            notes: moodIndex === 7 ? 'Knee was bothering me today' : '',
            medicationTaken: true,
        })
    }

    return history
}

// Upcoming appointments
export const generateAppointments = () => {
    return [
        {
            id: 'apt-001',
            title: 'Dr. Weber - Checkup',
            titleDe: 'Dr. Weber - Kontrolle',
            date: formatDate(addDays(today, 2)),
            time: '10:00',
            location: 'Hausarztpraxis Zürich',
            type: 'doctor',
            doctorId: 'doctor-001',
        },
        {
            id: 'apt-002',
            title: 'Physical Therapy',
            titleDe: 'Physiotherapie',
            date: formatDate(addDays(today, 5)),
            time: '14:30',
            location: 'Physio Zentrum',
            type: 'therapy',
        },
        {
            id: 'apt-003',
            title: 'Dr. Schneider - Heart Checkup',
            titleDe: 'Dr. Schneider - Herzkontrolle',
            date: formatDate(addDays(today, 10)),
            time: '11:00',
            location: 'Herzzentrum Zürich',
            type: 'doctor',
            doctorId: 'doctor-002',
        },
        {
            id: 'apt-004',
            title: 'Family Visit - Maria',
            titleDe: 'Familienbesuch - Maria',
            date: formatDate(addDays(today, 1)),
            time: '15:00',
            location: 'Home',
            type: 'family',
        },
    ]
}

// Medications
export const medications = [
    {
        id: 'med-001',
        name: 'Aspirin Cardio',
        dosage: '100mg',
        frequency: 'daily',
        time: '08:00',
        instructions: 'Take with breakfast',
        instructionsDe: 'Mit Frühstück einnehmen',
    },
    {
        id: 'med-002',
        name: 'Metoprolol',
        dosage: '50mg',
        frequency: 'twice daily',
        time: ['08:00', '20:00'],
        instructions: 'Take with food',
        instructionsDe: 'Mit Essen einnehmen',
    },
]

// Default demo state
export const getDefaultDemoData = () => ({
    elder: elderProfile,
    advocate: advocateProfile,
    familyContacts,
    doctorContacts,
    medications,
    checkIns: generateCheckInHistory(),
    appointments: generateAppointments(),
})

export default getDefaultDemoData

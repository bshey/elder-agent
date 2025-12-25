import { createContext, useContext, useState, useEffect } from 'react'
import getDefaultDemoData, { elderProfile, advocateProfile, familyContacts, doctorContacts, medications } from '../data/demoData'

const STORAGE_KEY = 'silvermaner-demo-data'

const DataContext = createContext()

/**
 * Data Context Provider
 * 
 * Manages all demo data with localStorage persistence.
 * Note: Elder/Advocate profiles always come from source file,
 * only check-ins and appointments are persisted.
 */
export function DataProvider({ children }) {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                // Always use fresh profiles from source, only persist dynamic data
                return {
                    ...parsed,
                    elder: elderProfile,
                    advocate: advocateProfile,
                    familyContacts,
                    doctorContacts,
                    medications,
                }
            } catch (e) {
                console.warn('Failed to parse saved demo data, using defaults')
            }
        }
        return getDefaultDemoData()
    })

    // Persist to localStorage when data changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }, [data])

    // Reset to default demo data
    const resetData = () => {
        const defaultData = getDefaultDemoData()
        setData(defaultData)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
    }

    // Add a new check-in
    const addCheckIn = (checkIn) => {
        setData(prev => ({
            ...prev,
            checkIns: [...prev.checkIns.filter(c => c.date !== checkIn.date), checkIn]
        }))
    }

    // Get today's check-in
    const getTodayCheckIn = () => {
        const today = new Date().toISOString().split('T')[0]
        return data.checkIns.find(c => c.date === today)
    }

    // Get check-ins for the last N days
    const getRecentCheckIns = (days = 7) => {
        const cutoff = new Date()
        cutoff.setDate(cutoff.getDate() - days)
        const cutoffStr = cutoff.toISOString().split('T')[0]

        return data.checkIns
            .filter(c => c.date >= cutoffStr)
            .sort((a, b) => b.date.localeCompare(a.date))
    }

    // Get upcoming appointments
    const getUpcomingAppointments = () => {
        const today = new Date().toISOString().split('T')[0]
        return data.appointments
            .filter(a => a.date >= today)
            .sort((a, b) => {
                const dateCompare = a.date.localeCompare(b.date)
                if (dateCompare !== 0) return dateCompare
                return a.time.localeCompare(b.time)
            })
    }

    const value = {
        // Raw data
        ...data,

        // Methods
        resetData,
        addCheckIn,
        getTodayCheckIn,
        getRecentCheckIns,
        getUpcomingAppointments,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

/**
 * Hook to access data context
 */
export function useData() {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('useData must be used within a DataProvider')
    }
    return context
}

export default DataContext

import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'elderagent-user-type'
const DEFAULT_USER_TYPE = 'elder'

const UserContext = createContext()

/**
 * User Context Provider
 * 
 * Manages the current user type (elder or advocate) for demo purposes.
 * This allows switching between Elder and Advocate views without authentication.
 */
export function UserProvider({ children }) {
    const [userType, setUserType] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved === 'advocate' ? 'advocate' : DEFAULT_USER_TYPE
    })

    // Persist to localStorage when user type changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, userType)
    }, [userType])

    const isElder = userType === 'elder'
    const isAdvocate = userType === 'advocate'

    const switchToElder = () => setUserType('elder')
    const switchToAdvocate = () => setUserType('advocate')
    const toggleUserType = () => setUserType(prev => prev === 'elder' ? 'advocate' : 'elder')

    const value = {
        userType,
        setUserType,
        isElder,
        isAdvocate,
        switchToElder,
        switchToAdvocate,
        toggleUserType,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

/**
 * Hook to access user context
 */
export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}

export default UserContext

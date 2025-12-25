import { createContext, useContext, useState, useEffect } from 'react'
import en from '../data/translations/en.json'
import deCH from '../data/translations/de-CH.json'

const translations = {
    'en': en,
    'de-CH': deCH
}

const STORAGE_KEY = 'elderagent-language'
const DEFAULT_LANGUAGE = 'de-CH' // Swiss German as default per spec

const LanguageContext = createContext()

/**
 * Language Provider
 * 
 * Manages language state and provides translations throughout the app.
 * Language preference is persisted to localStorage.
 */
export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        // Check localStorage first
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved && translations[saved]) {
            return saved
        }
        return DEFAULT_LANGUAGE
    })

    // Persist to localStorage when language changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, language)
        // Update HTML lang attribute for accessibility
        document.documentElement.lang = language
    }, [language])

    // Toggle between the two supported languages
    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'de-CH' : 'en')
    }

    // Get translation by key path (e.g., 'nav.home')
    const t = (keyPath) => {
        const keys = keyPath.split('.')
        let value = translations[language]

        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key]
            } else {
                // Fallback to English if key not found
                value = translations['en']
                for (const fallbackKey of keys) {
                    if (value && typeof value === 'object' && fallbackKey in value) {
                        value = value[fallbackKey]
                    } else {
                        return keyPath // Return key path if not found anywhere
                    }
                }
                break
            }
        }

        return value
    }

    const value = {
        language,
        setLanguage,
        toggleLanguage,
        t,
        isSwissGerman: language === 'de-CH',
        isEnglish: language === 'en'
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

/**
 * Hook to access language context
 */
export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

export default LanguageContext

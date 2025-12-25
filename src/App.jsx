import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { UserProvider, useUser } from './contexts/UserContext'
import { DataProvider } from './contexts/DataContext'
import Layout from './components/common/Layout'
import DemoPanel from './components/admin/DemoPanel'

// Elder pages
import HomePage from './pages/HomePage'
import HealthPage from './pages/HealthPage'
import SchedulePage from './pages/SchedulePage'
import ContactsPage from './pages/ContactsPage'

// Advocate pages
import AdvocateDashboard from './pages/advocate/AdvocateDashboard'

import './App.css'

/**
 * App Content - separated to use UserContext
 */
function AppContent({ onLogoClick, showAdminPanel, setShowAdminPanel }) {
    const { isAdvocate } = useUser()

    return (
        <BrowserRouter>
            <Layout onLogoClick={onLogoClick}>
                {isAdvocate ? (
                    // Advocate sees the dashboard
                    <Routes>
                        <Route path="*" element={<AdvocateDashboard />} />
                    </Routes>
                ) : (
                    // Elder sees the full app
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/health" element={<HealthPage />} />
                        <Route path="/schedule" element={<SchedulePage />} />
                        <Route path="/contacts" element={<ContactsPage />} />
                    </Routes>
                )}
            </Layout>
            <DemoPanel
                isOpen={showAdminPanel}
                onClose={() => setShowAdminPanel(false)}
            />
        </BrowserRouter>
    )
}

function App() {
    const [showAdminPanel, setShowAdminPanel] = useState(false)
    const [logoClickCount, setLogoClickCount] = useState(0)

    // Check for ?admin=true URL parameter
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        if (params.get('admin') === 'true') {
            setShowAdminPanel(true)
        }
    }, [])

    // Handle triple-tap on logo
    const handleLogoClick = () => {
        setLogoClickCount(prev => prev + 1)
    }

    // Reset click count after 1 second, or open panel on 3 clicks
    useEffect(() => {
        if (logoClickCount >= 3) {
            setShowAdminPanel(true)
            setLogoClickCount(0)
        } else if (logoClickCount > 0) {
            const timer = setTimeout(() => setLogoClickCount(0), 1000)
            return () => clearTimeout(timer)
        }
    }, [logoClickCount])

    return (
        <LanguageProvider>
            <UserProvider>
                <DataProvider>
                    <AppContent
                        onLogoClick={handleLogoClick}
                        showAdminPanel={showAdminPanel}
                        setShowAdminPanel={setShowAdminPanel}
                    />
                </DataProvider>
            </UserProvider>
        </LanguageProvider>
    )
}

export default App

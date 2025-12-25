import Header from './Header'
import Navigation from './Navigation'
import HeidiChat from '../elder/HeidiChat'
import { useUser } from '../../contexts/UserContext'
import './Layout.css'

/**
 * Silvermaner Layout Component
 * 
 * Main layout wrapper that provides:
 * - Sticky header
 * - Main content area with proper padding for fixed nav
 * - Fixed bottom navigation (Elder only)
 * - Heidi chat widget (Elder only)
 * 
 * @param {ReactNode} children - Page content
 * @param {function} onLogoClick - Handler for logo click (admin panel)
 */
function Layout({ children, onLogoClick }) {
    const { isAdvocate } = useUser()

    return (
        <div className={`layout ${isAdvocate ? 'layout--advocate' : 'layout--elder'}`}>
            <Header onLogoClick={onLogoClick} />
            <main className="layout-main">
                <div className="layout-content">
                    {children}
                </div>
            </main>

            {/* Only show navigation and Heidi chat for Elder view */}
            {!isAdvocate && (
                <>
                    <Navigation />
                    <HeidiChat />
                </>
            )}
        </div>
    )
}

export default Layout

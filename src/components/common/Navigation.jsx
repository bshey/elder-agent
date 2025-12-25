import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import './Navigation.css'

/**
 * Silvermaner Bottom Navigation Component
 * 
 * Fixed bottom navigation with 4 tabs.
 * Uses large icons + text labels for elderly accessibility.
 * Labels are translated based on current language.
 */

const navItems = [
    { path: '/', icon: '🏠', labelKey: 'nav.home' },
    { path: '/health', icon: '❤️', labelKey: 'nav.health' },
    { path: '/schedule', icon: '📅', labelKey: 'nav.schedule' },
    { path: '/contacts', icon: '👥', labelKey: 'nav.contacts' },
]

function Navigation() {
    const { t } = useLanguage()

    return (
        <nav className="bottom-nav" aria-label="Main navigation">
            <div className="bottom-nav-content">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'nav-item--active' : ''}`
                        }
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{t(item.labelKey)}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    )
}

export default Navigation

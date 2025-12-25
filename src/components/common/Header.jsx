import { useUser } from '../../contexts/UserContext'
import { useLanguage } from '../../contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import './Header.css'

/**
 * Silvermaner Header Component
 * 
 * Fixed header with logo, demo toggle, and language switcher.
 * 
 * @param {function} onLogoClick - Handler for logo click (for admin panel)
 */
function Header({ onLogoClick }) {
    const { isAdvocate, toggleUserType } = useUser()
    const { language } = useLanguage()

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo" onClick={onLogoClick}>
                    <span className="header-logo-icon">🦁</span>
                    <span className="header-logo-text">Silvermaner</span>
                </div>

                <div className="header-actions">
                    {/* Demo Toggle */}
                    <button
                        className={`demo-toggle ${isAdvocate ? 'demo-toggle--advocate' : 'demo-toggle--elder'}`}
                        onClick={toggleUserType}
                        aria-label={`Switch to ${isAdvocate ? 'Elder' : 'Advocate'} view`}
                    >
                        <span className="demo-badge">DEMO</span>
                        <span className="demo-user">
                            {isAdvocate
                                ? (language === 'de-CH' ? '👩 Begleiter' : '👩 Advocate')
                                : (language === 'de-CH' ? '👴 Senior' : '👴 Elder')
                            }
                        </span>
                    </button>

                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    )
}

export default Header

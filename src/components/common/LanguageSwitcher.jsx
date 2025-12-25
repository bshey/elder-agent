import { useLanguage } from '../../contexts/LanguageContext'
import './LanguageSwitcher.css'

/**
 * Language Switcher Component
 * 
 * A toggle button that switches between Swiss German and English.
 * Shows flag + language name.
 */
function LanguageSwitcher() {
    const { language, toggleLanguage, isSwissGerman } = useLanguage()

    return (
        <button
            className="language-switcher"
            onClick={toggleLanguage}
            aria-label={`Switch language. Current: ${isSwissGerman ? 'Swiss German' : 'English'}`}
        >
            <span className="language-flag">
                {isSwissGerman ? '🇨🇭' : '🇬🇧'}
            </span>
            <span className="language-name">
                {isSwissGerman ? 'DE' : 'EN'}
            </span>
        </button>
    )
}

export default LanguageSwitcher

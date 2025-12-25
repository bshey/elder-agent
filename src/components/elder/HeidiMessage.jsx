import { useLanguage } from '../../contexts/LanguageContext'
import { useData } from '../../contexts/DataContext'
import './HeidiMessage.css'

/**
 * Heidi Message Component
 * 
 * Displays Heidi's greeting with the elder's name and
 * time-of-day appropriate message.
 */
function HeidiMessage({ variant = 'greeting', customMessage }) {
    const { t } = useLanguage()
    const { elder } = useData()

    // Get time-appropriate greeting
    const getTimeGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return t('home.greeting.morning')
        if (hour < 17) return t('home.greeting.afternoon')
        return t('home.greeting.evening')
    }

    // Determine which message to show
    const getMessage = () => {
        if (customMessage) return customMessage

        switch (variant) {
            case 'greeting':
                return t('home.howFeeling')
            case 'good':
                return t('heidi.responseGood')
            case 'okay':
                return t('heidi.responseOkay')
            case 'notWell':
                return t('heidi.responseNotWell')
            case 'checkedIn':
                return t('home.checkedIn')
            default:
                return t('home.howFeeling')
        }
    }

    return (
        <div className={`heidi-message heidi-message--${variant}`}>
            <div className="heidi-avatar-container">
                <span className="heidi-avatar">👩‍🦳</span>
                <span className="heidi-wave">👋</span>
            </div>

            <div className="heidi-bubble">
                <h2 className="heidi-greeting">
                    {getTimeGreeting()}, {elder?.name || 'friend'}!
                </h2>
                <p className="heidi-text">{getMessage()}</p>
            </div>
        </div>
    )
}

export default HeidiMessage

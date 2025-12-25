import { useLanguage } from '../../contexts/LanguageContext'
import { Button } from '../common'
import './MoodSelector.css'

/**
 * Mood Selector Component
 * 
 * Three large, colorful buttons for selecting mood.
 * Designed for elderly users with extra-large touch targets.
 */
function MoodSelector({ onSelect, disabled = false }) {
    const { t } = useLanguage()

    const moods = [
        {
            id: 'good',
            value: 3,
            emoji: t('mood.emojiGood'),
            label: t('mood.good'),
            variant: 'mood-good'
        },
        {
            id: 'okay',
            value: 2,
            emoji: t('mood.emojiOkay'),
            label: t('mood.okay'),
            variant: 'mood-okay'
        },
        {
            id: 'notWell',
            value: 1,
            emoji: t('mood.emojiNotWell'),
            label: t('mood.notWell'),
            variant: 'mood-bad'
        },
    ]

    return (
        <div className="mood-selector">
            {moods.map((mood) => (
                <Button
                    key={mood.id}
                    variant={mood.variant}
                    size="large"
                    onClick={() => onSelect(mood)}
                    disabled={disabled}
                    className="mood-button"
                    aria-label={mood.label}
                >
                    <span className="mood-emoji">{mood.emoji}</span>
                    <span className="mood-label">{mood.label}</span>
                </Button>
            ))}
        </div>
    )
}

export default MoodSelector

import { useLanguage } from '../../contexts/LanguageContext'
import './WeeklyMoodCalendar.css'

/**
 * Weekly Mood Calendar Component
 * 
 * Displays the last 7 days of mood check-ins as color-coded circles.
 */
function WeeklyMoodCalendar({ checkIns = [], onDayClick }) {
    const { language } = useLanguage()

    // Generate last 7 days
    const getLast7Days = () => {
        const days = []
        const today = new Date()

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            const dateStr = date.toISOString().split('T')[0]

            // Find check-in for this day
            const checkIn = checkIns.find(c => c.date === dateStr)

            days.push({
                date: date,
                dateStr: dateStr,
                dayName: date.toLocaleDateString(language === 'de-CH' ? 'de-CH' : 'en-US', { weekday: 'short' }),
                dayNumber: date.getDate(),
                isToday: i === 0,
                checkIn: checkIn,
                mood: checkIn?.mood || null,
            })
        }

        return days
    }

    const days = getLast7Days()

    // Get mood class for circle color
    const getMoodClass = (mood) => {
        if (!mood) return 'mood--missing'
        if (mood === 3) return 'mood--good'
        if (mood === 2) return 'mood--okay'
        return 'mood--not-well'
    }

    // Get mood emoji
    const getMoodEmoji = (mood) => {
        if (!mood) return '—'
        if (mood === 3) return '😊'
        if (mood === 2) return '😐'
        return '😔'
    }

    return (
        <div className="weekly-mood-calendar">
            <div className="week-days">
                {days.map((day) => (
                    <button
                        key={day.dateStr}
                        className={`day-item ${day.isToday ? 'day-item--today' : ''}`}
                        onClick={() => onDayClick?.(day)}
                        aria-label={`${day.dayName} ${day.dayNumber}: ${day.mood ? 'Checked in' : 'No check-in'}`}
                    >
                        <span className="day-name">{day.dayName}</span>
                        <span className={`day-circle ${getMoodClass(day.mood)}`}>
                            {getMoodEmoji(day.mood)}
                        </span>
                        <span className="day-number">{day.dayNumber}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default WeeklyMoodCalendar

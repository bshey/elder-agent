import { Card } from '../components/common'
import { useLanguage } from '../contexts/LanguageContext'
import { useData } from '../contexts/DataContext'
import './SchedulePage.css'

/**
 * Schedule Page
 * 
 * Shows upcoming appointments with large, readable cards.
 */
function SchedulePage() {
    const { t, language } = useLanguage()
    const { getUpcomingAppointments } = useData()

    const appointments = getUpcomingAppointments()
    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

    // Get appointment title based on language
    const getTitle = (apt) => {
        return language === 'de-CH'
            ? (apt.titleDe || apt.title)
            : apt.title
    }

    // Format date for display
    const formatDate = (dateStr) => {
        if (dateStr === today) return t('schedule.today')
        if (dateStr === tomorrow) return t('schedule.tomorrow')

        const date = new Date(dateStr)
        return date.toLocaleDateString(language === 'de-CH' ? 'de-CH' : 'en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        })
    }

    // Get type icon
    const getTypeIcon = (type) => {
        switch (type) {
            case 'doctor': return '👨‍⚕️'
            case 'therapy': return '🏃'
            case 'family': return '👨‍👩‍👧'
            default: return '📅'
        }
    }

    // Group appointments by date
    const groupByDate = (apts) => {
        const groups = {}
        apts.forEach(apt => {
            if (!groups[apt.date]) {
                groups[apt.date] = []
            }
            groups[apt.date].push(apt)
        })
        return groups
    }

    const groupedAppointments = groupByDate(appointments)

    return (
        <div className="schedule-page">
            <h1 className="page-title">📅 {t('schedule.title')}</h1>

            {appointments.length === 0 ? (
                <Card className="no-appointments">
                    <p>{t('schedule.noAppointments')}</p>
                </Card>
            ) : (
                <div className="appointments-list">
                    {Object.entries(groupedAppointments).map(([date, apts]) => (
                        <div key={date} className="date-group">
                            <h2 className={`date-header ${date === today ? 'date-header--today' : ''}`}>
                                {formatDate(date)}
                            </h2>

                            {apts.map((apt) => (
                                <Card
                                    key={apt.id}
                                    className={`appointment-card ${date === today ? 'appointment-card--today' : ''}`}
                                >
                                    <div className="appointment-time">
                                        <span className="time-value">{apt.time}</span>
                                    </div>

                                    <div className="appointment-content">
                                        <div className="appointment-icon">{getTypeIcon(apt.type)}</div>
                                        <div className="appointment-details">
                                            <h3 className="appointment-title">{getTitle(apt)}</h3>
                                            <span className="appointment-location">📍 {apt.location}</span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SchedulePage

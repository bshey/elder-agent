import { Card, Button } from '../../components/common'
import WeeklyMoodCalendar from '../../components/elder/WeeklyMoodCalendar'
import { useLanguage } from '../../contexts/LanguageContext'
import { useData } from '../../contexts/DataContext'
import './AdvocateDashboard.css'

/**
 * Advocate Dashboard
 * 
 * Shows overview of elder's status for the advocate (family member/caregiver).
 */
function AdvocateDashboard() {
    const { t, language } = useLanguage()
    const { elder, checkIns, getRecentCheckIns, getUpcomingAppointments } = useData()

    const recentCheckIns = getRecentCheckIns(7)
    const upcomingAppointments = getUpcomingAppointments().slice(0, 3)

    // Get latest check-in
    const latestCheckIn = recentCheckIns[0]

    // Calculate stats
    const goodDays = recentCheckIns.filter(c => c.mood === 3).length
    const notWellDays = recentCheckIns.filter(c => c.mood === 1).length
    const totalDays = recentCheckIns.length

    // Check for alerts
    const hasAlerts = notWellDays > 0

    // Format time ago
    const getTimeAgo = (checkIn) => {
        if (!checkIn) return language === 'de-CH' ? 'Kei Check-in' : 'No check-in'

        const today = new Date().toISOString().split('T')[0]
        if (checkIn.date === today) {
            return language === 'de-CH'
                ? `Hüt um ${checkIn.time}`
                : `Today at ${checkIn.time}`
        }

        const date = new Date(checkIn.date)
        return date.toLocaleDateString(language === 'de-CH' ? 'de-CH' : 'en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        })
    }

    // Get mood emoji
    const getMoodEmoji = (mood) => {
        if (!mood) return '❓'
        if (mood === 3) return '😊'
        if (mood === 2) return '😐'
        return '😔'
    }

    return (
        <div className="advocate-dashboard">
            <div className="dashboard-header">
                <h1 className="page-title">
                    {language === 'de-CH' ? 'Überblick' : 'Overview'}
                </h1>
            </div>

            {/* Alert Banner */}
            {hasAlerts && (
                <Card variant="alert" className="alert-banner">
                    <span className="alert-icon">⚠️</span>
                    <span className="alert-text">
                        {language === 'de-CH'
                            ? `${elder?.name} het ${notWellDays} "nöd so guet" Tag(e) i de letzte Wuche`
                            : `${elder?.name} had ${notWellDays} "not well" day(s) in the past week`
                        }
                    </span>
                </Card>
            )}

            {/* Elder Summary */}
            <Card className="elder-summary">
                <div className="elder-info">
                    <span className="elder-avatar">{elder?.avatar || '👴'}</span>
                    <div className="elder-details">
                        <h2 className="elder-name">{elder?.fullName}</h2>
                        <span className="elder-age">
                            {elder?.age} {language === 'de-CH' ? 'Jahr' : 'years old'}
                        </span>
                    </div>
                </div>

                <div className="last-checkin">
                    <span className="checkin-label">
                        {language === 'de-CH' ? 'Letsche Check-in' : 'Last check-in'}
                    </span>
                    <div className="checkin-value">
                        <span className="checkin-emoji">{getMoodEmoji(latestCheckIn?.mood)}</span>
                        <span className="checkin-time">{getTimeAgo(latestCheckIn)}</span>
                    </div>
                </div>
            </Card>

            {/* Weekly Overview */}
            <Card className="weekly-overview">
                <h2 className="section-title">
                    {language === 'de-CH' ? 'Die Wuche' : 'This Week'}
                </h2>
                <WeeklyMoodCalendar checkIns={checkIns} />

                <div className="week-stats">
                    <div className="stat stat--good">
                        <span className="stat-value">{goodDays}</span>
                        <span className="stat-label">
                            {language === 'de-CH' ? 'gueti Täg' : 'good days'}
                        </span>
                    </div>
                    <div className="stat stat--total">
                        <span className="stat-value">{totalDays}</span>
                        <span className="stat-label">
                            {language === 'de-CH' ? 'Check-ins' : 'check-ins'}
                        </span>
                    </div>
                </div>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="upcoming-appointments">
                <h2 className="section-title">
                    {language === 'de-CH' ? 'Kommendi Termin' : 'Upcoming Appointments'}
                </h2>

                {upcomingAppointments.length === 0 ? (
                    <p className="no-appointments">
                        {language === 'de-CH' ? 'Kei kommendi Termin' : 'No upcoming appointments'}
                    </p>
                ) : (
                    <ul className="appointment-list">
                        {upcomingAppointments.map((apt) => (
                            <li key={apt.id} className="appointment-item">
                                <span className="apt-date">
                                    {new Date(apt.date).toLocaleDateString(
                                        language === 'de-CH' ? 'de-CH' : 'en-US',
                                        { day: 'numeric', month: 'short' }
                                    )}
                                </span>
                                <span className="apt-time">{apt.time}</span>
                                <span className="apt-title">
                                    {language === 'de-CH' ? (apt.titleDe || apt.title) : apt.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    )
}

export default AdvocateDashboard

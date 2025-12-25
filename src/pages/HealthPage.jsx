import { useState } from 'react'
import { Card } from '../components/common'
import WeeklyMoodCalendar from '../components/elder/WeeklyMoodCalendar'
import { useLanguage } from '../contexts/LanguageContext'
import { useData } from '../contexts/DataContext'
import './HealthPage.css'

/**
 * Health Page
 * 
 * Shows health history and mood tracking with weekly calendar.
 */
function HealthPage() {
    const { t, language } = useLanguage()
    const { getRecentCheckIns, checkIns } = useData()
    const [selectedDay, setSelectedDay] = useState(null)

    const recentCheckIns = getRecentCheckIns(7)

    // Calculate stats
    const goodDays = recentCheckIns.filter(c => c.mood === 3).length
    const totalDays = recentCheckIns.length

    // Get trend message
    const getTrendMessage = () => {
        if (totalDays === 0) return t('health.noData')
        const ratio = goodDays / totalDays
        if (ratio >= 0.7) return t('health.trend.improving')
        if (ratio >= 0.4) return t('health.trend.stable')
        return t('health.trend.declining')
    }

    // Handle day click
    const handleDayClick = (day) => {
        setSelectedDay(selectedDay?.dateStr === day.dateStr ? null : day)
    }

    // Format date for display
    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString(language === 'de-CH' ? 'de-CH' : 'en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        })
    }

    return (
        <div className="health-page">
            <h1 className="page-title">❤️ {t('health.title')}</h1>

            {/* Weekly Calendar */}
            <Card className="calendar-card">
                <h2 className="section-title">{t('health.weeklyMood')}</h2>
                <WeeklyMoodCalendar
                    checkIns={checkIns}
                    onDayClick={handleDayClick}
                />

                {/* Stats */}
                <div className="mood-stats">
                    <span className="stat-text">
                        {language === 'de-CH'
                            ? `${goodDays} vo ${totalDays} Täg guet`
                            : `${goodDays} of ${totalDays} days feeling good`
                        }
                    </span>
                </div>
            </Card>

            {/* Selected Day Detail */}
            {selectedDay && (
                <Card className="day-detail-card" variant={selectedDay.checkIn ? 'highlighted' : 'default'}>
                    <h3>{formatDate(selectedDay.dateStr)}</h3>
                    {selectedDay.checkIn ? (
                        <div className="day-detail">
                            <span className="detail-emoji">
                                {selectedDay.mood === 3 && '😊'}
                                {selectedDay.mood === 2 && '😐'}
                                {selectedDay.mood === 1 && '😔'}
                            </span>
                            <span className="detail-time">
                                {language === 'de-CH' ? 'Iicheckt um' : 'Checked in at'} {selectedDay.checkIn.time}
                            </span>
                            {selectedDay.checkIn.notes && (
                                <p className="detail-notes">{selectedDay.checkIn.notes}</p>
                            )}
                        </div>
                    ) : (
                        <p className="no-checkin">
                            {language === 'de-CH' ? 'Kei Check-in a dem Tag' : 'No check-in on this day'}
                        </p>
                    )}
                </Card>
            )}

            {/* Trend Message */}
            <Card className="trend-card">
                <p className="trend-message">{getTrendMessage()}</p>
            </Card>
        </div>
    )
}

export default HealthPage

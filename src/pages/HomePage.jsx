import { useState, useEffect } from 'react'
import { Card, Button } from '../components/common'
import HeidiMessage from '../components/elder/HeidiMessage'
import MoodSelector from '../components/elder/MoodSelector'
import { useLanguage } from '../contexts/LanguageContext'
import { useData } from '../contexts/DataContext'
import './HomePage.css'

/**
 * Elder Home Page
 * 
 * The main page with Heidi's greeting and daily check-in.
 */
function HomePage() {
    const { t } = useLanguage()
    const { getTodayCheckIn, addCheckIn } = useData()

    const [checkInState, setCheckInState] = useState('loading') // loading, ready, confirmed
    const [selectedMood, setSelectedMood] = useState(null)
    const [todayCheckIn, setTodayCheckIn] = useState(null)

    // Check if already checked in today
    useEffect(() => {
        const existing = getTodayCheckIn()
        if (existing) {
            setTodayCheckIn(existing)
            setCheckInState('confirmed')
            // Map mood value to mood id
            const moodMap = { 3: 'good', 2: 'okay', 1: 'notWell' }
            setSelectedMood({
                id: moodMap[existing.mood],
                value: existing.mood
            })
        } else {
            setCheckInState('ready')
        }
    }, [getTodayCheckIn])

    // Handle mood selection
    const handleMoodSelect = (mood) => {
        setSelectedMood(mood)

        // Create new check-in
        const now = new Date()
        const checkIn = {
            id: `checkin-${now.toISOString().split('T')[0]}`,
            date: now.toISOString().split('T')[0],
            time: now.toTimeString().slice(0, 5),
            mood: mood.value,
            notes: '',
            medicationTaken: true,
        }

        addCheckIn(checkIn)
        setTodayCheckIn(checkIn)
        setCheckInState('confirmed')
    }

    // Allow checking in again
    const handleCheckInAgain = () => {
        setCheckInState('ready')
        setSelectedMood(null)
    }

    // Determine Heidi's variant based on state
    const getHeidiVariant = () => {
        if (checkInState === 'confirmed' && selectedMood) {
            return selectedMood.id
        }
        return 'greeting'
    }

    return (
        <div className="home-page">
            <Card className="check-in-card">
                <HeidiMessage variant={getHeidiVariant()} />

                {checkInState === 'ready' && (
                    <div className="check-in-section">
                        <MoodSelector onSelect={handleMoodSelect} />
                    </div>
                )}

                {checkInState === 'confirmed' && (
                    <div className="check-in-confirmed">
                        <div className="confirmed-mood">
                            <span className="confirmed-emoji">
                                {selectedMood?.id === 'good' && '😊'}
                                {selectedMood?.id === 'okay' && '😐'}
                                {selectedMood?.id === 'notWell' && '😔'}
                            </span>
                            <span className="confirmed-time">
                                {todayCheckIn?.time && `Checked in at ${todayCheckIn.time}`}
                            </span>
                        </div>

                        <Button
                            variant="secondary"
                            onClick={handleCheckInAgain}
                            className="check-again-btn"
                        >
                            {t('home.checkInAgain')}
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    )
}

export default HomePage

import { useUser } from '../../contexts/UserContext'
import { useData } from '../../contexts/DataContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { Button } from '../common'
import './DemoPanel.css'

/**
 * Demo Admin Panel
 * 
 * Allows switching between Elder and Advocate views,
 * resetting demo data, and controlling language.
 * 
 * Access via:
 * - Triple-tap on logo
 * - URL parameter: ?admin=true
 */
function DemoPanel({ isOpen, onClose }) {
    const { userType, switchToElder, switchToAdvocate } = useUser()
    const { resetData, elder, advocate } = useData()
    const { language, toggleLanguage, t } = useLanguage()

    if (!isOpen) return null

    const handleReset = () => {
        if (window.confirm('Reset all demo data to defaults?')) {
            resetData()
        }
    }

    return (
        <div className="demo-panel-overlay" onClick={onClose}>
            <div className="demo-panel" onClick={e => e.stopPropagation()}>
                <div className="demo-panel-header">
                    <h2>🛠️ {t('admin.title')}</h2>
                    <button className="demo-panel-close" onClick={onClose}>✕</button>
                </div>

                <div className="demo-panel-content">
                    {/* User Type Section */}
                    <div className="demo-panel-section">
                        <h3>{t('admin.userType')}</h3>
                        <div className="user-type-display">
                            <span className="user-avatar">
                                {userType === 'elder' ? elder?.avatar || '👴' : advocate?.avatar || '👩'}
                            </span>
                            <span className="user-name">
                                {userType === 'elder' ? elder?.fullName : advocate?.fullName}
                            </span>
                            <span className={`user-badge user-badge--${userType}`}>
                                {userType === 'elder' ? t('admin.elder') : t('admin.advocate')}
                            </span>
                        </div>

                        <div className="user-type-buttons">
                            <Button
                                variant={userType === 'elder' ? 'primary' : 'secondary'}
                                onClick={switchToElder}
                            >
                                👴 {t('admin.elder')}
                            </Button>
                            <Button
                                variant={userType === 'advocate' ? 'primary' : 'secondary'}
                                onClick={switchToAdvocate}
                            >
                                👩 {t('admin.advocate')}
                            </Button>
                        </div>
                    </div>

                    {/* Language Section */}
                    <div className="demo-panel-section">
                        <h3>{t('admin.language')}</h3>
                        <div className="language-display">
                            <span>{language === 'de-CH' ? '🇨🇭 Schwiizerdütsch' : '🇬🇧 English'}</span>
                        </div>
                        <Button variant="secondary" onClick={toggleLanguage}>
                            {language === 'de-CH' ? 'Switch to English' : 'Wechsle zu Schwiizerdütsch'}
                        </Button>
                    </div>

                    {/* Data Reset Section */}
                    <div className="demo-panel-section">
                        <h3>{t('admin.resetData')}</h3>
                        <p className="reset-warning">
                            This will reset all check-ins, appointments, and settings to their demo defaults.
                        </p>
                        <Button variant="mood-bad" onClick={handleReset}>
                            🔄 {t('admin.resetData')}
                        </Button>
                    </div>
                </div>

                <div className="demo-panel-footer">
                    <Button variant="primary" onClick={onClose} fullWidth>
                        {t('admin.close')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DemoPanel

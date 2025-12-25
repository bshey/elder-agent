import { Card } from '../components/common'
import { useLanguage } from '../contexts/LanguageContext'
import { useData } from '../contexts/DataContext'
import './ContactsPage.css'

/**
 * Contacts Page
 * 
 * Shows care circle (family and doctors) with large tap targets for calling.
 */
function ContactsPage() {
    const { t, language } = useLanguage()
    const { familyContacts, doctorContacts } = useData()

    // Get relationship label based on language
    const getRelationship = (contact) => {
        return language === 'de-CH'
            ? (contact.relationshipDe || contact.relationship)
            : contact.relationship
    }

    // Get specialty label based on language
    const getSpecialty = (doctor) => {
        return language === 'de-CH'
            ? (doctor.specialtyDe || doctor.specialty)
            : doctor.specialty
    }

    return (
        <div className="contacts-page">
            <h1 className="page-title">👥 {t('contacts.title')}</h1>

            {/* Family Section */}
            <section className="contacts-section">
                <h2 className="section-title">{t('contacts.family')}</h2>
                <div className="contacts-grid">
                    {familyContacts.map((contact) => (
                        <Card key={contact.id} className="contact-card">
                            <div className="contact-avatar">{contact.avatar}</div>
                            <div className="contact-info">
                                <h3 className="contact-name">{contact.name}</h3>
                                <span className="contact-relationship">
                                    {getRelationship(contact)}
                                    {contact.isAdvocate && (
                                        <span className="advocate-badge">★</span>
                                    )}
                                </span>
                            </div>
                            <a
                                href={`tel:${contact.phone}`}
                                className="contact-call-btn"
                                aria-label={`${t('contacts.call')} ${contact.name}`}
                            >
                                📞 {t('contacts.call')}
                            </a>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Doctors Section */}
            <section className="contacts-section">
                <h2 className="section-title">{t('contacts.doctors')}</h2>
                <div className="contacts-grid">
                    {doctorContacts.map((doctor) => (
                        <Card key={doctor.id} className="contact-card contact-card--doctor">
                            <div className="contact-avatar">{doctor.avatar}</div>
                            <div className="contact-info">
                                <h3 className="contact-name">{doctor.name}</h3>
                                <span className="contact-specialty">{getSpecialty(doctor)}</span>
                                <span className="contact-clinic">{doctor.clinic}</span>
                            </div>
                            <a
                                href={`tel:${doctor.phone}`}
                                className="contact-call-btn"
                                aria-label={`${t('contacts.call')} ${doctor.name}`}
                            >
                                📞 {t('contacts.call')}
                            </a>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ContactsPage

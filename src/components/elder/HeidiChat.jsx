import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useData } from '../../contexts/DataContext'
import './HeidiChat.css'

/**
 * Heidi Chat Widget
 * 
 * A floating chat interface where elders can interact with Heidi.
 * Shows suggested prompts and accepts text input.
 */
function HeidiChat() {
    const { language } = useLanguage()
    const { elder, getUpcomingAppointments } = useData()
    const [isExpanded, setIsExpanded] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [messages, setMessages] = useState([])

    // Suggested prompts
    const suggestedPrompts = language === 'de-CH' ? [
        { id: 'week', text: '📅 Was chunnt die Wuche?', icon: '📅' },
        { id: 'appointment', text: '🏥 Wänn isch min nächst Termin?', icon: '🏥' },
        { id: 'feeling', text: '💭 Ich möcht rede', icon: '💭' },
        { id: 'call', text: '📞 Ruf mini Familie aa', icon: '📞' },
    ] : [
        { id: 'week', text: "📅 What's coming up this week?", icon: '📅' },
        { id: 'appointment', text: '🏥 When is my next appointment?', icon: '🏥' },
        { id: 'feeling', text: "💭 I'd like to talk", icon: '💭' },
        { id: 'call', text: '📞 Call my family', icon: '📞' },
    ]

    // Get Heidi's response based on prompt
    const getHeidiResponse = (promptId) => {
        const appointments = getUpcomingAppointments()
        const nextApt = appointments[0]

        switch (promptId) {
            case 'week':
                if (appointments.length === 0) {
                    return language === 'de-CH'
                        ? 'Du hesch die Wuche kei Termin. E ruhigi Wuche! 😊'
                        : 'You have no appointments this week. A quiet week! 😊'
                }
                return language === 'de-CH'
                    ? `Du hesch ${appointments.length} Termin die Wuche. De nächst isch ${nextApt.titleDe || nextApt.title} am ${new Date(nextApt.date).toLocaleDateString('de-CH', { weekday: 'long' })}.`
                    : `You have ${appointments.length} appointments this week. The next one is ${nextApt.title} on ${new Date(nextApt.date).toLocaleDateString('en-US', { weekday: 'long' })}.`

            case 'appointment':
                if (!nextApt) {
                    return language === 'de-CH'
                        ? 'Du hesch momentan kei Termin iitrage.'
                        : "You don't have any appointments scheduled."
                }
                return language === 'de-CH'
                    ? `Din nächst Termin isch ${nextApt.titleDe || nextApt.title} am ${new Date(nextApt.date).toLocaleDateString('de-CH')} um ${nextApt.time}. 📍 ${nextApt.location}`
                    : `Your next appointment is ${nextApt.title} on ${new Date(nextApt.date).toLocaleDateString('en-US')} at ${nextApt.time}. 📍 ${nextApt.location}`

            case 'feeling':
                return language === 'de-CH'
                    ? `Ich bin da für dich, ${elder?.name}. Was beschäftigt dich? Du chasch mir alles verzelle. 💚`
                    : `I'm here for you, ${elder?.name}. What's on your mind? You can tell me anything. 💚`

            case 'call':
                return language === 'de-CH'
                    ? 'Ich cha leider nonig telefoniǝre, aber du chasch uf "Kontäkt" drucke und vo det aalüte! 📱'
                    : 'I can\'t make calls yet, but you can tap "Contacts" and call from there! 📱'

            default:
                return language === 'de-CH'
                    ? `Das isch e super Frag! Ich lern immer no, aber ich bi da für dich. 😊`
                    : `That's a great question! I'm still learning, but I'm here for you. 😊`
        }
    }

    // Handle prompt click
    const handlePromptClick = (prompt) => {
        const userMessage = { type: 'user', text: prompt.text }
        const heidiMessage = { type: 'heidi', text: getHeidiResponse(prompt.id) }

        setMessages(prev => [...prev, userMessage, heidiMessage])
        setInputValue('')
    }

    // Handle text input submit
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const userMessage = { type: 'user', text: inputValue }
        const heidiMessage = { type: 'heidi', text: getHeidiResponse('default') }

        setMessages(prev => [...prev, userMessage, heidiMessage])
        setInputValue('')
    }

    // Clear chat
    const handleClearChat = () => {
        setMessages([])
    }

    return (
        <div className={`heidi-chat ${isExpanded ? 'heidi-chat--expanded' : ''}`}>
            {/* Collapsed State - Just the avatar button */}
            {!isExpanded && (
                <button
                    className="heidi-chat-trigger"
                    onClick={() => setIsExpanded(true)}
                    aria-label={language === 'de-CH' ? 'Mit Heidi rede' : 'Talk to Heidi'}
                >
                    <span className="heidi-trigger-avatar">👩‍🦳</span>
                    <span className="heidi-trigger-bubble">
                        {language === 'de-CH' ? 'Hoi! Cha ich hälfe?' : 'Hi! Can I help?'}
                    </span>
                </button>
            )}

            {/* Expanded Chat Window */}
            {isExpanded && (
                <div className="heidi-chat-window">
                    {/* Header */}
                    <div className="heidi-chat-header">
                        <div className="heidi-chat-avatar">👩‍🦳</div>
                        <div className="heidi-chat-info">
                            <span className="heidi-chat-name">Heidi</span>
                            <span className="heidi-chat-status">
                                {language === 'de-CH' ? 'Din Begleiter' : 'Your companion'}
                            </span>
                        </div>
                        <button
                            className="heidi-chat-close"
                            onClick={() => setIsExpanded(false)}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="heidi-chat-messages">
                        {messages.length === 0 ? (
                            <div className="heidi-welcome">
                                <p className="heidi-welcome-text">
                                    {language === 'de-CH'
                                        ? `Grüezi ${elder?.name}! 👋 Wie cha ich dir hälfe?`
                                        : `Hello ${elder?.name}! 👋 How can I help you?`
                                    }
                                </p>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`chat-message chat-message--${msg.type}`}
                                >
                                    {msg.type === 'heidi' && <span className="message-avatar">👩‍🦳</span>}
                                    <span className="message-text">{msg.text}</span>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Suggested Prompts */}
                    <div className="heidi-prompts">
                        {suggestedPrompts.map((prompt) => (
                            <button
                                key={prompt.id}
                                className="heidi-prompt-btn"
                                onClick={() => handlePromptClick(prompt)}
                            >
                                {prompt.text}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <form className="heidi-chat-input" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={language === 'de-CH' ? 'Schriib öppis...' : 'Type something...'}
                            className="heidi-input-field"
                        />
                        <button type="submit" className="heidi-send-btn" aria-label="Send">
                            ➤
                        </button>
                    </form>

                    {/* Clear button */}
                    {messages.length > 0 && (
                        <button className="heidi-clear-btn" onClick={handleClearChat}>
                            {language === 'de-CH' ? 'Chat lösche' : 'Clear chat'}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default HeidiChat

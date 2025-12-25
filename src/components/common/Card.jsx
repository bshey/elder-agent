import './Card.css'

/**
 * Silvermaner Card Component
 * 
 * A container component for grouping related content
 * with rounded corners and shadow.
 * 
 * @param {ReactNode} children - Card content
 * @param {string} variant - 'default' | 'highlighted' | 'alert'
 * @param {boolean} padded - Whether to add internal padding
 * @param {string} className - Additional CSS classes
 */
function Card({
    children,
    variant = 'default',
    padded = true,
    className = '',
    ...props
}) {
    const classNames = [
        'card',
        `card--${variant}`,
        padded && 'card--padded',
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={classNames} {...props}>
            {children}
        </div>
    )
}

/**
 * Card Header - Optional title area
 */
function CardHeader({ children, className = '' }) {
    return (
        <div className={`card-header ${className}`}>
            {children}
        </div>
    )
}

/**
 * Card Body - Main content area
 */
function CardBody({ children, className = '' }) {
    return (
        <div className={`card-body ${className}`}>
            {children}
        </div>
    )
}

/**
 * Card Footer - Optional action area
 */
function CardFooter({ children, className = '' }) {
    return (
        <div className={`card-footer ${className}`}>
            {children}
        </div>
    )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card

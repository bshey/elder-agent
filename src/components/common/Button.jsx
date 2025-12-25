import './Button.css'

/**
 * Silvermaner Button Component
 * 
 * Designed for elderly users with:
 * - Large touch targets (min 60px height)
 * - High contrast colors
 * - Clear visual states
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'mood-good' | 'mood-okay' | 'mood-bad'
 * @param {string} size - 'normal' | 'large'
 * @param {boolean} fullWidth - Whether button takes full container width
 * @param {ReactNode} children - Button content
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional props passed to button element
 */
function Button({
    variant = 'primary',
    size = 'normal',
    fullWidth = false,
    children,
    onClick,
    className = '',
    disabled = false,
    ...props
}) {
    const classNames = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth && 'btn--full-width',
        disabled && 'btn--disabled',
        className
    ].filter(Boolean).join(' ')

    return (
        <button
            className={classNames}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button

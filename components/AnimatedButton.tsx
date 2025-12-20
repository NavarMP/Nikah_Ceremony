import React from 'react';
import styles from './AnimatedButton.module.css';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    href?: string;
    target?: string;
    rel?: string;
    showArrows?: boolean;
    isActive?: boolean;
    icon?: React.ReactNode;
}

// Helper to determine component type
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
    text,
    href,
    className,
    showArrows = true,
    isActive = false,
    icon,
    children,
    ...props
}) => {
    const combinedClassName = `${styles.animatedButton} ${!showArrows ? styles.noArrow : ''} ${isActive ? styles.active : ''} ${className || ''}`;

    // Content inside the button/link
    const content = (
        <>
            {showArrows && (
                <svg viewBox="0 0 24 24" className={styles['arr-2']} xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
            )}

            <span className={styles.text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {icon}
                {text}
            </span>

            <span className={styles.circle}></span>

            {showArrows && (
                <svg viewBox="0 0 24 24" className={styles['arr-1']} xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
            )}
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className={combinedClassName}
                target={props.target}
                rel={props.rel}
            >
                {content}
            </a>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {content}
        </button>
    );
};

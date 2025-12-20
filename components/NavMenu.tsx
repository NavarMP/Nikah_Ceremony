'use client';

import { useState, useRef, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import styles from './NavMenu.module.css';

export function NavMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={styles.navContainer} ref={menuRef}>
            {/* Desktop: Side by side */}
            <div className={styles.desktopMenu}>
                <ThemeToggle />
                <LanguageToggle />
            </div>

            {/* Mobile: Hamburger */}
            <div className={styles.mobileToggle}>
                <label className={styles.hamburgerContainer}>
                    <input
                        type="checkbox"
                        checked={isOpen}
                        onChange={() => setIsOpen(!isOpen)}
                    />
                    <div className={styles.checkmark}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </label>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileMenuItem}>
                        <ThemeToggle />
                    </div>
                    <div className={styles.mobileMenuItem}>
                        <LanguageToggle />
                    </div>
                </div>
            )}
        </div>
    );
}

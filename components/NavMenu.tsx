'use client';

import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import styles from './NavMenu.module.css';
import { Menu, X } from 'lucide-react';

export function NavMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.navContainer}>
            {/* Desktop: Side by side */}
            <div className={styles.desktopMenu}>
                <ThemeToggle />
                <LanguageToggle />
            </div>

            {/* Mobile: Hamburger */}
            <div className={styles.mobileToggle}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={styles.menuButton}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
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

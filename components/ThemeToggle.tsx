'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Avoid hydration mismatch
    }

    return (
        <div style={{ display: 'flex', gap: '8px', padding: '8px', background: 'var(--card)', borderRadius: '20px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
            <button
                onClick={() => setTheme('light')}
                aria-label="Light Mode"
                style={{
                    padding: '8px',
                    borderRadius: '50%',
                    border: 'none',
                    background: theme === 'light' ? 'var(--primary)' : 'transparent',
                    color: theme === 'light' ? 'var(--background)' : 'var(--foreground)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                }}
            >
                <Sun size={18} />
            </button>
            <button
                onClick={() => setTheme('dark')}
                aria-label="Dark Mode"
                style={{
                    padding: '8px',
                    borderRadius: '50%',
                    border: 'none',
                    background: theme === 'dark' ? 'var(--primary)' : 'transparent',
                    color: theme === 'dark' ? 'var(--background)' : 'var(--foreground)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                }}
            >
                <Moon size={18} />
            </button>
            <button
                onClick={() => setTheme('system')}
                aria-label="System Mode"
                style={{
                    padding: '8px',
                    borderRadius: '50%',
                    border: 'none',
                    background: theme === 'system' ? 'var(--primary)' : 'transparent',
                    color: theme === 'system' ? 'var(--background)' : 'var(--foreground)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                }}
            >
                <Monitor size={18} />
            </button>
        </div>
    );
}

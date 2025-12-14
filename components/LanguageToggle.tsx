'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/dictionary';

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
    };

    const getLabel = (lang: Language) => {
        switch (lang) {
            case 'en': return 'En';
            case 'ml': return 'മല';
            case 'ar': return 'عربي';
            default: return 'En';
        }
    };

    const buttonStyle = (lang: Language) => ({
        padding: '8px 12px',
        borderRadius: '20px',
        border: 'none',
        background: language === lang ? 'var(--primary)' : 'transparent',
        color: language === lang ? 'var(--background)' : 'var(--foreground)',
        cursor: 'pointer',
        fontWeight: language === lang ? 'bold' : 'normal',
        transition: 'all 0.3s ease',
        fontSize: '14px',
        fontFamily: lang === 'ml' ? 'inherit' : lang === 'ar' ? 'serif' : 'inherit' // Basic font adjustments
    });

    return (
        <div style={{ display: 'flex', gap: '4px', padding: '4px', background: 'var(--card)', borderRadius: '24px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
            <button onClick={() => handleLanguageChange('en')} style={buttonStyle('en')}>
                En
            </button>
            <button onClick={() => handleLanguageChange('ml')} style={buttonStyle('ml')}>
                മല
            </button>
            <button onClick={() => handleLanguageChange('ar')} style={buttonStyle('ar')}>
                عربي
            </button>
        </div>
    );
}

'use client';

import { CalendarPlus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function AddToCalendar() {
    const { t } = useLanguage();

    const event = {
        title: "Binyamin & Nasla Nikah Ceremony",
        details: "We want to share happiness with our loved ones. Come and celebrate our Nikah ceremony.",
        location: "Oasis Avenue, Chirappalam, Kadungallur",
        beginDate: "20251226T033000Z", // 09:00 AM IST is 03:30 AM UTC
        endDate: "20251226T073000Z",   // Estimate 4 hours
    };

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.beginDate}/${event.endDate}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;

    return (
        <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'var(--primary)',
                color: 'var(--background)',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 'bold',
                marginTop: '20px',
                transition: 'transform 0.2s',
                boxShadow: 'var(--shadow)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <CalendarPlus size={20} />
            {t.addToCalendar}
        </a>
    );
}

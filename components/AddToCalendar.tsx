'use client';

import { CalendarPlus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatedButton } from './AnimatedButton';

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
        <AnimatedButton
            text={t.addToCalendar}
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
        />
    );
}


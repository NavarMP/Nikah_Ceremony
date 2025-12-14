'use client';

import { useLanguage } from '@/context/LanguageContext';

export function LocationMap() {
    const { t } = useLanguage();
    // Using a generic location query for "Oasis Avenue, Chirappalam, Kadungallur" as specific coordinates weren't provided, or falling back to a nearby known point if needed.
    // Ideally user provides coordinates. For now, we search query.
    const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.66787654321!2d76.26!3d10.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sOasis%20Convention%20Centre!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin&section=traffic&q=Oasis+Avenue+Chirappalam+Kadungallur`;
    // Note: The specific Embed URL usually requires an API key or a specific embed mode. 
    // Using the standard embed iframe format for a search query.
    // Updating to a more robust search embed format without specific PB parameters if possible, or sticking to a generic one.
    // Let's use the standard "place" mode which is easier without an API Key for casual use, or just the search mode.

    // Attempting a cleaner embed search URL
    const cleanMapSrc = `https://maps.google.com/maps?q=Oasis+Avenue,+Chirappalam,+Kadungallur&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div style={{ width: '100%', marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                width: '100%',
                maxWidth: '600px',
                height: '300px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)',
                marginBottom: '15px'
            }}>
                <iframe
                    src={cleanMapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <a
                href="https://www.google.com/maps/search/?api=1&query=Oasis+Avenue,+Chirappalam,+Kadungallur"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--primary)',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem'
                }}
            >
                {t.getDirections}
            </a>
        </div>
    );
}

'use client';

import { AnimatedButton } from './AnimatedButton';
import { useLanguage } from '@/context/LanguageContext';
import { Download } from 'lucide-react';

export function DownloadFlyer() {
    const { t } = useLanguage();

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/assets/invitation.jpg';
        link.download = 'Binyamin_Nasla_Nikah_Invite.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AnimatedButton
            text={t.downloadFlyer}
            onClick={handleDownload}
            icon={<Download size={20} />}
            showArrows={false}
        />
    );
}

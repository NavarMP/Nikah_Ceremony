'use client';

import { useState } from 'react';
import { AnimatedButton } from './AnimatedButton';
import { useLanguage } from '@/context/LanguageContext';
import { Download, Loader2, ExternalLink } from 'lucide-react';

type DownloadStatus = 'idle' | 'downloading' | 'open';

export function DownloadFlyer() {
    const { t } = useLanguage();
    const [status, setStatus] = useState<DownloadStatus>('idle');

    const handleDownload = () => {
        if (status === 'open') {
            window.open('/assets/invitation.jpg', '_blank');
            return;
        }

        if (status === 'downloading') return;

        setStatus('downloading');

        // Simulate download delay for visual feedback
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '/assets/invitation.jpg';
            link.download = 'Binyamin_Nasla_Nikah_Invite.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setStatus('open');
        }, 2000);
    };

    const getButtonContent = () => {
        switch (status) {
            case 'downloading':
                return {
                    text: t.downloading,
                    icon: <Loader2 size={20} className="animate-spin" />,
                    showArrows: false
                };
            case 'open':
                return {
                    text: t.openFlyer,
                    icon: <ExternalLink size={20} />,
                    showArrows: true
                };
            default:
                return {
                    text: t.downloadFlyer,
                    icon: <Download size={20} />,
                    showArrows: false
                };
        }
    };

    const content = getButtonContent();

    return (
        <AnimatedButton
            text={content.text}
            onClick={handleDownload}
            icon={content.icon}
            showArrows={content.showArrows}
            disabled={status === 'downloading'}
        />
    );
}

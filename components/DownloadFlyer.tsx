'use client';

import { Download } from 'lucide-react';
import styles from '../app/page.module.css';

export function DownloadFlyer() {
    return (
        <a
            href="/assets/invitation.jpg"
            download="Binyamin_Nasla_Nikah_Invite.jpg"
            className={styles.actionButton}
        >
            <Download size={16} />
            <span>Download Flyer</span>
        </a>
    );
}

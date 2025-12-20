'use client';

import { useState } from 'react';
import styles from './DownloadFlyer.module.css';

export function DownloadFlyer() {
    const [isChecked, setIsChecked] = useState(false);

    const handleDownload = () => {
        if (!isChecked) {
            setIsChecked(true);

            // Trigger actual download (delayed slightly or immediate)
            const link = document.createElement('a');
            link.href = '/assets/invitation.jpg';
            link.download = 'Binyamin_Nasla_Nikah_Invite.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Optional: Toggle back after animation? Or keep it "Open"?
            // Keeping it stateful as per UI "Open" state.
        } else {
            // If clicked again (Open state), maybe open the file in new tab?
            window.open('/assets/invitation.jpg', '_blank');
        }
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>
                <input
                    type="checkbox"
                    className={styles.input}
                    checked={isChecked}
                    onChange={handleDownload}
                />
                <span className={styles.circle}>
                    <svg
                        className={styles.icon}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 19V5m0 14-4-4m4 4 4-4"
                        ></path>
                    </svg>
                    <div className={styles.square}></div>
                </span>
                <p className={styles.title}>Download Flyer</p>
                <p className={styles.title}>Open Flyer</p>
            </label>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { Bell, BellRing, ChevronDown } from 'lucide-react';
import styles from '../app/page.module.css';

export function WebReminder() {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [isReminderSet, setIsReminderSet] = useState(false);
    const [reminderTime, setReminderTime] = useState('day_before');

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
            const reminder = localStorage.getItem('nikah_reminder');
            if (reminder) {
                setIsReminderSet(true);
                // We could also check logic here
            }
        }
    }, []);

    const toggleReminder = async () => {
        if (isReminderSet) {
            // Remove reminder
            localStorage.removeItem('nikah_reminder');
            setIsReminderSet(false);
            return;
        }

        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification');
            return;
        }

        let perm = permission;
        if (perm === 'default') {
            perm = await Notification.requestPermission();
            setPermission(perm);
        }

        if (perm === 'granted') {
            // Event: Dec 26, 2025 11:00 AM
            const eventDate = new Date('2025-12-26T11:00:00').getTime();
            let reminderDate = eventDate;

            if (reminderTime === 'day_before') {
                reminderDate = eventDate - (24 * 60 * 60 * 1000); // 1 day before
            } else if (reminderTime === 'week_before') {
                reminderDate = eventDate - (7 * 24 * 60 * 60 * 1000); // 1 week before
            } else if (reminderTime === 'morning_of') {
                reminderDate = new Date('2025-12-26T08:00:00').getTime(); // 8 AM on the day
            }

            localStorage.setItem('nikah_reminder', JSON.stringify({
                type: reminderTime,
                date: reminderDate
            }));
            setIsReminderSet(true);

            new Notification("Reminder Set!", {
                body: `We will remind you ${reminderTime.replace('_', ' ')}.`,
            });
        }
    };

    const buttonContent = (
        <button
            onClick={toggleReminder}
            className={styles.actionButton}
        // disabled={isReminderSet} -> Removed disabled to allow click to unset
        >
            {isReminderSet ? <BellRing size={16} /> : <Bell size={16} />}
            {isReminderSet ? 'Reminder Set' : 'Set Reminder'}
        </button>
    );

    if (isReminderSet) {
        return buttonContent;
    }

    return (
        <div className={styles.reminderGroup}>
            <div className={styles.selectWrapper}>
                <select
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className={styles.reminderSelect}
                >
                    <option value="day_before">1 Day Before</option>
                    <option value="week_before">1 Week Before</option>
                    <option value="morning_of">Morning of Event</option>
                </select>
                <ChevronDown size={14} className={styles.selectIcon} />
            </div>
            {buttonContent}
        </div>
    );
}

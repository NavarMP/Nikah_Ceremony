'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, BellRing, ChevronDown } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';
import styles from './WebReminder.module.css';

export function WebReminder() {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [isReminderSet, setIsReminderSet] = useState(false);
    const [reminderTime, setReminderTime] = useState('day_before');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Close dropdown on click outside
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
            const reminder = localStorage.getItem('nikah_reminder');
            if (reminder) {
                setIsReminderSet(true);
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

    const options = [
        { value: 'day_before', label: '1 Day Before' },
        { value: 'week_before', label: '1 Week Before' },
        { value: 'morning_of', label: 'Morning of Event' }
    ];

    const currentLabel = options.find(o => o.value === reminderTime)?.label;

    return (
        <div className={`${styles.reminderGroup} ${isReminderSet ? styles.set : ''}`}>
            {!isReminderSet && (
                <div className={styles.selectWrapper} ref={dropdownRef}>
                    <div
                        className={styles.customSelectTrigger}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span>{currentLabel}</span>
                        <ChevronDown size={14} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                    </div>
                    <div className={`${styles.customSelectOptions} ${isDropdownOpen ? styles.open : ''}`}>
                        {options.map(option => (
                            <div
                                key={option.value}
                                className={`${styles.option} ${reminderTime === option.value ? styles.selected : ''}`}
                                onClick={() => {
                                    setReminderTime(option.value);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <AnimatedButton
                onClick={toggleReminder}
                text={isReminderSet ? 'Reminder Set' : 'Set Reminder'}
                showArrows={false}
                icon={isReminderSet ? <BellRing size={16} /> : <Bell size={16} />}
                isActive={isReminderSet}
            />
        </div>
    );
}

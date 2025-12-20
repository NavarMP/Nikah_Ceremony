import React from 'react';
import styles from './SaveTheDate.module.css';

interface SaveTheDateProps {
    text?: string;
}

export const SaveTheDate: React.FC<SaveTheDateProps> = ({ text = "Save the Date" }) => {
    return (
        <div className={styles.svgContainer}>
            <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
                {/* Stroke path for animation */}
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="100"
                    className={styles.handwrittenText}
                >
                    {text}
                </text>
                {/* Fill text that fades in after stroke */}
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="100"
                    className={styles.fillText}
                >
                    {text}
                </text>
            </svg>
        </div>
    );
};

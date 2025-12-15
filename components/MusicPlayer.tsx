'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import styles from './MusicPlayer.module.css';

export function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showVolume, setShowVolume] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    // Swipe handling
    const touchStartX = useRef(0);
    const currentTranslateX = useRef(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Autoplay attempt
        const tryPlay = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.log("Autoplay prevented:", error);
                setIsPlaying(false);
            }
        };

        tryPlay();

        const handleGlobalClick = () => {
            if (audioRef.current?.paused && audioRef.current?.readyState >= 2 && !isPlaying) {
                tryPlay();
            }
        };

        document.addEventListener('click', handleGlobalClick, { once: true });
        document.addEventListener('touchstart', handleGlobalClick, { once: true });

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

        // Robust duration handling
        const handleDurationChange = () => {
            const d = audio.duration;
            if (!isNaN(d) && d !== Infinity) {
                setDuration(d);
            }
        };

        // Also check if metadata already loaded
        if (audio.readyState >= 1) {
            handleDurationChange();
        }

        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('loadedmetadata', handleDurationChange);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('durationchange', handleDurationChange);
            audio.removeEventListener('loadedmetadata', handleDurationChange);
            audio.removeEventListener('ended', handleEnded);
            document.removeEventListener('click', handleGlobalClick);
            document.removeEventListener('touchstart', handleGlobalClick);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // prevent swipe triggers if any
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));

        if (audioRef.current && duration) {
            const newTime = percentage * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation(); // Prevent swipe
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time) || time === Infinity) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Swipe Logic 1:1 Tracking
    const onTouchStart = (e: React.TouchEvent) => {
        // Don't track if touch started on volume slider or close button handled by stopPropagation ideally
        touchStartX.current = e.targetTouches[0].clientX;
        setIsDragging(true);
        // Remove animation class for instant tracking
        if (containerRef.current) {
            containerRef.current.classList.remove(styles.animating);
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentX = e.targetTouches[0].clientX;
        const delta = currentX - touchStartX.current;

        // Only allow swiping (negative delta = left, positive = right)
        // We can restrict direction if needed, but multidirectional is fine for dismissal
        currentTranslateX.current = delta;

        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(calc(-50% + ${delta}px))`;
            // Note: -50% is the base mobile position. 
            // However, desktop has different base. 
            // We should rely on the CSS base and just use translate3d if possible, 
            // but since CSS uses left: 50% transform: translateX(-50%), we need to maintain that offset.
            // Let's check window width or simple generic transform.

            // Actually, simpler approach: Apply `transform: translateX(delta)` on top of CSS? 
            // No, inline style overrides. 
            // If window.innerWidth <= 768: `translateX(calc(-50% + ${delta}px))`
            // If desktop: `translateX(${delta}px)` (since desktop starts at 0)

            if (window.innerWidth <= 768) {
                containerRef.current.style.transform = `translateX(calc(-50% + ${delta}px))`;
            } else {
                containerRef.current.style.transform = `translateX(${delta}px)`;
            }
            containerRef.current.style.opacity = `${1 - Math.abs(delta) / 300}`; // Fade out
        }
    };

    const onTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        if (containerRef.current) {
            containerRef.current.classList.add(styles.animating); // Add smooth transition for snap/dismiss

            const threshold = 100; // px
            if (Math.abs(currentTranslateX.current) > threshold) {
                // Dismiss
                const direction = currentTranslateX.current > 0 ? 1 : -1;
                // Move completely off screen
                if (window.innerWidth <= 768) {
                    containerRef.current.style.transform = `translateX(calc(-50% + ${direction * 100}vw))`;
                } else {
                    containerRef.current.style.transform = `translateX(${direction * 100}vw)`;
                }
                containerRef.current.style.opacity = '0';
                setTimeout(() => setIsHidden(true), 300); // Unmount after animation
            } else {
                // Snap back
                if (window.innerWidth <= 768) {
                    containerRef.current.style.transform = 'translateX(-50%)';
                } else {
                    containerRef.current.style.transform = 'translateX(0)';
                }
                containerRef.current.style.opacity = '1';
            }
        }
        currentTranslateX.current = 0;
    };

    const handleContainerClick = (e: React.MouseEvent) => {
        // Prevent dismissal when clicking inside if we had "click outside to dismiss" (not case here)
        // But ensures clicks on player don't bubble up weirdly
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    if (isHidden) return null;

    return (
        <div
            className={styles.container}
            ref={containerRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={handleContainerClick}
        >
            <button
                className={styles.closeBtn}
                onClick={(e) => { e.stopPropagation(); setIsHidden(true); }}
                aria-label="Close music player"
            >
                <X size={14} />
            </button>

            <audio
                ref={audioRef}
                src="/assets/Wedding - Muhammad Al Muqit.mp3"
                loop
            />

            <div className={styles.card}>
                <div className={styles.top}>
                    <div className={styles.pfp}>
                        <div className={`${styles.playing} ${isPlaying ? styles.isPlaying : ''}`}>
                            <div className={`${styles.greenline} ${styles.line1}`}></div>
                            <div className={`${styles.greenline} ${styles.line2}`}></div>
                            <div className={`${styles.greenline} ${styles.line3}`}></div>
                            <div className={`${styles.greenline} ${styles.line4}`}></div>
                            <div className={`${styles.greenline} ${styles.line5}`}></div>
                        </div>
                    </div>
                    <div className={styles.texts}>
                        <p className={styles.title1}>عروسة النور</p>
                        <p className={styles.title2}>Muhammad Al Muqit</p>
                    </div>
                </div>

                <div className={styles.songTime}>
                    <p className={styles.timetext}>
                        {formatTime(currentTime)}
                    </p>
                    <div className={styles.time} onClick={handleProgressChange} onTouchStart={(e) => e.stopPropagation()}>
                        <div
                            className={styles.elapsed}
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                    <p className={styles.timetext}>
                        {formatTime(duration)}
                    </p>
                </div>

                <div className={styles.controls}>
                    <button
                        className={styles.playBtn}
                        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                        aria-label={isPlaying ? "Pause music" : "Play music"}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        {isPlaying ? (
                            <Pause size={28} fill="currentColor" />
                        ) : (
                            <Play size={28} fill="currentColor" />
                        )}
                    </button>

                    <div
                        className={styles.volumeWrapper}
                        onMouseEnter={() => setShowVolume(true)}
                        onMouseLeave={() => setShowVolume(false)}
                        onTouchStart={(e) => e.stopPropagation()} // Stop swipe
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.volumeBtn}
                            onClick={(e) => { e.stopPropagation(); setShowVolume(!showVolume); }}
                        >
                            {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>

                        <div className={`${styles.volumeContainer} ${showVolume ? styles.showVolume : ''}`} onClick={(e) => e.stopPropagation()}>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className={styles.volumeSlider}
                                onTouchStart={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

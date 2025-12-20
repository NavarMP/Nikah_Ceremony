'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, ChevronUp } from 'lucide-react';
import Image from 'next/image';
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
    const [isExpanded, setIsExpanded] = useState(false);

    // Swipe handling
    const touchStartX = useRef(0);
    const currentTranslateX = useRef(0);
    const [isDragging, setIsDragging] = useState(false);

    // Click outside to collapse
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (isExpanded && containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        }

        if (isExpanded) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", (e) => handleClickOutside(e as unknown as MouseEvent));
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", (e) => handleClickOutside(e as unknown as MouseEvent));
        };
    }, [isExpanded]);

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
        touchStartX.current = e.targetTouches[0].clientX;
        setIsDragging(true);
        if (containerRef.current) {
            containerRef.current.classList.remove(styles.animating);
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentX = e.targetTouches[0].clientX;
        const delta = currentX - touchStartX.current;
        currentTranslateX.current = delta;

        if (containerRef.current) {
            if (window.innerWidth <= 768) {
                containerRef.current.style.transform = `translateX(calc(-50% + ${delta}px))`;
            } else {
                containerRef.current.style.transform = `translateX(${delta}px)`;
            }
            containerRef.current.style.opacity = `${1 - Math.abs(delta) / 300}`;
        }
    };

    const onTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        if (containerRef.current) {
            containerRef.current.classList.add(styles.animating);

            const threshold = 100; // px
            if (Math.abs(currentTranslateX.current) > threshold) {
                const direction = currentTranslateX.current > 0 ? 1 : -1;
                if (window.innerWidth <= 768) {
                    containerRef.current.style.transform = `translateX(calc(-50% + ${direction * 100}vw))`;
                } else {
                    containerRef.current.style.transform = `translateX(${direction * 100}vw)`;
                }
                containerRef.current.style.opacity = '0';
                setTimeout(() => setIsHidden(true), 300);
            } else {
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
        // e.stopPropagation();
    };

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    if (isHidden) return null;

    return (
        <div
            className={`${styles.container} ${!isExpanded ? styles.compact : ''}`}
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

                {/* Left: Cover Art */}
                <div className={styles.coverWrapper}>
                    <Image
                        src="/assets/music cover.jpg"
                        alt="Album Cover"
                        width={300}
                        height={300}
                        className={styles.coverImage}
                    />
                </div>

                {/* Middle: Content */}
                <div className={styles.middleContent}>
                    {/* Text Track - Hidden in Compact Mode logic handled via CSS or conditional */}
                    <div className={`${styles.textTrack} ${!isExpanded ? styles.hidden : ''}`}>
                        <p className={styles.titleComp}>عروسة النور</p>
                        <p className={styles.artistComp}>Muhammad Al Muqit</p>
                    </div>

                    {!isExpanded && (
                        <div className={styles.compactControls}>
                            <button className={styles.miniPlayBtn} onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
                                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                            </button>

                            <div className={styles.compactProgressWrapper} onClick={handleProgressChange} onTouchStart={(e) => e.stopPropagation()}>
                                <div className={styles.compactProgressBar}>
                                    <div className={styles.compactProgressFill} style={{ width: `${progressPercent}%` }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* Expanded Content (Hidden in compact) */}
                <div className={styles.expandedContent}>
                    <div className={styles.songTime}>
                        <p className={styles.timetext}>{formatTime(currentTime)}</p>
                        <div className={styles.time} onClick={handleProgressChange} onTouchStart={(e) => e.stopPropagation()}>
                            <div className={styles.elapsed} style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <p className={styles.timetext}>{formatTime(duration)}</p>
                    </div>

                    <div className={styles.controls}>
                        <button className={styles.playBtn} onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
                            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                        </button>

                        <div
                            className={styles.volumeWrapper}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className={styles.volumeBtn} onClick={(e) => { e.stopPropagation(); setShowVolume(!showVolume); }}>
                                {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                            {/* Always show slider in expanded mode? Using logic to auto-show for now */}
                            <div className={`${styles.volumeContainer} ${showVolume ? styles.showVolume : ''}`}>
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

                {/* Right: Chevron */}
                <div className={styles.chevronWrapper} onClick={toggleExpand}>
                    <button className={styles.expandBtn}>
                        <ChevronUp size={20} />
                    </button>
                </div>

            </div>
        </div>
    );
}

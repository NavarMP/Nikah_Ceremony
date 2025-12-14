'use client';

import Image from "next/image";
import { useRef } from 'react';
import { Heart } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from "./page.module.css";
import { AddToCalendar } from "@/components/AddToCalendar";
import { LocationMap } from "@/components/LocationMap";
import { Countdown } from "@/components/Countdown";
import { WebReminder } from "@/components/WebReminder";
import { DownloadFlyer } from "@/components/DownloadFlyer";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, dir, language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  const fontClass = language === 'ml' ? 'font-malayalam' : language === 'ar' ? 'font-arabic' : '';

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(`.${styles.saveTheDate}`,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(`.${styles.namesWrapper}`,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo([`.${styles.message}`, `.${styles.dateSection}`, `.${styles.timeLocation}`],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
        "-=0.5"
      )
      .fromTo(`.${styles.duaSection}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.2"
      );

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className={`${styles.container} ${fontClass}`} dir={dir}>


      {/* Decorative Ornaments (Optional: using local SVG or keeping it simple with CSS shapes/borders for now) */}
      {/* <div className={styles.ornamentTop}></div> */}

      <div className={styles.parent}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <span className={styles.circle + " " + styles.circle1}></span>
            <span className={styles.circle + " " + styles.circle2}></span>
            <span className={styles.circle + " " + styles.circle3}></span>
            <span className={styles.circle + " " + styles.circle4}></span>
            <span className={styles.circle + " " + styles.circle5}>
              {/* Small heart icon or similar in center */}
              <svg viewBox="0 0 24 24" fill="" height="24" width="24" className={styles.svg} style={{ fill: 'white' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            </span>
          </div>

          <div className={styles.glass}></div>

          <div className={styles.content}>
            <div className={styles.saveTheDate}>{t.saveTheDate}</div>

            <div className={styles.namesWrapper}>
              <h1 className={styles.name}>{t.names.groom}</h1>
              <div className={styles.heartWrapper}>
                <div className={styles['cssload-main']}>
                  <div className={styles['cssload-heart']}>
                    <span className={styles['cssload-heartL']}></span>
                    <span className={styles['cssload-heartR']}></span>
                    <span className={styles['cssload-square']}></span>
                  </div>
                  <div className={styles['cssload-shadow']}></div>
                </div>
              </div>
              <h1 className={styles.name}>{t.names.bride}</h1>
            </div>

            <p className={styles.message}>
              {t.message}
            </p>

            <div className={styles.divider}></div>

            <div className={styles.dateSection}>
              <div className={styles.dateMonthYear}>{t.date.monthYear}</div>
              <div className={styles.dateLarge}>{t.date.day}</div>
              <div className={styles.dateMonthYear}>{t.date.details}</div>
            </div>

            <Countdown />

            <div className={styles.timeLocation}>
              <span className={styles.locationTitle}>{t.location.title}</span>
              <span>{t.location.line1}</span>
              <span>{t.location.line2}</span>
            </div>
          </div>

          <div className={styles.bottom} style={{ flexDirection: 'column', gap: '1rem' }}>
            <div className={styles.actionsRow}>
              <WebReminder />
              <AddToCalendar />
            </div>
            <div className={styles.actionsRow}>
              <LocationMap /> {/* Map usually is a button or modal trigger? The component implementation varies. Assuming it's a view button as originally designed? Actually currently LocationMap is likely a button. */}
              <DownloadFlyer />
            </div>
          </div>

          {/* Moved Dua Section to Bottom */}
          <div className={styles.duaSection} style={{ border: 'none', background: 'none', padding: '1rem 0 0 0' }}>
            <p className={styles.arabic}>
              {t.dua}
            </p>
            <p className={styles.translation}>
              {t.duaTranslation}
            </p>
          </div>
        </div>
      </div>

      <footer className={styles.footer} style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div>{t.reception}</div>
        <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-secondary)', opacity: 0.8, marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Made with <Heart size={14} fill="#e25555" stroke="none" />
        </div>
      </footer>
    </main>
  );
}

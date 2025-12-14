'use client';

import Image from "next/image";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from "./page.module.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { AddToCalendar } from "@/components/AddToCalendar";
import { LocationMap } from "@/components/LocationMap";
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
      <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px 20px', position: 'absolute', top: 0, zIndex: 10 }}>
        <ThemeToggle />
        <LanguageToggle />
      </header>

      {/* Decorative Ornaments (Optional: using local SVG or keeping it simple with CSS shapes/borders for now) */}
      {/* <div className={styles.ornamentTop}></div> */}

      <div className={styles.contentWrapper}>
        <div className={styles.ornamentTop}>
          <Image src="/assets/flowers top.svg" alt="Floral Decoration" width={200} height={200} style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className={styles.ornamentBottom}>
          <Image src="/assets/flowers bottom.svg" alt="Floral Decoration" width={200} height={200} style={{ width: '100%', height: 'auto' }} />
        </div>

        <div className={styles.saveTheDate}>{t.saveTheDate}</div>

        <div className={styles.namesWrapper}>
          <h1 className={styles.name}>{t.names.groom}</h1>
          <div className={styles.ampersand}>&</div>
          <h1 className={styles.name}>{t.names.bride}</h1>
        </div>

        <p className={styles.message}>
          {t.message}
        </p>

        <div className={styles.divider} style={{ display: 'flex', justifyContent: 'center', background: 'none', height: 'auto' }}>
          <Image src="/assets/heart.svg" alt="Divider" width={150} height={40} style={{ opacity: 0.7 }} />
        </div>

        <div className={styles.dateSection}>
          <div className={styles.dateMonthYear}>{t.date.monthYear}</div>
          <div className={styles.dateLarge}>{t.date.day}</div>
          <div className={styles.dateMonthYear}>{t.date.details}</div>
        </div>

        <div className={styles.timeLocation}>
          <span className={styles.locationTitle}>{t.location.title}</span>
          <span>{t.location.line1}</span>
          <span>{t.location.line2}</span>
        </div>

        <AddToCalendar />
        <LocationMap />

        <div className={styles.duaSection}>
          <p className={styles.arabic}>
            {t.dua}
          </p>
          <p className={styles.translation}>
            {t.duaTranslation}
          </p>
        </div>
      </div>

      <footer className={styles.footer}>
        {t.reception}
      </footer>
    </main>
  );
}

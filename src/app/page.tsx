'use client';

import styles from "./page.module.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { AddToCalendar } from "@/components/AddToCalendar";
import { LocationMap } from "@/components/LocationMap";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, dir, language } = useLanguage();

  const fontClass = language === 'ml' ? 'font-malayalam' : language === 'ar' ? 'font-arabic' : '';

  return (
    <main className={`${styles.container} ${fontClass}`} dir={dir}>
      <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px 20px', position: 'absolute', top: 0, zIndex: 10 }}>
        <ThemeToggle />
        <LanguageToggle />
      </header>

      {/* Decorative Ornaments (Optional: using local SVG or keeping it simple with CSS shapes/borders for now) */}
      {/* <div className={styles.ornamentTop}></div> */}

      <div className={styles.contentWrapper}>
        <div className={styles.saveTheDate}>{t.saveTheDate}</div>

        <div className={styles.namesWrapper}>
          <h1 className={styles.name}>{t.names.groom}</h1>
          <div className={styles.ampersand}>&</div>
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

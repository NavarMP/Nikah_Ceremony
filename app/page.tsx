'use client';
import { SaveTheDate } from "@/components/SaveTheDate";


import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from "./page.module.css";
import { AddToCalendar } from "@/components/AddToCalendar";
import { LocationMap } from "@/components/LocationMap";
import { Countdown } from "@/components/Countdown";
import { WebReminder } from "@/components/WebReminder";
import { AnimatedButton } from "@/components/AnimatedButton";
import { DownloadFlyer } from "@/components/DownloadFlyer";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, dir, language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [randomQuote, setRandomQuote] = useState<string>("");

  const fontClass = language === 'ml' ? 'font-malayalam' : language === 'ar' ? 'font-arabic' : '';

  useEffect(() => {
    // Select a random quote on mount
    if (t.quotes && t.quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * t.quotes.length);
      setRandomQuote(t.quotes[randomIndex]);
    }
  }, [t.quotes]);

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
            </span>
          </div>

          <div className={styles.glass}></div>

          <div className={styles.content}>
            {/* Bismillah at the top */}
            <div className={styles.bismillah} style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.5rem', height: 'auto', color: 'var(--color-gold)', marginBottom: '1rem' }}>
              {t.bismillah}
            </div>

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

            <p className={styles.message} style={{ whiteSpace: 'pre-wrap' }}>
              {t.message}
            </p>

            <div className={styles.divider}></div>

            {/* Moved Save the Date here */}
            <div className={styles.saveTheDate} style={{ marginBottom: '0.5rem' }}>
              <SaveTheDate text={t.saveTheDate} />
            </div>


            <div className={styles.dateSection}>
              <div className={styles.dateMonthYear} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                <Calendar size={18} color="var(--color-dark)" />
                {t.date.monthYear}
              </div>
              <div className={styles.dateLarge}>{t.date.day}</div>
              <div className={styles.dateMonthYear}>{t.date.details}</div>
            </div>

            <Countdown />

            <div className={styles.actionsRow} style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
              <WebReminder />
              <AddToCalendar />
            </div>

            <div className={styles.timeLocation}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <MapPin size={24} className={styles.locationIcon} color="var(--color-gold)" />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', color: 'var(--color-gold)', fontWeight: 'bold', lineHeight: '1.3', textAlign: 'left' }}>
                    <span>{t.location.line1}</span>
                    <span>{t.location.line2}</span>
                  </div>
                </div>
                <AnimatedButton
                  text={t.getDirections}
                  href="https://www.google.com/maps/search/?api=1&query=Oasis+Avenue,+Chirappalam,+Kadungallur"
                  target="_blank"
                  rel="noopener noreferrer"
                  showArrows={false}
                  className={styles.miniButton}
                  style={{ padding: '8px 16px', fontSize: '0.85rem', height: '36px' }}
                />
              </div>
            </div>
          </div>

          <div className={styles.bottom} style={{ flexDirection: 'column', gap: '1rem' }}>
            <div className={styles.actionsRow} style={{ width: '100%' }}>
              <LocationMap />
            </div>
            <div className={styles.actionsRow} style={{ marginTop: '1.5rem' }}>
              <DownloadFlyer />
            </div>
          </div>

          {/* Moved Dua Section to Bottom */}
          <div className={styles.duaSection} style={{ border: 'none', background: 'none', padding: '1rem 0 0 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <Image
                src="/assets/barakallah.svg"
                alt={t.dua}
                width={300}
                height={80}
                style={{ width: '85%', height: 'auto', maxWidth: '400px' }}
              />
            </div>
            <p className={styles.translation}>
              {t.duaTranslation}
            </p>
          </div>

          {/* Rotating Quote at Bottom
          {randomQuote && (
            <div style={{ marginTop: '1.5rem', padding: '0 1rem' }}>
              <div className={styles.quote} style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.3rem', fontWeight: '500', color: 'var(--color-dark)', whiteSpace: 'pre-wrap', lineHeight: '1.5', direction: 'rtl' }}>
                "{randomQuote}"
              </div>
              {t.quoteTranslation && (
                <div style={{ fontFamily: language === 'ml' ? 'var(--font-malayalam)' : 'var(--font-secondary)', fontSize: '0.9rem', fontStyle: 'italic', color: '#666', marginTop: '0.5rem', lineHeight: '1.4' }}>
                  {t.quoteTranslation}
                </div>
              )}
            </div>
          )} */}
        </div>
      </div>

      <footer className={styles.footer} style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-secondary)', opacity: 0.8, marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Made with <Heart size={14} fill="#e25555" stroke="none" />
        </div>
      </footer>
    </main>
  );
}

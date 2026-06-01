'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './Impressions.module.css';

type Slot = {
  kind: 'photo' | 'video';
  src: string;
  /** Natural dimensions — used both for reserving aspect ratio and for
   *  balancing the column heights at render time. */
  w: number;
  h: number;
  poster?: string;
  alt?: string;
};

// All media rendered at native aspect ratio. Mix of portrait/landscape +
// portrait videos gives the masonry visual rhythm.
const SLOTS: Slot[] = [
  { kind: 'photo', src: '/impressions/photo-1.jpg',      w: 1365, h: 2048, alt: '' },
  { kind: 'video', src: '/impressions/general.mp4',      w: 540,  h: 960,  poster: '/impressions/general.jpg' },
  { kind: 'photo', src: '/impressions/photo-2.jpg',      w: 2048, h: 1365, alt: '' },
  { kind: 'photo', src: '/impressions/photo-3.jpg',      w: 1365, h: 2048, alt: '' },
  { kind: 'video', src: '/impressions/tuna-tartare.mp4', w: 540,  h: 960,  poster: '/impressions/tuna-tartare.jpg' },
  { kind: 'photo', src: '/impressions/photo-4.jpg',      w: 2048, h: 1365, alt: '' },
  { kind: 'photo', src: '/impressions/photo-10.jpg',     w: 1365, h: 2048, alt: '' },
  { kind: 'photo', src: '/impressions/photo-7.jpg',      w: 2048, h: 1365, alt: '' },
  { kind: 'photo', src: '/impressions/photo-5.jpg',      w: 2048, h: 1365, alt: '' },
  { kind: 'video', src: '/impressions/dorade.mp4',       w: 540,  h: 960,  poster: '/impressions/dorade.jpg' },
  { kind: 'photo', src: '/impressions/photo-9.jpg',      w: 2048, h: 1365, alt: '' },
  { kind: 'photo', src: '/impressions/photo-8.jpg',      w: 2048, h: 1365, alt: '' },
];

/**
 * Distribute slots across N columns so total heights stay balanced.
 * Each item goes into whichever column is currently shortest.
 * Runs at render time — no JS at runtime, no layout flash.
 */
function balance(slots: Slot[], numCols: number) {
  const cols = Array.from({ length: numCols }, () => ({
    items: [] as Slot[],
    height: 0,
  }));
  for (const slot of slots) {
    const aspect = slot.h / slot.w; // tall = bigger number
    const shortest = cols.reduce((a, b) => (a.height <= b.height ? a : b));
    shortest.items.push(slot);
    shortest.height += aspect;
  }
  return cols.map((c) => c.items);
}

function Tile({ slot, priority }: { slot: Slot; priority?: boolean }) {
  if (slot.kind === 'photo') {
    return (
      <Image
        src={slot.src}
        alt={slot.alt ?? ''}
        width={slot.w}
        height={slot.h}
        sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
        className={styles.media}
        priority={priority}
      />
    );
  }
  return (
    <video
      className={styles.media}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={slot.poster}
      width={slot.w}
      height={slot.h}
    >
      <source src={slot.src} type="video/mp4" />
    </video>
  );
}

export function Impressions() {
  const t = useTranslations('Impressions');

  const desktopCols = balance(SLOTS, 3);
  // On tablet we collapse to 2 columns. Re-balance for that layout.
  const tabletCols = balance(SLOTS, 2);

  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.head} heading-spray`}>
        <span className="eyebrow">{t('eyebrow')}</span>
        <h2 className={`${styles.title} handwritten`}>{t('title')}</h2>
        <p className={styles.lead}>{t('lead')}</p>
      </div>

      {/* Desktop: 3 explicit columns, height-balanced */}
      <div className={`container ${styles.masonryDesktop}`}>
        {desktopCols.map((items, ci) => (
          <div key={ci} className={styles.column}>
            {items.map((slot, i) => (
              <div key={`${slot.src}-${i}`} className={`${styles.tile} reveal`}>
                <Tile slot={slot} priority={ci === 0 && i === 0} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Tablet: 2 explicit columns, height-balanced */}
      <div className={`container ${styles.masonryTablet}`}>
        {tabletCols.map((items, ci) => (
          <div key={ci} className={styles.column}>
            {items.map((slot, i) => (
              <div key={`${slot.src}-${i}`} className={`${styles.tile} reveal`}>
                <Tile slot={slot} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: horizontal auto-scrolling marquee of uniform-height columns.
          Each column is either 1 video OR 2 photos stacked, so total heights
          align. Track is duplicated so the CSS animation loops seamlessly. */}
      <MobileMarquee />
    </section>
  );
}

/**
 * Build columns where each is one video OR two stacked photos. This keeps
 * the visual rhythm even and makes the mobile marquee tidy.
 */
function buildMobileColumns(slots: Slot[]): Slot[][] {
  const cols: Slot[][] = [];
  let buffer: Slot[] = [];
  for (const slot of slots) {
    if (slot.kind === 'video') {
      if (buffer.length > 0) {
        cols.push(buffer);
        buffer = [];
      }
      cols.push([slot]);
    } else {
      buffer.push(slot);
      if (buffer.length === 2) {
        cols.push(buffer);
        buffer = [];
      }
    }
  }
  if (buffer.length > 0) cols.push(buffer); // trailing single photo, if any
  return cols;
}

function MobileMarquee() {
  const cols = buildMobileColumns(SLOTS);
  // Duplicate the column set so the scroll position can wrap seamlessly.
  const doubled = [...cols, ...cols];
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId: number | null = null;
    let paused = false;
    let resumeAt = 0;

    const tick = () => {
      const now = performance.now();
      if (paused || now < resumeAt) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const half = el.scrollWidth / 2;
      // Wrap silently when we reach the duplicate half so the loop is seamless.
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }
      el.scrollLeft += 0.4; // slow drift
      rafId = requestAnimationFrame(tick);
    };

    // Manual finger swipe pauses the auto-scroll, then resumes after a quiet
    // moment so it doesn't fight the user.
    const pauseFor = (ms: number) => {
      paused = false;
      resumeAt = performance.now() + ms;
    };
    const onTouchStart = () => {
      paused = true;
    };
    const onTouchEnd = () => {
      paused = false;
      pauseFor(2500);
    };
    const onWheel = () => pauseFor(1500);

    rafId = requestAnimationFrame(tick);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      className={styles.mobileMarquee}
      aria-hidden="false"
    >
      <div className={styles.mobileTrack}>
        {doubled.map((items, ci) => (
          <div key={`mc-${ci}`} className={styles.mobileColumn}>
            {items.map((slot, i) => (
              <div
                key={`mc-${ci}-${i}`}
                className={`${styles.mobileCell} ${
                  slot.kind === 'video' ? styles.cellTall : styles.cellHalf
                }`}
              >
                <Tile slot={slot} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

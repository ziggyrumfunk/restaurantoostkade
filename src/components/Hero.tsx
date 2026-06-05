'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './Hero.module.css';

type Tile = {
  src: string;
  alt: string;
  /** Anchor position in % of the hero container. Either `top` OR `bottom`
   *  is used (not both). Tiles using `bottom` won't overflow the section. */
  top?: string;
  bottom?: string;
  left: string;
  /** Tile width using clamp() so it scales sensibly across viewports. */
  width: string;
  /** Slight rotation for organic feel. */
  rotate: number;
  /** Parallax depth — higher = more movement on mouse. */
  depth: number;
  /** Stagger entrance delay. */
  delay: number;
  /** Hide on small screens for a calmer mobile layout. */
  hideMobile?: boolean;
};

// Tiles ring the center, leaving the logo + copy clear. Lower-half tiles use
// `bottom` so they never extend below the section and clip into Ons verhaal.
const TILES: Tile[] = [
  // Top row
  { src: '/hero/food-1.jpg',     alt: '', top: '3%',  left: '1%',  width: 'clamp(170px, 18vw, 280px)', rotate: -4, depth: 0.10, delay: 0.05 },
  { src: '/hero/drinks-2.jpg',   alt: '', top: '2%',  left: '22%', width: 'clamp(140px, 14vw, 220px)', rotate: 3,  depth: 0.16, delay: 0.10, hideMobile: true },
  { src: '/hero/interior-2.jpg', alt: '', top: '4%',  left: '70%', width: 'clamp(190px, 20vw, 310px)', rotate: 2,  depth: 0.12, delay: 0.14 },
  { src: '/hero/food-6.jpg',     alt: '', top: '6%',  left: '90%', width: 'clamp(110px, 12vw, 180px)', rotate: -3, depth: 0.18, delay: 0.18, hideMobile: true },

  // Upper-mid
  { src: '/hero/drinks-1.jpg',   alt: '', top: '24%', left: '11%', width: 'clamp(120px, 13vw, 200px)', rotate: 5,  depth: 0.14, delay: 0.22, hideMobile: true },
  { src: '/hero/terras-2.jpg',   alt: '', top: '26%', left: '60%', width: 'clamp(120px, 13vw, 200px)', rotate: -3, depth: 0.17, delay: 0.26, hideMobile: true },

  // Sides at the equator
  { src: '/hero/food-3.jpg',       alt: '', top: '46%', left: '0%',  width: 'clamp(140px, 15vw, 240px)', rotate: 3,  depth: 0.09, delay: 0.30 },
  { src: '/hero/food-center.jpg',  alt: '', top: '46%', left: '84%', width: 'clamp(140px, 15vw, 240px)', rotate: -2, depth: 0.10, delay: 0.34 },

  // Outer corners at equator
  { src: '/hero/terras-3.jpg',   alt: '', top: '36%', left: '6%',  width: 'clamp(110px, 12vw, 180px)', rotate: -5, depth: 0.20, delay: 0.38, hideMobile: true },
  { src: '/hero/people-2.jpg',   alt: '', top: '36%', left: '88%', width: 'clamp(110px, 12vw, 180px)', rotate: 6,  depth: 0.18, delay: 0.42, hideMobile: true },

  // Bottom row — anchored to bottom so they never spill into the next section
  { src: '/hero/food-4.jpg',     alt: '', bottom: '4%',  left: '6%',  width: 'clamp(170px, 19vw, 280px)', rotate: 5, depth: 0.11, delay: 0.46 },
  { src: '/hero/terras-1.jpg',   alt: '', bottom: '6%',  left: '70%', width: 'clamp(180px, 20vw, 300px)', rotate: -4, depth: 0.10, delay: 0.50 },
  { src: '/hero/food-5.jpg',     alt: '', bottom: '4%',  left: '27%', width: 'clamp(130px, 14vw, 210px)', rotate: -3, depth: 0.15, delay: 0.54, hideMobile: true },
  { src: '/hero/food-7.jpg',     alt: '', bottom: '8%',  left: '52%', width: 'clamp(140px, 15vw, 230px)', rotate: 3,  depth: 0.13, delay: 0.58, hideMobile: true },
  { src: '/hero/food-2.jpg',     alt: '', bottom: '20%', left: '92%', width: 'clamp(110px, 12vw, 180px)', rotate: 7,  depth: 0.20, delay: 0.62, hideMobile: true },
  { src: '/hero/interior-1.jpg', alt: '', bottom: '20%', left: '0%',  width: 'clamp(110px, 12vw, 180px)', rotate: -6, depth: 0.20, delay: 0.66, hideMobile: true },
];

export function Hero() {
  const t = useTranslations('Home');
  const heroRef = useRef<HTMLElement | null>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      // Range: -1 .. 1 across the hero.
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (rafRef.current == null) loop();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (rafRef.current == null) loop();
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      tileRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = TILES[i].depth;
        // Much stronger parallax than before — feels properly responsive.
        const tx = -currentX * depth * 240;
        const ty = -currentY * depth * 180;
        // Tiny tilt for a 3D feel
        const tilt = currentX * depth * 8;
        el.style.setProperty('--mx', `${tx.toFixed(2)}px`);
        el.style.setProperty('--my', `${ty.toFixed(2)}px`);
        el.style.setProperty('--tilt', `${tilt.toFixed(2)}deg`);
      });

      const stillMoving =
        Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001;
      if (stillMoving) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = null;
      }
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.collage} aria-hidden="true">
        {TILES.map((tile, i) => (
          <div
            key={tile.src}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className={`${styles.tile} ${tile.hideMobile ? styles.hideMobile : ''}`}
            style={{
              top: tile.top,
              bottom: tile.bottom,
              left: tile.left,
              width: tile.width,
              ['--rot' as string]: `${tile.rotate}deg`,
              ['--delay' as string]: `${tile.delay}s`,
            }}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(max-width: 768px) 30vw, 18vw"
              className={styles.tileImg}
              priority={i < 4}
            />
          </div>
        ))}
      </div>

      <div className={styles.centerHalo} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <Image
          src="/logo-white.svg"
          alt="Restaurant Oostkade"
          width={220}
          height={220}
          className={styles.logo}
          priority
        />
        <span className={`eyebrow ${styles.eyebrow}`}>{t('heroEyebrow')}</span>
        <h1 className={styles.title}>{t('heroTitle')}</h1>
        <p className={styles.lead}>{t('heroLead')}</p>
        <div className={styles.actions}>
          <Link href="/reservations" className="btn">{t('heroCtaReserve')}</Link>
          <Link href="/menu" className={styles.ghost}>{t('heroCtaMenu')}</Link>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden>
        <span />
      </div>
    </section>
  );
}

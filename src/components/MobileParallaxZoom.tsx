'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Mobile-only scroll-tied zoom. Any element with `data-parallax-zoom` (and
 * optionally `data-parallax-strength="0.15"`) gets its `--ps` CSS variable
 * updated as it scrolls through the viewport. Pair with CSS that sets
 * `transform: scale(var(--ps, 1))` inside a `data-parallax-zoom` container.
 *
 * Disabled on desktop and when prefers-reduced-motion is set.
 */
export function MobileParallaxZoom() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia('(max-width: 720px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isMobile || prefersReduced) return;

    let rafId: number | null = null;
    let targets: HTMLElement[] = [];

    const collect = () => {
      targets = Array.from(
        document.querySelectorAll<HTMLElement>('[data-parallax-zoom]')
      );
    };

    const update = () => {
      const vh = window.innerHeight;
      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        // Skip when fully off-screen so we don't waste cycles.
        if (rect.bottom < -50 || rect.top > vh + 50) continue;

        const strength = parseFloat(el.dataset.parallaxStrength || '0.12');
        // Progress: 0 when bottom of element touches top of viewport,
        // 1 when top of element touches bottom of viewport. Clamped.
        const total = vh + rect.height;
        const raw = (vh - rect.top) / total;
        const progress = Math.max(0, Math.min(1, raw));
        const scale = 1 + progress * strength;
        el.style.setProperty('--ps', String(scale));
      }
      rafId = null;
    };

    const onScroll = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };

    collect();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      collect();
      update();
    });
    // Re-collect after a tick in case images mount slightly later than this
    // effect runs.
    const recheck = window.setTimeout(() => {
      collect();
      update();
    }, 300);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      window.clearTimeout(recheck);
    };
  }, [pathname]);

  return null;
}

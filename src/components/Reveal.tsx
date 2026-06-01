'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Adds .is-visible to any element with .reveal as it enters the viewport.
 *
 * Re-observes on every route change so client-side navigation (App Router)
 * also fades new content in instead of leaving it stuck at opacity:0.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll<HTMLElement>('.reveal');

    // Reduced motion: just mark everything visible immediately, skip animation.
    if (prefersReduced) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    els.forEach((el) => {
      // If we just navigated, an existing element may already have is-visible
      // from a previous page render — leave it alone in that case.
      if (!el.classList.contains('is-visible')) io.observe(el);
    });

    // Safety net: after 1.2s force-reveal anything that's still hidden. Covers
    // edge cases (e.g. elements off-screen by JS layout, observer not firing).
    const safety = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
        .forEach((el) => el.classList.add('is-visible'));
    }, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);

  return null;
}

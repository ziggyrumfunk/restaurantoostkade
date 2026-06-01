'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.css';

export function Header() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const nav = [
    { href: '/', label: t('home') },
    { href: '/menu', label: t('menu') },
    { href: '/drinks', label: t('drinks') },
    { href: '/lunch', label: t('lunch') },
    { href: '/events', label: t('events') },
    { href: '/contact', label: t('contact') },
  ] as const;

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${open ? styles.menuOpen : ''}`}
      >
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.brand} aria-label="Restaurant Oostkade home">
            <Image
              src="/logo-white.svg"
              alt="Restaurant Oostkade"
              width={180}
              height={180}
              className={styles.logo}
              priority
            />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            <LanguageSwitcher />
            <Link href="/reservations" className={`btn ${styles.reserveBtn}`}>
              {t('reservations')}
            </Link>
            <button
              type="button"
              className={styles.burger}
              aria-expanded={open}
              aria-label={open ? t('closeMenu') : t('openMenu')}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer rendered as a sibling of <header>, not nested inside.
          Lifts it out of the sticky header's stacking context so it can
          render as a fully-opaque overlay above the page. */}
      <div
        className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}
        aria-hidden={!open}
      >
        <ul className={styles.mobileList}>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.mobileLink}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/reservations" className={styles.mobileLink}>
              {t('reservations')}
            </Link>
          </li>
        </ul>
        <div className={styles.mobileFooter}>
          <LanguageSwitcher inline />
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

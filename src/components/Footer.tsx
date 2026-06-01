import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './Footer.module.css';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.42.56.21.96.47 1.38.89.42.42.68.82.89 1.38.17.43.37 1.06.42 2.23.06 1.25.07 1.65.07 4.85s-.01 3.6-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.43.17-1.06.37-2.23.42-1.25.06-1.65.07-4.85.07s-3.6-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.89 3.7 3.7 0 0 1-.89-1.38c-.17-.43-.37-1.06-.42-2.23C2.21 15.6 2.2 15.2 2.2 12s.01-3.6.07-4.85c.05-1.17.25-1.8.42-2.23.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.43-.17 1.06-.37 2.23-.42C8.4 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.96.04-1.48.2-1.83.34-.46.18-.79.4-1.13.74-.34.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83C4.21 9.48 4.2 9.85 4.2 13s.01 3.52.07 4.76c.04.96.2 1.48.34 1.83.18.46.4.79.74 1.13.34.34.67.56 1.13.74.35.14.87.3 1.83.34 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.4 1.13-.74.34-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.96-.2-1.48-.34-1.83a3.05 3.05 0 0 0-.74-1.13 3.05 3.05 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34C15.52 4.01 15.15 4 12 4zm0 3.05A4.95 4.95 0 1 1 7.05 12 4.95 4.95 0 0 1 12 7.05zm0 1.8A3.15 3.15 0 1 0 15.15 12 3.15 3.15 0 0 0 12 8.85zm5.16-2.86a1.16 1.16 0 1 1-1.16 1.16 1.16 1.16 0 0 1 1.16-1.16z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 22v-8.4h2.83l.42-3.28H13.5V8.2c0-.95.26-1.6 1.62-1.6h1.74V3.66A22.91 22.91 0 0 0 14.32 3.5c-2.5 0-4.22 1.53-4.22 4.34v2.48H7.25v3.28h2.85V22z"
      />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <Image
            src="/logo-white.svg"
            alt="Restaurant Oostkade"
            width={120}
            height={120}
            className={styles.logoMark}
          />
          <p className={styles.tagline}>{t('Meta.tagline')}</p>
          <Link href="/reservations" className={`btn btn-light ${styles.footerCta}`}>
            {t('Nav.reservations')}
          </Link>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t('Contact.addressLabel')}</h4>
          <p className={styles.lineBody}>{t('Contact.address')}</p>
          <a
            className={styles.linkOut}
            href="https://maps.google.com/?q=Oostkade+24+Oud-Beijerland"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Contact.directionsCta')} →
          </a>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t('Contact.hoursLabel')}</h4>
          <ul className={styles.hoursList}>
            {(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const).map((d) => (
              <li key={d}>
                <span>{t(`Contact.hours${d}`)}</span>
                <span>{t(`Contact.hours${d}Time`)}</span>
              </li>
            ))}
          </ul>
          <div className={styles.socials} aria-label={t('Contact.socialsLabel')}>
            <a
              href="https://www.instagram.com/restaurantoostkade"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.socialLink}
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/Oostkade/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={styles.socialLink}
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t('Footer.newsletter')}</h4>
          <p className={styles.lineBody}>{t('Footer.newsletterLead')}</p>
          <form className={styles.newsletter} action="#" method="post">
            <input
              type="email"
              required
              placeholder={t('Footer.newsletterPlaceholder')}
              aria-label={t('Footer.newsletterPlaceholder')}
            />
            <button type="submit">{t('Footer.newsletterSubmit')}</button>
          </form>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <div className={styles.legal}>
          © {year} Restaurant Oostkade. {t('Footer.rights')}
        </div>
        <nav className={styles.bottomNav} aria-label="Footer">
          <Link href="/menu">{t('Nav.menu')}</Link>
          <Link href="/lunch">{t('Nav.lunch')}</Link>
          <Link href="/events">{t('Nav.events')}</Link>
          <Link href="/contact">{t('Nav.contact')}</Link>
        </nav>
        <div className={styles.credit}>
          Website by{' '}
          <a
            href="https://www.rumfunk.nl"
            target="_blank"
            rel="noopener"
            className={styles.creditLink}
          >
            Rumfunk
          </a>
        </div>
      </div>
    </footer>
  );
}

import Image from 'next/image';
import styles from './PageHeader.module.css';

export function PageHeader({
  eyebrow,
  title,
  lead,
  backdrop,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Optional photo collage strip rendered as the page header background. */
  backdrop?: string[];
}) {
  const tiles = backdrop?.slice(0, 6);
  return (
    <header className={`${styles.header} ${backdrop ? styles.withBackdrop : ''}`}>
      {tiles && (
        <div className={styles.backdrop} aria-hidden="true">
          <div className={styles.strip}>
            {tiles.map((src, i) => (
              <div key={`${src}-${i}`} className={styles.stripTile}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes={`${Math.floor(100 / tiles.length)}vw`}
                  className={styles.stripImg}
                />
              </div>
            ))}
          </div>
          <div className={styles.scrim} />
        </div>
      )}
      <div className={`container ${styles.inner}`}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className={`${styles.title} handwritten`}>{title}</h1>
        <span className={styles.divider} aria-hidden="true" />
        {lead && <p className="lead">{lead}</p>}
      </div>
    </header>
  );
}

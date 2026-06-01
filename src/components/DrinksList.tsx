import { useTranslations } from 'next-intl';
import { DRINKS } from '@/lib/drinksData';
import styles from './DrinksList.module.css';

export function DrinksList() {
  const t = useTranslations('Drinks');
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.frame}`}>
        {DRINKS.map((sec) => (
          <div key={sec.title} className={`${styles.block} reveal`}>
            <header className={styles.blockHead}>
              <h2 className={`${styles.title} handwritten`}>{sec.title}</h2>
              {sec.subtitle && <p className={styles.subtitle}>{sec.subtitle}</p>}
            </header>
            <ul className={styles.items}>
              {sec.items.map((d, i) => (
                <li key={`${sec.title}-${d.name}-${i}`} className={styles.item}>
                  <div className={styles.itemHead}>
                    <span className={styles.name}>{d.name}</span>
                    <span className={styles.dots} aria-hidden />
                    <span className={styles.price}>{d.price}</span>
                  </div>
                  {d.origin && <p className={styles.origin}>{d.origin}</p>}
                  {('desc' in d && (d as { desc?: string }).desc) && (
                    <p className={styles.desc}>{(d as { desc?: string }).desc}</p>
                  )}
                  {d.notes && <p className={styles.notes}>{d.notes}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className={styles.note}>{t('note')}</p>
      </div>
    </section>
  );
}

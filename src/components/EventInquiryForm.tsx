'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './Form.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function EventInquiryForm() {
  const t = useTranslations('Events.form');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = new FormData(e.currentTarget);
    // Honeypot — bots fill every field. If they typed in the hidden field,
    // accept silently without sending.
    if (form.get('website')) {
      setStatus('success');
      return;
    }
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <h3>{t('successTitle')}</h3>
        <p>{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {/* Honeypot — hidden via off-screen positioning, never seen by humans */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <div className={styles.row2}>
        <label className={styles.field}>
          <span>{t('name')}</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span>{t('email')}</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className={styles.row2}>
        <label className={styles.field}>
          <span>{t('phone')}</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className={styles.field}>
          <span>{t('guests')}</span>
          <input name="guests" type="number" min={1} />
        </label>
      </div>
      <div className={styles.row2}>
        <label className={styles.field}>
          <span>{t('date')}</span>
          <input name="date" type="date" />
        </label>
        <label className={styles.field}>
          <span>{t('type')}</span>
          <input name="type" placeholder={t('typePlaceholder')} />
        </label>
      </div>
      <label className={styles.field}>
        <span>{t('message')}</span>
        <textarea name="message" rows={5} />
      </label>
      <div className={styles.submitRow}>
        <button className="btn btn-light" disabled={status === 'submitting'}>
          {status === 'submitting' ? '…' : t('submit')}
        </button>
        {status === 'error' && (
          <p className={styles.error}>{t('errorBody')}</p>
        )}
      </div>
    </form>
  );
}

import { useRef, useState } from 'react';
import { useLanguage } from '../../../../store/LanguageContext';
import { CONTACT, FORM_FIELDS } from '../constants/contact.constants';
import styles from './ContactSection.module.css';

export function ContactForm() {
  const { t } = useLanguage();
  const formRef = useRef(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(CONTACT.FORMSPREE_ACTION, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
      } else {
        setStatus('ERROR');
      }
    } catch (err) {
      setStatus('ERROR');
    }
  };

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
      {FORM_FIELDS.map((field) => (
        <div key={field.id} className={styles.fieldGroup}>
          <label className={styles.label}>{t(field.label)}</label>
          {field.multiline ? (
            <textarea
              name={field.name}
              className={styles.textarea}
              placeholder={t(field.placeholder)}
              required={field.required}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              className={styles.input}
              placeholder={t(field.placeholder)}
              required={field.required}
            />
          )}
        </div>
      ))}

      <button type="submit" className={styles.submitBtn} disabled={isSending}>
        {isSending ? '// Sending...' : CONTACT.SUBMIT_LABEL}
      </button>

      {isSuccess && <p className={styles.successMsg}>{SUCCESS_MESSAGE}</p>}
      {isError && <p className={styles.errorMsg}>{ERROR_MESSAGE}</p>}

      <p className={styles.formNote}>{CONTACT.FOOTER_NOTE}</p>
    </form>
  );
}

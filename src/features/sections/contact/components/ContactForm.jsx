import { useContactForm } from '../hooks/useContactForm';
import { CONTACT, FORM_FIELDS } from '../constants/contact.constants';
import styles from './ContactSection.module.css';

const SUCCESS_MESSAGE = '// Message sent! I\'ll get back to you soon ✓';
const ERROR_MESSAGE = '// Something went wrong. Please try again.';

export function ContactForm() {
  const { formData, handleChange, handleSubmit, isSending, isSuccess, isError } = useContactForm();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {FORM_FIELDS.map(({ id, name, label, type, placeholder, required, multiline }) => (
        <div key={id} className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor={id}>{label}</label>
          {multiline ? (
            <textarea
              id={id}
              name={name}
              className={styles.textarea}
              placeholder={placeholder}
              required={required}
              value={formData[name]}
              onChange={(e) => handleChange(name, e.target.value)}
              rows={5}
            />
          ) : (
            <input
              id={id}
              name={name}
              type={type}
              className={styles.input}
              placeholder={placeholder}
              required={required}
              value={formData[name]}
              onChange={(e) => handleChange(name, e.target.value)}
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

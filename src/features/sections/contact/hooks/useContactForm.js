import { useState } from 'react';
import { CONTACT } from '../constants/contact.constants';

const INITIAL_FORM_STATE = { name: '', email: '', subject: '', message: '' };
const FORM_STATUS = { IDLE: 'idle', SENDING: 'sending', SUCCESS: 'success', ERROR: 'error' };

export function useContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState(FORM_STATUS.IDLE);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(FORM_STATUS.SENDING);

    try {
      const response = await fetch(CONTACT.FORMSPREE_ACTION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus(FORM_STATUS.SUCCESS);
        setFormData(INITIAL_FORM_STATE);
      } else {
        setStatus(FORM_STATUS.ERROR);
      }
    } catch {
      setStatus(FORM_STATUS.ERROR);
    }
  };

  const isSending = status === FORM_STATUS.SENDING;
  const isSuccess = status === FORM_STATUS.SUCCESS;
  const isError = status === FORM_STATUS.ERROR;

  return { formData, handleChange, handleSubmit, isSending, isSuccess, isError };
}

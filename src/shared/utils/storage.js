/**
 * Utility for managing cookies.
 * Cookies are used for persistent storage that survives localStorage.clear().
 */

/**
 * Sets a cookie with a name, value, and expiration in days.
 * @param {string} name 
 * @param {string} value 
 * @param {number} days 
 */
export function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax`;
}

/**
 * Gets a cookie value by name.
 * @param {string} name 
 * @returns {string|null}
 */
export function getCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

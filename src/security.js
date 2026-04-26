const CONTACT_RATE_LIMIT_KEY = 'chwx_contact_attempts';
const CONTACT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_RATE_LIMIT_MAX = 5;

const FIELD_LIMITS = {
  name: 80,
  email: 120,
  clientType: 60,
  service: 240,
  budget: 80,
  timeline: 80,
  message: 1200
};

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const HTML_META = /[<>]/g;

export function sanitizeText(value, maxLength) {
  return String(value ?? '')
    .replace(CONTROL_CHARS, '')
    .replace(HTML_META, '')
    .trim()
    .slice(0, maxLength);
}

export function sanitizeContactForm(form) {
  return Object.fromEntries(
    Object.entries(FIELD_LIMITS).map(([field, limit]) => {
      const value = Array.isArray(form[field]) ? form[field].join(', ') : form[field];
      return [field, sanitizeText(value, limit)];
    })
  );
}

export function validateContactForm(form) {
  const errors = {};
  const sanitized = sanitizeContactForm(form);

  if (!sanitized.name) errors.name = 'Name is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized.email)) errors.email = 'Enter a valid email address.';
  if (!sanitized.message || sanitized.message.length < 20) errors.message = 'Tell me a little more about the project.';

  Object.entries(FIELD_LIMITS).forEach(([field, limit]) => {
    if (String(form[field] ?? '').length > limit) {
      errors[field] = `Keep this under ${limit} characters.`;
    }
  });

  return { errors, sanitized };
}

export function checkContactRateLimit(now = Date.now()) {
  const stored = window.localStorage.getItem(CONTACT_RATE_LIMIT_KEY);
  let attempts = [];
  try {
    attempts = stored ? JSON.parse(stored).filter((timestamp) => Number.isFinite(timestamp) && now - timestamp < CONTACT_RATE_LIMIT_WINDOW_MS) : [];
  } catch {
    attempts = [];
  }

  if (attempts.length >= CONTACT_RATE_LIMIT_MAX) {
    const oldest = attempts[0];
    const retryAfterMs = CONTACT_RATE_LIMIT_WINDOW_MS - (now - oldest);
    return {
      allowed: false,
      retryAfterMinutes: Math.max(1, Math.ceil(retryAfterMs / 60000))
    };
  }

  attempts.push(now);
  window.localStorage.setItem(CONTACT_RATE_LIMIT_KEY, JSON.stringify(attempts));
  return { allowed: true, retryAfterMinutes: 0 };
}

export const contactFieldLimits = FIELD_LIMITS;

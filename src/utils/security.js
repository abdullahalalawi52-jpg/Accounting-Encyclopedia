import DOMPurify from 'dompurify';

/**
 * Enterprise HTML sanitization options
 */
const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'a', 'b', 'i', 'strong', 'em', 'strike', 'u', 's',
    'code', 'pre', 'blockquote',
    'ul', 'ol', 'li',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    'hr', 'br', 'div', 'span', 'img'
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
    'dir', 'lang', 'width', 'height', 'loading'
  ],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|\/|#)/i,
  FORBID_TAGS: ['script', 'style', 'iframe', 'frame', 'object', 'embed', 'form', 'input', 'textarea', 'button', 'svg', 'math'],
  FORBID_ATTR: [
    'onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout',
    'onmouseenter', 'onmouseleave', 'onfocus', 'onblur', 'onkeydown',
    'onkeyup', 'onkeypress', 'onchange', 'onsubmit', 'style'
  ],
  ALLOW_DATA_ATTR: false,
};

const getPurifier = () => {
  if (typeof DOMPurify === 'function' && typeof window !== 'undefined') {
    return DOMPurify(window);
  }
  return DOMPurify;
};

const purify = getPurifier();

// Add DOMPurify hook to ensure all external links have rel="noopener noreferrer nofollow"
if (purify && typeof purify.addHook === 'function') {
  purify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.hasAttribute('href')) {
      const href = node.getAttribute('href') || '';
      if (href.startsWith('http://') || href.startsWith('https://')) {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'noopener noreferrer nofollow');
      }
    }
  });
}

/**
 * Sanitize untrusted HTML with strict whitelist rules
 * @param {string} html 
 * @returns {string} Sanitized safe HTML
 */
export function sanitizeHTML(html) {
  if (typeof html !== 'string') return '';
  const currentPurifier = getPurifier();
  if (!currentPurifier || typeof currentPurifier.sanitize !== 'function') {
    return html.replace(/<[^>]*>?/gm, ''); // Fallback strip-tags if DOM not ready
  }
  return currentPurifier.sanitize(html, DOMPURIFY_CONFIG);
}

/**
 * Sanitize plain text user inputs (strips HTML, control chars, limits length)
 * @param {string} input 
 * @param {number} maxLength 
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input, maxLength = 300) {
  if (typeof input !== 'string') return '';
  // Remove null bytes and dangerous invisible control characters
  let clean = '';
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    if (
      (code >= 32 && (code < 127 || code > 159)) ||
      code === 10 ||
      code === 13 ||
      code === 9
    ) {
      clean += input[i];
    }
  }
  return clean.trim().slice(0, maxLength);
}

/**
 * Validate that a URL is safe for navigation or embedding (HTTPS, HTTP, relative only)
 * @param {string} url 
 * @returns {boolean}
 */
export function isSafeUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return false;
  const trimmed = url.trim().toLowerCase();
  
  // Disallow dangerous schemes
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('vbscript:') ||
    trimmed.startsWith('file:')
  ) {
    return false;
  }

  // Safe if relative or http/https
  return (
    trimmed.startsWith('/') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('mailto:')
  );
}

/**
 * Prototype pollution guard: deeply strips __proto__, constructor, and prototype keys
 * @param {any} value 
 * @returns {any}
 */
export function sanitizeObject(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeObject);
  }

  const clean = Object.create(null);
  for (const key of Object.keys(value)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    clean[key] = sanitizeObject(value[key]);
  }
  return clean;
}

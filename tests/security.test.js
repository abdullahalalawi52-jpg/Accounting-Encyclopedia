import { describe, it, expect } from 'vitest';
import { sanitizeHTML, sanitizeInput, isSafeUrl, sanitizeObject } from '../src/utils/security.js';

describe('Security & XSS Prevention (sanitizeHTML)', () => {
  it('should strip dangerous <script> tags completely', () => {
    const malicious = '<p>Hello <script>alert("XSS Attack!");</script>World</p>';
    const cleaned = sanitizeHTML(malicious);
    expect(cleaned).not.toContain('<script>');
    expect(cleaned).not.toContain('alert');
    expect(cleaned).toBe('<p>Hello World</p>');
  });

  it('should strip inline event handlers like onerror, onload, onclick', () => {
    const malicious = '<img src="x" onerror="alert(document.cookie)" alt="Test" />';
    const cleaned = sanitizeHTML(malicious);
    expect(cleaned).not.toContain('onerror');
    expect(cleaned).not.toContain('alert');
    expect(cleaned).toContain('<img');
  });

  it('should block javascript: URI scheme in href attributes', () => {
    const malicious = '<a href="javascript:alert(1)">Click me</a>';
    const cleaned = sanitizeHTML(malicious);
    expect(cleaned).not.toContain('javascript:');
  });

  it('should strip forbidden <iframe>, <object>, <embed>, <form> tags', () => {
    const malicious = '<div><iframe src="https://evil.com"></iframe><object data="test"></object></div>';
    const cleaned = sanitizeHTML(malicious);
    expect(cleaned).not.toContain('<iframe');
    expect(cleaned).not.toContain('<object');
  });

  it('should preserve safe accounting article formatting (tables, paragraphs, headings, strong)', () => {
    const safeContent = '<div class="table-container"><h3>قائمة الدخل</h3><p><strong>الإيرادات:</strong> 10,000 ريال</p></div>';
    const cleaned = sanitizeHTML(safeContent);
    expect(cleaned).toContain('<h3>قائمة الدخل</h3>');
    expect(cleaned).toContain('<strong>الإيرادات:</strong>');
  });
});

describe('Input Sanitization (sanitizeInput)', () => {
  it('should truncate excessively long inputs according to maxLength', () => {
    const longString = 'a'.repeat(500);
    const sanitized = sanitizeInput(longString, 100);
    expect(sanitized.length).toBe(100);
  });

  it('should strip null bytes and invisible control characters', () => {
    const malicious = 'Search\u0000Query\u001FWithControlChars';
    const sanitized = sanitizeInput(malicious, 50);
    expect(sanitized).toBe('SearchQueryWithControlChars');
  });

  it('should handle non-string inputs safely without crashing', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(undefined)).toBe('');
    expect(sanitizeInput(12345)).toBe('');
  });
});

describe('Safe URL Validation (isSafeUrl)', () => {
  it('should allow valid HTTPS and HTTP URLs', () => {
    expect(isSafeUrl('https://gnews.io/articles/123')).toBe(true);
    expect(isSafeUrl('http://example.com')).toBe(true);
  });

  it('should allow internal relative paths and hash anchors', () => {
    expect(isSafeUrl('/article/1')).toBe(true);
    expect(isSafeUrl('/standards#ifrs')).toBe(true);
    expect(isSafeUrl('mailto:contact@test.com')).toBe(true);
  });

  it('should reject dangerous pseudo-protocols (javascript:, data:, vbscript:)', () => {
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeUrl('JAVASCRIPT:alert(1)')).toBe(false);
    expect(isSafeUrl('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==')).toBe(false);
    expect(isSafeUrl('vbscript:msgbox(1)')).toBe(false);
    expect(isSafeUrl('file:///etc/passwd')).toBe(false);
  });
});

describe('Prototype Pollution Guard (sanitizeObject)', () => {
  it('should deeply remove __proto__, constructor, and prototype properties', () => {
    const maliciousJson = JSON.parse('{"validKey": "validVal", "__proto__": {"polluted": true}}');
    const sanitized = sanitizeObject(maliciousJson);

    expect(sanitized.validKey).toBe('validVal');
    expect(Object.prototype.polluted).toBeUndefined();
    expect(Object.keys(sanitized)).not.toContain('__proto__');
  });

  it('should handle nested arrays and objects cleanly', () => {
    const complex = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2', sub: { key: 'value' } }
    ];
    const sanitized = sanitizeObject(complex);
    expect(Array.isArray(sanitized)).toBe(true);
    expect(sanitized[1].sub.key).toBe('value');
  });
});

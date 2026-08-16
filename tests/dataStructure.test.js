import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Data Integrity & JSON Schemas', () => {
  it('should validate articles.json structure', () => {
    const filePath = path.resolve(process.cwd(), 'public/data/articles.json');
    expect(fs.existsSync(filePath)).toBe(true);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(Array.isArray(content)).toBe(true);
    expect(content.length).toBeGreaterThan(0);

    // Verify first article schema
    const first = content[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('categoryId');
    expect(first).toHaveProperty('content');
  });

  it('should validate standards.json structure', () => {
    const filePath = path.resolve(process.cwd(), 'public/data/standards.json');
    expect(fs.existsSync(filePath)).toBe(true);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(content).toHaveProperty('timeline');
    expect(content).toHaveProperty('standards');
    expect(content).toHaveProperty('comparison');
    expect(Array.isArray(content.timeline)).toBe(true);
    expect(Array.isArray(content.standards)).toBe(true);
    expect(Array.isArray(content.comparison)).toBe(true);
  });

  it('should validate glossary.json structure', () => {
    const filePath = path.resolve(process.cwd(), 'public/data/glossary.json');
    expect(fs.existsSync(filePath)).toBe(true);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(Array.isArray(content)).toBe(true);
    expect(content.length).toBeGreaterThan(0);
    expect(content[0]).toHaveProperty('term');
    expect(content[0]).toHaveProperty('definition');
  });
});

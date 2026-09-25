import { describe, expect, it } from 'vitest';

import { parseSize, serializeSize } from './split_pane_helpers.ts';

describe('parseSize', () => {
  it('should parse percentages', () => {
    expect(parseSize('0%')).toStrictEqual({ value: 0, type: '%' });
    expect(parseSize('2.5%')).toStrictEqual({ value: 2.5, type: '%' });
    expect(parseSize('100%')).toStrictEqual({ value: 100, type: '%' });
  });

  it('should parse pixels', () => {
    expect(parseSize('0px')).toStrictEqual({ value: 0, type: 'px' });
    expect(parseSize('2.5px')).toStrictEqual({ value: 2.5, type: 'px' });
    expect(parseSize('100px')).toStrictEqual({ value: 100, type: 'px' });
  });

  it.each(['', '1', '%', 'px'])(
    "should reject invalid string '%s')",
    (size) => {
      expect(() => parseSize(size)).toThrow();
    },
  );
});

describe('serializeSize', () => {
  it('should serialize percentages', () => {
    expect(serializeSize({ type: '%', value: 0 })).toBe('0%');
    expect(serializeSize({ type: '%', value: 2.5 })).toBe('2.5%');
    expect(serializeSize({ type: '%', value: 100 })).toBe('100%');
  });

  it('should serialize pixels', () => {
    expect(serializeSize({ type: 'px', value: 0 })).toBe('0px');
    expect(serializeSize({ type: 'px', value: 2.5 })).toBe('2.5px');
    expect(serializeSize({ type: 'px', value: 100 })).toBe('100px');
  });
});

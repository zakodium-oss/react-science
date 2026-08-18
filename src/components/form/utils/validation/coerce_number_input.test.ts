import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { coerceNumberInput } from './coerce_number_input.ts';

describe('coerceNumberInput basic behavior', () => {
  it('is defined', () => {
    expect(coerceNumberInput).toBeDefined();
  });

  it('correctly parse positive number', () => {
    const parsed = coerceNumberInput().parse('42');
    expect(parsed).toBe(42);
  });

  it('correctly parse 0', () => {
    const parsed = coerceNumberInput().parse('0');
    expect(parsed).toBe(0);
  });

  it('correctly parse negative number', () => {
    const parsed = coerceNumberInput().parse('-42');
    expect(parsed).toBe(-42);
  });

  it('correctly parse float number', () => {
    const parsed = coerceNumberInput().parse('1.42');
    expect(parsed).toBe(1.42);
  });

  it('parse positive infinity', () => {
    const parsed = coerceNumberInput().parse(
      Number.MAX_SAFE_INTEGER.toString(),
    );
    expect(parsed).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('parse negative infinity', () => {
    const parsed = coerceNumberInput().parse(
      Number.MIN_SAFE_INTEGER.toString(),
    );
    expect(parsed).toBe(Number.MIN_SAFE_INTEGER);
  });

  // Useful when user is writing they own number in input.
  // We admit that we should return 0 in this case
  it('handle - as data', () => {
    const parsed = coerceNumberInput().parse('-');
    expect(parsed).toBe(0);
  });

  // useful to handle .1
  it('handle . as data', () => {
    const parsed = coerceNumberInput().parse('.');
    expect(parsed).toBe(0);
  });

  it('handle .1 as data', () => {
    const parsed = coerceNumberInput().parse('.1');
    expect(parsed).toBe(0.1);
  });

  it('return 0 with every other possible values', () => {
    const parsed = coerceNumberInput().parse('Hello, World!');
    expect(parsed).toBe(0);
  });

  it('handle NaN as data', () => {
    const parsed = coerceNumberInput().parse(Number.NaN.toString());
    expect(parsed).toBe(0);
  });

  it('min should be 5 then throw', () => {
    expect(() => coerceNumberInput(z.number().min(5)).parse('0')).toThrow();
  });

  it('max should be 100 then throw', () => {
    expect(() => coerceNumberInput(z.number().max(100)).parse('200')).toThrow();
  });
});

describe('coerceNumberInput encode/decode behavior', () => {
  it('encode positive number to string', () => {
    const parsed = coerceNumberInput().encode(42);
    expect(parsed).toBe('42');
  });

  it('encode negative number to string', () => {
    const parsed = coerceNumberInput().encode(-42);
    expect(parsed).toBe('-42');
  });

  it('decode string to positive number', () => {
    const parsed = coerceNumberInput().decode('42');
    expect(parsed).toBe(42);
  });

  it('decode string to negative number', () => {
    const parsed = coerceNumberInput().decode('-42');
    expect(parsed).toBe(-42);
  });

  it('decode string with . to 0', () => {
    const parsed = coerceNumberInput().decode('.');
    expect(parsed).toBe(0);
  });

  it('decode string with - to 0', () => {
    const parsed = coerceNumberInput().decode('-');
    expect(parsed).toBe(0);
  });

  // Infinity / -Inifinty Decode / Encode
  it('decode Infinity to number', () => {
    const parsed = coerceNumberInput().decode(
      Number.MAX_SAFE_INTEGER.toString(),
    );

    expect(parsed).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('encode Infinity to string', () => {
    const parsed = coerceNumberInput().encode(Number.MAX_SAFE_INTEGER);
    expect(parsed).toBe(Number.MAX_SAFE_INTEGER.toString());
  });

  it('decode -Infinity to number', () => {
    const parsed = coerceNumberInput().decode(
      Number.MIN_SAFE_INTEGER.toString(),
    );

    expect(parsed).toBe(Number.MIN_SAFE_INTEGER);
  });

  it('encode -Infinity to string', () => {
    const parsed = coerceNumberInput().encode(Number.MIN_SAFE_INTEGER);
    expect(parsed).toBe(Number.MIN_SAFE_INTEGER.toString());
  });

  it('decode float to number', () => {
    const parsed = coerceNumberInput().decode('1.42');
    expect(parsed).toBe(1.42);
  });

  it('encode float to number', () => {
    const parsed = coerceNumberInput().encode(1.42);
    expect(parsed).toBe('1.42');
  });

  it('decode garbage to number', () => {
    const parsed = coerceNumberInput().decode('Hello, World!');
    expect(parsed).toBe(0);
  });
});

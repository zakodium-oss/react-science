import { expect, test } from 'vitest';

import type { NumericDraft } from '../numeric_draft.js';
import {
  commitNumericDraft,
  numericDraftText,
  typeNumericDraft,
} from '../numeric_draft.js';

/**
 * Type a whole entry keystroke by keystroke, as the input would.
 */
function type(
  keystrokes: string[],
  value: number,
  bounds: { min?: number; max?: number } = {},
): { text: string; value: number } {
  let current = value;
  let draft: NumericDraft | null = null;
  for (const text of keystrokes) {
    draft = typeNumericDraft(text, current, bounds);
    current = draft.value;
  }
  return { text: numericDraftText(draft, current), value: current };
}

test('a decimal can be typed into a field holding zero', () => {
  expect(type(['0.', '0.0', '0.01'], 0)).toStrictEqual({
    text: '0.01',
    value: 0.01,
  });
});

test('a field can be emptied and retyped', () => {
  expect(type(['', '1', '1.', '1.5'], 20)).toStrictEqual({
    text: '1.5',
    value: 1.5,
  });
});

test('a lone minus sign is kept and reports nothing', () => {
  expect(type(['-'], 4)).toStrictEqual({ text: '-', value: 4 });
  expect(type(['-', '-5'], 4)).toStrictEqual({ text: '-5', value: -5 });
});

test('an exponent being typed is kept and reports nothing', () => {
  expect(type(['1e'], 1)).toStrictEqual({ text: '1e', value: 1 });
  expect(type(['1e', '1e-3'], 1)).toStrictEqual({ text: '1e-3', value: 0.001 });
});

test('an entry outside the bounds is shown but not reported', () => {
  expect(type(['0.5'], 20, { min: 1 })).toStrictEqual({
    text: '0.5',
    value: 20,
  });
  expect(type(['200'], 20, { min: 1, max: 100 })).toStrictEqual({
    text: '200',
    value: 20,
  });
});

test('the draft is dropped when the value changes elsewhere', () => {
  const draft = typeNumericDraft('0.0', 0);
  expect(numericDraftText(draft, 0)).toBe('0.0');
  expect(numericDraftText(draft, 25)).toBe('25');
  expect(numericDraftText(null, 25)).toBe('25');
});

test('blur clamps the typed number without rounding it to the step', () => {
  expect(commitNumericDraft('0.5', 20, { min: 1 })).toBe(1);
  expect(commitNumericDraft('200', 20, { min: 1, max: 100 })).toBe(100);
  expect(commitNumericDraft('0.01', 0, { min: 0 })).toBe(0.01);
});

test('blur restores the value when nothing usable was typed', () => {
  expect(commitNumericDraft('', 20)).toBe(20);
  expect(commitNumericDraft('-', 20)).toBe(20);
  expect(commitNumericDraft('1e', 20)).toBe(20);
  expect(commitNumericDraft('  ', 20)).toBe(20);
});

test('blur keeps a trailing point as the number it holds', () => {
  expect(commitNumericDraft('0.', 0)).toBe(0);
  expect(commitNumericDraft('12.', 0)).toBe(12);
});

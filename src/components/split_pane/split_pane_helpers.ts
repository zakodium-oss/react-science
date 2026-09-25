export type SplitPaneSize = `${number}%` | `${number}px`;
export type SplitPaneType = '%' | 'px';

export interface ParsedSplitPaneSize {
  value: number;
  type: SplitPaneType;
}

export function parseSize(size: string): ParsedSplitPaneSize {
  // eslint-disable-next-line unicorn/prefer-number-coercion
  const value = Number.parseFloat(size);
  // Remove numbers and dots from the string.
  const type = size.replaceAll(/[\d .]/g, '');

  if (Number.isNaN(value) || (type !== '%' && type !== 'px')) {
    throw new Error('SplitPane size must be a number with "%" or "px" unit.');
  }

  return { value, type };
}

export function serializeSize(size: ParsedSplitPaneSize): SplitPaneSize {
  return `${size.value}${size.type}`;
}

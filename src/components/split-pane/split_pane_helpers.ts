export type SplitPaneSize = `${number}%` | `${number}px`;
export type SplitPaneType = '%' | 'px';

export interface ParsedSplitPaneSize {
  value: number;
  type: SplitPaneType;
}

export function parseSize(size: string): ParsedSplitPaneSize {
  const value = Number.parseFloat(size);
  // remove numbers and dots from the string
  const type = size.replaceAll(/[\d .]/g, '') as SplitPaneType;

  return { value, type };
}

export function serializeSize(size: ParsedSplitPaneSize): SplitPaneSize {
  return `${size.value}${size.type}`;
}

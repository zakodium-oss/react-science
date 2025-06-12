export function normalizeDOI(value: string): string {
  return value
    .replace(/^https?:\/\/(?:www\.|dx\.)?doi\.org\//, '')
    .replace(/^\/+/, '');
}

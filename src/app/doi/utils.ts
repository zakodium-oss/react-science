export function normalizeDOI(value: string): string {
  return value
    .replace(/^https?:\/\/(?<temp1>dx\.)?doi\.org\//, '')
    .replace(/^https?:\/\/(?<temp2>www\.)?doi\.org\//, '')
    .replace(/^\/+/, ''); // Remove leading slashes
}

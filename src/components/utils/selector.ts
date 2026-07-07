export function selector(
  template: TemplateStringsArray,
  ...substitutions: string[]
): string {
  return String.raw(template, ...substitutions.map((v) => CSS.escape(v)));
}

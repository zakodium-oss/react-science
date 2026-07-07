/**
 * Escape string substitution for use in a CSS selector.
 *
 * @param template
 * @param substitutions
 *
 * @example
 * ```ts
 * const element = scrollRef.current?.querySelector(
 *   selector`tr[data-row-id="${id}"]`,
 * );
 * ```
 */
export function selector(
  template: TemplateStringsArray,
  ...substitutions: string[]
): string {
  return String.raw(template, ...substitutions.map((v) => CSS.escape(v)));
}

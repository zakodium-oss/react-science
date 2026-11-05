/**
 * What a numeric field shows while it is being typed into.
 *
 * A field bound to a number cannot show what the keyboard produces: `0.` and
 * `0.0` are the number zero, so a field that only remembers the number snaps
 * back to `0` the moment the point is typed and `0.01` can never be reached.
 * The text the user typed is therefore kept next to the value it produced, and
 * the field shows it for as long as that value is still the one it is bound to.
 */

/**
 * Text being typed, and the value the field reported for it.
 */
export interface NumericDraft {
  /**
   * Exactly what the input holds, including a trailing point or a lone sign.
   */
  text: string;
  /**
   * The value that text produced, which may be the previous one.
   */
  value: number;
}

/**
 * Range a typed number is held in.
 */
export interface NumericBounds {
  /**
   * Smallest accepted value.
   *
   * @default undefined, unbounded below
   */
  min?: number;
  /**
   * Largest accepted value.
   *
   * @default undefined, unbounded above
   */
  max?: number;
}

/**
 * Choose the text a field displays.
 *
 * The draft is shown while the value it produced is still the bound one, so a
 * change coming from anywhere else — a preset, a reset, another field — wins
 * over an abandoned entry.
 *
 * @param draft - The entry in progress, or `null` when there is none.
 * @param value - The value the field is bound to.
 * @returns The string to display.
 */
export function numericDraftText(
  draft: NumericDraft | null,
  value: number,
): string {
  return draft !== null && draft.value === value ? draft.text : String(value);
}

/**
 * Take a keystroke.
 *
 * An entry that is not yet a number (`''`, `-`, `1e`) or that falls outside the
 * bounds leaves the value alone rather than reporting a number the user is
 * still in the middle of typing.
 *
 * @param text - What the input now holds.
 * @param value - The value the field is bound to.
 * @param bounds - Range the value is held in.
 * @returns The draft to keep, carrying the value to report.
 */
export function typeNumericDraft(
  text: string,
  value: number,
  bounds: NumericBounds = {},
): NumericDraft {
  const parsed = parseNumericText(text);
  const isAccepted = parsed !== null && isWithinBounds(parsed, bounds);
  return { text, value: isAccepted ? parsed : value };
}

/**
 * Settle an entry when the field is left.
 *
 * @param text - What the input holds.
 * @param value - The value the field is bound to.
 * @param bounds - Range the value is held in.
 * @returns The typed number clamped into the bounds, or the bound value when
 * nothing usable was typed.
 */
export function commitNumericDraft(
  text: string,
  value: number,
  bounds: NumericBounds = {},
): number {
  const parsed = parseNumericText(text);
  if (parsed === null) return value;
  const { min, max } = bounds;
  if (min !== undefined && parsed < min) return min;
  if (max !== undefined && parsed > max) return max;
  return parsed;
}

/**
 * Read a typed entry as a number.
 *
 * @param text - What the input holds.
 * @returns The number, or `null` while the entry is not one.
 */
export function parseNumericText(text: string): number | null {
  const trimmed = text.trim();
  if (trimmed === '') return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function isWithinBounds(value: number, bounds: NumericBounds): boolean {
  const { min, max } = bounds;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}

/** Better dom readability */
const DEFAULT_SEPARATOR = '\n  ';
const DEFAULT_CLAMP_VALUE = 1e5;

/**
 * A basic svg path line command builder.
 * It supports the following commands:
 * - moveTo (absolute coordinates)
 * - lineTo (absolute coordinates)
 * - closePath
 *
 * Coordinates are clamped in the [-clampValue; clampValue] interval.
 * `clampValue` is the first argument given to the constructor.
 * `clampValue` is a public property.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths#line_commands
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d
 */
export class SVGPathBuilder {
  #buffer: string[] = [];
  clampValue: number | null;

  /**
   * @param clampValue - All `x` and `y` values passed to moveTo and lineTo commands
   *  will be clamped to this value. `x < -clampValue` set `x` to `-clampValue`
   *  `x > clampValue` set `x` to `clampValue`.
   *  Set null to disable this behavior.
   *  defaults to `1e5`
   */
  constructor(clampValue: number | null = DEFAULT_CLAMP_VALUE) {
    this.clampValue = clampValue;
  }

  #appendPath(segment: string) {
    this.#buffer.push(segment);
  }

  /**
   * Clamp values to avoid rendering issues of the SVG.
   * This assumes that the viewport has pixel coordinates
   * (so the max values are outside of the visible area)
   */
  #clamp(value: number) {
    const cv = this.clampValue;
    if (cv === null) return value;
    if (value < -cv) return -cv;
    if (value > cv) return cv;
    return value;
  }

  /**
   * Get a shallow copy of internal the buffer.
   *
   * @param sliceArgs
   */
  getBufferSlice(...sliceArgs: [start?: number, end?: number]) {
    return this.#buffer.slice(...sliceArgs);
  }

  /**
   * Absolute move to
   *
   * @param x
   * @param y
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d#moveto_path_commands
   */
  moveTo(x: number, y: number): this {
    x = this.#clamp(x);
    y = this.#clamp(y);
    this.#appendPath(`M ${x} ${y}`);

    return this;
  }

  /**
   * Absolute line to
   *
   * @param x
   * @param y
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d#lineto_path_commands
   */
  lineTo(x: number, y: number): this {
    x = this.#clamp(x);
    y = this.#clamp(y);
    this.#appendPath(`L ${x} ${y}`);

    return this;
  }

  /**
   * Close the path, no-op if buffer is empty.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d#closepath
   */
  closePath(): this {
    if (this.#buffer.length === 0) return this;
    this.#appendPath('Z');

    return this;
  }

  /**
   * Serialize the buffer into paths commands.
   *
   * @param separator - default value is debug friendly (new-line + two spaces).
   */
  toString(separator = DEFAULT_SEPARATOR): string {
    return this.#buffer.join(separator);
  }

  /**
   * Merge many path builders into a new single one.
   *
   * @param builders
   */
  static concat(...builders: SVGPathBuilder[]): SVGPathBuilder {
    const builder = new SVGPathBuilder();

    builder.#buffer = builder.#buffer.concat(
      builders.flatMap((path) => path.getBufferSlice()),
    );

    return builder;
  }
}

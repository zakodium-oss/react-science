import type {
  SVGStyledFontStyle,
  SVGStyledFontWeight,
  SVGStyledLineStrokePattern,
} from './svg_styled_utils.js';

/**
 * SVG line styles that can be controlled by the user.
 */
export interface SVGStyledLineUserConfig {
  /**
   * Line color.
   * @default '#000000'
   */
  stroke?: string;

  /**
   * Line opacity.
   * Range: [0, 1]
   * @default 1
   */
  strokeOpacity?: number;

  /**
   * Line width.
   * Range: [0, ∞)
   * @default 1
   */
  strokeWidth?: number;

  /**
   * Line stroke pattern.
   * The `stroke-dasharray` attribute is computed from it and `strokeWidth`
   * @default 'solid'
   */
  strokeDasharray?: SVGStyledLineStrokePattern;
}

/**
 * SVG text styles that can be controlled by the user.
 */
export interface SVGStyledTextUserConfig {
  /**
   * Font color.
   * @default inherit
   */
  fill?: string;

  /**
   * Font size.
   * Range: [0, ∞)
   * @default inherit
   */
  fontSize?: number;

  /**
   * Font weight.
   * @default 'normal'
   */
  fontWeight?: SVGStyledFontWeight;

  /**
   * Font style.
   * @default 'normal'
   */
  fontStyle?: SVGStyledFontStyle;
}

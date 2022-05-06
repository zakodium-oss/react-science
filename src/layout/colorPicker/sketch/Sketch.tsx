import React, { CSSProperties } from 'react';

import { ColorWrap, Saturation, Hue, Alpha, CheckBoard } from '../common';

import SketchFields from './SketchFields';
import SketchPresetColors from './SketchPresetColors';

export type Direction = 'vertical' | 'horizontal';

export interface RGB {
  r: number;
  g: number;
  b: number;
  a: number;
}
export interface HSL {
  h: number;
  l: number;
  s: number;
  a: number;
}
export interface HSV {
  h: number;
  s: number;
  v: number;
  a: number;
}

// interface ChangeCallbackProps {
//   hex: string;
//   hsl: HSL;
//   hsv: HSV;
//   oldHue: number;
//   rgb: RGB;
//   source: 'hsv' | 'hsl' | 'rgb' | 'hex';
// }

export interface BaseColor {
  hex: string;
  rgb: RGB;
  hsl: HSL;
  hsv: HSV;
  disableAlpha: boolean;
}

export interface BaseColorPicker extends BaseColor {
  onChange: (props: any, event: Event) => void;
}

interface ColorPicker extends BaseColorPicker {
  width: string | number;
  className: string;
  presetColors: string[];
  onSwatchHover: any;
  renderers: any;
  // oldHue: string;
  // source: string;
}

const presetColorsList = [
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];

const styles: Record<
  | 'controls'
  | 'sliders'
  | 'saturationContainer'
  | 'saturationElement'
  | 'hueContainer'
  | 'hueElement'
  | 'alphaElement',
  CSSProperties
> &
  Record<
    'picker' | 'color' | 'activeColor' | 'alphaContainer',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any) => CSSProperties
  > = {
  picker: (width: number | string) => ({
    width: typeof width === 'string' ? width : `${width}px`,
    padding: '10px 10px 0',
    boxSizing: 'initial',
    background: '#fff',
    borderRadius: '4px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)',
  }),
  controls: {
    display: 'flex',
  },
  sliders: {
    padding: '4px 0',
    flex: '1',
  },
  color: (disableAlpha: boolean) => ({
    width: '24px',
    height: disableAlpha ? '10px' : '24px',
    position: 'relative',
    marginTop: '4px',
    marginLeft: '4px',
    borderRadius: '3px',
  }),
  activeColor: (rgb: RGB) => ({
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: '2px',
    background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
  }),

  saturationContainer: {
    width: '100%',
    paddingBottom: '75%',
    position: 'relative',
    overflow: 'hidden',
  },
  saturationElement: {
    borderRadius: '3px',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
  },

  hueContainer: {
    position: 'relative',
    height: '10px',
    overflow: 'hidden',
  },
  hueElement: {
    borderRadius: '2px',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
  },
  alphaContainer: (disableAlpha: boolean) => ({
    position: 'relative',
    height: '10px',
    marginTop: '4px',
    overflow: 'hidden',
    ...(disableAlpha && { display: 'none' }),
  }),
  alphaElement: {
    borderRadius: '2px',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
  },
};

const Sketch = (props: ColorPicker) => {
  const {
    width = 200,
    rgb,
    hex,
    hsv,
    hsl,
    onChange,
    onSwatchHover,
    disableAlpha = false,
    presetColors = presetColorsList,
    renderers,
    className = '',
  } = props;

  return (
    <div style={styles.picker(width)} className={`sketch-picker ${className}`}>
      <div style={styles.saturationContainer}>
        <Saturation
          style={styles.saturationElement}
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
        />
      </div>
      <div style={styles.controls} className="flexbox-fix">
        <div style={styles.sliders}>
          <div style={styles.hueContainer}>
            <Hue style={styles.hueElement} hsl={hsl} onChange={onChange} />
          </div>
          <div style={styles.alphaContainer(disableAlpha)}>
            <Alpha
              style={styles.alphaElement}
              rgb={rgb}
              hsl={hsl}
              renderers={renderers}
              onChange={onChange}
            />
          </div>
        </div>
        <div style={styles.color(disableAlpha)}>
          <CheckBoard />
          <div style={styles.activeColor(rgb)} />
        </div>
      </div>

      <SketchFields
        rgb={rgb}
        hsl={hsl}
        hex={hex}
        onChange={onChange}
        disableAlpha={disableAlpha}
      />
      <SketchPresetColors
        colors={presetColors}
        onClick={onChange}
        onSwatchHover={onSwatchHover}
      />
    </div>
  );
};

export default ColorWrap(Sketch);

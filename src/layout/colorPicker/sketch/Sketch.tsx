/* eslint-disable @typescript-eslint/no-explicit-any */
import merge from 'lodash/merge';
import React, { CSSProperties } from 'react';
import reactCSS from 'reactcss';

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
  styles: any;
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
    styles: passedStyles = {},
    className = '',
  } = props;

  const styles = reactCSS<
    Record<
      | 'picker'
      | 'saturation'
      | 'Saturation'
      | 'controls'
      | 'sliders'
      | 'color'
      | 'activeColor'
      | 'hue'
      | 'Hue'
      | 'alpha'
      | 'Alpha',
      CSSProperties
    >
  >(
    merge(
      {
        default: {
          picker: {
            width,
            padding: '10px 10px 0',
            boxSizing: 'initial',
            background: '#fff',
            borderRadius: '4px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)',
          },
          saturation: {
            width: '100%',
            paddingBottom: '75%',
            position: 'relative',
            overflow: 'hidden',
          },
          Saturation: {
            radius: '3px',
            shadow:
              'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },
          controls: {
            display: 'flex',
          },
          sliders: {
            padding: '4px 0',
            flex: '1',
          },
          color: {
            width: '24px',
            height: '24px',
            position: 'relative',
            marginTop: '4px',
            marginLeft: '4px',
            borderRadius: '3px',
          },
          activeColor: {
            absolute: '0px 0px 0px 0px',
            borderRadius: '2px',
            background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
            boxShadow:
              'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },
          hue: {
            position: 'relative',
            height: '10px',
            overflow: 'hidden',
          },
          Hue: {
            radius: '2px',
            shadow:
              'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },

          alpha: {
            position: 'relative',
            height: '10px',
            marginTop: '4px',
            overflow: 'hidden',
          },
          Alpha: {
            radius: '2px',
            shadow:
              'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
          },
          ...passedStyles,
        },
        disableAlpha: {
          color: {
            height: '10px',
          },
          hue: {
            height: '10px',
          },
          alpha: {
            display: 'none',
          },
        },
      },
      passedStyles,
    ),
    { disableAlpha },
  );

  return (
    <div style={styles.picker} className={`sketch-picker ${className}`}>
      <div style={styles.saturation}>
        <Saturation
          style={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
        />
      </div>
      <div style={styles.controls} className="flexbox-fix">
        <div style={styles.sliders}>
          <div style={styles.hue}>
            <Hue style={styles.Hue} hsl={hsl} onChange={onChange} />
          </div>
          <div style={styles.alpha}>
            <Alpha
              style={styles.Alpha}
              rgb={rgb}
              hsl={hsl}
              renderers={renderers}
              onChange={onChange}
            />
          </div>
        </div>
        <div style={styles.color}>
          <CheckBoard />
          <div style={styles.activeColor} />
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

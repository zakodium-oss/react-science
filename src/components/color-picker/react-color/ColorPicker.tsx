import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { debounce as internalDebounce } from '../../utils/index.js';
import { defaultColorPalette } from '../palette.js';

import { Alpha, CheckBoard, Hue, Saturation } from './common/index.js';
import * as colorHelper from './helpers/color.js';
import SketchFields from './sketch/SketchFields.js';
import SketchPresetColors from './sketch/SketchPresetColors.js';

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

interface ChangeCallbackProps {
  hex: string;
  hsl: HSL;
  hsv: HSV;
  oldHue: number;
  rgb: RGB;
  source: 'hsv' | 'hsl' | 'rgb' | 'hex';
}

export interface ColorPickerProps {
  width?: string | number;
  className?: string;
  presetColors?: string[];
  color?:
    | {
        hex: string;
      }
    | RGB
    | HSL
    | HSV;
  disableAlpha?: boolean;
  onChange?: (props: ChangeCallbackProps, event?: Event) => void;
  onChangeComplete?: (props: ChangeCallbackProps, event?: Event) => void;
  onSwatchHover?: (props: ChangeCallbackProps, event?: Event) => void;
  style?: CSSProperties;
}

const defaultColor = {
  h: 250,
  s: 0.5,
  l: 0.2,
  a: 1,
};

const styles: Record<
  | 'controls'
  | 'sliders'
  | 'saturationContainer'
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

export function ColorPicker(props: ColorPickerProps) {
  const {
    width = 200,
    onChange,
    onSwatchHover,
    disableAlpha = false,
    presetColors = defaultColorPalette,
    className = '',
    color = defaultColor,
    onChangeComplete,
    style = {},
  } = props;

  const [state, setState] = useState(colorHelper.toState(color, 0));

  const debounce = useRef(
    internalDebounce((fn: any, data: ChangeCallbackProps, event: Event) => {
      fn(data, event);
    }, 100),
  ).current;

  useEffect(() => {
    setState((prevState) => colorHelper.toState(color, prevState.oldHue));
  }, [color]);

  const handleChange = useCallback(
    (data: any, event: any) => {
      const isValidColor = colorHelper.simpleCheckForValidColor(data);
      if (isValidColor) {
        const colors = colorHelper.toState(data, data.h || state.oldHue);
        setState(colors);
        if (onChangeComplete) {
          debounce(onChangeComplete, colors, event);
        }
        if (onChange) {
          onChange(colors, event);
        }
      }
    },
    [debounce, onChange, onChangeComplete, state.oldHue],
  );

  const handleSwatchHover = useCallback(
    (data: any, event: any) => {
      const isValidColor = colorHelper.simpleCheckForValidColor(data);
      if (isValidColor) {
        const colors = colorHelper.toState(data, data.h || state.oldHue);
        if (onSwatchHover) {
          onSwatchHover(colors, event);
        }
      }
    },
    [onSwatchHover, state.oldHue],
  );
  const { rgb, hex, hsv, hsl } = state;

  return (
    <div style={{ ...styles.picker(width), ...style }} className={className}>
      <div style={styles.saturationContainer}>
        <Saturation hsl={hsl} hsv={hsv} onChange={handleChange} />
      </div>
      <div style={styles.controls}>
        <div style={styles.sliders}>
          <div style={styles.hueContainer}>
            <Hue style={styles.hueElement} hsl={hsl} onChange={handleChange} />
          </div>
          <div style={styles.alphaContainer(disableAlpha)}>
            <Alpha
              style={styles.alphaElement}
              rgb={rgb}
              hsl={hsl}
              onChange={handleChange}
            />
          </div>
        </div>
        <div style={styles.color(disableAlpha)}>
          <CheckBoard />
          <div style={styles.activeColor(rgb)} />
        </div>
      </div>

      <SketchFields
        hsl={hsl}
        hex={hex}
        rgb={rgb}
        onChange={handleChange}
        disableAlpha={disableAlpha}
      />
      <SketchPresetColors
        colors={presetColors}
        onClick={(data, e) => handleChange?.(data as ChangeCallbackProps, e)}
        onSwatchHover={handleSwatchHover}
      />
    </div>
  );
}

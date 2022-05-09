import lodashDebounce from 'lodash/debounce';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Saturation, Hue, Alpha, CheckBoard } from '../common';
import * as colorHelper from '../helpers/color';

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

interface ChangeCallbackProps {
  hex: string;
  hsl: HSL;
  hsv: HSV;
  oldHue: number;
  rgb: RGB;
  source: 'hsv' | 'hsl' | 'rgb' | 'hex';
}

interface ColorPicker {
  width?: string | number;
  className?: string;
  presetColors?: string[];
  renderers?: unknown;
  color?: {
    hex?: string;
    r?: number;
    g?: number;
    b?: number;
    h?: number;
    s?: number;
    l?: number;
    v?: number;
  };
  disableAlpha?: boolean;
  onChange?: (props: ChangeCallbackProps, event?: Event) => void;
  onChangeComplete?: (props: ChangeCallbackProps, event?: Event) => void;
  onSwatchHover?: (props: ChangeCallbackProps, event?: Event) => void;
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
    onChange,
    onSwatchHover,
    disableAlpha = false,
    presetColors = presetColorsList,
    renderers,
    className = '',
    color = defaultColor,
    onChangeComplete,
  } = props;

  const [state, setState] = useState(colorHelper.toState(color, 0));

  const debounce = useRef(
    lodashDebounce((fn, data, event) => {
      fn(data, event);
    }, 100),
  ).current;

  useEffect(() => {
    setState((prevState) => colorHelper.toState(color, prevState.oldHue));
  }, [color]);

  const handleChange = useCallback(
    (data, event) => {
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
    (data, event) => {
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
    <div style={styles.picker(width)} className={`sketch-picker ${className}`}>
      <div style={styles.saturationContainer}>
        <Saturation
          style={styles.saturationElement}
          hsl={hsl}
          hsv={hsv}
          onChange={handleChange}
        />
      </div>
      <div style={styles.controls} className="flexbox-fix">
        <div style={styles.sliders}>
          <div style={styles.hueContainer}>
            <Hue style={styles.hueElement} hsl={hsl} onChange={handleChange} />
          </div>
          <div style={styles.alphaContainer(disableAlpha)}>
            <Alpha
              style={styles.alphaElement}
              rgb={rgb}
              hsl={hsl}
              renderers={renderers}
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
        rgb={rgb}
        hsl={hsl}
        hex={hex}
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
};

export default Sketch;

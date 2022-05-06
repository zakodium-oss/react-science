import React, { CSSProperties, useCallback } from 'react';

import { EditableInput } from '../common';
import * as color from '../helpers/color';

import { BaseColorPicker } from './Sketch';

interface SketchFieldsProps extends Omit<BaseColorPicker, 'hsv'> {}

const styles: Record<
  'fields' | 'single' | 'double' | 'input' | 'label',
  CSSProperties
> &
  Record<'alpha', (disableAlpha: boolean) => CSSProperties> = {
  fields: {
    display: 'flex',
    paddingTop: '4px',
  },
  single: {
    flex: '1',
    paddingLeft: '6px',
  },
  alpha: (disableAlpha: boolean) => ({
    flex: '1',
    paddingLeft: '6px',
    ...(disableAlpha && { display: 'none' }),
  }),
  double: {
    flex: '2',
  },
  input: {
    width: '80%',
    padding: '4px 10% 3px',
    border: 'none',
    boxShadow: 'inset 0 0 0 1px #ccc',
    fontSize: '11px',
  },
  label: {
    display: 'block',
    textAlign: 'center',
    fontSize: '11px',
    color: '#222',
    paddingTop: '3px',
    paddingBottom: '4px',
    textTransform: 'capitalize',
  },
};

const SketchFields = ({
  onChange,
  rgb,
  hsl,
  hex,
  disableAlpha,
}: SketchFieldsProps) => {
  const handleChange = useCallback(
    (data, e) => {
      if (data.hex) {
        if (color.isValidHex(data.hex)) {
          onChange(
            {
              hex: data.hex,
              source: 'hex',
            },
            e,
          );
        }
      } else if (data.r || data.g || data.b) {
        onChange(
          {
            r: data.r || rgb.r,
            g: data.g || rgb.g,
            b: data.b || rgb.b,
            a: rgb.a,
            source: 'rgb',
          },
          e,
        );
      } else if (data.a) {
        if (data.a < 0) {
          data.a = 0;
        } else if (data.a > 100) {
          data.a = 100;
        }

        data.a /= 100;
        onChange(
          {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l,
            a: data.a,
            source: 'rgb',
          },
          e,
        );
      }
    },
    [hsl.h, hsl.l, hsl.s, onChange, rgb.a, rgb.b, rgb.g, rgb.r],
  );

  return (
    <div style={styles.fields} className="flexbox-fix">
      <div style={styles.double}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="hex"
          value={hex.replace('#', '')}
          onChange={handleChange}
        />
      </div>
      <div style={styles.single}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="r"
          value={rgb.r}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </div>
      <div style={styles.single}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="g"
          value={rgb.g}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </div>
      <div style={styles.single}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="b"
          value={rgb.b}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </div>
      <div style={styles.alpha(disableAlpha)}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="a"
          value={Math.round(rgb.a * 100)}
          onChange={handleChange}
          dragLabel="true"
          dragMax="100"
        />
      </div>
    </div>
  );
};

export default SketchFields;

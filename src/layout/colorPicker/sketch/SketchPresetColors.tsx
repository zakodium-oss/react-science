/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties, MouseEvent, useCallback } from 'react';
import reactCSS from 'reactcss';

import { Swatch } from '../common';

interface SketchPresetColorsProps {
  colors: (string | { color: string; title: string })[];
  onClick: (data: { hex: any; source: string }, event: any) => void;
  onSwatchHover: any;
}

const SketchPresetColors = (props: SketchPresetColorsProps) => {
  const { colors, onClick, onSwatchHover } = props;

  const styles = reactCSS<
    Record<'colors' | 'swatchWrap' | 'swatch', CSSProperties>
  >(
    {
      default: {
        colors: {
          margin: '0 -10px',
          padding: '10px 0 0 10px',
          borderTop: '1px solid #eee',
          display: 'flex',
          flexWrap: 'wrap',
          position: 'relative',
        },
        swatchWrap: {
          width: '16px',
          height: '16px',
          margin: '0 10px 10px 0',
        },
        swatch: {
          borderRadius: '3px',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)',
        },
      },
      'no-presets': {
        colors: {
          display: 'none',
        },
      },
    },
    {
      'no-presets': !colors || !colors.length,
    },
  );

  const handleClick = useCallback(
    (hex: any, e: MouseEvent) => {
      onClick?.(
        {
          hex,
          source: 'hex',
        },
        e,
      );
    },
    [onClick],
  );

  return (
    <div style={styles.colors} className="flexbox-fix">
      {colors.map((colorObjOrString) => {
        const c =
          typeof colorObjOrString === 'string'
            ? { color: colorObjOrString }
            : colorObjOrString;
        const key = `${c.color}${'title' in c ? c?.title : ''}`;
        return (
          <div key={key} style={styles.swatchWrap}>
            <Swatch
              {...c}
              style={styles.swatch}
              onClick={handleClick}
              onHover={onSwatchHover}
              focusStyle={{
                boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${c.color}`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SketchPresetColors;

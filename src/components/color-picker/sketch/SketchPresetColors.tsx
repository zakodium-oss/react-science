import { CSSProperties, MouseEvent, useCallback } from 'react';

import { Swatch } from '../common';

interface SketchPresetColorsProps {
  colors: (string | { color: string; title: string })[];
  onClick: (data: { hex: any; source: string }, event: any) => void;
  onSwatchHover: any;
}

const styles: Record<'swatchWrap' | 'swatch', CSSProperties> &
  Record<'colors', (flag: boolean) => CSSProperties> = {
  colors: (flag: boolean) => ({
    margin: '0 -10px',
    padding: '10px 0 0 10px',
    borderTop: '1px solid #eee',
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    ...(flag && { display: 'none' }),
  }),
  swatchWrap: {
    width: '16px',
    height: '16px',
    margin: '0 10px 10px 0',
  },
  swatch: {
    borderRadius: '3px',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)',
  },
};

const SketchPresetColors = (props: SketchPresetColorsProps) => {
  const { colors, onClick, onSwatchHover } = props;

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
    <div style={styles.colors(!colors || !colors.length)}>
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

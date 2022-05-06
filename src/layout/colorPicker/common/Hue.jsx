import React, { useCallback, useRef } from 'react';
import reactCSS from 'reactcss';

import * as hue from '../helpers/hue';

import { useOnChange } from './useOnChange';

const Hue = (props) => {
  const containerRef = useRef();

  const handleChange = useCallback(
    (e) => {
      const change = hue.calculateChange(
        e,
        props.direction,
        props.hsl,
        containerRef.current,
      );
      if (change && typeof props.onChange === 'function') {
        props.onChange(change, e);
      }
    },
    [props],
  );

  const handleMouseDown = useOnChange(handleChange);

  const { direction = 'horizontal' } = props;
  const { borderRadius, boxShadow } = props.style;
  const styles = reactCSS(
    {
      default: {
        hue: {
          absolute: '0px 0px 0px 0px',
          borderRadius,
          boxShadow,
        },
        container: {
          padding: '0 2px',
          position: 'relative',
          height: '100%',
          borderRadius,
        },
        pointer: {
          position: 'absolute',
          left: `${(props.hsl.h * 100) / 360}%`,
        },
        slider: {
          marginTop: '1px',
          width: '4px',
          borderRadius: '1px',
          height: '8px',
          boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
          background: '#fff',
          transform: 'translateX(-2px)',
        },
      },
      vertical: {
        pointer: {
          left: '0px',
          top: `${-((props.hsl.h * 100) / 360) + 100}%`,
        },
      },
    },
    { vertical: direction === 'vertical' },
  );

  return (
    <div style={styles.hue}>
      <div
        className={`hue-${direction}`}
        style={styles.container}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <style>{`
            .hue-horizontal {
              background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
                33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              background: -webkit-linear-gradient(to right, #f00 0%, #ff0
                17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            }

            .hue-vertical {
              background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
                #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,
                #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            }
          `}</style>
        <div style={styles.pointer}>
          {props.pointer ? (
            <props.pointer {...props} />
          ) : (
            <div style={styles.slider} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hue;

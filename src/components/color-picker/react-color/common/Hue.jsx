import { useCallback, useRef } from 'react';

import * as hue from '../helpers/hue';

import { useOnChange } from './useOnChange';

const styles = {
  hue: (borderRadius, boxShadow) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius,
    boxShadow,
  }),
  container: (direction, borderRadius) => {
    let gradientDirection = 'right';

    if (direction === 'vertical') {
      gradientDirection = 'bottom';
    }
    return {
      padding: '0 2px',
      position: 'relative',
      height: '100%',
      borderRadius,
      background: `linear-gradient(to ${gradientDirection}, #f00 0%, #ff0 17%, #0f0
      33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
    };
  },
  pointer: (direction, hsl) => {
    if (direction === 'vertical') {
      return {
        position: 'absolute',
        left: 0,
        top: `${-((hsl.h * 100) / 360) + 100}%`,
      };
    }

    return {
      position: 'absolute',
      left: `${(hsl.h * 100) / 360}%`,
    };
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
};

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

  const { direction = 'horizontal', hsl, style, pointer } = props;
  const { borderRadius, boxShadow } = style;

  return (
    <div style={styles.hue(borderRadius, boxShadow)}>
      <div
        style={styles.container(direction, borderRadius)}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <div style={styles.pointer(direction, hsl)}>
          {pointer ? (
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

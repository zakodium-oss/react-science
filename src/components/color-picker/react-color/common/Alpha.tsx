// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useCallback, useRef } from 'react';

import * as alpha from '../helpers/alpha.js';

import CheckBoard from './CheckBoard.js';
import { useOnChange } from './useOnChange.js';

const styles = {
  alpha: (borderRadius) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius,
  }),
  checkerboard: (borderRadius) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    borderRadius,
  }),
  gradient: (direction, boxShadow, borderRadius, rgb) => {
    let gradientDirection = 'right';

    if (direction === 'vertical') {
      gradientDirection = 'bottom';
    }

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      boxShadow,
      borderRadius,
      background: `linear-gradient(to ${gradientDirection}, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
      rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
    };
  },
  container: {
    position: 'relative',
    height: '100%',
    margin: '0 3px',
  },
  pointer: (direction, rgb) => {
    if (direction === 'vertical') {
      return {
        position: 'absolute',
        left: 0,
        top: `${rgb.a * 100}%`,
      };
    }

    return {
      position: 'absolute',
      left: `${rgb.a * 100}%`,
    };
  },
  slider: {
    width: '4px',
    borderRadius: '1px',
    height: '8px',
    boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
    background: '#fff',
    marginTop: '1px',
    transform: 'translateX(-2px)',
  },
};

const Alpha = (props) => {
  const containerRef = useRef();
  const handleChange = useCallback(
    (e) => {
      const change = alpha.calculateChange(
        e,
        props.hsl,
        props.direction,
        props.a,
        containerRef.current,
      );
      if (change && typeof props.onChange === 'function') {
        props.onChange(change, e);
      }
    },
    [props],
  );
  const mouseDownHandler = useOnChange(handleChange);
  const rgb = props.rgb;
  const { borderRadius, boxShadow, direction } = props.style;
  return (
    <div style={styles.alpha(borderRadius)}>
      <div style={styles.checkerboard(borderRadius)}>
        <CheckBoard renderers={props.renderers} />
      </div>
      <div style={styles.gradient(direction, boxShadow, borderRadius, rgb)} />
      <div
        style={styles.container}
        ref={containerRef}
        onMouseDown={mouseDownHandler}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <div style={styles.pointer(direction, rgb)}>
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

export default Alpha;

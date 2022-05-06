import React, { useCallback, useRef } from 'react';
import reactCSS from 'reactcss';

import * as alpha from '../helpers/alpha';

import CheckBoard from './CheckBoard';
import { useOnChange } from './useOnChange';

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
  const { borderRadius, boxShadow } = props.style;
  const styles = reactCSS(
    {
      default: {
        alpha: {
          absolute: '0px 0px 0px 0px',
          borderRadius,
        },
        checkboard: {
          absolute: '0px 0px 0px 0px',
          overflow: 'hidden',
          borderRadius,
        },
        gradient: {
          absolute: '0px 0px 0px 0px',
          background: `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
           rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
          boxShadow,
          borderRadius,
        },
        container: {
          position: 'relative',
          height: '100%',
          margin: '0 3px',
        },
        pointer: {
          position: 'absolute',
          left: `${rgb.a * 100}%`,
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
      },
      vertical: {
        gradient: {
          background: `linear-gradient(to bottom, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
           rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
        },
        pointer: {
          left: 0,
          top: `${rgb.a * 100}%`,
        },
      },
      overwrite: {
        ...props.style,
      },
    },
    {
      vertical: props.direction === 'vertical',
      overwrite: true,
    },
  );

  return (
    <div style={styles.alpha}>
      <div style={styles.checkboard}>
        <CheckBoard renderers={props.renderers} />
      </div>
      <div style={styles.gradient} />
      <div
        style={styles.container}
        ref={containerRef}
        onMouseDown={mouseDownHandler}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
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

export default Alpha;

import lodashThrottle from 'lodash/throttle';
import React, { useCallback, useRef } from 'react';
import reactCSS from 'reactcss';

import * as saturation from '../helpers/saturation';

import { useOnChange } from './useOnChange';

const Saturation = (props) => {
  const { onChange, hsl } = props;

  const throttle = useRef(
    lodashThrottle((fn, data, e) => {
      fn(data, e);
    }, 50),
  ).current;

  const containerRef = useRef();

  const handleChange = useCallback(
    (e) => {
      if (onChange && typeof onChange === 'function') {
        throttle(
          onChange,
          saturation.calculateChange(e, hsl, containerRef.current),
          e,
        );
      }
    },
    [hsl, onChange, throttle],
  );

  const handleMouseDown = useOnChange(handleChange);

  const { color, white, black, pointer, circle, borderRadius, boxShadow } =
    props.style || {};

  const styles = reactCSS(
    {
      default: {
        color: {
          absolute: '0px 0px 0px 0px',
          background: `hsl(${props.hsl.h},100%, 50%)`,
          borderRadius,
          userDraggle: 'none',
          userSelect: 'none',
        },
        white: {
          absolute: '0px 0px 0px 0px',
          borderRadius,
        },
        black: {
          absolute: '0px 0px 0px 0px',
          boxShadow,
          borderRadius,
        },
        pointer: {
          position: 'absolute',
          top: `${-(props.hsv.v * 100) + 100}%`,
          left: `${props.hsv.s * 100}%`,
          cursor: 'default',
        },
        circle: {
          width: '4px',
          height: '4px',
          boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
            0 0 1px 2px rgba(0,0,0,.4)`,
          borderRadius: '50%',
          cursor: 'hand',
          transform: 'translate(-2px, -2px)',
        },
      },
      custom: {
        color,
        white,
        black,
        pointer,
        circle,
      },
    },
    { custom: !!props.style },
  );

  return (
    <div
      style={styles.color}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchMove={handleChange}
      onTouchStart={handleChange}
    >
      <style>{`
          .saturation-white {
            background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));
            background: linear-gradient(to right, #fff, rgba(255,255,255,0));
          }
          .saturation-black {
            background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));
            background: linear-gradient(to top, #000, rgba(0,0,0,0));
          }
        `}</style>
      <div style={styles.white} className="saturation-white">
        <div style={styles.black} className="saturation-black" />
        <div style={styles.pointer}>
          {props.pointer ? (
            <props.pointer {...props} />
          ) : (
            <div style={styles.circle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Saturation;

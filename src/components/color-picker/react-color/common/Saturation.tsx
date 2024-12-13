// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useCallback, useRef } from 'react';

import { throttle } from '../../../utils/index.js';
import * as saturation from '../helpers/saturation.js';

import { useOnChange } from './useOnChange.js';

const styles = {
  color: (hsl) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `hsl(${hsl.h},100%, 50%)`,
    userDraggle: 'none',
    userSelect: 'none',
  }),
  white: () => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(to right, #fff, rgba(255,255,255,0))`,
  }),
  black: () => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(to top, #000, rgba(0,0,0,0))`,
  }),
  pointer: (hsv) => ({
    position: 'absolute',
    top: `${-(hsv.v * 100) + 100}%`,
    left: `${hsv.s * 100}%`,
    cursor: 'default',
  }),
  circle: {
    width: '4px',
    height: '4px',
    boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
          0 0 1px 2px rgba(0,0,0,.4)`,
    borderRadius: '50%',
    cursor: 'hand',
    transform: 'translate(-2px, -2px)',
  },
};

const Saturation = (props) => {
  const { onChange, hsl, hsv, pointer } = props;

  const throttleRef = useRef(
    throttle((fn, data, e) => {
      fn(data, e);
    }, 50),
  );

  const containerRef = useRef();

  const handleChange = useCallback(
    (e) => {
      if (onChange && typeof onChange === 'function') {
        throttleRef.current(
          onChange,
          saturation.calculateChange(e, hsl, containerRef.current),
          e,
        );
      }
    },
    [hsl, onChange, throttleRef],
  );

  const handleMouseDown = useOnChange(handleChange);

  return (
    <div
      style={styles.color(hsl)}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchMove={handleChange}
      onTouchStart={handleChange}
    >
      <div style={styles.white()}>
        <div style={styles.black()} />
        <div style={styles.pointer(hsv)}>
          {pointer ? (
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

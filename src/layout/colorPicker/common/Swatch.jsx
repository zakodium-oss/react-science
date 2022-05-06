import React, { useCallback } from 'react';
import reactCSS from 'reactcss';

import CheckBoard from './CheckBoard';
import { handleFocus } from './interaction';

// interface SwatchProps {
//   color: string;
//   style: any;
//   onClick: (color: string, event: MouseEvent<HTMLDivElement>) => void;
//   onHover?: (color: string, event: Event) => void;
//   title: string;
//   focus: boolean;
//   focusStyle: any;
//   children: ReactNode;
// }

export const Swatch = ({
  color,
  style,
  onClick,
  onHover,
  title = color,
  children,
  focus,
  focusStyle = {},
}) => {
  const transparent = color === 'transparent';
  const styles = reactCSS({
    default: {
      swatch: {
        background: color,
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        position: 'relative',
        outline: 'none',
        ...style,
        ...(focus ? focusStyle : {}),
      },
    },
  });

  const handleClick = useCallback((e) => onClick?.(color, e), [color, onClick]);
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key.toLowerCase() === 'enter') {
        onClick?.(color, e);
      }
    },
    [color, onClick],
  );
  const handleHover = useCallback((e) => onHover?.(color, e), [color, onHover]);

  const optionalEvents = {};
  if (onHover) {
    optionalEvents.onMouseOver = handleHover;
  }

  return (
    <div
      style={styles.swatch}
      onClick={handleClick}
      title={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...optionalEvents}
    >
      {children}
      {transparent && (
        <CheckBoard
          borderRadius={styles.swatch.borderRadius}
          boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
        />
      )}
    </div>
  );
};

export default handleFocus(Swatch);

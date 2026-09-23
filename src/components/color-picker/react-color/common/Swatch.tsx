// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { CSSProperties } from 'react';
import { useCallback } from 'react';

import CheckBoard from './CheckBoard.js';
import { handleFocus } from './interaction.js';

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
const styles = {
  height: '100%',
  width: '100%',
  cursor: 'pointer',
  position: 'relative',
  outline: 'none',
};

const defaultFocusStyle: CSSProperties = {};

const SwatchWithFocus = handleFocus(function Swatch({
  color,
  style,
  onClick,
  onHover,
  title = color,
  children,
  focus,
  focusStyle = defaultFocusStyle,
}) {
  const isTransparent = color === 'transparent';

  const handleClick = useCallback(
    (event) => onClick?.(color, event),
    [color, onClick],
  );
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key.toLowerCase() === 'enter') {
        onClick?.(color, event);
      }
    },
    [color, onClick],
  );
  const handleHover = useCallback(
    (event) => onHover?.(color, event),
    [color, onHover],
  );

  const optionalEvents = {};
  if (onHover) {
    optionalEvents.onMouseOver = handleHover;
  }

  return (
    <div
      style={{
        ...styles,
        background: color,
        ...style,
        ...(focus && focusStyle),
      }}
      onClick={handleClick}
      title={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...optionalEvents}
    >
      {children}
      {isTransparent && (
        <CheckBoard
          borderRadius={style.borderRadius}
          boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
        />
      )}
    </div>
  );
});

export default SwatchWithFocus;

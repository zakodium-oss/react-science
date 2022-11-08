import type { Placement } from '@popperjs/core';
import React, { useCallback, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';

interface PositionState {
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}

export function useContextMenuPlacement(placement: Placement) {
  const [positionState, setPositionState] = useState<PositionState | null>(
    null,
  );

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { clientX, clientY, pageX, pageY } = event;
      event.preventDefault();

      setPositionState({
        clientX,
        clientY,
        pageX,
        pageY,
      });
    },
    [],
  );

  const boudingClientRect = useMemo(() => {
    return {
      top: positionState?.clientY || 0,
      left: positionState?.clientX || 0,
      x: positionState?.pageX || 0,
      y: positionState?.pageY || 0,

      bottom: 0,
      right: 0,
      height: 0,
      width: 0,
      toJSON: () => '',
    };
  }, [positionState]);

  const virtualElement = useMemo(() => {
    return {
      getBoundingClientRect: () => boudingClientRect,
    };
  }, [boudingClientRect]);

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const { styles, attributes, state } = usePopper(
    virtualElement,
    popperElement,
    {
      placement,
    },
  );

  return {
    setPopperElement,
    styles,
    attributes,
    popperState: state,
    isPopperElementOpen: positionState !== null,
    handleContextMenu,
    closePopperElement: () => {
      setPositionState(null);
    },
  };
}

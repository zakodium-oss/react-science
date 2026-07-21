import type { Intent } from '@blueprintjs/core';
import { Classes, Utils } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { clamp } from '@zakodium/utils';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { match } from 'ts-pattern';

interface DraggableProps {
  children: ReactNode;
  value: number;
  onChange: (_: number, value: string) => void;
  onBlur: () => void;
  step?: number;
  min?: number;
  max?: number;
  intent: Intent;
  majorStepSize?: number | null;
  minorStepSize?: number | null;
  className?: string;
}

const DraggableContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: ew-resize;
  height: 100%;
  min-height: 30px;
`;

const DraggableLabel = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  padding-left: 5px;
  padding-right: 5px;
`;

export function Draggable(props: DraggableProps) {
  const {
    children,
    value,
    onChange,
    onBlur,
    step: stepSize = 1,
    min,
    max,
    intent,
    majorStepSize,
    minorStepSize,
    className,
  } = props;

  const draggedValueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const previousPositionRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!isDraggingRef.current) return;

      const diff = event.clientX - previousPositionRef.current;
      previousPositionRef.current = event.clientX;

      if (event.buttons === 1) {
        const step = match(event)
          .with({ shiftKey: true }, () => majorStepSize ?? stepSize)
          .with({ altKey: true }, () => minorStepSize ?? stepSize)
          .otherwise(() => stepSize);

        const precision = Math.max(
          Utils.countDecimalPlaces(draggedValueRef.current),
          Utils.countDecimalPlaces(minorStepSize ?? stepSize),
        );

        const nextValue = toMaxPrecision(
          draggedValueRef.current + diff * step,
          precision,
        );

        draggedValueRef.current = clamp(nextValue, min, max);
        onChangeRef.current(0, String(draggedValueRef.current));
      }
    }

    function handleMouseUp() {
      isDraggingRef.current = false;
      onBlur();
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [majorStepSize, max, min, minorStepSize, onBlur, stepSize]);

  const handleMouseDown = useCallback(
    (event: ReactMouseEvent) => {
      isDraggingRef.current = true;
      previousPositionRef.current = event.clientX;
      draggedValueRef.current = value;
    },
    [value],
  );

  return (
    <DraggableContainer
      onMouseDown={handleMouseDown}
      className={`${className} ${Classes.TAG} ${Classes.MINIMAL} ${Classes.intentClass(intent)}`}
    >
      <DraggableLabel>{children}</DraggableLabel>
    </DraggableContainer>
  );
}

function toMaxPrecision(value: number, maxPrecision: number) {
  const scaleFactor = 10 ** maxPrecision;
  return Math.round(value * scaleFactor) / scaleFactor;
}

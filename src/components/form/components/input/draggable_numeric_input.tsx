import type { Intent } from '@blueprintjs/core';
import { Classes, NumericInput as BPNumericInput } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';

import { useFieldContext } from '../../context/use_ts_form.ts';
import { getIntent } from '../../utils/use_intent.ts';
import { FormGroup } from '../input_groups/index.ts';

import type { NumericInputProps } from './numeric_input.tsx';

interface DraggableNumericInputProps extends NumericInputProps {
  draggableLabel: string;
  draggableIntent?: Intent;
  hideInput?: boolean;
}

export function DraggableNumericInput(props: DraggableNumericInputProps) {
  const {
    label,
    required,
    helpText,
    placeholder,
    step,
    min,
    max,
    layout,
    fullWidth,
    draggableLabel,
    draggableIntent = 'success',
    hideInput = false,
    ...otherProps
  } = props;

  const field = useFieldContext<string>();
  const error = field
    .getMeta()
    .errors.map((e) => e.message)
    .at(0);

  const intent = getIntent(error);

  function onChange(_: number, valueAsString: string) {
    return field.handleChange(valueAsString);
  }

  return (
    <FormGroup
      name={field.name}
      label={label}
      intent={intent}
      required={required}
      helpText={helpText}
      layout={layout}
      error={undefined}
      fullWidth={fullWidth}
      contentFullWidth
    >
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
        {!hideInput && (
          <BPNumericInput
            {...otherProps}
            id={field.name}
            name={field.name}
            stepSize={step}
            min={min}
            max={max}
            value={field.state.value ?? ''}
            onValueChange={onChange}
            onBlur={field.handleBlur}
            intent={intent}
            placeholder={placeholder}
            required={required}
          />
        )}

        <div style={{ flex: 1 }}>
          <Range
            value={Number(field.state.value)}
            onBlur={field.handleBlur}
            onChange={onChange}
            step={step}
            min={min}
            max={max}
            intent={draggableIntent}
          >
            {draggableLabel}
          </Range>
        </div>
      </div>
    </FormGroup>
  );
}

interface RangeProps {
  children: ReactNode;
  value: number;
  onChange: (_: number, value: string) => void;
  onBlur: () => void;
  step?: number;
  min?: number;
  max?: number;
  intent: Intent;
}

const RangeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: ew-resize;
  height: 100%;
  min-height: 30px;

  &.${Classes.TAG} {
    padding: 0;
    min-height: unset;
  }
`;

const RangeLabel = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  padding-left: 5px;
  padding-right: 5px;
`;

function Range(props: RangeProps) {
  const {
    children,
    value,
    onChange,
    onBlur,
    step: stepSize = 1,
    intent,
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
        const step = event.shiftKey ? stepSize / 10 : stepSize;
        draggedValueRef.current += diff * step;

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
  }, [onBlur, stepSize]);

  const handleMouseDown = useCallback(
    (event: ReactMouseEvent) => {
      isDraggingRef.current = true;
      previousPositionRef.current = event.clientX;
      draggedValueRef.current = value;
    },
    [value],
  );

  return (
    <RangeContainer
      onMouseDown={handleMouseDown}
      className={`${Classes.TAG} ${Classes.MINIMAL} ${Classes.intentClass(intent)}`}
    >
      <RangeLabel>{children}</RangeLabel>
    </RangeContainer>
  );
}

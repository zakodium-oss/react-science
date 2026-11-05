import type { HTMLInputProps, NumericInputProps } from '@blueprintjs/core';
import { NumericInput, Tag } from '@blueprintjs/core';
import type { ReactNode } from 'react';
import { useState } from 'react';

import type { NumericDraft } from './numeric_draft.js';
import {
  commitNumericDraft,
  numericDraftText,
  typeNumericDraft,
} from './numeric_draft.js';

/**
Shift-key increment Blueprint uses, and below which `stepSize` must stay.
*/
const BLUEPRINT_MAJOR_STEP = 10;

type BlueprintNumericInputProps = Omit<HTMLInputProps, 'size'> &
  NumericInputProps;

export interface NumericDraftInputProps extends Omit<
  BlueprintNumericInputProps,
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'onValueChange'
  | 'clampValueOnBlur'
  | 'min'
  | 'max'
  | 'stepSize'
  | 'minorStepSize'
  | 'majorStepSize'
  | 'disabled'
  | 'fill'
> {
  /**
   * Current value.
   */
  value: number;
  /**
   * Called with the new value, only when it is a finite number in bounds.
   */
  onChange: (value: number) => void;
  /**
   * Smallest accepted value.
   * @default undefined, unbounded below
   */
  min?: number;
  /**
   * Largest accepted value.
   * @default undefined, unbounded above
   */
  max?: number;
  /**
   * Increment of the stepper buttons and of the arrow keys.
   * @default 1
   */
  stepSize?: number;
  /**
   * Increment when the alt key is held.
   * @default undefined, Blueprint uses 0.1
   */
  minorStepSize?: number | null;
  /**
   * Increment when the shift key is held. Blueprint expects it to be at least
   * `stepSize`, so a coarse input has to raise it.
   * @default ten steps when `stepSize` exceeds 10, else Blueprint's 10
   */
  majorStepSize?: number | null;
  /**
   * Unit shown inside the input, on its right. Ignored when `rightElement` is
   * set.
   * @default undefined
   */
  unit?: ReactNode;
  /**
   * Disable the input.
   * @default false
   */
  disabled?: boolean;
  /**
   * Stretch the input to the width of its container.
   * @default false
   */
  fill?: boolean;
}

/**
 * A Blueprint `NumericInput` bound to a number.
 *
 * The input is driven by the text being typed rather than by the number, so
 * every entry that passes through a state that is not yet a number — `0.` on
 * the way to `0.01`, `-` on the way to `-5`, an emptied input — survives the
 * keystroke instead of snapping back. A partially typed entry never reaches the
 * caller: `onChange` only fires for finite numbers inside the bounds. Blur
 * clamps what was typed, without rounding it to the step size. A value changed
 * from elsewhere replaces an entry in progress.
 * @param props - See {@link NumericDraftInputProps}.
 * @returns The numeric input.
 */
export function NumericDraftInput(props: NumericDraftInputProps) {
  const {
    value,
    onChange,
    min,
    max,
    stepSize = 1,
    minorStepSize,
    majorStepSize,
    unit,
    rightElement,
    disabled = false,
    fill = false,
    onBlur,
    ...otherProps
  } = props;
  const [draft, setDraft] = useState<NumericDraft | null>(null);
  const text = numericDraftText(draft, value);

  return (
    <NumericInput
      {...otherProps}
      value={text}
      onValueChange={(_, typed) => {
        const next = typeNumericDraft(typed, value, { min, max });
        setDraft(next);
        if (next.value !== value) onChange(next.value);
      }}
      onBlur={(event) => {
        const committed = commitNumericDraft(text, value, { min, max });
        setDraft(null);
        if (committed !== value) onChange(committed);
        onBlur?.(event);
      }}
      min={min}
      max={max}
      stepSize={stepSize}
      minorStepSize={minorStepSize}
      majorStepSize={
        majorStepSize === undefined && stepSize > BLUEPRINT_MAJOR_STEP
          ? stepSize * 10
          : majorStepSize
      }
      rightElement={
        rightElement ??
        (unit === undefined || unit === null ? undefined : (
          <Tag minimal>{unit}</Tag>
        ))
      }
      disabled={disabled}
      fill={fill}
    />
  );
}

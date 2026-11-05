import { FormGroup } from '@blueprintjs/core';
import type { ReactNode } from 'react';
import { useId } from 'react';

import type { NumericDraftInputProps } from './numeric_draft_input.js';
import { NumericDraftInput } from './numeric_draft_input.js';

export interface NumericDraftFieldProps extends Omit<
  NumericDraftInputProps,
  'unit' | 'fill'
> {
  /**
   * Label shown above the input.
   */
  label: ReactNode;
  /**
   * Unit appended to the label, e.g. `min` gives `Label (min)`.
   * @default undefined
   */
  unit?: ReactNode;
  /**
   * Explanation shown below the input.
   * @default undefined
   */
  helperText?: ReactNode;
  /**
   * Stretch the input to the width of its container.
   * @default true
   */
  fill?: boolean;
}

/**
 * A labelled {@link NumericDraftInput} in a Blueprint `FormGroup`.
 *
 * The form group carries no bottom margin: space the fields with the gap of
 * their container.
 * @param props - See {@link NumericDraftFieldProps}.
 * @returns The form group holding the input.
 */
export function NumericDraftField(props: NumericDraftFieldProps) {
  const { label, unit, helperText, fill = true, id, ...inputProps } = props;
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <FormGroup
      label={
        unit === undefined || unit === null ? (
          label
        ) : (
          <>
            {label} ({unit})
          </>
        )
      }
      labelFor={inputId}
      helperText={helperText}
      style={{ marginBottom: 0 }}
    >
      <NumericDraftInput {...inputProps} id={inputId} fill={fill} />
    </FormGroup>
  );
}

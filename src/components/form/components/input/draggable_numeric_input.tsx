import type { Intent } from '@blueprintjs/core';
import { NumericInput as BPNumericInput } from '@blueprintjs/core';
import styled from '@emotion/styled';

import { Draggable as InputDraggable } from '../../../draggable/Draggable.tsx';
import { useFieldContext } from '../../context/use_ts_form.ts';
import { getIntent } from '../../utils/use_intent.ts';
import { FormGroup } from '../input_groups/index.ts';

import type { NumericInputProps } from './numeric_input.tsx';

interface DraggableNumericInputProps extends NumericInputProps {
  draggableLabel: string;
  draggableIntent?: Intent;
  hideInput?: boolean;
}

const DraggableNumericInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const Draggable = styled(InputDraggable)`
  flex: 1;
`;

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
    majorStepSize,
    minorStepSize,
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
      <DraggableNumericInputContainer>
        {!hideInput && (
          <BPNumericInput
            {...otherProps}
            id={field.name}
            name={field.name}
            stepSize={step}
            min={min}
            max={max}
            majorStepSize={majorStepSize}
            minorStepSize={minorStepSize}
            value={field.state.value ?? ''}
            onValueChange={onChange}
            onBlur={field.handleBlur}
            intent={intent}
            placeholder={placeholder}
            required={required}
          />
        )}

        <div style={{ flex: 1 }}>
          <InputDraggable
            value={Number(field.state.value)}
            onBlur={field.handleBlur}
            onChange={onChange}
            step={step}
            min={min}
            max={max}
            majorStepSize={majorStepSize}
            minorStepSize={minorStepSize}
            intent={draggableIntent}
          >
            {draggableLabel}
          </InputDraggable>
        </div>
      </DraggableNumericInputContainer>
    </FormGroup>
  );
}

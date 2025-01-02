import { InputGroup } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

interface InputPercentProps {
  /**
   * Between 0 and 1
   */
  value: number;
  onChange: (value: number) => void;
  digits?: number;
}

export function InputPercent(props: InputPercentProps) {
  const { value, onChange: inputPercentChange, digits } = props;

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;

      if (Number(newValue) < 0 || Number(newValue) > 100) {
        return;
      }

      inputPercentChange(Number(newValue) / 100);
    },
    [inputPercentChange],
  );

  return (
    <InputGroup
      value={String((value * 100).toFixed(digits))}
      onChange={onChange}
      leftIcon="percentage"
      type="number"
      min={0}
      max={100}
      step={1}
    />
  );
}

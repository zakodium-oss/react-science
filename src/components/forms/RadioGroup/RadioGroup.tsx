/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as RadioGroupRadix from '@radix-ui/react-radio-group';
import { ReactNode } from 'react';

import { InputVariant } from '../styles';

import { RadioOptionButton } from './RadioOptionButton';
import { RadioOptionClassic } from './RadioOptionClassic';

export interface ValueLabel {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}
export interface RadioGroupProps {
  selected?: ValueLabel;
  type?: 'classic' | 'button';
  options?: ValueLabel[];
  onSelect?: (option: ValueLabel) => void;
  name?: string;
  disabled?: boolean;
  variant?: InputVariant;
}
const rootStyles = {
  basic: css({
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content',
  }),
  button: css({
    ' & > *:first-of-type, & > *:first-of-type span': {
      borderRadius: '8px 0 0 8px',
    },
    ' & > *:last-of-type, & > *:last-of-type span': {
      borderRightWidth: 1,
      borderRadius: '0 8px 8px 0',
    },
  }),
};
export function RadioGroup(props: RadioGroupProps) {
  const {
    selected,
    type = 'classic',
    disabled: groupDisabled = false,
    options = [],
    onSelect,
    name = '',
    variant = 'default',
  } = props;
  return (
    <RadioGroupRadix.Root
      css={[rootStyles.basic, type === 'classic' ? null : rootStyles.button]}
      style={{
        gap: type === 'classic' ? (variant === 'default' ? 10 : 5) : 0,
      }}
      value={selected?.value}
      name={name}
      disabled={groupDisabled}
    >
      {options?.map(({ value, label, disabled }) => {
        const childProps = {
          key: value,
          value,
          label,
          disabled: groupDisabled || disabled,
          onSelect,
          variant,
          name,
        };
        return type === 'classic' ? (
          <RadioOptionClassic {...childProps} />
        ) : (
          <RadioOptionButton {...childProps} />
        );
      })}
    </RadioGroupRadix.Root>
  );
}

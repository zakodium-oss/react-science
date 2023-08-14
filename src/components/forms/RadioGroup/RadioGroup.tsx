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
    ' & > * ': {
      borderWidth: 0.5,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderRadius: 0,
    },
    ' & > *:first-of-type': {
      borderLeftWidth: 1,
      borderRadius: '8px 0 0 8px',
    },
    ' & > *:last-of-type': {
      borderRightWidth: 1,
      borderRadius: '0 8px 8px 0',
    },

    ' & > *:first-of-type span': {
      borderRadius: '8px 0 0 8px',
    },

    ' & > *:last-of-type span': {
      borderRadius: '0 8px 8px 0',
    },
  }),
};
export function RadioGroup(props: RadioGroupProps) {
  const {
    selected,
    type = 'classic',
    disabled = false,
    options,
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
      disabled={disabled}
    >
      {options?.map((option) =>
        type === 'classic' ? (
          <RadioOptionClassic
            key={option.value}
            {...option}
            onSelect={onSelect}
            variant={variant}
            name={name}
          />
        ) : (
          <RadioOptionButton
            key={option.value}
            {...option}
            onSelect={onSelect}
            variant={variant}
            name={name}
          />
        ),
      )}
    </RadioGroupRadix.Root>
  );
}

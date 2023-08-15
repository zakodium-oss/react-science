/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as RadioGroupRadix from '@radix-ui/react-radio-group';
import { ReactNode } from 'react';

import { InputVariant } from '../styles';

import { ButtonRadioItem } from './ButtonRadioItem';
import { ClassicRadioItem } from './ClassicRadioItem';

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}
export interface RadioGroupProps {
  selected?: RadioOption;
  type?: 'classic' | 'button';
  options?: RadioOption[];
  onSelect?: (option: RadioOption) => void;
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
  button: (variant: InputVariant) =>
    css({
      ' & > *:first-of-type, & > *:first-of-type span': {
        borderRadius: variant === 'default' ? '6px 0 0 6px' : '4px 0 0 4px',
      },
      ' & > *:last-of-type, & > *:last-of-type span': {
        borderRightWidth: 1,
        borderRadius: variant === 'default' ? '0 6px 6px 0' : '0 4px 4px 0',
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
      css={[
        rootStyles.basic,
        type === 'classic' ? null : rootStyles.button(variant),
      ]}
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
          <ClassicRadioItem {...childProps} />
        ) : (
          <ButtonRadioItem {...childProps} />
        );
      })}
    </RadioGroupRadix.Root>
  );
}

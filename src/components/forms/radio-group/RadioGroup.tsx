/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as RadioGroupRadix from '@radix-ui/react-radio-group';
import { ReactNode } from 'react';

import { InputVariant } from '../styles';

import { ButtonRadioItem } from './ButtonRadioItem';

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}
export interface RadioGroupProps {
  selected?: RadioOption;
  options?: RadioOption[];
  onSelect?: (option: RadioOption) => void;
  name?: string;
  disabled?: boolean;
  variant?: InputVariant;
  id?: string;
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
    id,
    selected,
    disabled: groupDisabled = false,
    options = [],
    onSelect,
    name = '',
    variant = 'default',
  } = props;
  return (
    <RadioGroupRadix.Root
      id={id}
      css={[rootStyles.basic, rootStyles.button(variant)]}
      style={{
        gap: 0,
      }}
      value={selected?.value}
      name={name}
      disabled={groupDisabled}
    >
      {options?.map(({ value, label, disabled }) => {
        const childProps = {
          value,
          label,
          disabled: groupDisabled || disabled,
          onSelect,
          variant,
          name,
        };
        return <ButtonRadioItem key={value} {...childProps} />;
      })}
    </RadioGroupRadix.Root>
  );
}

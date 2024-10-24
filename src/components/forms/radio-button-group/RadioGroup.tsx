/** @jsxImportSource @emotion/react */
import { RadioGroup as BluePrintRadioGroup } from '@blueprintjs/core';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';

import { type InputVariant } from '../styles.js';

import { ButtonRadioItem } from './ButtonRadioItem.js';

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}
export interface RadioButtonGroupProps {
  selected?: RadioOption;
  options?: RadioOption[];
  onSelect?: (option: RadioOption) => void;
  name?: string;
  disabled?: boolean;
  variant?: InputVariant;
  id?: string;
}

const rootStyles = {
  button: (variant: InputVariant) =>
    css({
      display: 'flex',
      flexDirection: 'row',
      width: 'fit-content',
      ' & > *:first-of-type, & > *:first-of-type span': {
        borderRadius: variant === 'default' ? '6px 0 0 6px' : '4px 0 0 4px',
      },
      ' & > *:last-of-type, & > *:last-of-type span': {
        borderRightWidth: 1,
        borderRadius: variant === 'default' ? '0 6px 6px 0' : '0 4px 4px 0',
      },
    }),
};
export function RadioButtonGroup(props: RadioButtonGroupProps) {
  const {
    selected,
    disabled: groupDisabled = false,
    options = [],
    onSelect,
    name = 'radio-group',
    variant = 'default',
  } = props;
  return (
    <BluePrintRadioGroup
      onChange={(event) => {
        const selected = options.find(
          (o) => o.value === event.currentTarget.value,
        );
        if (selected) {
          onSelect?.(selected);
        }
      }}
      selectedValue={selected?.value}
      name={name}
      css={rootStyles.button(variant)}
    >
      {options?.map(({ value, label, disabled }) => {
        const childProps = {
          value,
          label,
          disabled: groupDisabled || disabled,
          variant,
          name,
        };
        return <ButtonRadioItem key={value} {...childProps} />;
      })}
    </BluePrintRadioGroup>
  );
}

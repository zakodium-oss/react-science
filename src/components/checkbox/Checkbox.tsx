/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { RxCheck, RxCross2, RxMinus } from 'react-icons/all';

interface CheckboxProps {
  checked?: boolean | 'indeterminate';
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean | 'indeterminate') => void;
}

const enabledColor = '#1677ff';
const disabledColor = '#b8b8b8';

export function Checkbox(props: CheckboxProps) {
  const {
    checked = 'indeterminate',
    disabled = false,
    label,
    onChange,
  } = props;

  return (
    <label
      style={{
        display: 'flex',
      }}
    >
      <RadixCheckbox.Root
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        css={css({
          width: '16px',
          height: '16px',
          backgroundColor: disabled
            ? 'rgba(0, 0, 0, 0.04)'
            : checked
            ? enabledColor
            : 'white',
          borderWidth: '1px',
          borderColor: checked && !disabled ? enabledColor : disabledColor,
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
        })}
      >
        <RadixCheckbox.Indicator
          css={css({
            color: disabled ? disabledColor : 'white',
          })}
        >
          {checked === true ? (
            <RxCheck />
          ) : checked === 'indeterminate' ? (
            <RxMinus />
          ) : (
            <RxCross2 />
          )}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <span
        style={{
          paddingInline: '8px',
          lineHeight: '16px',
        }}
      >
        {label}
      </span>
    </label>
  );
}
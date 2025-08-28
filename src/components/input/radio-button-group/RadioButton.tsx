import type { RadioProps } from '@blueprintjs/core';
import styled from '@emotion/styled';

import { enabledColor } from '../styles.js';
import { useInputId } from '../utils/use_input_id.js';

const HiddenInput = styled.input`
  /* Those styles are taken from the sr-only class in tailwind CSS. */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;

  /* Label associated with the checked input. */
  &:checked + label {
    color: ${enabledColor};
    border-color: ${enabledColor};
    opacity: ${(props) => (props.disabled ? 0.25 : 1)};
    border-width: 1px;
  }

  /* Next label after the one that is checked. */
  &:checked + label + input + label {
    border-left-width: 0;
  }
`;

const RadioContent = styled.div<{ size?: RadioProps['size'] }>`
  place-content: center;
  padding: ${(props) => (props.size === 'large' ? '0px 15px' : '0px 7px')};
  line-height: 0;
`;

const Label = styled.label<{ size?: RadioProps['size']; disabled?: boolean }>`
  display: flex;
  height: ${(props) => (props.size === 'large' ? '40px' : '30px')};
  opacity: ${(props) => (props.disabled ? 0.25 : 1)};
  border-width: 1px 0 1px 1px;
  border-color: rgba(0, 0, 0, ${(props) => (props.disabled ? 1 : 0.25)});
  border-style: solid;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  white-space: nowrap;

  &:hover {
    color: ${enabledColor};
  }
`;

export function RadioButton(props: RadioProps) {
  const { size, disabled, label, name, value, id, checked, onChange } = props;
  const uniqId = useInputId(id, name);
  return (
    <>
      <HiddenInput
        checked={checked}
        id={uniqId}
        name={name}
        value={value}
        type="radio"
        disabled={disabled}
        onChange={onChange}
      />
      <Label size={size} disabled={disabled} htmlFor={uniqId}>
        <RadioContent size={size}>{label}</RadioContent>
      </Label>
    </>
  );
}

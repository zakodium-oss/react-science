import styled from '@emotion/styled';
import { InputHTMLAttributes, ReactNode } from 'react';

import { useFieldsContext } from './context/FieldsContext';

const InputStyled = styled.input<{
  variant: 'default' | 'small';
  hasTrailing: boolean;
}>`
  border: solid 1px rgb(217, 217, 217);
  font-size: 14px;
  line-height: 22px;
  margin: 0px -1px 0px 0px;
  outline: none;
  width: 100%;

  :hover {
    border-color: #4096ff;
    border-inline-end-width: 1px;
  }

  border-radius: ${(props) =>
    props.variant === 'default'
      ? props.hasTrailing
        ? '6px 0px 0px 6px'
        : '6px'
      : props.hasTrailing
      ? '4px 0px 0px 4px'
      : '4px'};

  padding: ${(props) =>
    props.variant === 'default'
      ? props.hasTrailing
        ? '4px 11px 4px 11px'
        : '4px 11px'
      : props.hasTrailing
      ? '0px 7px 0px 7px'
      : '0 7px'};
`;

const TrailingStyled = styled.div<{ variant: 'default' | 'small' }>`
  border: 1px solid rgb(217, 217, 217);
  display: inline-block;
  font-size: 14px;
  line-height: 22px;
  text-align: center;

  max-width: 150px;
  width: 100%;

  border-radius: ${(props) =>
    props.variant === 'default' ? '0px 6px 6px 0px' : '0px 4px 4px 0px'};

  padding: ${(props) =>
    props.variant === 'default' ? '4px 11px 4px 11px' : '0px 7px 0px 7px'};
`;

const GroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'small';
  trailingAddon?: ReactNode;
}

export function Input(props: InputProps) {
  const { variant = 'default', trailingAddon, ...otherProps } = props;
  const { name } = useFieldsContext();

  return (
    <GroupStyled>
      <InputStyled
        id={name}
        name={name}
        variant={variant}
        hasTrailing={trailingAddon !== undefined}
        {...otherProps}
      />
      {trailingAddon && (
        <TrailingStyled variant={variant}>{trailingAddon}</TrailingStyled>
      )}
    </GroupStyled>
  );
}

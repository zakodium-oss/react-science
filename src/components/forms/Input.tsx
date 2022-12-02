import styled from '@emotion/styled';
import { InputHTMLAttributes } from 'react';

import { useFieldsContext } from './context/FieldsContext';

const InputStyled = styled.input<{ variant: 'default' | 'small' }>`
  box-sizing: border-box;
  margin: 0px;
  padding: ${(props) => (props.variant === 'default' ? '4px 11px' : '0 7px')};
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0px;
  background-color: #fff;
  border-radius: ${(props) => (props.variant === 'default' ? '6px' : '4px')};
  transition: all 0.2s;
  border: 1px solid #d9d9d9;

  :hover {
    border-color: #4096ff;
    border-inline-end-width: 1px;
  }
`;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'small';
}

export function Input(props: InputProps) {
  const { variant = 'default', ...otherProps } = props;
  const fieldsContext = useFieldsContext();

  return (
    <InputStyled
      id={fieldsContext}
      name={fieldsContext}
      variant={variant}
      {...otherProps}
    />
  );
}

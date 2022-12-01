import styled from '@emotion/styled';
import { InputHTMLAttributes } from 'react';

import { useFieldsContext } from './context/FieldsContext';

const InputStyled = styled.input<{ inputSize: 'default' | 'small' }>`
  box-sizing: border-box;
  margin: 0px;
  padding: ${(props) => (props.inputSize === 'default' ? '4px 11px' : '0 7px')};
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0px;
  background-color: #fff;
  border-radius: ${(props) => (props.inputSize === 'default' ? '6px' : '4px')};
  transition: all 0.2s;
  border: 1px solid #d9d9d9;
`;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: 'default' | 'small';
}

export function Input(props: InputProps) {
  const { inputSize = 'default', ...otherProps } = props;
  const fieldsContext = useFieldsContext();

  return (
    <InputStyled
      id={fieldsContext}
      name={fieldsContext}
      inputSize={inputSize}
      {...otherProps}
    />
  );
}

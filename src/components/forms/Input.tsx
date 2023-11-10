/** @jsxImportSource @emotion/react */
import {
  Icon,
  IconName,
  InputGroup,
  InputGroupProps,
  MaybeElement,
} from '@blueprintjs/core';
import { css } from '@emotion/react';

import { useFieldsContext } from './context/FieldsContext';
import { InputContainer } from './styles';
import { SubText } from './utils/SubText';

export interface InputProps extends InputGroupProps {
  help?: string;
  error?: string;
  valid?: true | string;
  clearable?: boolean;
  rightIcon?: IconName | MaybeElement;
}

export function Input(props: InputProps) {
  const {
    help,
    error,
    valid,
    small: smallProp,
    large: largeProp,
    rightIcon,
    intent: intentProp,
    ...otherProps
  } = props;

  const { name, small: smallContext, large: largeContext } = useFieldsContext();
  const small = smallProp || smallContext;
  const large = largeProp || largeContext;
  const intent = (error && 'danger') || (valid && 'success') || 'none';
  return (
    <InputContainer>
      <InputGroup
        id={name}
        rightElement={
          <Icon
            css={css`
              *:has(> &) {
                height: 100%;
                width: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              color: #5f6b7c;
            `}
            icon={rightIcon}
            intent={intentProp || intent}
          />
        }
        intent={intentProp || intent}
        small={small}
        large={large}
        {...otherProps}
      />
      <SubText error={error} help={help} valid={valid} />
    </InputContainer>
  );
}

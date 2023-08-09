import styled from '@emotion/styled';
import { TextareaHTMLAttributes } from 'react';

import { useFieldsContext } from './context/FieldsContext';
import {
  InputContainer,
  GroupStyled,
  LabelStyled,
  InputVariant,
} from './styles';
import { SubText, SubTextProps } from './utils';

const TextAreaStyled = styled.textarea`
  padding: 0;
  flex: 1 1 0%;
  border: none;
  position: relative;
  outline: none;
`;

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    SubTextProps {
  variant?: InputVariant;
}

export function TextArea(props: TextAreaProps) {
  const { variant: variantProps, help, error, valid, ...otherProps } = props;

  const { name, variant: contextVariant } = useFieldsContext();

  const variant = variantProps || contextVariant;

  return (
    <InputContainer>
      <GroupStyled hasError={!!error} hasValid={!!valid}>
        <LabelStyled variant={variant}>
          <TextAreaStyled id={name} name={name} {...otherProps} />
        </LabelStyled>
      </GroupStyled>

      <SubText error={error} help={help} valid={valid} />
    </InputContainer>
  );
}

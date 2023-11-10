import {
  TextArea as BlueprintTextArea,
  TextAreaProps as BlueprintTextAreaProps,
} from '@blueprintjs/core';

import { useFieldsContext } from './context/FieldsContext';
import { InputContainer, InputVariant } from './styles';
import { SubText, SubTextProps } from './utils';

export interface TextAreaProps extends BlueprintTextAreaProps, SubTextProps {
  variant?: InputVariant;
}

export function TextArea(props: TextAreaProps) {
  const {
    help,
    error,
    valid,
    small: smallProp,
    large: largeProp,
    intent: intentProp,
    ...otherProps
  } = props;

  const { name, small: smallContext, large: largeContext } = useFieldsContext();
  const small = smallProp || smallContext;
  const large = largeProp || largeContext;
  const intent = (error && 'danger') || (valid && 'success') || 'none';

  return (
    <InputContainer>
      <BlueprintTextArea
        id={name}
        intent={intentProp || intent}
        small={small}
        large={large}
        {...otherProps}
      />
      <SubText error={error} help={help} valid={valid} />
    </InputContainer>
  );
}

import { FormGroup, FormGroupProps } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { createContext, useContext, useMemo } from 'react';

interface FieldContext {
  name?: string;
  small: boolean;
  large: boolean;
}

export interface FieldProps extends FormGroupProps {
  required?: boolean;
  small?: boolean;
  large?: boolean;
}

const context = createContext<FieldContext | null>(null);

const FieldContextRequired = styled.span`
  color: red;
`;

export function useFieldsContext(): FieldContext {
  const ctx = useContext(context);

  if (!ctx) {
    return { name: undefined, small: false, large: false };
  }

  return ctx;
}

export function Field(props: FieldProps) {
  const {
    required,
    small,
    large,
    labelFor,
    style: styleProp,
    ...otherProps
  } = props;

  const memoized: FieldContext = useMemo(() => {
    return { name: labelFor, small: small || false, large: large || false };
  }, [labelFor, small, large]);

  return (
    <context.Provider value={memoized}>
      <FormGroup
        labelFor={labelFor}
        labelInfo={required && <FieldContextRequired>*</FieldContextRequired>}
        style={{
          fontSize: (small && '12px') || (large && '16px') || '14px',
          alignItems: 'baseline',
          ...styleProp,
        }}
        {...otherProps}
      />
    </context.Provider>
  );
}

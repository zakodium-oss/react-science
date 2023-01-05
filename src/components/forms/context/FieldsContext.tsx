import styled from '@emotion/styled';
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface FieldContext {
  name?: string;
  variant: 'default' | 'small';
}

interface FieldProps {
  name: string;
  label: string;
  children: ReactNode;
  variant?: 'default' | 'small';
  required?: boolean;
}

const context = createContext<FieldContext | null>(null);

const FieldContextRoot = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const FieldContextRequired = styled.span`
  color: red;
`;

export function useFieldsContext(): FieldContext {
  const ctx = useContext(context);

  if (!ctx) {
    return { name: undefined, variant: 'default' };
  }

  return ctx;
}

export function Field(props: FieldProps) {
  const { label, name, children, required, variant } = props;

  const memoized = useMemo(() => {
    return { name, variant: variant || 'default' };
  }, [name, variant]);

  return (
    <context.Provider value={memoized}>
      <FieldContextRoot>
        <label htmlFor={name}>
          {label} {required && <FieldContextRequired>*</FieldContextRequired>}:{' '}
        </label>
        {children}
      </FieldContextRoot>
    </context.Provider>
  );
}

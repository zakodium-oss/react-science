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
  flex-flow: row;
  min-width: 0;
  margin: 0;
  padding: 0;
  gap: 5px;
`;

const Label = styled.label<{ variant: FieldProps['variant'] }>`
  position: relative;
  display: inline-flex;
  max-width: 100%;
  line-height: ${(props) => (props.variant === 'small' ? '28px' : '32px')};
  font-size: ${(props) => (props.variant === 'small' ? '1em' : '1.125em')};
  white-space: nowrap;
  text-align: end;
`;

const LabelContainer = styled.div`
  flex-grow: 0;
  display: inline-block;
  overflow: hidden;
  text-align: end;
  vertical-align: middle;
  white-space: nowrap;
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
        <LabelContainer>
          <Label htmlFor={name} variant={memoized.variant}>
            {label} {required && <FieldContextRequired>*</FieldContextRequired>}
            :{' '}
          </Label>
        </LabelContainer>

        {children}
      </FieldContextRoot>
    </context.Provider>
  );
}

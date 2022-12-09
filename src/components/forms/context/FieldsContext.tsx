/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface FieldsProps {
  children: ReactNode;
}

interface FieldContext {
  name: string;
}

interface FieldProps extends FieldsProps {
  name: string;
  label: string;

  required?: boolean;
}

const context = createContext<FieldContext | null>(null);

const styles = {
  root: css`
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
  `,
  required: css`
    color: red;
  `,
};

export function useFieldsContext() {
  const ctx = useContext(context);

  if (!ctx) {
    return { name: undefined, variant: undefined };
  }

  return ctx;
}

export function Fields(props: FieldsProps) {
  const { children } = props;
  return <>{children}</>;
}

export function Field(props: FieldProps) {
  const { label, name, children, required } = props;

  const memoized = useMemo(() => {
    return { name };
  }, [name]);

  return (
    <context.Provider value={memoized}>
      <div css={styles.root}>
        <label htmlFor={name}>
          {label} {required && <span css={styles.required}>*</span>}:{' '}
        </label>
        {children}
      </div>
    </context.Provider>
  );
}

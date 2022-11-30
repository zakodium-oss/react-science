/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { createContext, ReactNode, useContext } from 'react';

interface FieldsProps {
  children: ReactNode;
}

interface FieldProps extends FieldsProps {
  name: string;
  label: string;
}

const context = createContext<string | null>(null);

const styles = {
  root: css`
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
  `,
};

export function useFieldsContext() {
  const ctx = useContext(context);

  if (!ctx) {
    return undefined;
  }

  return ctx;
}

export function Fields(props: FieldsProps) {
  const { children } = props;
  return <>{children}</>;
}

export function Field(props: FieldProps) {
  const { label, name, children } = props;

  return (
    <context.Provider value={name}>
      <div css={styles.root}>
        <label htmlFor={name}>{label}: </label>
        {children}
      </div>
    </context.Provider>
  );
}

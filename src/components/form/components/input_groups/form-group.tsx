import type { Intent } from '@blueprintjs/core';
import { Classes } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

const FormContainer = styled.div<{ fill?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;

  @media (width > 48rem) {
    flex-direction: row;
    gap: 20px;

    justify-content: ${(props) =>
      props.fill ? 'space-between' : 'flex-start'};

    align-items: center;
  }
`;

const RequiredSpan = styled.span`
  color: red;
`;

export interface FormGroupInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  fill?: boolean;
}

interface FormGroupProps {
  label?: string;
  intent?: Intent;
  name: string;
  required?: boolean;
  helpText?: string;
  children?: ReactNode;
  fill?: boolean;
  error?: string;
}

export function FormGroup(props: FormGroupProps) {
  const {
    label,
    intent,
    name,
    required,
    children,
    helpText,
    fill = false,
    error,
  } = props;

  return (
    <FormContainer
      fill={fill}
      className={clsx(Classes.FORM_GROUP, Classes.intentClass(intent))}
    >
      {label && (
        <label className={Classes.LABEL} htmlFor={name}>
          {label}{' '}
          {required && (
            <RequiredSpan className={Classes.TEXT_MUTED}>*</RequiredSpan>
          )}
        </label>
      )}

      <div>
        {children}

        {(helpText || error) && (
          <span className={Classes.FORM_HELPER_TEXT}>{error || helpText}</span>
        )}
      </div>
    </FormContainer>
  );
}

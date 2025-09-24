import type { Intent } from '@blueprintjs/core';
import { Classes } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import { useFormContext } from './form.js';

const FormContainer = styled.div<{ fill?: boolean; inline?: boolean }>`
  width: 100%;
  display: ${(props) => (props.inline ? 'flex' : 'block')};
  flex-direction: column;
  margin: 0;

  @media (width > 48rem) {
    flex-direction: row;
    gap: 20px;
    justify-content: ${(props) =>
      props.fill ? 'space-between' : 'flex-start'};
  }
`;

const RequiredSpan = styled.span`
  color: red;
`;

const ContainerElement = styled.div<{ height?: number | 'auto' }>`
  display: inline-block;
  height: ${(props) =>
    props.height === 'auto' ? props.height : `${props.height}px`};
`;

const Label = styled.label`
  padding-top: calc(30px - 26px);

  @media (width < 48rem) {
    padding: 0;
  }
`;

export interface FormGroupInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  fill?: boolean;
  inline?: boolean;
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
  inline?: boolean;
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
    inline,
  } = props;

  const { inline: formInline } = useFormContext();

  return (
    <FormContainer
      inline={inline || formInline}
      fill={fill}
      className={clsx(Classes.FORM_GROUP, Classes.intentClass(intent))}
    >
      {label && (
        <Label className={Classes.LABEL} htmlFor={name}>
          {label}{' '}
          {required && (
            <RequiredSpan className={Classes.TEXT_MUTED}>*</RequiredSpan>
          )}
        </Label>
      )}
      <ContainerElement height={helpText || error ? 'auto' : 30}>
        {children}

        {(helpText || error) && (
          <span className={Classes.FORM_HELPER_TEXT}>{error || helpText}</span>
        )}
      </ContainerElement>
    </FormContainer>
  );
}

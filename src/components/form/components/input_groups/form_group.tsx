import type { Intent } from '@blueprintjs/core';
import { Classes } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import { useFormContext } from './form.js';

const INPUT_HEIGHT = 30;

const FormContainer = styled.div<{ fill?: boolean; inline?: boolean }>`
  min-height: ${INPUT_HEIGHT}px;
  width: 100%;
  display: grid;
  grid-template-columns: [label] 30% [input] 70%;

  margin: 0;

  @media (width > 48rem) {
    flex-direction: row;
    justify-content: ${(props) =>
      props.fill ? 'space-between' : 'flex-start'};
  }
`;

const RequiredSpan = styled.span`
  color: red;
`;

const ContainerElement = styled.div<{
  height?: number | 'auto';
  fullWidth?: boolean;
}>`
  display: inline-block;
  grid-column: ${(props) => (props.fullWidth ? '1 / -1' : 'input')};

  height: ${(props) =>
    props.height === 'auto' ? props.height : `${props.height}px`};
`;

const Label = styled.label`
  padding-top: calc(${INPUT_HEIGHT}px - 26px);
  grid-column: label;

  height: 30px;

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
  fullWidth?: boolean;
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
    fullWidth = false,
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
      <ContainerElement fullWidth={fullWidth}>
        {children}

        {(helpText || error) && (
          <span className={Classes.FORM_HELPER_TEXT}>{error || helpText}</span>
        )}
      </ContainerElement>
    </FormContainer>
  );
}

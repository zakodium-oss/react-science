import type { Intent } from '@blueprintjs/core';
import { Classes } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import type { Layout } from './form_context.js';
import { useFormContext } from './form_context.js';

const INPUT_HEIGHT = 30;

const FormContainer = styled.div<{
  layout?: Layout;
}>`
  min-height: ${INPUT_HEIGHT}px;
  width: 100%;
  display: grid;
  margin: 0;
  grid-template-columns: ${(props) =>
    props.layout === 'inline' ? '[label] 30% [input] 70%' : '1fr'};
  grid-template-rows: ${(props) =>
    props.layout === 'inline' ? 'auto auto' : 'auto'};
`;

const RequiredSpan = styled.span`
  color: red;
`;

const ContainerElement = styled.div<{
  height?: number | 'auto';
  fullWidth?: boolean;
  layout?: Layout;
}>`
  display: inline-block;
  grid-column: ${(props) =>
    props.fullWidth
      ? '1 / -1'
      : props.layout === 'inline'
        ? 'input'
        : '1 / -1'};
  height: ${(props) =>
    props.height === 'auto' ? props.height : `${props.height}px`};
  width: fit-content;
  min-width: 180px;
`;

// Keep 26 px for inline layout to align with input height
const Label = styled.label<{ layout: Layout }>`
  padding-top: calc(
    ${INPUT_HEIGHT}px - ${(props) => (props.layout === 'inline' ? 26 : 20)}px
  );
  grid-column: ${(props) => (props.layout === 'inline' ? 'label' : '1 / -1')};
  height: 30px;
`;

const ErrorAndHelpText = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface FormGroupInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  layout?: Layout;
  fullWidth?: boolean;
}

interface FormGroupProps {
  label?: string;
  intent?: Intent;
  name: string;
  required?: boolean;
  helpText?: string;
  children?: ReactNode;
  error?: string;
  layout?: Layout;
  fullWidth?: boolean;
}

const InfoText = styled.span`
  margin-bottom: 5px;
`;

export function FormGroup(props: FormGroupProps) {
  const {
    label,
    intent = 'none',
    name,
    required,
    children,
    helpText,
    error,
    layout,
    fullWidth = false,
  } = props;

  const { layout: formLayout } = useFormContext();

  // If intent is undefined or none intentClass will return undefined
  const intentClass = Classes.intentClass(intent) ?? '';

  return (
    <FormContainer
      layout={layout || formLayout}
      className={`${Classes.FORM_GROUP} ${intentClass}`}
    >
      {label && (
        <Label
          layout={layout || formLayout}
          className={Classes.LABEL}
          htmlFor={name}
        >
          {label}{' '}
          {required && (
            <RequiredSpan className={Classes.TEXT_MUTED}>*</RequiredSpan>
          )}
        </Label>
      )}
      <ContainerElement fullWidth={fullWidth} layout={layout || formLayout}>
        {children}

        <ErrorAndHelpText>
          {helpText && (
            <InfoText className={Classes.FORM_HELPER_TEXT}>{helpText}</InfoText>
          )}

          {error && (
            <InfoText className={Classes.FORM_HELPER_TEXT}>{error}</InfoText>
          )}
        </ErrorAndHelpText>
      </ContainerElement>
    </FormContainer>
  );
}

import styled from '@emotion/styled';
import { InputHTMLAttributes, ReactNode } from 'react';

import { useFieldsContext } from './context/FieldsContext';

interface StyledProps {
  variant: 'default' | 'small';
  hasLeading: boolean;
  hasTrailing: boolean;
}

function getSpecialSize(props: Pick<StyledProps, 'variant'>) {
  return {
    fontSize: props.variant === 'small' ? '1em' : '1.125em',
    lineHeight: props.variant === 'small' ? '15px' : '17px',
  };
}

const LabelStyled = styled.label<StyledProps>`
  padding: ${(props) =>
    props.variant === 'default'
      ? props.hasTrailing
        ? '4px 11px 4px 11px'
        : '4px 11px'
      : props.hasTrailing
      ? '0px 7px 0px 7px'
      : '0 7px'};

  font-size: ${(props) => getSpecialSize(props).fontSize};
  line-height: ${(props) => getSpecialSize(props).lineHeight};

  background-color: white;
  border-width: 1px;
  align-items: center;
  flex-direction: row;
  flex: 1 1 0%;
  display: flex;
  position: relative;

  border-top-right-radius: ${(props) =>
    props.hasLeading && !props.hasTrailing && '0.375rem'};

  border-bottom-right-radius: ${(props) =>
    props.hasLeading && !props.hasTrailing && '0.375rem'};

  border-top-left-radius: ${(props) =>
    props.hasTrailing && !props.hasLeading && '0.375rem'};

  border-bottom-left-radius: ${(props) =>
    props.hasTrailing && !props.hasLeading && '0.375rem'};

  border-radius: ${(props) =>
    !props.hasLeading && !props.hasTrailing && '0.375rem'};

  border-color: var(--custom-border-color);
`;

const GroupStyled = styled.div<{ hasError: boolean }>`
  display: flex;
  border-radius: 0.375rem;
  margin-top: 0.25rem;

  .addon {
    color: ${({ hasError }) => hasError && '#f95d55'};
  }

  --custom-border-color: ${({ hasError }) =>
    hasError ? '#ffa39e' : 'rgb(217, 217, 217)'};

  :hover,
  :focus-within {
    --custom-border-color: ${({ hasError }) =>
      hasError ? '#f95d55' : '#4096ff'};
  }
`;

const InputStyled = styled.input`
  padding: 0;
  flex: 1 1 0%;
  border: none;
  position: relative;
  outline: none;
`;

const LeadingAddonStyled = styled.div`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-right-width: 0px;
  border-width: 1px;
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
  align-items: center;
  display: inline-flex;

  border-right: none;

  border-color: var(--custom-border-color);
`;

const TrailingAddonStyled = styled.div`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-left-width: 0px;
  border-width: 1px;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  align-items: center;
  display: inline-flex;

  border-left: none;

  border-color: var(--custom-border-color);
`;

const LeadingInlineAddonStyled = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
`;

const TrailingInlineAddonStyled = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
`;

interface RenderAddon {
  addon: ReactNode;
  inline?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'small';

  leadingAddon?: RenderAddon;
  trailingAddon?: RenderAddon;

  help?: string;
  error?: string;
  valid?: boolean | string;
}

export function Input(props: InputProps) {
  const {
    variant,
    trailingAddon,
    leadingAddon,
    help,
    error,
    valid,
    ...otherProps
  } = props;

  const { name, variant: contextVariant } = useFieldsContext();

  const hasLeading = (leadingAddon && !leadingAddon.inline) || false;
  const hasTrailing = (trailingAddon && !trailingAddon.inline) || false;
  const hasError = error !== undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <GroupStyled hasError={hasError}>
        {leadingAddon && !leadingAddon.inline && (
          <LeadingAddonStyled>{leadingAddon.addon}</LeadingAddonStyled>
        )}

        <LabelStyled
          variant={variant || contextVariant}
          hasLeading={hasLeading}
          hasTrailing={hasTrailing}
        >
          {leadingAddon?.inline && (
            <LeadingInlineAddonStyled className="addon">
              {leadingAddon.addon}
            </LeadingInlineAddonStyled>
          )}
          <InputStyled id={name} name={name} {...otherProps} />
          {trailingAddon?.inline && (
            <TrailingInlineAddonStyled className="addon">
              {trailingAddon.addon}
            </TrailingInlineAddonStyled>
          )}
        </LabelStyled>

        {trailingAddon && !trailingAddon.inline && (
          <TrailingAddonStyled>{trailingAddon.addon}</TrailingAddonStyled>
        )}
      </GroupStyled>

      <SubText error={error} help={help} valid={valid} />
    </div>
  );
}

function SubText(props: Pick<InputProps, 'help' | 'error' | 'valid'>) {
  const { error, help, valid } = props;

  const hasErrorMessage = error !== undefined;
  const hasValidMessage = typeof valid === 'string' && valid !== undefined;
  const hasValidBoolean = typeof valid === 'boolean' && valid !== undefined;

  const textToDisplay = hasErrorMessage
    ? error
    : hasValidMessage
    ? valid
    : help || undefined;

  return (
    <p
      style={{
        color: hasErrorMessage
          ? 'red'
          : hasValidMessage || hasValidBoolean
          ? 'green'
          : undefined,
      }}
    >
      {textToDisplay}
    </p>
  );
}

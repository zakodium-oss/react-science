import styled from '@emotion/styled';
import { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

import { FullSpinner } from '../index';

import { useFieldsContext } from './context/FieldsContext';

type InputVariant = 'default' | 'small';

interface StyledProps {
  variant: InputVariant;
  hasLeading: boolean;
  hasTrailing: boolean;
}

const LabelStyled = styled.label<StyledProps>`
  padding: ${(props) =>
    props.variant === 'default'
      ? props.hasTrailing
        ? '2px 9px 4px 9px'
        : '2px 9px'
      : props.hasTrailing
      ? '1px 7px 1px 7px'
      : '1px 7px'};

  font-size: ${(props) => (props.variant === 'small' ? '1em' : '1.125em')};
  line-height: '17px';

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

function getStyleColor(hasError: boolean, hasValid: boolean) {
  if (hasError) {
    return {
      default: '#ffa39e',
      hover: '#f95d55',
    };
  }

  if (hasValid) {
    return {
      default: '#6adc24',
      hover: '#62cb21',
    };
  }

  return {
    default: 'rgb(217, 217, 217)',
    hover: '#4096ff',
  };
}

const GroupStyled = styled.div<{ hasError: boolean; hasValid: boolean }>`
  display: flex;
  border-radius: 0.375rem;
  margin-top: 0.25rem;

  .addon {
    color: ${({ hasError }) => hasError && '#f95d55'};
  }

  --custom-border-color: ${({ hasError, hasValid }) =>
    getStyleColor(hasError, hasValid).default};

  :hover,
  :focus-within {
    --custom-border-color: ${({ hasError, hasValid }) =>
      getStyleColor(hasError, hasValid).hover};
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

const RootInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  valid?: true | string;

  loading?: boolean;
}

export function Input(props: InputProps) {
  const {
    variant: variantProps,
    trailingAddon,
    leadingAddon,
    help,
    error,
    valid,
    loading,
    ...otherProps
  } = props;

  const { name, variant: contextVariant } = useFieldsContext();

  const hasLeading = (leadingAddon && !leadingAddon.inline) || false;
  const hasTrailing = (trailingAddon && !trailingAddon.inline) || false;
  const variant = variantProps || contextVariant;

  return (
    <RootInput>
      <GroupStyled hasError={!!error} hasValid={!!valid}>
        {leadingAddon && !leadingAddon.inline && (
          <LeadingAddonStyled>{leadingAddon.addon}</LeadingAddonStyled>
        )}

        <LabelStyled
          variant={variant}
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

          {loading && (
            <TrailingInlineAddonStyled
              style={{ height: variant === 'default' ? 20 : 10 }}
            >
              <FullSpinner
                height={variant === 'default' ? 20 : 10}
                width={variant === 'default' ? 20 : 10}
              />
            </TrailingInlineAddonStyled>
          )}
        </LabelStyled>

        {trailingAddon && !trailingAddon.inline && (
          <TrailingAddonStyled>{trailingAddon.addon}</TrailingAddonStyled>
        )}
      </GroupStyled>

      <SubText error={error} help={help} valid={valid} />
    </RootInput>
  );
}

function SubText(props: Pick<InputProps, 'help' | 'error' | 'valid'>) {
  const { error, help, valid: validProps } = props;

  const valid = typeof validProps === 'string' ? validProps : undefined;
  const text = error || valid || help;

  return <p style={{ color: getColor(error, validProps) }}>{text}</p>;
}

function getColor(
  error?: string,
  valid?: true | string,
): CSSProperties['color'] {
  if (error) {
    return '#f95d55';
  }

  if (valid && typeof valid !== 'boolean') {
    return '#62cb21';
  }

  return 'gray';
}

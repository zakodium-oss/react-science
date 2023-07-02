import styled from '@emotion/styled';
import { CSSProperties, TextareaHTMLAttributes } from 'react';

import { FullSpinner } from '../index';

import { useFieldsContext } from './context/FieldsContext';
import {
  RenderAddon,
  RootInput,
  GroupStyled,
  LabelStyled,
  LeadingAddonStyled,
  LeadingInlineAddonStyled,
  TrailingInlineAddonStyled,
  TrailingAddonStyled,
} from './styles';

const TextAreaStyled = styled.textarea`
  padding: 0;
  flex: 1 1 0%;
  border: none;
  position: relative;
  outline: none;
`;

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'small';

  leadingAddon?: RenderAddon;
  trailingAddon?: RenderAddon;

  help?: string;
  error?: string;
  valid?: true | string;

  loading?: boolean;
}

export function TextArea(props: TextAreaProps) {
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
          <TextAreaStyled id={name} name={name} {...otherProps} />
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

function SubText(props: Pick<TextAreaProps, 'help' | 'error' | 'valid'>) {
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

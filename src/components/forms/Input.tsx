import styled from '@emotion/styled';
import { InputHTMLAttributes, ReactNode } from 'react';

import { useFieldsContext } from './context/FieldsContext';

interface StyledProps {
  variant: 'default' | 'small';
  hasTrailing: boolean;
  hasLeading: boolean;

  hasInlineTrailing: boolean;
  hasInlineLeading: boolean;
}

function getSpecialSize(props: Pick<StyledProps, 'variant'>) {
  return {
    fontSize: props.variant === 'small' ? '1em' : '1.125em',
    lineHeight: props.variant === 'small' ? '15px' : '17px',
  };
}

const LabelStyled = styled.label<{
  hasLeading: boolean;
  hasTrailing: boolean;
  variant: 'small' | 'default';
}>`
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

const GroupStyled = styled.div`
  display: flex;
  border-radius: 0.375rem;
  margin-top: 0.25rem;

  --custom-border-color: rgb(217, 217, 217);

  :hover,
  :focus-within {
    --custom-border-color: #4096ff;
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
}

export function Input(props: InputProps) {
  const { variant, trailingAddon, leadingAddon, ...otherProps } = props;

  const { name, variant: contextVariant } = useFieldsContext();

  const hasLeading = (leadingAddon && !leadingAddon.inline) || false;
  const hasTrailing = (trailingAddon && !trailingAddon.inline) || false;

  return (
    <GroupStyled>
      {leadingAddon && !leadingAddon.inline && (
        <LeadingAddonStyled>{leadingAddon.addon}</LeadingAddonStyled>
      )}
      <LabelStyled
        variant={variant || contextVariant}
        hasLeading={hasLeading}
        hasTrailing={hasTrailing}
      >
        {leadingAddon?.inline && (
          <LeadingInlineAddonStyled>
            {leadingAddon.addon}
          </LeadingInlineAddonStyled>
        )}
        <InputStyled id={name} name={name} {...otherProps} />
        {trailingAddon?.inline && (
          <TrailingInlineAddonStyled>
            {trailingAddon.addon}
          </TrailingInlineAddonStyled>
        )}
      </LabelStyled>
      {trailingAddon && !trailingAddon.inline && (
        <TrailingAddonStyled>{trailingAddon.addon}</TrailingAddonStyled>
      )}
    </GroupStyled>
  );
}

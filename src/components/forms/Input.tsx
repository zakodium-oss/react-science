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

const GroupStyled = styled.div`
  display: flex;
  align-items: center;

  --custom-border-color: rgb(217, 217, 217);

  :hover,
  :focus-within {
    --custom-border-color: #4096ff;
  }
`;

const lineHeight = 4 / 7;
const InputStyled = styled.input<StyledProps>`
  border-top: solid 1px var(--custom-border-color);
  border-bottom: solid 1px var(--custom-border-color);

  border-left: ${(props) =>
    props.hasInlineLeading ? 'none' : 'solid 1px var(--custom-border-color)'};

  border-right: ${(props) =>
    props.hasInlineTrailing ? 'none' : 'solid 1px var(--custom-border-color)'};

  font-size: ${(props) => (props.variant === 'small' ? '1em' : '1.125em')};
  line-height: ${lineHeight}px;
  margin: 0px -1px 0px 0px;
  outline: none;
  width: 100%;

  :hover {
    border-color: var(--custom-border-color);
    border-inline-end-width: 1px;
  }

  :focus {
    // --custom-border-color: #4096ff;

    border-color: var(--custom-border-color);
    border-inline-end-width: 1px;
  }

  border-radius: ${(props) =>
    getBorderStyle(
      props.hasLeading || props.hasInlineLeading,
      props.hasTrailing || props.hasInlineTrailing,
      props.variant,
    )};

  padding: ${(props) =>
    props.variant === 'default'
      ? props.hasTrailing
        ? '4px 11px 4px 11px'
        : '4px 11px'
      : props.hasTrailing
      ? '0px 7px 0px 7px'
      : '0 7px'};
`;

const TrailingAddonStyled = styled.div<Pick<StyledProps, 'variant'>>`
  border: 1px solid var(--custom-border-color);
  border-left: none;
  display: inline-block;
  font-size: ${(props) => (props.variant === 'small' ? '1em' : '1.125em')};
  text-align: center;

  line-height: ${(props) => (props.variant === 'small' ? '15px' : '17px')};
  width: min-content;

  border-radius: ${(props) =>
    props.variant === 'default' ? '0px 6px 6px 0px' : '0px 4px 4px 0px'};

  padding: ${(props) =>
    props.variant === 'default' ? '4px 11px 4px 11px' : '0px 7px 0px 7px'};
`;

const LeadingAddonStyled = styled.div<Pick<StyledProps, 'variant'>>`
  border: 1px solid var(--custom-border-color);
  border-right: none;
  display: inline-block;
  font-size: ${(props) => (props.variant === 'small' ? '1em' : '1.125em')};
  text-align: center;

  line-height: ${(props) => (props.variant === 'small' ? '15px' : '17px')};
  width: min-content;

  border-radius: ${(props) =>
    props.variant === 'default' ? '6px 0px 0px 6px' : '4px 0px 0px 4px'};

  padding: ${(props) =>
    props.variant === 'default' ? '4px 11px 4px 11px' : '0px 7px 0px 7px'};
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

  return (
    <GroupStyled>
      {renderLeadingAddon(variant || contextVariant, leadingAddon)}

      <InputStyled
        id={name}
        name={name}
        variant={variant || contextVariant}
        hasTrailing={trailingAddon !== undefined}
        hasInlineTrailing={trailingAddon?.inline || false}
        hasLeading={leadingAddon !== undefined}
        hasInlineLeading={leadingAddon?.inline || false}
        {...otherProps}
      />

      {renderTrailingAddon(variant || contextVariant, trailingAddon)}
    </GroupStyled>
  );
}

function renderLeadingAddon(
  variant: StyledProps['variant'],
  addon?: RenderAddon,
) {
  if (!addon) {
    return null;
  }

  const { addon: render } = addon;

  return <LeadingAddonStyled variant={variant}>{render}</LeadingAddonStyled>;
}

function renderTrailingAddon(
  variant: StyledProps['variant'],
  addon?: RenderAddon,
) {
  if (!addon) {
    return null;
  }

  const { addon: render } = addon;

  return <TrailingAddonStyled variant={variant}>{render}</TrailingAddonStyled>;
}

function getBorderStyle(
  hasLeading: boolean,
  hasTrailing: boolean,
  variant: StyledProps['variant'],
) {
  const isSmall = variant === 'small';

  if (hasTrailing && hasLeading) {
    return '0px';
  }

  if (isSmall) {
    if (hasTrailing) {
      return '4px 0px 0px 4px';
    } else if (hasLeading) {
      return '0px 4px 4px 0px';
    } else {
      return '4px';
    }
  } else if (hasTrailing) {
    return '7px 0px 0px 7px';
  } else if (hasLeading) {
    return '0px 7px 7px 0px';
  } else {
    return '7px';
  }
}

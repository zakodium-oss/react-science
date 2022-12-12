import styled from '@emotion/styled';
import { InputHTMLAttributes, ReactNode } from 'react';

import { useFieldsContext } from './context/FieldsContext';

interface StyledProps {
  variant: 'default' | 'small';
  hasTrailing: boolean;
  hasLeading: boolean;
}

const lineHeight = 4 / 7;
const InputStyled = styled.input<StyledProps>`
  border: solid 1px rgb(217, 217, 217);
  font-size: 14px;
  line-height: ${lineHeight}px;
  margin: 0px -1px 0px 0px;
  outline: none;
  width: 100%;

  :hover {
    border-color: #4096ff;
    border-inline-end-width: 1px;
  }

  :focus {
    border-color: #4096ff;
    border-inline-end-width: 1px;
  }

  border-radius: ${(props) =>
    getBorderStyle(props.hasLeading, props.hasTrailing, props.variant)};

  padding: ${(props) =>
    props.variant === 'default'
      ? props.hasTrailing
        ? '4px 11px 4px 11px'
        : '4px 11px'
      : props.hasTrailing
      ? '0px 7px 0px 7px'
      : '0 7px'};
`;

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

const TrailingAddonStyled = styled.div<Pick<StyledProps, 'variant'>>`
  border: 1px solid rgb(217, 217, 217);
  border-left: none;
  display: inline-block;
  font-size: 14px;
  text-align: center;

  line-height: 17px;
  width: min-content;

  border-radius: ${(props) =>
    props.variant === 'default' ? '0px 6px 6px 0px' : '0px 4px 4px 0px'};

  padding: ${(props) =>
    props.variant === 'default' ? '4px 11px 4px 11px' : '0px 7px 0px 7px'};
`;

const LeadingAddonStyled = styled.div<Pick<StyledProps, 'variant'>>`
  border: 1px solid rgb(217, 217, 217);
  border-right: none;
  display: inline-block;
  font-size: 14px;
  text-align: center;

  line-height: 17px;
  width: min-content;

  border-radius: ${(props) =>
    props.variant === 'default' ? '6px 0px 0px 6px' : '4px 0px 0px 4px'};

  padding: ${(props) =>
    props.variant === 'default' ? '4px 11px 4px 11px' : '0px 7px 0px 7px'};
`;

const GroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'small';

  leadingAddon?: ReactNode;
  leadingInlineAddon?: ReactNode;
  trailingAddon?: ReactNode;
  trailingInlineAddon?: ReactNode;
}

export function Input(props: InputProps) {
  const {
    variant = 'default',
    trailingAddon,
    leadingAddon,
    leadingInlineAddon,
    ...otherProps
  } = props;
  const { name } = useFieldsContext();

  return (
    <GroupStyled>
      {leadingAddon && (
        <LeadingAddonStyled variant={variant}>
          {leadingAddon}
        </LeadingAddonStyled>
      )}
      <InputStyled
        id={name}
        name={name}
        variant={variant}
        hasTrailing={trailingAddon !== undefined}
        hasLeading={leadingAddon !== undefined}
        {...otherProps}
      />
      {trailingAddon && (
        <TrailingAddonStyled variant={variant}>
          {trailingAddon}
        </TrailingAddonStyled>
      )}
    </GroupStyled>
  );
}

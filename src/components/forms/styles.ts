import styled from '@emotion/styled';

export type InputVariant = 'default' | 'small';

interface StyledProps {
  variant: InputVariant;
  hasLeading?: boolean;
  hasTrailing?: boolean;
}
export const enabledColor = '#1677ff';
export const disabledColor = '#b8b8b8';

export const LabelStyled = styled.label<StyledProps>`
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

export const GroupStyled = styled.div<{ hasError: boolean; hasValid: boolean }>`
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

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

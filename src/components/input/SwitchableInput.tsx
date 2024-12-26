import styled from '@emotion/styled';
import type { ReactElement } from 'react';
import { cloneElement, useCallback, useState } from 'react';

export const SwitchableInput = styled.input`
  width: 100%;

  :focus,
  :hover {
    box-shadow: 0 0 1px 1px #595959;
  }
`;

interface SwitchableInputRendererProps {
  input: ReactElement<HTMLInputElement>;
  value: string;
}

export function SwitchableInputRenderer(props: SwitchableInputRendererProps) {
  const { input, value } = props;
  const [isInputRendered, setIsInputRendered] = useState(false);

  const toggle = useCallback(
    (event: any) => {
      if (isInputRendered) {
        event.stopPropagation();
      }

      return setIsInputRendered((old) => !old);
    },
    [isInputRendered],
  );

  if (isInputRendered) {
    return cloneElement(input, {
      ...input.props,
      tabIndex: 0,
      // @ts-expect-error autoFocus is only used for React
      autoFocus: true,
      onBlur: (event: any) => {
        // @ts-expect-error onBlur is only used for React
        input.props.onBlur?.(event);
        setIsInputRendered(false);
      },
      defaultValue: value,
    });
  }

  return <div onClick={toggle}>{value}</div>;
}

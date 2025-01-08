import styled from '@emotion/styled';
import type { ReactElement } from 'react';
import { cloneElement, useCallback, useState } from 'react';

export const SwitchableInput = styled.input`
  // 22px is the padding of the container
  max-width: calc(100% - 22px);
  box-shadow: 0 0 1px 1px #595959;
  position: absolute;

  :focus,
  :hover {
    box-shadow: 0 0 1px 1px #595959;
  }
`;

const Container = styled.div`
  min-width: 100%;
  height: 21px;

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

  const Input = cloneElement(input, {
    ...input.props,
    // @ts-expect-error ref is only used for React
    ref: (node: HTMLInputElement | null) => {
      if (!node) return;
      node.focus();
    },
    style: {
      ...input.props.style,
      visibility: isInputRendered ? 'visible' : 'hidden',
    },
    tabIndex: 0,
    onBlur: (event: any) => {
      // @ts-expect-error onBlur is only used for React
      input.props.onBlur?.(event);
      setIsInputRendered(false);
    },
    defaultValue: value,
  });

  return (
    <>
      {Input}

      <Container
        onClick={(event) => {
          toggle(event);
        }}
      >
        {value}
      </Container>
    </>
  );
}

import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

export interface InlineRendererEditableProps<T extends HTMLElement> {
  ref: (node: T | null) => void;
  toggle: () => void;
}

export interface InlineEditableProps<T extends HTMLElement> {
  renderEditable: (props: InlineRendererEditableProps<T>) => ReactNode;
  children: ReactNode;
}

export const InlineEditableInput = styled.input`
  width: 100%;
  height: 100%;
  box-shadow: 0 0 1px 1px ${Colors.GRAY1};
  position: absolute;
  inset: 0;
`;

const Container = styled.div`
  min-width: 100%;
  width: 100%;
  min-height: 21px;

  :focus,
  :hover {
    box-shadow: 0 0 1px 1px ${Colors.GRAY1};
  }
`;

/**
 * The `InlineEditable` component allows for inline editing of its content.
 * It renders a component with `renderEditable` when focused or clicked
 * and toggles back to the original content when the input loses focus.
 */
export function InlineEditable<T extends HTMLElement>(
  props: InlineEditableProps<T>,
) {
  const { children, renderEditable } = props;
  const [isInputRendered, setIsInputRendered] = useState(false);

  const toggle = useCallback(() => {
    return setIsInputRendered((old) => !old);
  }, []);

  const renderEditableProps = useMemo<InlineRendererEditableProps<T>>(() => {
    return {
      isRendered: isInputRendered,
      ref: (node) => {
        if (!node) return;
        node.focus();
      },
      toggle,
    };
  }, [isInputRendered, toggle]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ visibility: isInputRendered ? 'visible' : 'hidden' }}>
        {renderEditable(renderEditableProps)}
      </div>

      <Container
        tabIndex={isInputRendered ? -1 : 0}
        onFocus={() => setIsInputRendered(true)}
        onClick={toggle}
      >
        {children}
      </Container>
    </div>
  );
}

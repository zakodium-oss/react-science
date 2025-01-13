import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

export interface InlineRendererEditableProps<T extends HTMLElement> {
  ref: (node: T | null) => void;
  toggle: () => void;
}

export interface InlineEditableRendererProps<T extends HTMLElement> {
  renderEditable: (props: InlineRendererEditableProps<T>) => ReactNode;
  children: ReactNode;
}

export const BorderlessEditableInput = styled.input`
  width: 100%;
  height: 100%;
  box-shadow: 0 0 1px 1px #595959;
  position: absolute;
  inset: 0;

  :focus,
  :hover {
    box-shadow: 0 0 1px 1px #595959;
  }
`;

const Container = styled.div`
  min-width: 100%;
  width: 100%;
  :focus,
  :hover {
    box-shadow: 0 0 1px 1px #595959;
  }
`;

export function InlineEditableRenderer<T extends HTMLElement>(
  props: InlineEditableRendererProps<T>,
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

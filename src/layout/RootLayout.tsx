/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import React, { ReactNode, CSSProperties, useState, useCallback } from 'react';
import root from 'react-shadow/emotion';

import { Accordion } from './Accordion';
import { DropZone } from './DropZone';
import { Modal } from './Modal';
import { SplitPane } from './SplitPane';
import { AccordionProvider } from './context/AccordionContext';
import { RootLayoutProvider } from './context/RootLayoutContext';
import { customDivPreflight, customPreflight } from './css/customPreflight';
import { preflight } from './css/preflight';

const layoutComponents = {
  SplitPane,
  Accordion,
  Modal,
  DropZone,
};

interface LayoutComponent {
  id: string;
  component: keyof typeof layoutComponents | React.FC;
  children?: LayoutComponent[];
}

export interface Layout {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout: LayoutComponent | any;
}

interface RootLayoutProps {
  style?: CSSProperties;
  children?: ReactNode;
  layout?: Layout;
}

const style: CSSProperties = {
  width: '100%',
  height: '100%',
};

export function RootLayout(props: RootLayoutProps) {
  const [state, setState] = useState<HTMLElement>(document.body);

  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setState(node);
    }
  }, []);

  return (
    <root.div style={{ ...style, ...props.style }}>
      <Global styles={[preflight, customPreflight]} />
      <div
        ref={ref}
        css={customDivPreflight}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <RootLayoutProvider innerRef={state}>
          <AccordionProvider>
            {props.layout ? createLayout(props.layout) : props.children}
          </AccordionProvider>
        </RootLayoutProvider>
      </div>
    </root.div>
  );
}

function createElements(
  children: LayoutComponent[] | undefined,
): ReactNode[] | undefined {
  return children?.map((comp, index) =>
    createLayoutComponent(comp, { key: index }),
  );
}

function createLayoutComponent(
  com: LayoutComponent,
  props = {},
): ReactNode | undefined {
  const { component, children, ...compProps } = com;
  if (
    (typeof component === 'string' && layoutComponents[component]) ||
    typeof component === 'function'
  ) {
    const componentNode =
      typeof component === 'string'
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (layoutComponents[component] as any)
        : component;
    const componentProps = { ...compProps, ...props };
    const childrenComp =
      children && typeof children === 'string'
        ? children
        : createElements(children);

    return React.createElement(componentNode, componentProps, childrenComp);
  }
}

function createLayout(layout: Layout) {
  return createLayoutComponent(layout.layout);
}

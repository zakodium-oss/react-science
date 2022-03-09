/** @jsxImportSource @emotion/react */
import React, { ReactNode, CSSProperties, useState, useCallback } from 'react';

import { Accordion, AccordionProps } from './Accordion';
import { DropZone, DropzoneProps } from './DropZone';
import { Modal, ModalProps } from './Modal';
import { SplitPane, SplitPaneProps } from './SplitPane';
import { AccordionProvider } from './context/AccordionContext';
import { RootLayoutProvider } from './context/RootLayoutContext';
import { customDivPreflight } from './css/customPreflight';

interface CompPropsTypes {
  SplitPane: SplitPaneProps;
  Accordion: AccordionProps;
  DropZone: DropzoneProps;
  Modal: ModalProps;
}

const layoutComponents = {
  SplitPane,
  Accordion,
  Modal,
  DropZone,
};

interface LayoutComponent {
  id: string;
  component: keyof typeof layoutComponents;
  children?: LayoutComponent[];
}

export interface Layout {
  layout: LayoutComponent;
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
    <div style={{ ...style, ...props.style }}>
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
    </div>
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
  if (layoutComponents[component]) {
    const componentNode = layoutComponents[component];
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

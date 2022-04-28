/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import React, {
  ReactNode,
  CSSProperties,
  useState,
  useCallback,
  ReactFragment,
  ReactElement,
} from 'react';
import root from 'react-shadow/emotion';

import { Accordion, AccordionItemProps, AccordionProps } from './Accordion';
import { SplitPane, SplitPaneProps } from './SplitPane';
import { RootLayoutProvider } from './context/RootLayoutContext';
import { customDivPreflight, customPreflight } from './css/customPreflight';
import { preflight } from './css/preflight';

type Node =
  | Array<React.ReactElement>
  | React.ReactElement
  | ReactFragment
  | React.FunctionComponent;

type OmitChildren<T> = Omit<T, 'children'>;

const LAYOUT_COMPONENTS: Record<string, Node> = {
  SplitPane,
  Accordion,
};

interface SplitPaneLayout extends OmitChildren<SplitPaneProps> {
  component: 'SplitPane';
  children: [Layout, Layout];
}
interface AccordionItem extends OmitChildren<AccordionItemProps> {
  component: Node;
  key: string;
}
interface AccordionLayout extends OmitChildren<AccordionProps> {
  component: 'Accordion';
  children: AccordionItem[];
}

type BaseLayoutItem =
  | {
      component: Node;
      children?: Array<Layout>;
    }
  | SplitPaneLayout
  | AccordionLayout;

export type Layout = BaseLayoutItem & { key: string };

interface RootLayoutProps {
  style?: CSSProperties;
  children?: ReactNode;
  layout: Layout;
}

const style: CSSProperties = {
  width: '100%',
  height: '100%',
};

export function DynamicLayout(props: RootLayoutProps) {
  const [state, setState] = useState<HTMLElement | null>(
    typeof document !== 'undefined' ? document.body : null,
  );

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
          {props.layout ? createLayoutComponent(props.layout) : props.children}
        </RootLayoutProvider>
      </div>
    </root.div>
  );
}

function mapChildren(children: Layout[] | undefined, parentComponent?: Layout) {
  return children ? (
    children.map((child) => createLayoutComponent(child, parentComponent))
  ) : (
    <div />
  );
}

function renderAccordionItem(layout: Layout) {
  const { component } = layout;
  const { key, title, defaultOpened } = layout as AccordionItem;
  return React.createElement(
    Accordion.Item,
    { key, title, defaultOpened, children: [] },
    React.createElement(component as React.FunctionComponent),
  );
}

function renderPredefineComponent(layout: Layout) {
  const { component, children, ...compProps } = layout;

  return React.createElement(
    LAYOUT_COMPONENTS[component as string] as React.FunctionComponent,
    { ...(compProps || {}) },
    mapChildren(children, layout),
  );
}
function renderComponent(layout: Layout) {
  const { component, children, ...compProps } = layout;

  return React.createElement(
    component as React.FunctionComponent,
    { ...(compProps || {}) },
    mapChildren(children, layout),
  );
}

function createLayoutComponent(
  layout: Layout,
  parentComponent?: Layout,
): ReactElement {
  const { component } = layout;

  if (parentComponent?.component === 'Accordion') {
    return renderAccordionItem(layout);
  } else if ((component as string) in LAYOUT_COMPONENTS) {
    return renderPredefineComponent(layout);
  } else {
    return renderComponent(layout);
  }
}

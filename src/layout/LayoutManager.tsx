import { v4 as uuid } from '@lukeed/uuid';
import React, { ReactNode } from 'react';

import { Accordion } from './Accordion';
import { DropZone } from './DropZone';
import { Modal } from './Modal';
import { SplitPane } from './SplitPane';

const layoutComponents: ComponentsMap = {
  SplitPane,
  Accordion,
  Modal,
  DropZone,
};

interface ComponentsMap {
  [componentName: string]: ReactNode;
}

interface LayoutManagerProps {
  layout: Layout;
  components?: ComponentsMap;
}

export interface Layout {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout: LayoutComponent | any;
}
interface LayoutComponent {
  id: string;
  component: keyof typeof layoutComponents | React.FC | string;
  children?: LayoutComponent[];
}

function LayoutManager(props: LayoutManagerProps) {
  const { layout, components } = props;
  return createLayout(layout, components);
}

function createLayoutComponent(
  com: LayoutComponent,
  components: LayoutManagerProps['components'],
  props = {},
): JSX.Element | null {
  const { id, component, children, ...compProps } = com;
  const componentId = id ? id : uuid();
  const componentNode = findComponent(component, components);

  if (componentNode) {
    const componentProps = { id: componentId, ...compProps, ...props };
    const childrenComp =
      children && typeof children === 'string'
        ? children
        : createElements(children, components);

    return React.createElement(
      componentNode as React.FC,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      componentProps as any,
      childrenComp,
    );
  }
  return null;
}

function createLayout(
  layout: Layout,
  components: LayoutManagerProps['components'],
) {
  return createLayoutComponent(layout.layout, components);
}

function createElements(
  children: LayoutComponent[] | undefined,
  components: LayoutManagerProps['components'],
): ReactNode[] | undefined {
  return children?.map((comp, index) =>
    createLayoutComponent(comp, components, { key: index }),
  );
}

function findComponent(
  component: LayoutComponent['component'],
  definedComponents: LayoutManagerProps['components'],
): ReactNode {
  if (typeof component === 'function') return component;

  if (typeof component === 'string') {
    if (definedComponents?.[component]) return definedComponents[component];
    if (layoutComponents[component]) return layoutComponents[component];
  }

  return null;
}

export default LayoutManager;

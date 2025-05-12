import { Tab, Tabs } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import { shouldForwardPropExcept } from '../../src/components/utils/shouldForwardPropExcept.js';

export default {
  title: 'Components / Tabs',
};

export function Horizontal() {
  const items = [
    { id: '1h', title: '1H', content: 'Hello, World! [a]' },
    { id: '13c', title: '13C', content: 'Hello, World! [b]' },
    { id: '1h,1h', title: '1H,1H', content: 'Hello, World! [c]' },
    { id: '1h,13c', title: '1H,13C', content: 'Hello, World! [d]' },
  ];

  return (
    <Tabs>
      {items.map((item) => (
        <Tab
          id={item.id}
          key={item.id}
          title={item.title}
          panel={<div>{item.content}</div>}
        />
      ))}
    </Tabs>
  );
}
function FullHeightContent({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: 'rgb(251, 207, 232)', height: '100%' }}>
      {children}
    </div>
  );
}

const AllowHorizontalChildToTakeFullHeightTabs = styled(Tabs)`
  height: 100%;
  display: flex;
  flex-direction: column;

  div[role='tabpanel'] {
    flex-grow: 1;
  }
`;

export function AllowHorizontalChildToTakeFullHeight() {
  const items = [
    {
      id: '1h',
      title: '1H',
      content: <FullHeightContent>Hello, World! [a]</FullHeightContent>,
    },
    {
      id: '13c',
      title: '13C',
      content: <FullHeightContent>Hello, World! [b]</FullHeightContent>,
    },
    {
      id: '1h,1h',
      title: '1H,1H',
      content: <FullHeightContent>Hello, World! [c]</FullHeightContent>,
    },
    {
      id: '1h,13c',
      title: '1H,13C',
      content: <FullHeightContent>Hello, World! [d]</FullHeightContent>,
    },
  ];

  return (
    <AllowHorizontalChildToTakeFullHeightTabs>
      {items.map((item) => (
        <Tab
          id={item.id}
          key={item.id}
          title={item.title}
          panel={item.content}
        />
      ))}
    </AllowHorizontalChildToTakeFullHeightTabs>
  );
}

const ManyTabsStyled = styled(Tabs, {
  shouldForwardProp: shouldForwardPropExcept(['orientation']),
})<{ orientation: string }>`
  height: 100%;

  div[role='tablist'] {
    overflow: ${(props) =>
      props.orientation === 'vertical' ? 'hidden auto' : 'auto hidden'};
  }
`;

export function ManyTabs({
  orientation,
}: {
  orientation: 'horizontal' | 'vertical';
}) {
  const items = [
    { id: 'a', title: '1H', content: 'Hello, World! [a]' },
    { id: 'b', title: '13C', content: 'Hello, World! [b]' },
    { id: 'c', title: '1H,1H', content: 'Hello, World! [c]' },
    { id: 'd', title: '1H,13C', content: 'Hello, World! [d]' },
    { id: 'e', title: '1H,13C', content: 'Hello, World! [e]' },
    { id: 'f', title: '13C', content: 'Hello, World! [f]' },
    { id: 'g', title: '1H,1H', content: 'Hello, World! [g]' },
    { id: 'h', title: '1H,13C', content: 'Hello, World! [h]' },
    { id: 'i', title: '1H,1H', content: 'Hello, World! [i]' },
    { id: 'j', title: '13C', content: 'Hello, World! [j]' },
    { id: 'k', title: '1H,13C', content: 'Hello, World! [k]' },
    { id: 'l', title: '1H,13C', content: 'Hello, World! [l]' },
    { id: 'm', title: '13C', content: 'Hello, World! [m]' },
    { id: 'n', title: '1H,1H', content: 'Hello, World! [n]' },
    { id: 'o', title: '1H,13C', content: 'Hello, World! [o]' },
    { id: 'p', title: '1H,13C', content: 'Hello, World! [p]' },
  ];

  return (
    <ManyTabsStyled
      orientation={orientation}
      vertical={orientation === 'vertical'}
    >
      {items.map((item) => (
        <Tab
          id={item.id}
          key={item.id}
          title={item.title}
          panel={<div>{item.content}</div>}
        />
      ))}
    </ManyTabsStyled>
  );
}
ManyTabs.args = {
  orientation: 'horizontal',
};
ManyTabs.argTypes = {
  orientation: {
    control: { type: 'radio' },
    options: ['horizontal', 'vertical'],
  },
};
export function Vertical() {
  const items = [
    { id: 'controllers', title: 'Controllers', content: 'Hello, World!' },
    {
      id: 'formatting',
      title: 'Controllers a',
      content: 'Hello, World! a',
    },
    { id: 'display', title: 'Controllers', content: 'Hello, World!' },
  ];

  return (
    <Tabs vertical>
      {items.map((item) => (
        <Tab
          id={item.id}
          key={item.id}
          title={item.title}
          panel={<div>{item.content}</div>}
        />
      ))}
    </Tabs>
  );
}

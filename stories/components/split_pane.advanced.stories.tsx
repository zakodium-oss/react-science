import { Button, Tab, Tabs } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useMemo, useState } from 'react';

import type { SplitPaneSize } from '../../src/components/index.js';
import {
  Accordion,
  AccordionProvider,
  parseSize,
  SplitPane,
} from '../../src/components/index.js';

import { SplitPanelChildContent } from './split_pane.utils.js';

export default {
  title: 'Components / SplitPane / Advanced',
};

export function Inception() {
  return (
    <div style={{ backgroundColor: 'rgba(209, 213, 219)', height: 400 }}>
      <SplitPane direction="horizontal">
        <SplitPane direction="vertical">
          <p>A</p>
          <AccordionProvider>
            <Accordion>
              <Accordion.Item id="A" title="A">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perferendis distinctio ducimus beatae iure! Vel, laudantium.
                  Cum, aliquam officiis numquam rerum voluptatem repellat
                  quibusdam incidunt enim officia tenetur corrupti qui quia.
                </p>
              </Accordion.Item>
              <Accordion.Item id="B" title="B">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perferendis distinctio ducimus beatae iure! Vel, laudantium.
                  Cum, aliquam officiis numquam rerum voluptatem repellat
                  quibusdam incidunt enim officia tenetur corrupti qui quia.
                </p>
              </Accordion.Item>
              <Accordion.Item id="C" title="C">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perferendis distinctio ducimus beatae iure! Vel, laudantium.
                  Cum, aliquam officiis numquam rerum voluptatem repellat
                  quibusdam incidunt enim officia tenetur corrupti qui quia.
                </p>
              </Accordion.Item>
            </Accordion>
          </AccordionProvider>
        </SplitPane>
        <SplitPane direction="vertical">
          <p>C</p>
          <SplitPane direction="vertical">
            <p>D</p>
            <p>E</p>
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </div>
  );
}

export function WithEvilChild() {
  return (
    <div
      style={{
        backgroundColor: 'rgba(251, 207, 232)',
        width: 800,
        height: 300,
      }}
    >
      <SplitPane direction="horizontal" defaultSize="300px">
        <div>I am a good child. 😊</div>
        <div
          style={{
            backgroundColor: 'rgba(252, 165, 165)',
            width: 300,
            whiteSpace: 'nowrap',
            overflow: 'auto',
          }}
        >
          I am an evil child. My size will stay at 300px 😈
        </div>
      </SplitPane>
    </div>
  );
}

const StyledTabs = styled(Tabs)`
  height: 100%;

  div[role='tablist'] {
    overflow-x: auto;
  }
`;

export function WithMinimalSizeAndEvilChild() {
  const tabItems = useMemo(
    () =>
      new Array(20).fill(0).map((_, i) => ({
        id: `tab-${i}`,
        title: `Tab ${i}`,
        content: `Tab ${i} content`,
      })),
    [],
  );

  const [opened, setOpen] = useState<string | number>();

  return (
    <div style={{ height: '100%' }}>
      <SplitPane direction="horizontal" defaultSize="20%" controlledSide="end">
        <div style={{ width: '100%', minWidth: 0 }}>
          <StyledTabs selectedTabId={opened} onChange={setOpen}>
            {tabItems.map((item) => (
              <Tab
                id={item.id}
                key={item.id}
                title={item.title}
                panel={<div>{item.content}</div>}
              />
            ))}
          </StyledTabs>
        </div>
        <div
          style={{
            backgroundColor: 'rgba(147, 197, 253)',
            width: '100%',
            minWidth: '300px',
          }}
        >
          I am an evil child. My size will stay at 300px 😈
        </div>
      </SplitPane>
    </div>
  );
}

export function WithConditionalChild() {
  const [hasChild1, sethasChild1] = useState(true);
  const [hasChild2, sethasChild2] = useState(true);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Button onClick={() => sethasChild1((val) => !val)}>
        {hasChild1
          ? 'Set first child to be null'
          : 'Set first child to be contentful'}
      </Button>
      <Button onClick={() => sethasChild2((val) => !val)}>
        {hasChild2
          ? 'Set second child to be null'
          : 'Set second child to be contentful'}
      </Button>
      <div style={{ width: 600, height: 400 }}>
        <SplitPane direction="vertical" controlledSide="start">
          {hasChild1 ? (
            <SplitPanelChildContent color="lightpink">
              First child
            </SplitPanelChildContent>
          ) : null}
          {hasChild2 ? (
            <SplitPanelChildContent color="lightblue">
              Second child
            </SplitPanelChildContent>
          ) : null}
        </SplitPane>
      </div>
    </div>
  );
}

export function WithMinMaxAbsoluteValues() {
  const [size, setSize] = useState<SplitPaneSize>('200px');
  return (
    <>
      <span>Second child is constrained to [50px, 300px]</span>
      <div style={{ width: 600, height: 400 }}>
        <SplitPane
          direction="vertical"
          size={size}
          onSizeChange={(newSize) => {
            const parsed = parseSize(newSize);
            if (parsed.type === 'px') {
              const size = Math.max(50, Math.min(300, parsed.value));
              setSize(`${size}px`);
            } else {
              setSize(newSize);
            }
          }}
          controlledSide="end"
        >
          <SplitPanelChildContent color="lightblue">
            First child
          </SplitPanelChildContent>
          <SplitPanelChildContent color="lightpink">
            Second child
          </SplitPanelChildContent>
        </SplitPane>
      </div>
    </>
  );
}

export function WithMinMaxRelativeValues() {
  const [size, setSize] = useState<SplitPaneSize>('50%');
  return (
    <>
      <span>Second child is constrained to [10%, 80%]</span>
      <div style={{ width: 600, height: 400 }}>
        <SplitPane
          direction="vertical"
          size={size}
          onSizeChange={(newSize) => {
            const parsed = parseSize(newSize);
            if (parsed.type === '%') {
              const size = Math.max(10, Math.min(80, parsed.value));
              setSize(`${size}%`);
            } else {
              setSize(newSize);
            }
          }}
          controlledSide="end"
        >
          <SplitPanelChildContent color="lightblue">
            First child
          </SplitPanelChildContent>
          <SplitPanelChildContent color="lightpink">
            Second child
          </SplitPanelChildContent>
        </SplitPane>
      </div>
    </>
  );
}

export function ControlledState() {
  const [size, setSize] = useState<SplitPaneSize>('50%');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <SplitPane
        size={size}
        onSizeChange={setSize}
        open={isOpen}
        onOpenChange={setIsOpen}
        direction="horizontal"
        closeThreshold={500}
      >
        <SplitPanelChildContent key="A" color="lightpink">
          A
        </SplitPanelChildContent>
        <SplitPanelChildContent key="B" color="lightblue">
          B
        </SplitPanelChildContent>
      </SplitPane>
    </div>
  );
}

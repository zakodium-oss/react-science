import { Tab, Tabs } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { useMemo, useState } from 'react';

import type { SplitPaneProps } from '../../src/components/index.js';
import {
  Accordion,
  AccordionProvider,
  SplitPane,
} from '../../src/components/index.js';

const sideArgType = {
  options: ['start', 'end'],
  control: { type: 'radio' },
};

const directionArgType = {
  options: ['horizontal', 'vertical'],
  control: { type: 'radio' },
};

type SplitPaneStoryProps = Omit<SplitPaneProps, 'children'>;

export default {
  title: 'Components / SplitPane',
  argTypes: {
    direction: directionArgType,
    controlledSide: sideArgType,
  },
  args: {
    onOpenChange: action('onOpenChange'),
    onResize: action('onResize'),
    defaultOpen: true,
    defaultSize: '50%',
  },
};

export function Control(props: SplitPaneStoryProps) {
  return (
    <div style={{ backgroundColor: 'greenyellow', height: 400, width: 600 }}>
      <SplitPane {...props}>
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Vertical(props: Omit<SplitPaneProps, 'children'>) {
  return (
    <div style={{ backgroundColor: 'rgba(165, 180, 252)', height: 400 }}>
      <SplitPane direction="vertical" defaultSize="200px" {...props}>
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Horizontal(props: SplitPaneStoryProps) {
  return (
    <div style={{ backgroundColor: 'rgba(147, 197, 253)', height: 200 }}>
      <SplitPane direction="horizontal" defaultSize="30%" {...props}>
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Inception(props: SplitPaneStoryProps) {
  return (
    <div style={{ backgroundColor: 'rgba(209, 213, 219)', height: 400 }}>
      <SplitPane direction="horizontal" {...props}>
        <SplitPane direction="vertical" {...props}>
          <p>A</p>

          <AccordionProvider>
            <Accordion>
              <Accordion.Item title="A">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perferendis distinctio ducimus beatae iure! Vel, laudantium.
                  Cum, aliquam officiis numquam rerum voluptatem repellat
                  quibusdam incidunt enim officia tenetur corrupti qui quia.
                </p>
              </Accordion.Item>
              <Accordion.Item title="B">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perferendis distinctio ducimus beatae iure! Vel, laudantium.
                  Cum, aliquam officiis numquam rerum voluptatem repellat
                  quibusdam incidunt enim officia tenetur corrupti qui quia.
                </p>
              </Accordion.Item>
              <Accordion.Item title="C">
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
        <SplitPane direction="vertical" {...props}>
          <p>C</p>
          <SplitPane direction="vertical" {...props}>
            <p>D</p>
            <p>E</p>
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </div>
  );
}

export function WithEvilChild(props: SplitPaneStoryProps) {
  return (
    <div
      style={{
        backgroundColor: 'rgba(251, 207, 232)',
        width: 800,
        height: 300,
      }}
    >
      <SplitPane direction="horizontal" defaultSize="300px" {...props}>
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

export function WithMinimalSize(props: SplitPaneStoryProps) {
  const { controlledSide, minimumSize } = props;
  const nbPx = String(minimumSize);
  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100vh - 2.1rem)',
      }}
    >
      <SplitPane {...props}>
        <div style={{ backgroundColor: 'rgba(252, 165, 165)', width: '100%' }}>
          {controlledSide === 'start' &&
            `Close when container size less Than ${nbPx}px`}
        </div>
        <div style={{ backgroundColor: 'rgba(147, 197, 253)', width: '100%' }}>
          {controlledSide === 'end' &&
            `Close when container size less Than ${nbPx}px`}
        </div>
      </SplitPane>
    </div>
  );
}

WithMinimalSize.args = {
  defaultSize: '500px',
  minimumSize: 600,
};

WithMinimalSize.argTypes = {
  direction: directionArgType,
  controlledSide: sideArgType,
};

const StyledTabs = styled(Tabs)`
  height: 100%;

  div[role='tablist'] {
    overflow-x: auto;
  }
`;

export function WithMinimalSizeAndEvilChild(props: SplitPaneStoryProps) {
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
      <SplitPane
        direction="horizontal"
        defaultSize="20%"
        controlledSide="end"
        {...props}
      >
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

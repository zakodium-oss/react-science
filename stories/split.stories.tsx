import { Meta } from '@storybook/react';
import React from 'react';

import { Accordion, SplitPane } from '../src';
import { SplitPaneProps } from '../src/components/SplitPane';
import { AccordionProvider } from '../src/components/context/AccordionContext';

export default {
  title: 'Layout/SplitPane',
  args: {
    initialSeparation: '50%',
    orientation: 'horizontal',
    sideSeparation: 'end',
    initialClosed: false,
    minimumSize: 300,
  },
  argTypes: {
    onChange: { action: 'handle' },
  },
  component: SplitPane,
} as Meta<SplitPaneProps>;

export function Control(props: Omit<SplitPaneProps, 'children'>) {
  return (
    <div style={{ backgroundColor: 'greenyellow', height: 400, width: 600 }}>
      <SplitPane key={props.initialSeparation} {...props}>
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Vertical() {
  return (
    <div style={{ backgroundColor: 'rgba(165, 180, 252)', height: 400 }}>
      <SplitPane orientation="vertical" initialSeparation="200px">
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Horizontal() {
  return (
    <div style={{ backgroundColor: 'rgba(147, 197, 253)', height: 200 }}>
      <SplitPane orientation="horizontal" initialSeparation="200px">
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Inception() {
  return (
    <div style={{ backgroundColor: 'rgba(209, 213, 219)', height: 400 }}>
      <SplitPane orientation="horizontal">
        <SplitPane orientation="vertical">
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
        <SplitPane orientation="vertical">
          <p>C</p>
          <SplitPane orientation="vertical">
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
        width: 600,
        height: 300,
      }}
    >
      <SplitPane orientation="horizontal" initialSeparation="300px">
        <div>I am a good child. 😊</div>
        <div style={{ backgroundColor: 'rgba(252, 165, 165)', width: 300 }}>
          I am an evil child. You cannot make me smaller than 300px 😈
        </div>
      </SplitPane>
    </div>
  );
}
export function WithMinimalSize(props: Omit<SplitPaneProps, 'children'>) {
  return (
    <div
      style={{
        width: '100%',
        height: 300,
      }}
    >
      <SplitPane key={props.initialSeparation} {...props}>
        <div style={{ backgroundColor: 'rgba(252, 165, 165)', width: '100%' }}>
          Close when size less Than 300px 😊
        </div>
        <div
          style={{ backgroundColor: 'rgba(147, 197, 253)', width: '100%' }}
        />
      </SplitPane>
    </div>
  );
}

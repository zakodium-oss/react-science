import { Meta } from '@storybook/react';
import React, { useState } from 'react';

import { Accordion, RootLayout, Toolbar } from '../src';

export default {
  title: 'Layout/Accordion',
} as Meta;

export function Test() {
  return (
    <Accordion>
      <Accordion.Item title="first">first element</Accordion.Item>
      <Accordion.Item title="second" defaultOpened>
        <div style={{ backgroundColor: 'red' }}>second element</div>
      </Accordion.Item>
    </Accordion>
  );
}

export function Control() {
  return (
    <RootLayout>
      <div
        style={{
          display: 'flex',
          width: 500,
          height: 300,
        }}
      >
        <Toolbar orientation="vertical">
          <Toolbar.Item id="C" title="C" active onClick={() => {}}>
            C
          </Toolbar.Item>
          <Toolbar.Item id="V" title="V" active={false} onClick={() => {}}>
            V
          </Toolbar.Item>
        </Toolbar>
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Accordion>
            <Accordion.Item title="First Item" defaultOpened>
              This is the first content
            </Accordion.Item>
            <Accordion.Item title="Second Item">
              This is the content of the second item
            </Accordion.Item>
            <Accordion.Item title="With Toolbar">
              <Toolbar orientation="horizontal">
                <Toolbar.Item id="A" title="Test A">
                  A
                </Toolbar.Item>
                <Toolbar.Item id="B" title="Test B">
                  B
                </Toolbar.Item>
              </Toolbar>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </RootLayout>
  );
}

export function WithAddiction() {
  const [state, setState] = useState([
    {
      title: 'first',
      defaultOpened: true,
      content: 'This is the content of the first item',
    },
    {
      title: 'Second',
      defaultOpened: false,
      content: 'This is the content of the second item',
    },
  ]);

  function addElement() {
    setState([
      ...state,
      {
        title: `${state.length + 1}`,
        content: 'Element added',
        defaultOpened: false,
      },
    ]);
  }

  function removeElement() {
    const elements = state.slice();
    elements.pop();

    setState([...elements]);
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 20,
          marginTop: 20,
          gap: 10,
        }}
      >
        <button
          type="button"
          onClick={addElement}
          style={{ backgroundColor: 'red', padding: 5 }}
        >
          Add new element
        </button>

        <button
          type="button"
          onClick={removeElement}
          style={{ backgroundColor: 'red', padding: 5 }}
        >
          Delete the latest element
        </button>
      </div>
      <RootLayout>
        <div
          style={{
            display: 'flex',
            width: 500,
            height: 300,
          }}
        >
          <Toolbar orientation="vertical">
            <Toolbar.Item id="C" title="C" active onClick={() => {}}>
              C
            </Toolbar.Item>
            <Toolbar.Item id="V" title="V" active={false} onClick={() => {}}>
              V
            </Toolbar.Item>
          </Toolbar>
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <Accordion>
              {state.map(({ content, ...element }) => (
                <Accordion.Item key={element.title} {...element}>
                  {content}
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </RootLayout>
    </>
  );
}

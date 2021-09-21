import { Meta } from '@storybook/react';
import React, { useState } from 'react';

import { Accordion, Header, RootLayout, SplitPane, Toolbar } from '../src';
import { useToggleAccordion } from '../src/layout/context/AccordionContext';

export default {
  title: 'Layout/Accordion',
} as Meta;

export function Test() {
  return (
    <RootLayout>
      <Accordion>
        <Accordion.Item title="first">first element</Accordion.Item>
        <Accordion.Item title="second" defaultOpened>
          <div style={{ backgroundColor: 'rgba(252, 165, 165)' }}>
            second element
          </div>
        </Accordion.Item>
      </Accordion>
    </RootLayout>
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
          style={{ backgroundColor: 'rgba(252, 165, 165)', padding: 5 }}
        >
          Add new element
        </button>

        <button
          type="button"
          onClick={removeElement}
          style={{ backgroundColor: 'rgba(252, 165, 165)', padding: 5 }}
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

export function WithHookAccordion() {
  return (
    <RootLayout>
      <Inside />
    </RootLayout>
  );
}

function Inside() {
  const utils = useToggleAccordion();

  function onCallback(title: string, action: 'open' | 'close') {
    if (action === 'open') {
      utils.open(title);
    } else {
      utils.close(title);
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header>
          <Toolbar orientation="horizontal">
            <Toolbar.Item titleOrientation="horizontal" id="logo" title="Logo">
              <i className="fas fa-meteor" />
            </Toolbar.Item>
          </Toolbar>
          <Toolbar orientation="horizontal">
            <Toolbar.Item id="a" title="User manual">
              <i className="fas fa-book" />
            </Toolbar.Item>
            <Toolbar.Item id="b" title="General settings">
              <i className="fas fa-cogs" />
            </Toolbar.Item>
            <Toolbar.Item id="c" title="Full screen">
              <i className="fas fa-tablet-alt" />
            </Toolbar.Item>
          </Toolbar>
        </Header>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <Toolbar orientation="vertical">
            <Toolbar.Item id="a" title="Glasses" active>
              <i className="fas fa-glasses" />
            </Toolbar.Item>
            <Toolbar.Item id="b" title="Open in large mode">
              <i className="fas fa-arrows-alt" />
            </Toolbar.Item>
          </Toolbar>
        </div>
        <div
          style={{
            width: '100%',
            height: '300px',
          }}
        >
          <SplitPane initialSeparation="35%">
            <div style={{ padding: 5, display: 'flex', gap: 5, height: 40 }}>
              <button
                type="button"
                onClick={() => onCallback('Spectra', 'open')}
                style={{
                  backgroundColor: 'rgba(252, 165, 165)',
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                Open Spectra
              </button>
              <button
                type="button"
                onClick={() => onCallback('Spectra', 'close')}
                style={{
                  backgroundColor: 'rgba(110, 231, 183)',
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                Close Spectra
              </button>
            </div>
            <div
              style={{
                width: '100%',
                height: '100%',
                flex: '1 1 0%',
              }}
            >
              <Accordion>
                <Accordion.Item title="Spectra" defaultOpened>
                  <p style={{ padding: 5 }}>Spectra lorem</p>
                </Accordion.Item>
                <Accordion.Item title="Integral">
                  <p style={{ padding: 5 }}>Integral lorem</p>
                </Accordion.Item>
              </Accordion>
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
}

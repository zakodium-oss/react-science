import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import {
  FaMeteor,
  FaBook,
  FaCogs,
  FaTabletAlt,
  FaGlasses,
  FaArrowsAlt,
} from 'react-icons/fa';

import {
  Accordion,
  Header,
  RootLayout,
  SplitPane,
  Toolbar,
  useToggleAccordion,
} from '../src';

export default {
  title: 'Layout/Accordion',
} as Meta;

export function Test() {
  return (
    <RootLayout>
      <div style={{ height: 500 }}>
        <Accordion>
          <Accordion.Item title="1title">1content</Accordion.Item>
          <Accordion.Item title="2title" defaultOpened>
            2content
          </Accordion.Item>
        </Accordion>
      </div>
    </RootLayout>
  );
}

export function Control() {
  return (
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
    </>
  );
}

export function WithHookAccordion() {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header>
          <Toolbar orientation="horizontal">
            <Toolbar.Item titleOrientation="horizontal" id="logo" title="Logo">
              <FaMeteor />
            </Toolbar.Item>
          </Toolbar>
          <Toolbar orientation="horizontal">
            <Toolbar.Item id="a" title="User manual">
              <FaBook />
            </Toolbar.Item>
            <Toolbar.Item id="b" title="General settings">
              <FaCogs />
            </Toolbar.Item>
            <Toolbar.Item id="c" title="Full screen">
              <FaTabletAlt />
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
              <FaGlasses />
            </Toolbar.Item>
            <Toolbar.Item id="b" title="Open in large mode">
              <FaArrowsAlt />
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

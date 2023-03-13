import { useState } from 'react';

import {
  Accordion,
  SplitPane,
  Toolbar,
  useToggleAccordion,
} from '../../src/components/index';

export default {
  title: 'Components / Accordion',
};

export function Fixed() {
  return (
    <Accordion>
      <Accordion.Item title="First Item" defaultOpened>
        This is the first content
      </Accordion.Item>
      <Accordion.Item title="Second Item">
        This is the content of the second item
      </Accordion.Item>
      <Accordion.Item title="With Toolbar">
        <Toolbar orientation="horizontal">
          <Toolbar.Item title="Test A">A</Toolbar.Item>
          <Toolbar.Item title="Test B">B</Toolbar.Item>
        </Toolbar>
      </Accordion.Item>
    </Accordion>
  );
}

export function WithDynamicItems() {
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
          height: 300,
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
    </>
  );
}

export function WithToggle() {
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
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '300px',
          }}
        >
          <SplitPane size="35%">
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

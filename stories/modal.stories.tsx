import { Meta } from '@storybook/react';
import React from 'react';
import {
  FaMeteor,
  FaBook,
  FaCogs,
  FaTabletAlt,
  FaGlasses,
  FaArrowsAlt,
  FaReact,
  FaNpm,
  FaNodeJs,
} from 'react-icons/fa';

import {
  Accordion,
  Header,
  Modal,
  RootLayout,
  SplitPane,
  Toolbar,
  useModal,
  ConfirmModal,
  Button,
} from '../src';

export default {
  title: 'Layout/Modal',
  argTypes: {
    onSave: { action: 'saved' },
    onCancel: { action: 'canceled' },
  },
} as Meta;

export function ModalStories(props: { onSave: () => void }) {
  const [isOpen, open, close] = useModal({ defaultOpened: true });

  return (
    <RootLayout
      style={{
        borderStyle: 'solid',
        borderColor: 'rgb(213, 213, 213)',
        borderWidth: '1px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            <div style={{ padding: 5 }}>
              <Button
                onClick={open}
                backgroundColor={{
                  basic: 'hsla(243deg, 75%, 58%, 1)',
                  hover: 'hsla(245deg, 58%, 50%, 1)',
                }}
                color={{ basic: 'white' }}
              >
                Open
              </Button>
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
      <Modal isOpen={isOpen}>
        <Modal.Header onClose={close}>Hello, World!</Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: 'flex',
              flex: '1 1 0%',
              flexDirection: 'row',
            }}
          >
            <Toolbar orientation="vertical">
              <Toolbar.Item id="react" title="react">
                <FaReact />
              </Toolbar.Item>
              <Toolbar.Item id="npm" title="npm">
                <FaNpm />
              </Toolbar.Item>
              <Toolbar.Item id="nodejs" title="nodejs">
                <FaNodeJs />
              </Toolbar.Item>
            </Toolbar>
            <p style={{ paddingLeft: 10 }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
              accusamus voluptas odit minima amet obcaecati eveniet voluptatibus
              assumenda esse animi id atque natus ipsa sunt iure illo,
              exercitationem voluptates non.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
          >
            <Button
              onClick={props.onSave}
              backgroundColor={{
                basic: 'hsla(243deg, 75%, 58%, 1)',
                hover: 'hsla(245deg, 58%, 50%, 1)',
              }}
              color={{ basic: 'white' }}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </RootLayout>
  );
}

export function ConfirmModalStories(props: {
  onSave: () => void;
  onCancel: () => void;
}) {
  const [isOpen, open, close] = useModal({ defaultOpened: true });

  return (
    <RootLayout
      style={{
        borderStyle: 'solid',
        borderColor: 'rgb(213, 213, 213)',
        borderWidth: '1px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            <div style={{ padding: 5 }}>
              <Button
                onClick={open}
                backgroundColor={{
                  basic: 'hsla(243deg, 75%, 58%, 1)',
                  hover: 'hsla(245deg, 58%, 50%, 1)',
                }}
                color={{ basic: 'white' }}
              >
                Open
              </Button>
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
      <ConfirmModal
        headerColor="hsl(351deg, 73%, 47%)"
        onConfirm={props.onSave}
        onCancel={() => {
          props.onCancel();
          close();
        }}
        isOpen={isOpen}
      >
        <div
          style={{
            display: 'flex',
            flex: '1 1 0%',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            margin: 10,
          }}
        >
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed from our servers forever. This action
          cannot be undone.
        </div>
      </ConfirmModal>
    </RootLayout>
  );
}

import { useState } from 'react';
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
  SplitPane,
  Toolbar,
  ConfirmModal,
  Button,
  Tabs,
  TabItem,
  useOnOff,
} from '../../src/components/index';

export default {
  title: 'Components / Modal',
};

const actions = {
  onSave: { action: 'saved' },
  onCancel: { action: 'canceled' },
};

export function Control(props: { onSave: () => void }) {
  const [isOpen, open, close] = useOnOff();

  const { onSave, ...otherProps } = props;
  return (
    <>
      <DemoPage openModal={open} />
      <Modal isOpen={isOpen} onRequestClose={close} {...otherProps}>
        <Modal.Header>Hello, World!</Modal.Header>
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
              onClick={onSave}
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
    </>
  );
}

Control.args = {
  hasCloseButton: true,
  height: 400,
  maxWidth: 600,
  requestCloseOnBackdrop: true,
  requestCloseOnEsc: true,
};

Control.argTypes = actions;

export function ConfirmModalControl({
  onSave,
  onCancel,
  ...otherProps
}: {
  onSave: () => void;
  onCancel: () => void;
  headerColor: string;
}) {
  const [isOpen, open, close] = useOnOff();

  return (
    <>
      <DemoPage openModal={open} />
      <ConfirmModal
        onConfirm={() => {
          onSave();
          close();
        }}
        onCancel={() => {
          onCancel();
          close();
        }}
        isOpen={isOpen}
        onRequestClose={close}
        {...otherProps}
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
    </>
  );
}

ConfirmModalControl.args = {
  maxWidth: 400,
  requestCloseOnBackdrop: true,
  requestCloseOnEsc: true,
  headerColor: 'hsl(351deg, 73%, 47%)',
};

ConfirmModalControl.argTypes = actions;

const tabs: Array<TabItem> = [
  {
    id: 'controllers',
    title: 'Controllers',
    content: (
      <div style={{ height: 150, backgroundColor: 'hsl(0deg, 0%, 90%)' }}>
        {new Array(10)
          .fill(`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur ex
        nam temporibus delectus repellendus, dolorem cupiditate molestias
        aliquid illum perspiciatis quis similique perferendis. Expedita beatae
        est nemo corporis cum quam!`)}
      </div>
    ),
  },
  {
    id: 'formatting',
    title: 'Formatting',
    content: (
      <div style={{ height: 50, backgroundColor: 'hsl(0deg, 0%, 90%)' }}>
        Formatting
      </div>
    ),
  },
  {
    id: 'display',
    title: 'Display',
    content: (
      <div style={{ height: 180, backgroundColor: 'hsl(0deg, 0%, 90%)' }}>
        Display
      </div>
    ),
  },
];

export function WithComplexContents({
  onSave,
  ...otherProps
}: {
  onSave: () => void;
}) {
  const [isOpen, open, close] = useOnOff();
  const [state, setState] = useState(tabs[0]);

  return (
    <>
      <DemoPage openModal={open} />
      <Modal isOpen={isOpen} onRequestClose={close} {...otherProps}>
        <Modal.Header>General Settings</Modal.Header>
        <Modal.Body>
          <Tabs
            items={tabs}
            opened={state}
            onClick={setState}
            orientation="vertical"
          />
        </Modal.Body>
        <Modal.Footer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              flex: '1 1 0%',
            }}
          >
            <Button
              onClick={onSave}
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
    </>
  );
}

WithComplexContents.args = {
  width: 800,
  height: 600,
  requestCloseOnBackdrop: true,
  requestCloseOnEsc: true,
};

WithComplexContents.argTypes = actions;

function DemoPage(props: { openModal: () => void }) {
  return (
    <>
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
          <SplitPane initialSize="35%">
            <div style={{ padding: 5 }}>
              <Button
                onClick={props.openModal}
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
    </>
  );
}

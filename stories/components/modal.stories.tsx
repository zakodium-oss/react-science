import { useState } from 'react';
import {
  FaArrowsAlt,
  FaBook,
  FaCogs,
  FaGlasses,
  FaMeteor,
  FaNodeJs,
  FaNpm,
  FaReact,
  FaTabletAlt,
} from 'react-icons/fa';
import { StructureEditor } from 'react-ocl/full';

import {
  Accordion,
  Button,
  ConfirmModal,
  Header,
  Modal,
  SplitPane,
  TabItem,
  Tabs,
  Toolbar,
  useOnOff,
} from '../../src/components';
import { AccordionDecorator } from '../utils';

export default {
  title: 'Components / Modal',
  component: Modal,
  decorators: [AccordionDecorator],
};

const actions = {
  onSave: { action: 'saved' },
  onCancel: { action: 'canceled' },
};

export function Control(props: {
  onSave: () => void;
  onRequestClose: () => void;
}) {
  const [isOpen, open, close] = useOnOff();

  const { onSave, onRequestClose, ...otherProps } = props;
  return (
    <>
      <DemoPage openModal={open} />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          onRequestClose();
          close();
        }}
        {...otherProps}
      >
        <Modal.Header>Hello, World!</Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: 'flex',
              flex: '1 1 0%',
              flexDirection: 'row',
            }}
          >
            <Toolbar vertical>
              <Toolbar.Item title="react" icon={<FaReact />} />
              <Toolbar.Item title="npm" icon={<FaNpm />} />
              <Toolbar.Item title="nodejs" icon={<FaNodeJs />} />
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
            <Button onClick={onSave}>Save</Button>
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
  onRequestClose,
  ...otherProps
}: {
  onSave: () => void;
  onCancel: () => void;
  onRequestClose: () => void;
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
        onRequestClose={() => {
          onRequestClose();
          close();
        }}
        {...otherProps}
      >
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed from our servers forever. This action cannot be
        undone.
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

const tabs: TabItem[] = [
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
  onRequestClose,
  ...otherProps
}: {
  onSave: () => void;
  onRequestClose: () => void;
}) {
  const [isOpen, open, close] = useOnOff();
  const [state, setState] = useState(tabs[0].id);

  return (
    <>
      <DemoPage openModal={open} />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          onRequestClose();
          close();
        }}
        {...otherProps}
      >
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
            <Button onClick={onSave}>Save</Button>
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

export function DynamicallySizedChildren() {
  const [isOpen, open, close] = useOnOff(false);
  return (
    <div style={{ margin: '2em' }}>
      <Button onClick={open}>Open editor modal</Button>
      <Modal width={700} height={500} isOpen={isOpen} onRequestClose={close}>
        <Modal.Header>Test OCL editor in modal</Modal.Header>
        <Modal.Body>
          <StructureEditor width={600} height={400} svgMenu />
        </Modal.Body>
      </Modal>
    </div>
  );
}

DynamicallySizedChildren.storyName = 'With dynamically sized children';

function DemoPage(props: { openModal: () => void }) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header>
          <Toolbar>
            <Toolbar.Item title="Logo" icon={<FaMeteor />} />
          </Toolbar>
          <Toolbar>
            <Toolbar.Item title="User manual" icon={<FaBook />} />
            <Toolbar.Item title="General settings" icon={<FaCogs />} />
            <Toolbar.Item title="Full screen" icon={<FaTabletAlt />} />
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
          <Toolbar vertical>
            <Toolbar.Item title="Glasses" active icon={<FaGlasses />} />
            <Toolbar.Item title="Open in large mode" icon={<FaArrowsAlt />} />
          </Toolbar>
        </div>
        <div
          style={{
            width: '100%',
            height: '300px',
          }}
        >
          <SplitPane size="35%">
            <div style={{ padding: 5 }}>
              <Button onClick={props.openModal}>Open</Button>
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

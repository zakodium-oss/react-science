import { Dialog, DialogBody, DialogFooter, Tab, Tabs } from '@blueprintjs/core';
import styled from '@emotion/styled';
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
import { CanvasMoleculeEditor } from 'react-ocl';

import {
  Accordion,
  Button,
  ConfirmDialog,
  Header,
  SplitPane,
  Toolbar,
  useOnOff,
} from '../../src/components/index.js';
import { AccordionDecorator } from '../utils.js';

export default {
  title: 'Components / Dialog',
  decorators: [AccordionDecorator],
};

const actions = {
  onSave: { action: 'saved' },
  onClose: { action: 'closed' },
  onCancel: { action: 'canceled' },
};

const DialogBodyStyledControl = styled(DialogBody)`
  padding: 0;
  background-color: white;
`;

export function Control(props: { onSave: () => void; onClose: () => void }) {
  const [isOpen, open, close] = useOnOff();

  const { onSave, onClose, ...otherProps } = props;
  return (
    <>
      <DemoPage openDialog={open} />
      <Dialog
        shouldReturnFocusOnClose={false}
        isOpen={isOpen}
        title="Hello, World!"
        icon="info-sign"
        onClose={() => {
          onClose();
          close();
        }}
        style={{ maxWidth: 500, height: 300 }}
        {...otherProps}
      >
        <DialogBodyStyledControl>
          <div
            style={{
              display: 'flex',
              // flex: '1 1 0%',
              flexDirection: 'row',
            }}
          >
            <Toolbar vertical>
              <Toolbar.Item tooltip="react" icon={<FaReact />} />
              <Toolbar.Item tooltip="npm" icon={<FaNpm />} />
              <Toolbar.Item tooltip="nodejs" icon={<FaNodeJs />} />
            </Toolbar>
            <p
              style={{
                padding: 5,
                paddingLeft: 20,
              }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
              accusamus voluptas odit minima amet obcaecati eveniet voluptatibus
              assumenda esse animi id atque natus ipsa sunt iure illo,
              exercitationem voluptates non.
            </p>
          </div>
        </DialogBodyStyledControl>
        <DialogFooter
          actions={<Button intent="primary" text="Save" onClick={onSave} />}
        />
      </Dialog>
    </>
  );
}

Control.args = {
  isCloseButtonShown: true,
  canOutsideClickClose: true,
  canEscapeKeyClose: true,
};

Control.argTypes = actions;

export function ConfirmDialogControl({
  onSave,
  onCancel,
  onClose,
  ...otherProps
}: {
  onSave: () => void;
  onCancel: () => void;
  onClose: () => void;
  headerColor: string;
}) {
  const [isOpen, open, close] = useOnOff();

  return (
    <>
      <DemoPage openDialog={open} />
      <ConfirmDialog
        onConfirm={() => {
          onSave();
          close();
        }}
        onCancel={() => {
          onCancel();
          close();
        }}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          close();
        }}
        {...otherProps}
      >
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed from our servers forever. This action cannot be
        undone.
      </ConfirmDialog>
    </>
  );
}

ConfirmDialogControl.args = {
  canOutsideClickClose: true,
  canEscapeKeyClose: true,
  headerColor: 'hsl(351deg, 73%, 47%)',
};

ConfirmDialogControl.argTypes = actions;

const tabs = [
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

const DialogBodyStyled = styled(DialogBody)`
  max-height: none;
  padding: 0;
  background-color: white;
`;

const TabsStyled = styled(Tabs)`
  height: 100%;

  div[role='tabpanel'] {
    overflow-y: auto;
  }
`;

export function WithComplexContents({
  onSave,
  onClose,
  ...otherProps
}: {
  onSave: () => void;
  onClose: () => void;
}) {
  const [isOpen, open, close] = useOnOff();
  const [state, setState] = useState<number | string>(tabs[0].id);

  return (
    <>
      <DemoPage openDialog={open} />
      <Dialog
        shouldReturnFocusOnClose={false}
        title="General Settings"
        icon="cog"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          close();
        }}
        style={{ width: 800, height: 400 }}
        {...otherProps}
      >
        <DialogBodyStyled>
          <TabsStyled selectedTabId={state} onChange={setState} vertical>
            {tabs.map((tab) => (
              <Tab
                id={tab.id}
                key={tab.id}
                title={tab.title}
                panel={tab.content}
              />
            ))}
          </TabsStyled>
        </DialogBodyStyled>
        <DialogFooter
          actions={<Button intent="primary" text="Save" onClick={onSave} />}
        />
      </Dialog>
    </>
  );
}

WithComplexContents.args = {
  isCloseButtonShown: true,
  canOutsideClickClose: true,
  canEscapeKeyClose: true,
};

WithComplexContents.argTypes = actions;

export function DynamicallySizedChildren() {
  const [isOpen, open, close] = useOnOff(false);
  return (
    <div style={{ padding: '2em' }}>
      <Button intent="warning" onClick={open}>
        Open editor Dialog
      </Button>
      <Dialog
        shouldReturnFocusOnClose={false}
        title="Test OCL editor in Dialog"
        isOpen={isOpen}
        onClose={close}
        style={{ width: 700 }}
      >
        <DialogBodyStyled>
          <CanvasMoleculeEditor width={600} height={400} />
        </DialogBodyStyled>
      </Dialog>
    </div>
  );
}

DynamicallySizedChildren.storyName = 'With dynamically sized children';

function DemoPage(props: { openDialog: () => void }) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header>
          <Toolbar>
            <Toolbar.Item tooltip="Logo" icon={<FaMeteor />} />
          </Toolbar>
          <Toolbar>
            <Toolbar.Item tooltip="User manual" icon={<FaBook />} />
            <Toolbar.Item tooltip="General settings" icon={<FaCogs />} />
            <Toolbar.Item tooltip="Full screen" icon={<FaTabletAlt />} />
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
            <Toolbar.Item tooltip="Glasses" active icon={<FaGlasses />} />
            <Toolbar.Item tooltip="Open in large mode" icon={<FaArrowsAlt />} />
          </Toolbar>
        </div>
        <div
          style={{
            width: '100%',
            height: '300px',
          }}
        >
          <SplitPane defaultSize="35%">
            <div style={{ padding: 5 }}>
              <Button intent="primary" onClick={props.openDialog}>
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
                <Accordion.Item id="spectra" title="Spectra" defaultOpen>
                  <p style={{ padding: 5 }}>Spectra lorem</p>
                </Accordion.Item>
                <Accordion.Item id="integral" title="Integral">
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

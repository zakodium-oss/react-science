/** @jsxImportSource @emotion/react */
import { Dialog, DialogBody, DialogFooter, Tabs, Tab } from '@blueprintjs/core';
import { css } from '@emotion/react';
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
  ConfirmDialog,
  Header,
  SplitPane,
  Toolbar,
  useOnOff,
} from '../../src/components';
import { AccordionDecorator } from '../utils';

export default {
  title: 'Components / Dialog',
  decorators: [AccordionDecorator],
};

const actions = {
  onSave: { action: 'saved' },
  onClose: { action: 'closed' },
  onCancel: { action: 'canceled' },
};

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
        <DialogBody
          css={css`
            padding: 0;
            background-color: white;
          `}
        >
          <div
            style={{
              display: 'flex',
              // flex: '1 1 0%',
              flexDirection: 'row',
            }}
          >
            <Toolbar vertical>
              <Toolbar.Item hoverContent="react" icon={<FaReact />} />
              <Toolbar.Item hoverContent="npm" icon={<FaNpm />} />
              <Toolbar.Item hoverContent="nodejs" icon={<FaNodeJs />} />
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
        </DialogBody>
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
        <DialogBody
          css={css({
            maxHeight: 'none',
            padding: 0,
            backgroundColor: 'white',
          })}
        >
          <Tabs
            selectedTabId={state}
            onChange={setState}
            vertical
            css={css`
              height: 100%;
              div[role='tabpanel'] {
                overflow-y: auto;
              }
            `}
          >
            {tabs.map((tab) => (
              <Tab
                id={tab.id}
                key={tab.id}
                title={tab.title}
                panel={tab.content}
              />
            ))}
          </Tabs>
        </DialogBody>
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
        <DialogBody
          css={css({
            maxHeight: 'none',
            padding: 1,
            backgroundColor: 'white',
          })}
        >
          <StructureEditor width={600} height={400} svgMenu />
        </DialogBody>
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
            <Toolbar.Item hoverContent="Logo" icon={<FaMeteor />} />
          </Toolbar>
          <Toolbar>
            <Toolbar.Item hoverContent="User manual" icon={<FaBook />} />
            <Toolbar.Item hoverContent="General settings" icon={<FaCogs />} />
            <Toolbar.Item hoverContent="Full screen" icon={<FaTabletAlt />} />
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
            <Toolbar.Item hoverContent="Glasses" active icon={<FaGlasses />} />
            <Toolbar.Item
              hoverContent="Open in large mode"
              icon={<FaArrowsAlt />}
            />
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

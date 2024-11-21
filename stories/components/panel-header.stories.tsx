/** @jsxImportSource @emotion/react */
import type { PanelProps } from '@blueprintjs/core';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  PanelStack2,
} from '@blueprintjs/core';
import { css } from '@emotion/react';

import {
  Accordion,
  Button,
  PanelHeader,
  PanelPreferencesToolbar,
  Toolbar,
  useOnOff,
} from '../../src/components/index.js';

export default {
  title: 'Components / PanelHeader',
  component: PanelHeader,
};

export function Basic() {
  return (
    <div
      style={{
        height: 300,
      }}
    >
      <PanelHeader total={3} onClickSettings={() => void 0}>
        <Toolbar>
          <Toolbar.Item intent="danger" icon="trash" />
          <Toolbar.Item icon="filter" />
          <Toolbar.Item icon="plus" />
        </Toolbar>
      </PanelHeader>
    </div>
  );
}
export function WithDialog() {
  const [isOpen, open, close] = useOnOff();
  return (
    <div
      style={{
        height: 300,
      }}
    >
      <PanelHeader total={5} current={3} onClickSettings={open}>
        <Toolbar>
          <Toolbar.Item intent="danger" icon="trash" />
          <Toolbar.Item icon="filter" />
          <Toolbar.Item icon="plus" />
        </Toolbar>
      </PanelHeader>
      <Dialog
        shouldReturnFocusOnClose={false}
        title="Settings"
        icon="cog"
        isOpen={isOpen}
        onClose={close}
      >
        <DialogBody>
          <p style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
            accusamus voluptas odit minima amet obcaecati eveniet voluptatibus
            assumenda esse animi id atque natus ipsa sunt iure illo,
            exercitationem voluptates non.
          </p>
        </DialogBody>
        <DialogFooter
          actions={<Button intent="primary" text="Save" onClick={close} />}
        />
      </Dialog>
    </div>
  );
}
export function WithAccordion() {
  return (
    <div
      style={{
        height: 300,
      }}
    >
      <Accordion>
        <Accordion.Item title="First Item" defaultOpened>
          <PanelHeader total={20} onClickSettings={() => void 0}>
            <Toolbar>
              <Toolbar.Item intent="danger" icon="trash" />
              <Toolbar.Item icon="filter" />
              <Toolbar.Item icon="plus" />
            </Toolbar>
          </PanelHeader>
          This is the first content
        </Accordion.Item>
        <Accordion.Item title="Second Item">
          <PanelHeader current={2} total={3} onClickSettings={() => void 0}>
            <Button minimal icon="filter" />
          </PanelHeader>
          This is the content of the second item
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
function InitialPanel({ openPanel }: PanelProps<PanelInfo>) {
  return (
    <PanelHeader total={20} onClickSettings={() => void 0}>
      <Toolbar>
        <Toolbar.Item
          intent="danger"
          icon="trash"
          onClick={() =>
            openPanel({
              props: {
                content: 'Panel1',
                title: 'Panel1',
              },
              renderPanel: PanelContainer,
              title: 'Panel 1',
            })
          }
        />
        <Toolbar.Item
          onClick={() =>
            openPanel({
              props: {
                content: `Panel2 ................................................
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
                        dignissimos fugit porro debitis cupiditate similique quam exercitationem
                        natus hic delectus iste inventore itaque, dolorum eveniet ipsa sapiente
                        voluptatibus a ipsam. Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Repellendus dignissimos fugit porro debitis cupiditate similique
                        quam exercitationem natus hic delectus iste inventore itaque, dolorum
                        eveniet ipsa sapiente voluptatibus a ipsam. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Repellendus dignissimos fugit porro debitis
                        cupiditate similique quam exercitationem natus hic delectus iste inventore
                        itaque, dolorum eveniet ipsa sapiente voluptatibus a ipsam. Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Repellendus dignissimos fugit
                        porro debitis cupiditate similique quam exercitationem natus hic delectus
                        iste inventore itaque, dolorum eveniet ipsa sapiente voluptatibus a ipsam.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
                        dignissimos fugit porro debitis cupiditate similique quam exercitationem
                        natus hic delectus iste inventore itaque, dolorum eveniet ipsa sapiente
                        voluptatibus a ipsam. Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Repellendus dignissimos fugit porro debitis cupiditate similique',`,
                title: 'Panel 2',
              },
              renderPanel: PanelContainer,
              title: 'Panel 2',
            })
          }
          icon="filter"
        />
        <Toolbar.Item
          onClick={() =>
            openPanel({
              props: {
                content: 'Panel3',
                title: 'Panel3',
              },
              renderPanel: PanelContainer,
              title: 'Panel 3',
            })
          }
          icon="plus"
        />
      </Toolbar>
    </PanelHeader>
  );
}
interface PanelInfo {
  content?: string;
  title?: string;
}
function PanelContainer({
  content = 'Panel',
  title = 'Panel',
  closePanel,
}: PanelProps<PanelInfo>) {
  return (
    <div>
      <PanelPreferencesToolbar
        title={title}
        onClose={closePanel}
        onSave={closePanel}
      />
      <div style={{ width: '100%', backgroundColor: 'grey' }}>{content}</div>
    </div>
  );
}

export function WithAccordionPanelToolbarStackedPanel() {
  return (
    <div
      style={{
        height: 300,
      }}
    >
      <Accordion>
        <Accordion.Item title="First Item" defaultOpened>
          <PanelStack2
            css={css`
              height: 100%;
            `}
            initialPanel={{
              renderPanel: InitialPanel,
            }}
            showPanelHeader={false}
            renderActivePanelOnly={false}
          />
        </Accordion.Item>
        <Accordion.Item title="Second Item">
          <PanelHeader current={2} total={3} onClickSettings={() => void 0}>
            <Button minimal icon="filter" />
          </PanelHeader>
          This is the content of the second item
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

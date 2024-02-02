import { PanelProps } from '@blueprintjs/core';

import {
  InfoPanel as InfoPanelComponent,
  InfoPanelData,
  StackedPanel as StackedPanelComponent,
  Toolbar,
} from '../../src/components';

export default {
  title: 'Components / Panels',
};
const data: InfoPanelData[] = [
  {
    description: 'Custom information',
    data: {
      prop5: 'field5',
      __field4__: 'value4',
      field1: 'value1',
      field2: 'value2',
      fie: 'value3',
    },
  },
  {
    description: 'Spectrum information',
    data: {
      frequency: '400 MHz',
      solvent: 'CDCl3',
      isFi: false,
      temperature: 0,
    },
  },
];

export function InfoPanel() {
  return (
    <div style={{ width: 500 }}>
      <InfoPanelComponent data={data} />
    </div>
  );
}

const actions = {
  onSave: { action: 'saved' },
  onClose: { action: 'closed' },
};

export function StackedPanel({
  onSave,
  onClose,
  ...props
}: {
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        height: 300,
        width: 500,
        border: '1px solid black',
      }}
    >
      <StackedPanelComponent {...props}>
        {({ openConfirmPanel, closePanel }) => (
          <Toolbar>
            <Toolbar.Item
              noTooltip
              title="trash"
              intent="danger"
              icon="trash"
              onClick={() =>
                openConfirmPanel({
                  renderPanel: () => <div>Panel1</div>,
                  onSave: () => {
                    onSave();
                    closePanel();
                  },
                  onClose,
                  title: 'Panel 1',
                })
              }
            />
            <Toolbar.Item
              onClick={() =>
                openConfirmPanel({
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
                  },
                  renderPanel: ({
                    content,
                  }: PanelProps<{
                    content?: string;
                  }>) => <div>Panel2 {content}</div>,
                  onSave,
                  onClose,
                  title: 'Panel 2',
                })
              }
              noTooltip
              title="filter"
              icon="filter"
            />
            <Toolbar.Item
              onClick={() =>
                openConfirmPanel({
                  renderPanel: () => <div>Panel3</div>,
                  onSave,
                  onClose,
                  title: 'Panel 3',
                })
              }
              noTooltip
              title="plus"
              icon="plus"
            />
          </Toolbar>
        )}
      </StackedPanelComponent>
    </div>
  );
}

StackedPanel.args = {
  showPanelHeader: false,
  renderActivePanelOnly: false,
};

StackedPanel.argTypes = actions;

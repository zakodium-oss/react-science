/** @jsxImportSource @emotion/react */
import {
  Panel,
  PanelStack2,
  PanelProps as StackPanelProps,
  PanelStack2Props,
} from '@blueprintjs/core';
import { css } from '@emotion/react';
import { FC } from 'react';

import { PanelPreferencesToolbar } from '../index';

interface ConfirmPanelActions {
  onSave?: () => void;
  onClose?: () => void;
}
interface PanelProps<T extends Panel<object>> {
  openConfirmPanel: (NewPanel: T & ConfirmPanelActions) => void;
  closePanel: () => void;
}
interface StackedPanelProps<T extends Panel<object>>
  extends PanelStack2Props<T> {
  children: FC<PanelProps<T>>;
}

function ConfirmPanel<T extends object>({
  closePanel,
  children,
  onSave = closePanel,
  onClose,
  title = '',
}: StackPanelProps<T> &
  ConfirmPanelActions & {
    children?: React.ReactNode;
    title?: React.ReactNode;
  }) {
  return (
    <div>
      <PanelPreferencesToolbar
        title={title}
        onClose={() => {
          onClose?.();
          closePanel();
        }}
        onSave={onSave}
      />
      {children}
    </div>
  );
}
export function StackedPanel<T extends Panel<object>>(
  props: StackedPanelProps<T>,
) {
  const { children: InitialPanel, ...panelStackProps } = props;
  const initialPanel = {
    renderPanel: ({ openPanel, closePanel }) => (
      <InitialPanel
        openConfirmPanel={({
          renderPanel,
          title,
          onSave,
          onClose,
          ...others
        }) =>
          openPanel({
            renderPanel: (props) => (
              <ConfirmPanel
                title={title}
                onSave={onSave}
                onClose={onClose}
                {...props}
              >
                {renderPanel(props)}
              </ConfirmPanel>
            ),
            title,
            ...others,
          })
        }
        closePanel={closePanel}
      />
    ),
    title: 'Panel Init',
  } as T;

  return (
    <PanelStack2<T>
      css={css`
        height: 100%;
      `}
      initialPanel={initialPanel}
      showPanelHeader={false}
      renderActivePanelOnly={false}
      {...panelStackProps}
    />
  );
}

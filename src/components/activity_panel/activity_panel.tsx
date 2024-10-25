import { Card, Colors } from '@blueprintjs/core';
import { type ReactNode } from 'react';

import { Button } from '../button/index.js';

export interface ActivityPanelProps {
  children: ReactNode;
}

export interface ActivityPanelItemProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function ActivityPanel(props: ActivityPanelProps) {
  const { children } = props;

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.LIGHT_GRAY5,
        gap: '5px',
      }}
    >
      {children}
    </div>
  );
}

export function ActivityPanelItem(props: ActivityPanelItemProps) {
  const { title, children, onClose } = props;

  return (
    <Card
      key={title}
      style={{
        padding: '10px',
        flexGrow: 1,
        display: 'flex',
        backgroundColor: Colors.WHITE,
        flexDirection: 'column',
        borderRadius: 0,
      }}
      elevation={0}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #ddd',
          paddingBottom: '8px',
          marginBottom: '8px',
        }}
      >
        <div>{title}</div>
        <Button minimal icon="cross" onClick={onClose} />
      </div>

      <div style={{ flexGrow: 1 }}>{children}</div>
    </Card>
  );
}

ActivityPanel.Item = ActivityPanelItem;

import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import { Button } from '../button/index.js';
import {
  PanelItemHeader,
  PanelItemTitle,
  PanelItemTitleLabel,
} from '../utils/panel_item_header.js';

export interface ActivityPanelProps {
  children: ReactNode;
}

export interface ActivityPanelItemProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const PanelContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-width: 0;
  background-color: ${Colors.LIGHT_GRAY5};
  gap: 1px;
  border-left: 1px solid ${Colors.LIGHT_GRAY4};
`;

const PanelItemContainer = styled.div`
  flex-grow: 1;
  display: flex;
  min-width: 0;
  background-color: ${Colors.WHITE};
  flex-direction: column;
`;

const PanelItemContent = styled.div`
  flex-grow: 1;
  padding: 8px;
`;

export function ActivityPanel(props: ActivityPanelProps) {
  const { children } = props;

  return <PanelContainer>{children}</PanelContainer>;
}

export function ActivityPanelItem(props: ActivityPanelItemProps) {
  const { title, children, onClose } = props;

  return (
    <PanelItemContainer>
      <PanelItemHeader>
        <PanelItemTitle>
          <PanelItemTitleLabel>{title}</PanelItemTitleLabel>
        </PanelItemTitle>
        <Button variant="minimal" icon="cross" onClick={onClose} />
      </PanelItemHeader>

      <PanelItemContent>{children}</PanelItemContent>
    </PanelItemContainer>
  );
}

ActivityPanel.Item = ActivityPanelItem;

import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import { Button } from '../button/index.js';

const PADDING_LG = 8;
const PADDING_SM = 4;

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
  background-color: ${Colors.LIGHT_GRAY5};
  gap: 1px;
  border-left: 1px solid ${Colors.LIGHT_GRAY4};
`;

const PanelItemContainer = styled.div`
  flex-grow: 1;
  display: flex;
  background-color: ${Colors.WHITE};
  flex-direction: column;
`;

const PanelItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${PADDING_SM}px ${PADDING_LG}px ${PADDING_SM}px ${PADDING_LG}px;
  background-color: ${Colors.LIGHT_GRAY4};
`;

const PanelItemContent = styled.div`
  flex-grow: 1;
  padding: ${PADDING_LG}px;
`;

const PanelItemTitle = styled.div`
  color: ${Colors.DARK_GRAY5};
  font-weight: bold;
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
        <PanelItemTitle>{title}</PanelItemTitle>
        <Button variant="minimal" icon="cross" onClick={onClose} />
      </PanelItemHeader>

      <PanelItemContent>{children}</PanelItemContent>
    </PanelItemContainer>
  );
}

ActivityPanel.Item = ActivityPanelItem;

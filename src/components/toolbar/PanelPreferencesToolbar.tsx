import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import { Toolbar } from './Toolbar.js';

interface PanelPreferencesToolbarProps {
  title?: ReactNode;
  onClose?: () => void;
  onSave?: () => void;
}

const PanelPreferencesToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(240 240 240);
`;

const PanelPreferencesToolbarTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 12px;
  font-weight: 500;
`;

const PanelPreferencesToolbarContent = styled.div`
  display: flex;
  flex-direction: row-reverse;

  & > button {
    padding: 0 0 0 9px;
    min-width: auto;
  }
`;

export function PanelPreferencesToolbar(props: PanelPreferencesToolbarProps) {
  const { title = '', onClose, onSave } = props;

  return (
    <PanelPreferencesToolbarContainer>
      <PanelPreferencesToolbarTitle>{title}</PanelPreferencesToolbarTitle>
      <PanelPreferencesToolbarContent>
        <Toolbar>
          {onClose && (
            <Toolbar.Item onClick={onClose} intent="danger" icon="cross" />
          )}
          {onSave && (
            <Toolbar.Item onClick={onSave} intent="success" icon="tick" />
          )}
        </Toolbar>
      </PanelPreferencesToolbarContent>
    </PanelPreferencesToolbarContainer>
  );
}

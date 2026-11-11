import { Classes, Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';

/** Height of a panel header, border included. */
export const PANEL_ITEM_HEADER_HEIGHT = 30;

/**
 * Buttons in a header are smaller than the 30px Blueprint default, which alone
 * would be taller than the header.
 */
const HEADER_BUTTON_SIZE = 24;

/**
 * Header shared by the collapsible panels (`Accordion.Item`) and the fixed
 * ones (`ActivityPanel.Item`), so that a column mixing both looks uniform.
 */
export const PanelItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: ${PANEL_ITEM_HEADER_HEIGHT}px;
  min-width: 0;
  padding: 0 4px 0 8px;
  background-color: ${Colors.LIGHT_GRAY4};
  border-bottom: 1px solid ${Colors.LIGHT_GRAY2};
  user-select: none;

  .${Classes.BUTTON} {
    min-height: ${HEADER_BUTTON_SIZE}px;
    min-width: ${HEADER_BUTTON_SIZE}px;
  }
`;

export const PanelItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  font-weight: bold;
  color: ${Colors.DARK_GRAY5};
`;

/** Keeps a long title on one line so the header height never changes. */
export const PanelItemTitleLabel = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

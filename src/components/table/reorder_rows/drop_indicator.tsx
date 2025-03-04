import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';
import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';

export interface TableDropIndicatorProps {
  /**
   * The edge (top or bottom) on which to render the drop indicator
   * with respect to the nearest relatively positioned element.
   */
  edge: Edge;
}

/**
 * An absolutely positioned line which indicates where a dragged item will
 * be dropped.
 *
 */
export const TableDropIndicator = styled.div<TableDropIndicatorProps>`
  position: absolute;
  z-index: 1;
  background-color: ${Colors.BLUE3};
  height: 2px;
  inset: ${(props) =>
    `${props.edge === 'top' ? '-1px' : 'initial'} 0 ${props.edge === 'bottom' ? '-1px' : 'initial'} 0`};
  pointer-events: none;
`;

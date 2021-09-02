/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React, { ReactNode } from 'react';

import { ToolbarProvider, useToolbarContext } from './context/ToolbarContext';

export type ToolbarOrientation = 'vertical' | 'horizontal';

export interface ToolbarProps {
  orientation: ToolbarOrientation;
  children: Array<React.ReactElement<ToolbarItemProps>>;
}

export interface ToolbarItemProps {
  id: string;
  title: string;
  active: boolean;
  children: ReactNode;

  onClick: (item: ToolbarItemProps) => void;
}

const size = '30px';
const border = '1px solid rgb(247, 247, 247)';

const styles: Record<
  'toolbar' | 'item' | 'tooltip',
  (object: any) => SerializedStyles
> = {
  toolbar: (orientation: ToolbarOrientation) => {
    if (orientation === 'vertical') {
      return css`
        display: flex;
        flex-direction: column;
        max-width: ${size};
        min-height: 100%;
        border-right: '${border};
      `;
    }
    return css`
      display: flex;
      flex-direction: row;
      max-height: ${size};
      min-width: 100%;
      border-bottom: ${border};
    `;
  },
  item: (active: boolean) => {
    return css`
      width: ${size};
      height: ${size};
      outline: none;
      background-color: ${active ? 'rgb(247, 247, 247)' : 'transparent'};
      &:hover + .content {
        display: flex;
      }
    `;
  },
  tooltip: (orientation: ToolbarOrientation) => {
    return css`
      display: none;
      position: absolute;
      background-color: gray;
      border-radius: 2px;
      color: white;
      white-space: nowrap;
      font-size: 10px;
      font-family: tahoma;
      bottom: 0px;
      right: 0px;
      width: 100%;
      height: 50%;
      top: ${orientation === 'horizontal' ? '100%' : '0px'};
      left: ${orientation === 'horizontal' ? '0px' : '100%'};
      ${orientation === 'vertical' && 'margin: auto;'}
    `;
  },
};

export function Toolbar(props: ToolbarProps) {
  const { children, orientation } = props;

  return (
    <div css={styles.toolbar(orientation)}>
      <ToolbarProvider orientation={orientation}>{children}</ToolbarProvider>
    </div>
  );
}

Toolbar.Item = function ToolbarItem(props: ToolbarItemProps) {
  const orientation = useToolbarContext();
  const { active, children, onClick, title } = props;

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        css={styles.item(active)}
        onClick={() => onClick(props)}
      >
        {children}
      </button>
      <div className="content" css={styles.tooltip(orientation)}>
        <span style={{ display: 'flex', margin: 'auto' }}>{title}</span>
      </div>
    </div>
  );
};

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

import { ToolbarProvider, useToolbarContext } from './context/ToolbarContext';

export type ToolbarOrientation = 'vertical' | 'horizontal';

export interface ToolbarProps {
  orientation: ToolbarOrientation;
  children:
    | Array<React.ReactElement<ToolbarItemProps>>
    | React.ReactElement<ToolbarItemProps>;
}

export interface ToolbarItemProps {
  id: string;
  title: string;
  children: ReactNode;

  active?: boolean;
  onClick?: (item: ToolbarItemProps) => void;
}

const size = '30px';
const border = '1px solid rgb(247, 247, 247)';

const styles = {
  toolbar: (orientation: ToolbarOrientation) => {
    return css([
      { display: 'flex' },
      orientation === 'vertical'
        ? {
            flexDirection: 'column',
            maxWidth: size,
            minHeight: '100%',
            borderRight: border,
          }
        : {
            flexDirection: 'row',
            maxHeight: size,
            minWidth: '100%',
            borderBottom: border,
          },
    ]);
  },
  item: (active: boolean) => {
    return css([
      active && { backgroundColor: 'rgb(247, 247, 247)' },
      {
        width: size,
        height: size,
        outline: 'none',
        '&:hover + .content': { display: 'flex' },
      },
    ]);
  },
  tooltip: (orientation: ToolbarOrientation) => {
    return css([
      {
        display: 'none',
        position: 'absolute',
        backgroundColor: 'gray',
        borderRadius: '2px',
        color: 'white',
        fontFamily: 'tahoma',
        bottom: '0px',
        right: '0px',
        width: '100%',
        height: '50%',
        fontSize: '10px',
        whiteSpace: 'nowrap',
      },
      orientation === 'vertical' && { margin: 'auto' },
      orientation === 'horizontal'
        ? { top: '100%', left: '0px' }
        : { top: '0px', left: '100%' },
    ]);
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
  const { active = false, children, onClick, title } = props;

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        css={styles.item(active)}
        onClick={() => {
          if (onClick) {
            onClick(props);
          }
        }}
      >
        {children}
      </button>
      <div className="content" css={styles.tooltip(orientation)}>
        <span
          style={{ display: 'flex', margin: 'auto', justifyContent: 'center' }}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

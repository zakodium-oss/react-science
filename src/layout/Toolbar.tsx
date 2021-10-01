/** @jsxImportSource @emotion/react */
import { css, CSSObject } from '@emotion/react';
import React, { ReactFragment, ReactNode } from 'react';

import { ToolbarProvider, useToolbarContext } from './context/ToolbarContext';

export type ToolbarOrientation = 'vertical' | 'horizontal';
export type ToolbarItemOrientation = 'vertical' | 'horizontal' | 'auto';

export interface ToolbarProps {
  orientation: ToolbarOrientation;
  children?:
    | Array<React.ReactElement<ToolbarItemProps>>
    | React.ReactElement<ToolbarItemProps>
    | ReactFragment
    | boolean
    | null;
}

export interface ToolbarItemProps {
  id: string;
  title: string;
  children: ReactNode;

  active?: boolean;
  titleOrientation?: ToolbarItemOrientation;
  onClick?: (item: ToolbarItemProps) => void;
  className?: string;
}

const border = '1px solid rgb(247, 247, 247)';

const styles = {
  toolbar: (orientation: ToolbarOrientation) => {
    return css([
      { display: 'flex' },
      orientation === 'vertical'
        ? {
            flexDirection: 'column',
            minHeight: '100%',
            borderRight: border,
          }
        : {
            flexDirection: 'row',
            minWidth: '100%',
          },
    ]);
  },
  item: (active: boolean) => {
    return css([
      active && { backgroundColor: 'rgb(247, 247, 247)', borderRadius: 5 },
      {
        width: 30,
        height: 30,
        outline: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        '&:hover + .content': { display: 'flex' },
      },
    ]);
  },
  tooltip: (
    orientation: ToolbarOrientation,
    itemOrientation: ToolbarItemOrientation,
  ) => {
    const common: CSSObject = {
      display: 'none',
      position: 'absolute',
      backgroundColor: 'gray',
      borderRadius: '2px',
      color: 'white',
      bottom: '0px',
      right: '0px',
      width: 'fit-content',
      height: '50%',
      fontSize: '10px',
      whiteSpace: 'nowrap',
      paddingLeft: '3px',
      paddingRight: '3px',
      zIndex: 50,
    };

    if (itemOrientation === 'auto') {
      return css([
        common,
        orientation === 'vertical' && { margin: 'auto', marginLeft: 5 },
        orientation === 'horizontal'
          ? { top: '100%' }
          : { top: '0px', left: '100%' },
      ]);
    } else {
      return css([
        common,
        itemOrientation === 'horizontal' && { margin: 'auto', marginLeft: 5 },
        itemOrientation === 'vertical'
          ? { top: '100%' }
          : { top: '0px', left: '100%' },
      ]);
    }
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
  const {
    active = false,
    children,
    onClick,
    title,
    titleOrientation = 'auto',
    id,
    ...other
  } = props;

  return (
    <div style={{ position: 'relative', margin: 4 }} {...other}>
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
      <div
        className="content"
        css={styles.tooltip(orientation, titleOrientation)}
      >
        <span
          style={{
            display: 'flex',
            margin: 'auto',
            justifyContent: 'center',
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

import React, { ReactNode, CSSProperties, useState } from 'react';

import { SideBarProvider, useSideBarContext } from './context/SideBarContext';

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

const size = 30;
const border = '1px solid rgb(247, 247, 247)';
const styles: Record<'toolbar' | 'item' | 'tooltip', CSSProperties> = {
  toolbar: {
    display: 'flex',
  },
  item: {
    width: size,
    height: size,
    outline: 'none',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'gray',
    borderRadius: '2px',
    color: 'white',
    whiteSpace: 'nowrap',
    fontSize: '10px',
    fontFamily: 'tahoma',
  },
};

export function Toolbar(props: ToolbarProps) {
  const { children, orientation } = props;

  return (
    <div
      style={{
        ...styles.toolbar,
        ...(orientation === 'vertical'
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
            }),
      }}
    >
      <SideBarProvider initialState={{ orientation }}>
        {children}
      </SideBarProvider>
    </div>
  );
}

Toolbar.Item = function ToolbarItem(props: ToolbarItemProps) {
  const [{ orientation }] = useSideBarContext();
  const [show, setShow] = useState(false);

  const { active, children, onClick, title } = props;

  function mouseOverHandler() {
    setShow(true);
  }

  function mouseLeaveHandler() {
    setShow(false);
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        style={{
          ...styles.item,
          ...(active === true ? { backgroundColor: 'rgb(247, 247, 247)' } : {}),
        }}
        type="button"
        onClick={() => onClick(props)}
        onMouseOver={mouseOverHandler}
        onMouseOut={mouseLeaveHandler}
      >
        {children}
      </button>
      {show && (
        <div
          style={{
            display: 'flex',
            ...styles.tooltip,
            ...getCustomStyle(orientation),
          }}
        >
          <span style={{ display: 'flex', margin: 'auto' }}>{title}</span>
        </div>
      )}
    </div>
  );
};

function getCustomStyle(
  orientation: ToolbarOrientation = 'horizontal',
): CSSProperties {
  if (orientation === 'horizontal') {
    return {
      top: '100%',
      bottom: '0px',
      left: '0px',
      right: '0px',
      width: '100%',
      height: '50%',
    };
  }

  return {
    top: '0px',
    bottom: '0px',
    left: '100%',
    right: '0px',

    margin: 'auto',
    width: '100%',
    height: '50%',
  };
}

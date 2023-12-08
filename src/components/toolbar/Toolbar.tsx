/** @jsxImportSource @emotion/react */
import { ButtonGroup, Classes, Colors, Intent } from '@blueprintjs/core';
import { css } from '@emotion/react';
import { ReactElement, ReactNode, useMemo } from 'react';

import { Button, ButtonProps } from '../index';

import {
  ToolbarContext,
  toolbarContext,
  useToolbarContext,
} from './toolbarContext';

export interface ToolbarProps {
  vertical?: boolean;
  large?: boolean;
  intent?: Intent;
  disabled?: boolean;
  children?:
    | Array<ReactElement<ToolbarItemProps>>
    | ReactElement<ToolbarItemProps>
    | Iterable<ReactNode>
    | boolean
    | null;
}

export interface ToolbarItemProps {
  id?: string;
  title: string;
  icon: ButtonProps['icon'];
  active?: boolean;
  onClick?: (item: ToolbarItemProps) => void;
  className?: string;
}

const border = '1px solid rgb(247, 247, 247)';

export function Toolbar(props: ToolbarProps) {
  const { children, disabled, intent, large, vertical } = props;

  const contextValue = useMemo(
    () => ({ intent, large, vertical, disabled }),
    [intent, large, vertical, disabled],
  );

  return (
    <ToolbarProvider value={contextValue}>
      <ButtonGroup
        vertical={vertical}
        large={large}
        style={{
          flexWrap: 'wrap',
          borderRight: vertical ? border : undefined,
        }}
      >
        {children}
      </ButtonGroup>
    </ToolbarProvider>
  );
}

Toolbar.Item = function ToolbarItem(props: ToolbarItemProps) {
  const { active = false, icon, onClick, title, id, ...other } = props;

  const { intent, large, vertical, disabled } = useToolbarContext();
  return (
    <Button
      minimal
      disabled={disabled}
      css={css`
        .${Classes.ICON} {
          color: ${Colors.DARK_GRAY3};
        }
        position: relative;
        font-size: 1.25em;
      `}
      intent={intent}
      type="button"
      active={active}
      icon={icon}
      onClick={() => {
        onClick?.(props);
      }}
      tooltipProps={{
        content: title,
        placement: vertical ? 'right' : 'bottom',
        intent,
        compact: !large,
        targetProps: { style: { flex: 'none' } },
      }}
      {...other}
    />
  );
};

function ToolbarProvider(props: {
  value: ToolbarContext;
  children: ReactNode;
}) {
  return (
    <toolbarContext.Provider value={props.value}>
      {props.children}
    </toolbarContext.Provider>
  );
}

import {
  Button,
  ButtonGroup,
  ButtonProps,
  Classes,
  Colors,
  Intent,
  Tooltip,
} from '@blueprintjs/core';
import { ClassNames } from '@emotion/react';
import { ReactElement, ReactNode, useMemo } from 'react';

import {
  ToolbarContext,
  toolbarContext,
  useToolbarContext,
} from './toolbarContext';

export interface ToolbarProps {
  vertical?: boolean;
  minimal?: boolean;
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
  const { children, disabled, intent, large, vertical, minimal } = props;

  const contextValue = useMemo(
    () => ({ intent, large, vertical, disabled }),
    [intent, large, vertical, disabled],
  );
  return (
    <ToolbarProvider value={contextValue}>
      <ButtonGroup
        minimal={minimal}
        vertical={vertical}
        large={large}
        style={{ flexWrap: 'wrap', borderRight: vertical ? border : undefined }}
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
    <ClassNames>
      {({ css }) => (
        <Tooltip
          className={css`
            flex-grow: 0 !important;
          `}
          compact={!large}
          intent={intent}
          content={title}
          position="bottom"
          placement={vertical ? 'right' : 'bottom'}
        >
          <Button
            disabled={disabled}
            className={css`
              .${Classes.ICON} {
                color: ${Colors.DARK_GRAY1};
              }
            `}
            intent={intent}
            style={{ position: 'relative', fontSize: '1.25em' }}
            type="button"
            active={active}
            icon={icon}
            onClick={() => {
              if (onClick) {
                onClick(props);
              }
            }}
            {...other}
          />
        </Tooltip>
      )}
    </ClassNames>
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

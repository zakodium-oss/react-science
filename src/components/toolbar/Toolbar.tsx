/** @jsxImportSource @emotion/react */
import { ButtonGroup, Classes, Colors, Intent } from '@blueprintjs/core';
import { css } from '@emotion/react';
import {
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

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
  intent?: Intent;
}

const border = '1px solid rgb(247, 247, 247)';

export function Toolbar(props: ToolbarProps) {
  const { children, disabled, intent, large, vertical } = props;

  const contextValue = useMemo(
    () => ({ intent, large, vertical, disabled }),
    [intent, large, vertical, disabled],
  );
  const ref = useRef<HTMLDivElement>(null);

  // Work around wrong width on vertical flex when wrapping
  // In Chrome: recently fixed (https://bugs.chromium.org/p/chromium/issues/detail?id=507397)
  // In Firefox: work-around needed (https://bugzilla.mozilla.org/show_bug.cgi?id=995020)
  // In Safari: work-around needed
  useLayoutEffect(() => {
    if (!vertical) {
      return;
    }

    function update() {
      const lastElement = ref.current?.lastElementChild;
      if (!lastElement) {
        return;
      }
      ref.current.style.width = 'initial';
      const divRect = ref.current.getBoundingClientRect();
      const lastElemRect = lastElement.getBoundingClientRect();
      const width = `${lastElemRect.right - divRect.left}px`;
      if (ref.current.style.width !== width) {
        ref.current.style.width = width;
      }
    }

    const element = ref.current;
    if (element) {
      const observer = new ResizeObserver(update);
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [vertical]);

  return (
    <ToolbarProvider value={contextValue}>
      <ButtonGroup
        ref={ref}
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
  const {
    active = false,
    icon,
    onClick,
    title,
    id,
    intent: itemIntent,
    ...other
  } = props;

  const {
    intent: toolbarIntent,
    large,
    vertical,
    disabled,
  } = useToolbarContext();
  const intent = itemIntent || toolbarIntent;
  return (
    <Button
      minimal
      disabled={disabled}
      css={css`
        .${Classes.ICON} {
          color: ${Colors.DARK_GRAY3};
        }
      `}
      intent={intent}
      style={{ position: 'relative', fontSize: '1.25em', width: 'auto' }}
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

/** @jsxImportSource @emotion/react */
import {
  ButtonGroup,
  Classes,
  Colors,
  Intent,
  Popover,
  PopoverProps,
} from '@blueprintjs/core';
import { IconName } from '@blueprintjs/icons';
import { css } from '@emotion/react';
import {
  cloneElement,
  JSX,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import { Button } from '../index';

import {
  ToolbarContext,
  toolbarContext,
  useToolbarContext,
} from './toolbarContext';

interface ToolbarBaseProps {
  intent?: Intent;
  disabled?: boolean;
}
export interface ToolbarProps extends ToolbarBaseProps {
  vertical?: boolean;
  large?: boolean;
  children?:
    | Array<ReactElement<ToolbarItemProps>>
    | ReactElement<ToolbarItemProps>
    | Iterable<ReactNode>
    | boolean
    | null;
}

export interface ToolbarItemProps extends ToolbarBaseProps {
  id?: string;
  title: string;
  icon: IconName | JSX.Element;
  active?: boolean;
  onClick?: (item: ToolbarItemProps) => void;
  className?: string;
  noTooltip?: boolean;
  isPopover?: boolean;
}

export interface ToolbarPopoverItemProps extends PopoverProps {
  itemProps: ToolbarItemProps;
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
        // Reset because of layout effect above
        // TODO: remove once the workaround is no longer needed
        key={String(vertical)}
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
    disabled: itemDisabled,
    noTooltip = false,
    isPopover,
    ...other
  } = props;

  const {
    intent: toolbarIntent,
    disabled: toolbarDisabled,
    large,
    vertical,
  } = useToolbarContext();
  const intent = itemIntent ?? toolbarIntent;
  const disabled = itemDisabled ?? toolbarDisabled;
  const resizedIcon =
    typeof icon === 'string'
      ? icon
      : cloneElement(icon, {
          className: icon.props.className
            ? `${icon.props.className} bp5-icon`
            : 'bp5-icon',
        });
  return (
    <Button
      alignText={isPopover ? 'left' : undefined}
      rightIcon={
        isPopover ? (vertical ? 'caret-right' : 'caret-down') : undefined
      }
      minimal
      disabled={disabled}
      css={css`
        .${Classes.ICON} {
          color: ${Colors.DARK_GRAY3};
        }
      `}
      intent={intent}
      style={{
        position: 'relative',
        fontSize: '1.125em',
        width: 'fit-content',
        flex: 'none',
      }}
      type="button"
      active={active}
      icon={resizedIcon}
      onClick={() => {
        onClick?.(props);
      }}
      tooltipProps={
        noTooltip
          ? undefined
          : {
              content: title,
              placement: vertical ? 'right' : 'bottom',
              intent,
              compact: !large,
            }
      }
      {...other}
    />
  );
};

Toolbar.PopoverItem = function ToolbarPopoverItem(
  props: ToolbarPopoverItemProps,
) {
  const { itemProps, ...other } = props;
  const { disabled, vertical } = useToolbarContext();

  return (
    <Popover
      disabled={disabled}
      placement={vertical ? 'right' : 'bottom'}
      css={css`
        .${Classes.ICON} {
          color: ${Colors.DARK_GRAY3};
        }
      `}
      targetProps={{
        style: {
          position: 'relative',
          fontSize: '1.125em',
          width: 'fit-content',
          height: 'fit-content',
          flex: 'none',
        },
      }}
      {...other}
    >
      <Toolbar.Item noTooltip isPopover {...itemProps} />
    </Popover>
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

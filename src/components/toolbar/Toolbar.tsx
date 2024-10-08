/** @jsxImportSource @emotion/react */
import {
  ButtonGroup,
  ButtonGroupProps,
  Classes,
  Colors,
  Icon,
  Intent,
  Popover,
  PopoverProps,
  TooltipProps,
} from '@blueprintjs/core';
import { css } from '@emotion/react';
import {
  cloneElement,
  MouseEvent,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import { Button, ButtonProps } from '../button';

import {
  ToolbarContext,
  toolbarContext,
  useToolbarContext,
} from './toolbarContext';

export type PopoverInteractionType =
  | 'click'
  | 'hover'
  | 'click-target'
  | 'hover-target';

interface ToolbarBaseProps {
  intent?: Intent;
  disabled?: boolean;
}
export interface ToolbarProps
  extends ToolbarBaseProps,
    Pick<
      ButtonGroupProps,
      'children' | 'minimal' | 'large' | 'vertical' | 'fill'
    > {
  popoverInteractionKind?: PopoverInteractionType;
}

export interface ToolbarItemProps
  extends ToolbarBaseProps,
    Pick<ButtonProps, 'id' | 'icon' | 'active' | 'tag' | 'tagProps'> {
  tooltip?: TooltipProps['content'];
  tooltipProps?: Omit<TooltipProps, 'content'>;
  onClick?: (
    item: ToolbarItemProps & {
      event: MouseEvent;
    },
  ) => void;
  isPopover?: boolean;
}

export interface ToolbarPopoverItemProps extends PopoverProps {
  itemProps: ToolbarItemProps;
}

const border = '1px solid rgb(247, 247, 247)';

export function Toolbar(props: ToolbarProps) {
  const {
    children,
    disabled,
    intent,
    large,
    vertical,
    popoverInteractionKind,
    minimal,
    fill,
  } = props;

  const contextValue = useMemo(
    () => ({
      intent,
      large,
      vertical,
      disabled,
      popoverInteractionKind,
    }),
    [intent, large, vertical, disabled, popoverInteractionKind],
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
        fill={fill}
        // Reset because of layout effect above
        // TODO: remove once the workaround is no longer needed
        key={String(vertical)}
        vertical={vertical}
        large={large}
        minimal={minimal}
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
    tooltip,
    tooltipProps,
    intent: itemIntent,
    disabled: itemDisabled,
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
    !icon || typeof icon === 'string'
      ? icon
      : cloneElement(icon, {
          className: icon.props.className
            ? `${icon.props.className} bp5-icon`
            : 'bp5-icon',
        });

  return (
    <Button
      alignText={isPopover ? 'left' : undefined}
      disabled={disabled}
      css={css`
        .${Classes.ICON} {
          color: ${Colors.DARK_GRAY3};
        }
        .bp5-icon {
          width: ${large ? '20px' : '16px'};
          height: ${large ? '20px' : '16px'};
          font-size: ${large ? '14px' : '12px'};
        }
        .bp5-tag {
          font-size: ${large ? '12px' : '10px'};
          line-height: ${large ? '14px' : '12px'};
          min-width: ${large ? '18px' : '15px'};
          min-height: ${large ? '18px' : '15px'};
        }
      `}
      intent={intent}
      style={{
        position: 'relative',
        fontSize: '1.125em',
        width: 'fit-content',
      }}
      type="button"
      active={active}
      icon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 0,
            height: 0,
            marginRight: 0,
          }}
        >
          <Icon icon={resizedIcon} size={large ? 20 : 16} />
          {isPopover && (
            <Icon
              icon="caret-right"
              size={large ? 14 : 9}
              style={{
                transform: 'rotate(45deg)',
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: large ? 14 : 9,
                height: large ? 14 : 9,
              }}
            />
          )}
        </div>
      }
      onClick={(event) => {
        onClick?.({ event, ...props });
      }}
      tooltipProps={
        !tooltip
          ? undefined
          : {
              content: tooltip,
              placement: vertical ? 'right' : 'bottom',
              intent,
              compact: !large,
              interactionKind: 'hover',
              ...tooltipProps,
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
  const { disabled, vertical, popoverInteractionKind } = useToolbarContext();

  return (
    <Popover
      minimal
      disabled={disabled}
      placement={vertical ? 'right-start' : 'bottom-start'}
      interactionKind={popoverInteractionKind}
      hasBackdrop
      hoverCloseDelay={0}
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
        },
      }}
      renderTarget={() => <Toolbar.Item isPopover {...itemProps} />}
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

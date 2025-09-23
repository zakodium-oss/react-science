import type {
  ButtonGroupProps,
  Intent,
  PopoverProps,
  TooltipProps,
} from '@blueprintjs/core';
import { ButtonGroup, Classes, Colors, Icon, Popover } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { MouseEvent, ReactNode } from 'react';
import { useLayoutEffect, useMemo, useRef } from 'react';

import type { ButtonProps } from '../button/index.js';
import { Button } from '../button/index.js';
import { normalizeIcon } from '../icon.js';

import type { ToolbarContext } from './toolbarContext.js';
import { toolbarContext, useToolbarContext } from './toolbarContext.js';

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
    Pick<ButtonGroupProps, 'children' | 'vertical'> {
  /**
   * The type of interaction which triggers a popover to open.
   * This prop only affects children which are `Toolbar.PopoverItem`.
   *
   * {@link https://blueprintjs.com/docs/#core/components/popover.interactions}
   */
  popoverInteractionKind?: PopoverInteractionType;
}

export interface ToolbarItemProps
  extends ToolbarBaseProps,
    Pick<ButtonProps, 'id' | 'icon' | 'active' | 'tag' | 'tagProps'> {
  tooltip?: TooltipProps['content'];
  tooltipProps?: Omit<TooltipProps, 'content'>;
  onClick?: (event: MouseEvent) => void;
}

interface ToolbarItemInternalProps extends ToolbarItemProps {
  isPopover: boolean;
}

export interface ToolbarPopoverItemProps
  extends Omit<PopoverProps, 'targetProps'> {
  itemProps: ToolbarItemProps;
}

const border = '1px solid rgb(247, 247, 247)';

const ToolbarButton = styled(Button)`
  .${Classes.ICON} {
    /* Color of icon in button is lighter in Blueprintjs. We want a better contrast in the toolbars */
    color: ${Colors.DARK_GRAY3} !important;
    width: 16px;
    height: 16px;
    font-size: 12px;
  }

  .${Classes.TAG} {
    font-size: 10px;
    line-height: 12px;
    min-width: 12px;
    min-height: 12px;
  }
`;

export function Toolbar(props: ToolbarProps) {
  const { children, disabled, intent, vertical, popoverInteractionKind } =
    props;

  const contextValue = useMemo(
    () => ({
      intent,
      vertical,
      disabled,
      popoverInteractionKind,
    }),
    [intent, vertical, disabled, popoverInteractionKind],
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
        // Reset because of layout effect above
        // TODO: remove once the workaround is no longer needed
        key={String(vertical)}
        vertical={vertical}
        variant="minimal"
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

function ToolbarItem(props: ToolbarItemProps) {
  return <ToolbarItemInternal {...props} isPopover={false} />;
}

function ToolbarItemInternal(props: ToolbarItemInternalProps) {
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
    vertical,
  } = useToolbarContext();
  const intent = itemIntent ?? toolbarIntent;
  const disabled = itemDisabled ?? toolbarDisabled;

  const normalizedIcon = normalizeIcon(icon, 16);

  return (
    <ToolbarButton
      disabled={disabled}
      intent={intent}
      type="button"
      active={active}
      style={{
        position: 'relative',
        fontSize: '1.125em',
        width: 'fit-content',
      }}
      icon={
        <>
          {isPopover ? (
            <>
              {/*For the icon to be properly styled, it should not have any siblings*/}
              <div style={{ display: 'contents' }}>{normalizedIcon}</div>
              <Icon
                icon="caret-right"
                size={9}
                style={{
                  transform: 'rotate(45deg)',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 9,
                  height: 9,
                }}
              />
            </>
          ) : (
            normalizedIcon
          )}
        </>
      }
      onClick={onClick}
      tooltipProps={
        !tooltip
          ? undefined
          : {
              content: tooltip,
              placement: vertical ? 'right' : 'bottom',
              intent,
              compact: true,
              interactionKind: 'hover',
              ...tooltipProps,
            }
      }
      {...other}
    />
  );
}

Toolbar.Item = ToolbarItem;

const ToolbarPopover = styled(Popover)`
  .${Classes.ICON} {
    color: ${Colors.DARK_GRAY3};
  }
`;

Toolbar.PopoverItem = function ToolbarPopoverItem(
  props: ToolbarPopoverItemProps,
) {
  const { itemProps, ...other } = props;
  const { disabled, vertical, popoverInteractionKind } = useToolbarContext();

  return (
    <ToolbarPopover
      minimal
      disabled={disabled}
      placement={vertical ? 'right-start' : 'bottom-start'}
      interactionKind={popoverInteractionKind}
      hasBackdrop={popoverInteractionKind === 'click'}
      hoverCloseDelay={0}
      renderTarget={({ isOpen, className, ...targetProps }) => (
        <span {...targetProps} style={{ flex: '0 0 auto' }}>
          <ToolbarItemInternal isPopover {...itemProps} />
        </span>
      )}
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

import type { PopoverProps, TooltipProps } from '@blueprintjs/core';
import { Popover } from '@blueprintjs/core';
import type { ReactNode } from 'react';

import type { ButtonProps } from '../button/Button.tsx';

import { Toolbar, ToolbarButton } from './Toolbar.tsx';

export type Placement = 'start' | 'end';

export interface BaseOverButtonProps extends ButtonProps {
  placement?: Placement;
  popoverProps?: PopoverProps;
}
export interface OverButtonProps extends BaseOverButtonProps {
  vertical?: boolean;
  tooltip?: TooltipProps['content'];
  children: ReactNode;
}

export function OverflowButton(props: OverButtonProps) {
  const {
    style,
    vertical,
    intent,
    disabled,
    tooltip,
    children,
    popoverProps,
    placement = 'end',
    ...otherProps
  } = props;
  return (
    <Popover
      minimal
      disabled={disabled}
      placement={vertical ? 'right-start' : 'bottom-start'}
      interactionKind="hover"
      hasBackdrop={false}
      enforceFocus={false}
      autoFocus={false}
      {...popoverProps}
      content={
        <Toolbar
          vertical={vertical}
          intent={intent}
          disabled={disabled}
          overflow="wrap"
        >
          {children}
        </Toolbar>
      }
    >
      <ToolbarButton
        variant="minimal"
        icon="more"
        intent={intent}
        disabled={disabled}
        style={{
          boxShadow: getOverflowShadow(placement, vertical),
          ...style,
        }}
        {...otherProps}
      />
    </Popover>
  );
}

function getOverflowShadow(placement: Placement, vertical?: boolean) {
  const color = 'rgba(0, 0, 0, 0.15)';
  const offset = 8;
  const blur = 8;
  const spread = 4;

  const sign = placement === 'start' ? 1 : -1;

  const x = vertical ? 0 : offset * sign;
  const y = vertical ? offset * sign : 0;

  return `${x}px ${y}px ${blur}px -${spread}px ${color}`;
}

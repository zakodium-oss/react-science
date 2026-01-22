import type { TooltipProps } from '@blueprintjs/core';
import { Popover } from '@blueprintjs/core';
import type { ReactNode } from 'react';
import { Children } from 'react';

import type { ButtonProps } from '../button/Button.tsx';

import { Toolbar, ToolbarButton } from './Toolbar.tsx';

export interface MoreButtonProps extends ButtonProps {
  vertical?: boolean;
  tooltip?: TooltipProps['content'];
  children: ReactNode;
}

export function MoreButton(props: MoreButtonProps) {
  const { vertical, intent, disabled, tooltip, children, ...otherProps } =
    props;
  const childCount = Children.count(children);

  return (
    <Popover
      minimal
      disabled={disabled}
      placement={vertical ? 'right-start' : 'bottom-start'}
      interactionKind="click"
      hasBackdrop
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
        tooltipProps={{
          content: tooltip ?? `More [+${childCount}]`,
          placement: vertical ? 'right' : 'bottom',
          compact: true,
        }}
        {...otherProps}
      />
    </Popover>
  );
}

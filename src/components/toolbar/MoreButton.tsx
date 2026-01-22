import type { TooltipProps } from '@blueprintjs/core';
import { Popover } from '@blueprintjs/core';

import type { ButtonProps } from '../button/Button.tsx';

import type { ToolbarItemProps } from './Toolbar.tsx';
import { Toolbar, ToolbarButton } from './Toolbar.tsx';

export interface MoreButtonProps extends ButtonProps {
  items: ToolbarItemProps[];
  vertical?: boolean;
  tooltip?: TooltipProps['content'];
}

export function MoreButton(props: MoreButtonProps) {
  const { items, vertical, intent, disabled, tooltip, ...otherProps } = props;

  if (!items?.length) {
    return null;
  }

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
          {items?.map((item) => {
            return <Toolbar.Item key={JSON.stringify(item)} {...item} />;
          })}
        </Toolbar>
      }
    >
      <ToolbarButton
        variant="minimal"
        icon="more"
        intent={intent}
        disabled={disabled}
        tooltipProps={{
          content: tooltip ?? `More [+${items.length}]`,
          placement: vertical ? 'right' : 'bottom',
          compact: true,
        }}
        {...otherProps}
      />
    </Popover>
  );
}

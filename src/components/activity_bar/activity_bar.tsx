import type { ButtonGroupProps, TooltipProps } from '@blueprintjs/core';
import { ButtonGroup, Classes, Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { MouseEvent, ReactNode } from 'react';

import type { ButtonProps } from '../button/index.js';
import { Button } from '../button/index.js';
import { normalizeIcon } from '../icon.js';
import { getTooltipLabel } from '../toolbar/tooltip_label.js';

export interface ActivityBarProps extends Pick<ButtonGroupProps, 'aria-label'> {
  children: ReactNode;
}

export interface ActivityBarItemProps extends Pick<
  ButtonProps,
  'id' | 'icon' | 'active' | 'tag' | 'tagProps' | 'aria-label'
> {
  /**
   * Tooltip shown on hover.
   * If the tooltip is a string, or a `<TooltipHelpContent />` element, its
   * text (or title) will be used as a fallback for the aria-label.
   */
  tooltip?: TooltipProps['content'];
  tooltipProps?: Omit<TooltipProps, 'content'>;
  onClick?: (event: MouseEvent) => void;
  disabled?: boolean;
}

const ActivityButtonGroup = styled(ButtonGroup)`
  flex-wrap: wrap-reverse;
  height: 100%;
  gap: 4px;
  padding: 4px;
  border-left: 1px solid ${Colors.LIGHT_GRAY4};
  background-color: ${Colors.WHITE};
`;

export function ActivityBar(props: ActivityBarProps) {
  const { children, 'aria-label': ariaLabel } = props;

  return (
    <ActivityButtonGroup
      role="toolbar"
      aria-label={ariaLabel}
      aria-orientation="vertical"
      vertical
      size="large"
      variant="minimal"
    >
      {children}
    </ActivityButtonGroup>
  );
}

const ActivityButton = styled(Button)`
  font-size: 1.125em;
  width: fit-content;

  /* Override the padding set by the large button group */
  padding: var(--bp-surface-spacing) calc(var(--bp-surface-spacing) * 2) !important;

  .${Classes.ICON} {
    color: ${Colors.DARK_GRAY3} !important;
  }

  .${Classes.TAG} {
    font-size: 12px;
    line-height: 14px;
    min-width: 18px;
    min-height: 18px;
  }
`;

export function ActivityBarItem(props: ActivityBarItemProps) {
  const {
    active = false,
    icon,
    onClick,
    tooltip,
    tooltipProps,
    'aria-label': ariaLabel,
    ...otherProps
  } = props;

  const resizedIcon = normalizeIcon(icon, 20);

  return (
    <ActivityButton
      type="button"
      active={active}
      aria-pressed={active}
      aria-label={ariaLabel ?? getTooltipLabel(tooltip)}
      onClick={onClick}
      tooltipProps={
        !tooltip
          ? undefined
          : {
              content: tooltip,
              placement: 'left',
              compact: false,
              interactionKind: 'hover',
              ...tooltipProps,
            }
      }
      {...otherProps}
    >
      {resizedIcon}
    </ActivityButton>
  );
}

ActivityBar.Item = ActivityBarItem;

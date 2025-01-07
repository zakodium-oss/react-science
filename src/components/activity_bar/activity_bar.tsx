import type { TooltipProps } from '@blueprintjs/core';
import { ButtonGroup, Classes, Colors, Icon } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { MouseEvent, ReactNode } from 'react';
import { cloneElement } from 'react';

import type { ButtonProps } from '../button/index.js';
import { Button } from '../button/index.js';

export interface ActivityBarProps {
  children: ReactNode;
}

export interface ActivityBarItemProps
  extends Pick<ButtonProps, 'id' | 'icon' | 'active' | 'tag' | 'tagProps'> {
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
  const { children } = props;

  return (
    <ActivityButtonGroup vertical large minimal>
      {children}
    </ActivityButtonGroup>
  );
}

const ActivityButton = styled(Button)`
  font-size: 1.125em;
  width: fit-content;
  .${Classes.ICON} {
    color: ${Colors.DARK_GRAY3};
  }

  .${Classes.ICON} {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }

  .${Classes.TAG} {
    font-size: 12px;
    line-height: 14px;
    min-width: 18px;
    min-height: 18px;
  }
`;

const ActivityButtonIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0;
  height: 0;
  margin-right: 0;
`;

export function ActivityBarItem(props: ActivityBarItemProps) {
  const {
    active = false,
    icon,
    onClick,
    tooltip,
    tooltipProps,
    ...otherProps
  } = props;

  const resizedIcon =
    !icon || typeof icon === 'string'
      ? icon
      : cloneElement(icon, {
          className: icon.props.className
            ? `${icon.props.className} ${Classes.ICON}`
            : Classes.ICON,
        });

  return (
    <ActivityButton
      type="button"
      active={active}
      icon={
        <ActivityButtonIconContainer>
          <Icon icon={resizedIcon} size={20} />
        </ActivityButtonIconContainer>
      }
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
    />
  );
}

ActivityBar.Item = ActivityBarItem;

/** @jsxImportSource @emotion/react */

import {
  ButtonGroup,
  Classes,
  Colors,
  Icon,
  type TooltipProps,
} from '@blueprintjs/core';
import { css } from '@emotion/react';
import { cloneElement, type MouseEvent, type ReactNode } from 'react';

import { Button, type ButtonProps } from '../button/index.js';

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

export function ActivityBar(props: ActivityBarProps) {
  const { children } = props;

  return (
    <ButtonGroup
      vertical
      large
      minimal
      style={{
        flexWrap: 'wrap-reverse',
        height: '100%',
        gap: 4,
        padding: 4,
        borderLeft: `1px solid ${Colors.LIGHT_GRAY4}`,
        backgroundColor: Colors.WHITE,
      }}
    >
      {children}
    </ButtonGroup>
  );
}

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
            ? `${icon.props.className} bp5-icon`
            : 'bp5-icon',
        });

  return (
    <Button
      type="button"
      css={css`
        .${Classes.ICON} {
          color: ${Colors.DARK_GRAY3};
        }
        .bp5-icon {
          width: 20px;
          height: 20px;
          font-size: 14px;
        }
        .bp5-tag {
          font-size: 12px;
          line-height: 14px;
          min-width: 18px;
          min-height: 18px;
        }
      `}
      style={{
        fontSize: '1.125em',
        width: 'fit-content',
      }}
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
          <Icon icon={resizedIcon} size={20} />
        </div>
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

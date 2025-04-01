import type { ButtonProps } from '@blueprintjs/core';
import { Classes, Icon } from '@blueprintjs/core';
import { cloneElement } from 'react';

/**
 * Return a normalized icon.
 * Accepts a blueprint icon id or a custom element.
 */
export function normalizeIcon(icon: ButtonProps['icon'], size: number) {
  return !icon || typeof icon === 'string' ? (
    <Icon icon={icon} size={size} />
  ) : (
    cloneElement(icon, {
      style: {
        width: size,
        height: size,
        fontSize: size - 4,
        textAlign: 'center',
      },
      className: icon.props.className
        ? `${icon.props.className} ${Classes.ICON}`
        : Classes.ICON,
    })
  );
}

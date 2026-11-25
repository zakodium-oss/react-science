import type { TooltipProps } from '@blueprintjs/core';
import { isValidElement } from 'react';

import { TooltipHelpContent } from './tooltip_help_content.tsx';

/**
 * Derive an accessible label from tooltip content.
 * It supports string tooltips and TooltipHelpContent's `title` prop.
 * Empty strings and other tooltips return undefined.
 */
export function getTooltipLabel(
  content: TooltipProps['content'] | undefined,
): string | undefined {
  if (typeof content === 'string') {
    return content || undefined;
  }
  if (
    isValidElement<{ title?: string }>(content) &&
    content.type === TooltipHelpContent
  ) {
    return content.props.title || undefined;
  }
  return undefined;
}

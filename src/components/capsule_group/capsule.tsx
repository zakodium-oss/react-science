import type { Intent } from '@blueprintjs/core';
import { Tag, Tooltip } from '@blueprintjs/core';
import type { ReactNode } from 'react';

export interface CapsuleProps {
  /**
   * Whether the capsule is filled. An inactive capsule is drawn `minimal`
   * and keeps its intent, so its meaning never depends on its state.
   */
  active: boolean;
  /**
   * Semantic colour of the capsule, kept in both states.
   * @default 'none'
   */
  intent?: Intent;
  /**
   * Content of a compact tooltip shown around the capsule.
   * @default undefined, no tooltip
   */
  tooltip?: ReactNode;
  /**
   * Make the capsule non-interactive: it ignores clicks.
   * @default false
   */
  disabled?: boolean;
  /**
   * Called when the capsule is clicked, or activated with Enter or Space.
   */
  onClick?: () => void;
  children: ReactNode;
}

/**
 * A rounded, interactive tag encoding an on/off state: filled when active,
 * `minimal` when inactive, with the same intent in both states.
 * @param props - See {@link CapsuleProps}.
 * @returns The capsule, wrapped in a compact tooltip when `tooltip` is set.
 */
export function Capsule(props: CapsuleProps) {
  const {
    active,
    intent = 'none',
    tooltip,
    disabled = false,
    onClick,
    children,
  } = props;

  const tag = (
    <Tag
      interactive={!disabled}
      round
      intent={intent}
      minimal={!active}
      aria-pressed={active}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </Tag>
  );

  if (tooltip === undefined || tooltip === null) return tag;

  return (
    <Tooltip content={<>{tooltip}</>} compact>
      {tag}
    </Tooltip>
  );
}

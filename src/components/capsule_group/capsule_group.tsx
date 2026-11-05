import type { Intent } from '@blueprintjs/core';
import { Classes } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { useId } from 'react';

import { Capsule } from './capsule.js';

export interface CapsuleOption<T extends string> {
  /**
   * Value reported to `onChange` when the capsule is picked.
   */
  value: T;
  label: ReactNode;
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
   * Make this capsule ignore clicks.
   * @default false
   */
  disabled?: boolean;
}

interface CapsuleGroupBaseProps<T extends string> {
  options: ReadonlyArray<CapsuleOption<T>>;
  /**
   * Muted caption shown before the capsules.
   * @default undefined, no caption
   */
  label?: ReactNode;
  /**
   * Make every capsule ignore clicks.
   * @default false
   */
  disabled?: boolean;
}

export interface CapsuleGroupAllOption {
  label: ReactNode;
  /**
   * Content of a compact tooltip shown around the "All" capsule.
   * @default undefined, no tooltip
   */
  tooltip?: ReactNode;
}

// `NoInfer`: `T` is inferred from `options` only, so a `useState` setter typed
// with the option union is accepted as `onChange`.
interface CapsuleGroupSingleProps<T extends string> {
  /**
   * The selected option.
   */
  value: NoInfer<T>;
  onChange: (value: NoInfer<T>) => void;
  allOption?: undefined;
}

interface CapsuleGroupNullableProps<T extends string> {
  /**
   * The selected option, `null` when the "All" capsule is active.
   */
  value: NoInfer<T> | null;
  /**
   * Called with the picked option, or `null` when the "All" capsule or the
   * already active option is clicked.
   */
  onChange: (value: NoInfer<T> | null) => void;
  /**
   * Leading capsule (intent `none`) that is active when `value` is `null`.
   */
  allOption: CapsuleGroupAllOption;
}

export type CapsuleGroupProps<T extends string> = CapsuleGroupBaseProps<T> &
  (CapsuleGroupSingleProps<T> | CapsuleGroupNullableProps<T>);

const CapsuleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
`;

const CapsuleGroupLabel = styled.span`
  font-size: 12px;
`;

/**
 * A row of capsules picking one option out of a small fixed set.
 *
 * Without `allOption`, one option is always selected. With `allOption`, a
 * leading "All" capsule stands for `null`, and clicking the active option
 * clears the selection back to `null`.
 * @param props - See {@link CapsuleGroupProps}.
 * @returns The capsule row.
 */
export function CapsuleGroup<T extends string>(props: CapsuleGroupProps<T>) {
  const { options, label, disabled = false } = props;
  const labelId = useId();

  function select(value: T) {
    if (props.allOption === undefined) {
      props.onChange(value);
    } else {
      props.onChange(props.value === value ? null : value);
    }
  }

  return (
    <CapsuleRow
      role="group"
      aria-labelledby={label === undefined ? undefined : labelId}
    >
      {label !== undefined && (
        <CapsuleGroupLabel id={labelId} className={Classes.TEXT_MUTED}>
          {label}
        </CapsuleGroupLabel>
      )}
      {props.allOption !== undefined && (
        <Capsule
          active={props.value === null}
          tooltip={props.allOption.tooltip}
          disabled={disabled}
          onClick={() => props.onChange(null)}
        >
          {props.allOption.label}
        </Capsule>
      )}
      {options.map((option) => (
        <Capsule
          key={option.value}
          active={props.value === option.value}
          intent={option.intent}
          tooltip={option.tooltip}
          disabled={disabled || option.disabled}
          onClick={() => select(option.value)}
        >
          {option.label}
        </Capsule>
      ))}
    </CapsuleRow>
  );
}

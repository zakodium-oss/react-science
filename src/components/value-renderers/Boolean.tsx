import type { ValueRenderersProps } from '.';

interface BooleanProps extends ValueRenderersProps {
  value?: boolean;
}

export function Boolean({ value, ...other }: BooleanProps) {
  return (
    <div {...other}>{value !== undefined ? (value ? '✔' : '✘') : ''}</div>
  );
}

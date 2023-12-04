import type { ValueRenderersProps } from '.';

interface BooleanProps extends ValueRenderersProps {
  value?: boolean;
  renderValue?: (value: boolean) => string;
}

export function Boolean(props: BooleanProps) {
  const {
    value,
    renderValue = (value) => (value ? '✔' : '✘'),
    ...other
  } = props;

  return <div {...other}>{value !== undefined ? renderValue(value) : ''}</div>;
}

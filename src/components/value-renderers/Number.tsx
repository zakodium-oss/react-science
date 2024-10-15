import type { ValueRenderersProps } from './index.js';

interface NumberProps extends ValueRenderersProps {
  value?: number;
  fixed?: number;
}

export function Number({ value, fixed, ...other }: NumberProps) {
  return (
    <div {...other}>
      {value !== undefined ? (fixed ? value.toFixed(fixed) : value) : ''}
    </div>
  );
}

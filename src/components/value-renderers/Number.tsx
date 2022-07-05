import React from 'react';

import { ValueRenderersProps } from '.';

interface NumberProps extends ValueRenderersProps {
  value?: number;
  fixed?: number;
}

export function Number({ value, fixed, ...other }: NumberProps) {
  return (
    <div {...other}>{value ? (fixed ? value.toFixed(fixed) : value) : ''}</div>
  );
}

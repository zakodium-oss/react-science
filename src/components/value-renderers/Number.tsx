import React from 'react';

interface NumberProps {
  value?: number;
  fixed?: number;
}

export function Number({ value, fixed }: NumberProps) {
  return <div>{value ? (fixed ? value.toFixed(fixed) : value) : ''}</div>;
}

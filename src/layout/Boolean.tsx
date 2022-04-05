import React from 'react';

interface BooleanProps {
  value?: boolean;
}

export function Boolean({ value }: BooleanProps) {
  return <div>{value !== undefined ? (value ? '✔' : '✘') : ''}</div>;
}

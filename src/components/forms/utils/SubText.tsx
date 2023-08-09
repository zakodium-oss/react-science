import { CSSProperties } from 'react';

export interface SubTextProps {
  help?: string;
  error?: string;
  valid?: true | string;
}

export function SubText(props: SubTextProps) {
  const { error, help, valid: validProps } = props;

  const valid = typeof validProps === 'string' ? validProps : undefined;
  const text = error || valid || help;

  return <p style={{ color: getColor(error, validProps) }}>{text}</p>;
}

function getColor(
  error?: string,
  valid?: true | string,
): CSSProperties['color'] {
  if (error) {
    return '#f95d55';
  }

  if (valid && typeof valid !== 'boolean') {
    return '#62cb21';
  }

  return 'gray';
}

import { match } from 'ts-pattern';

import { DoiLogo } from './doi_logo.js';
import { normalizeDOI } from './utils.js';

type DOISize = 'small' | 'medium' | 'large';

export interface DOIProps {
  value: string;
  size?: DOISize;
}

export function DOI(props: DOIProps) {
  const { value, size = 'small' } = props;
  const normalizedValue = normalizeDOI(value);

  return (
    <a
      title={normalizedValue}
      href={`https://doi.org/${normalizedValue}`}
      target="_blank"
      rel="noreferrer"
    >
      <DoiLogo size={getDOISize(size)} />
    </a>
  );
}

function getDOISize(size: DOISize): string {
  return match(size)
    .with('small', () => '1.25rem')
    .with('medium', () => '2.5rem')
    .with('large', () => '3.75rem')
    .exhaustive();
}

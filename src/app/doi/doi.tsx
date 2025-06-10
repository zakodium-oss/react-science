import styled from '@emotion/styled';
import { match } from 'ts-pattern';

import doiSvg from './svg/doi.svg';
import { normalizeDOI } from './utils.js';

type DOISize = 'small' | 'medium' | 'large';

interface DOIProps {
  value: string;
  size?: DOISize;
}

const StyledSvg = styled.img<{ size: DOISize }>`
  height: ${(props) => getDOISize(props.size)};
  width: ${(props) => getDOISize(props.size)};
  display: inline-block;
`;

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
      <StyledSvg size={size} src={doiSvg} />
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

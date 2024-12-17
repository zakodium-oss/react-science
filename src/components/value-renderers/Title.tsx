/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import type { ValueRenderersProps } from './index.js';

export interface TitleProps extends ValueRenderersProps {
  value?: string;
}

const TitleContainer = styled.div`
  font-weight: bold;
`;

export function Title({ value, ...other }: TitleProps) {
  return <TitleContainer {...other}>{value}</TitleContainer>;
}

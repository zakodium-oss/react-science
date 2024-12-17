/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import type { ValueRenderersProps } from './index.js';

interface TextProps extends ValueRenderersProps {
  value?: string;
}

const TextContainer = styled.div`
  text-overflow: ellipsis;
`;

export function Text({ value, ...other }: TextProps) {
  return <TextContainer {...other}>{value}</TextContainer>;
}

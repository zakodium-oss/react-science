import styled from '@emotion/styled';

import type { ValueRenderersProps } from './index.js';

interface ColorProps extends ValueRenderersProps {
  value?: string;
}

const ColorContainer = styled.div`
  position: absolute;
  inset: 2px;
`;

export function Color({ value, style, onClick }: ColorProps) {
  return (
    <ColorContainer
      onClick={onClick}
      style={{
        background: value,
        ...style,
      }}
    />
  );
}

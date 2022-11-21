import styled from '@emotion/styled';
import { useMemo } from 'react';

interface GradientPreviewProps {
  scale: (t: number) => string;
}

const GradientPreviewElement = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 0.125rem;
`;

export default function GradientPreview(props: GradientPreviewProps) {
  const { scale } = props;

  const gradient = useMemo(() => {
    const stops: string[] = [];
    for (let i = 0; i <= 100; i++) {
      stops.push(scale(i / 100));
    }
    return `linear-gradient(to right, ${stops.join(', ')})`;
  }, [scale]);

  return <GradientPreviewElement style={{ background: gradient }} />;
}

import { useMemo } from 'react';

import {
  GradientScaleName,
  fixedGradientScales,
} from '../gradient-select/GradientSelect';

interface FixedGradientPreviewProps {
  gradient: GradientScaleName;
}

export default function FixedGradientPreview(props: FixedGradientPreviewProps) {
  const { gradient } = props;
  const scale = fixedGradientScales[gradient];

  const gradientCss = useMemo(() => {
    const stops: string[] = [];
    for (let i = 0; i <= 100; i++) {
      stops.push(scale(i / 100));
    }
    return `linear-gradient(to right, ${stops.join(', ')})`;
  }, [scale]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '0.125rem',
        background: gradientCss,
      }}
    />
  );
}

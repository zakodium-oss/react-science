import { assertUnreachable } from '@zakodium/utils';

import FixedColorPreview from './FixedColorPreview.js';
import FixedGradientPreview from './FixedGradientPreview.js';
import type { ColorConfig } from './color_config.ts';

export interface ColorPreviewProps {
  color: ColorConfig;
}

export function ColorPreview(props: ColorPreviewProps) {
  const { color } = props;
  switch (color.kind) {
    case 'fixed': {
      return <FixedColorPreview color={color.color} />;
    }
    case 'fixedGradient': {
      return <FixedGradientPreview gradient={color.gradient} />;
    }
    default:
      assertUnreachable(color);
  }
}

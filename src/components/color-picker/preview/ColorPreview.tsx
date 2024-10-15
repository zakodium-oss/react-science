import type { ColorConfig } from '../../../app-data/index.js';
import { assertUnreachable } from '../../utils/assert.js';

import FixedColorPreview from './FixedColorPreview.js';
import FixedGradientPreview from './FixedGradientPreview.js';

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

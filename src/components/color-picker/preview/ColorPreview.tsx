import { assertUnreachable } from '../../utils/assert.js';
import type { GradientScaleName } from '../gradient_select/index.js';

import FixedColorPreview from './FixedColorPreview.js';
import FixedGradientPreview from './FixedGradientPreview.js';

export type ColorConfig =
  | { kind: 'fixed'; color: string }
  | { kind: 'fixedGradient'; gradient: GradientScaleName };

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

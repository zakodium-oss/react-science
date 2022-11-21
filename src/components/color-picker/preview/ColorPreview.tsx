import { ColorConfig } from '../../../app-data/index';
import { assertUnreachable } from '../../utils/assert';

import FixedColorPreview from './FixedColorPreview';
import FixedGradientPreview from './FixedGradientPreview';

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

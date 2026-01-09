import type { SVGProps } from 'react';

import type { SVGStyledLineUserConfig } from './svg_styled_types.js';
import { computeStrokeDasharray } from './svg_styled_utils.js';

export interface SVGStyledLineProps
  extends
    Omit<SVGProps<SVGLineElement>, keyof SVGStyledLineUserConfig>,
    SVGStyledLineUserConfig {}

export function SVGStyledLine(props: SVGStyledLineProps) {
  const {
    stroke = '#000000',
    strokeOpacity = 1,
    strokeWidth = 1,
    strokeDasharray = 'solid',
    ...otherProps
  } = props;
  return (
    <line
      {...otherProps}
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth={strokeWidth}
      strokeDasharray={computeStrokeDasharray(strokeDasharray, strokeWidth)}
    />
  );
}

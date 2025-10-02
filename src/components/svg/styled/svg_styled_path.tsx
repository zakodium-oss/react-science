import type { SVGProps } from 'react';

import type { SVGStyledLineUserConfig } from './svg_styled_types.js';
import { computeStrokeDasharray } from './svg_styled_utils.js';

export interface SVGStyledPathProps
  extends Omit<SVGProps<SVGPathElement>, keyof SVGStyledLineUserConfig>,
    SVGStyledLineUserConfig {}

export function SVGStyledPath(props: SVGStyledPathProps) {
  const {
    fillOpacity = 0,
    stroke = '#000000',
    strokeOpacity = 1,
    strokeWidth = 1,
    strokeDasharray = 'solid',
    ...otherProps
  } = props;
  return (
    <path
      {...otherProps}
      fillOpacity={fillOpacity}
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth={strokeWidth}
      strokeDasharray={computeStrokeDasharray(strokeDasharray, strokeWidth)}
    />
  );
}

import type { SVGProps } from 'react';

import type { SVGStyledTextUserConfig } from './svg_styled_types.js';

export interface SVGStyledTextProps
  extends
    Omit<SVGProps<SVGTextElement>, keyof SVGStyledTextUserConfig>,
    SVGStyledTextUserConfig {}

export function SVGStyledText(props: SVGStyledTextProps) {
  const { fontWeight = 'normal', fontStyle = 'normal', ...otherProps } = props;
  return <text {...otherProps} fontWeight={fontWeight} fontStyle={fontStyle} />;
}

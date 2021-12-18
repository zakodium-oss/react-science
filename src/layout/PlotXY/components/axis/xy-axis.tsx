import { ScaleLinear } from 'd3-scale';
import React, { CSSProperties, ReactNode, SVGProps } from 'react';

import Axis from './axis';

const XYAxis = ({
  xScale,
  xLabel,
  yScale,
  yLabel,
  height,
  width,
  labelStyle,
}: {
  xScale: ScaleLinear<number, number>;
  xLabel?: string;
  yScale: ScaleLinear<number, number>;
  yLabel?: string;
  height: number;
  width: number;
  labelStyle?: CSSProperties;
}) => {
  const xSettings = {
    scale: xScale,
    orient: 'bottom',
    transform: `translate(0, ${height})`,
  };
  const ySettings = {
    scale: yScale,
    orient: 'left',
    transform: 'translate(0, 0)',
    ticks: 6,
  };
  return (
    <g className="axis-group">
      <Axis {...xSettings} />
      {xLabel ? (
        <text
          x={width / 2}
          y={height + 35}
          textAnchor="middle"
          style={labelStyle}
        >
          {xLabel}
        </text>
      ) : null}
      <Axis {...ySettings} />
      {yLabel ? (
        <VerticalText
          label={yLabel}
          transform={`translate(-30, ${height / 2})`}
          style={labelStyle}
        />
      ) : null}
    </g>
  );
};

export default XYAxis;
interface VerticalTextProps extends SVGProps<SVGTextElement> {
  label: ReactNode;
}

function VerticalText(props: VerticalTextProps) {
  const { transform = '', style, label, ...otherProps } = props;

  return (
    <text
      {...otherProps}
      transform={`${transform} rotate(-90)`}
      textAnchor="middle"
      style={{
        ...style,
        cursor: 'vertical-text',
      }}
    >
      {label}
    </text>
  );
}

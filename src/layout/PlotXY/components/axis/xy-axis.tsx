import React, { CSSProperties, ReactNode, SVGProps } from 'react';

import { PlotContextType, usePlotContext } from '../../../hooks/plotXY';

import { LinearHorizontalAxis, LinearVerticalAxis } from './axis';

export default function XYAxis({
  xLabel,
  yLabel,
  labelStyle,
}: {
  xLabel?: string;
  yLabel?: string;
  labelStyle?: CSSProperties;
}) {
  const { width, height, xScale, yScale } = usePlotContext() as PlotContextType;
  const xSettings = {
    key: width,
    x: 0,
    y: height - 15,
    scale: xScale,
    width: width,
  };
  const ySettings = {
    key: height,
    x: -15,
    y: 0,
    scale: yScale,
    height: height,
  };
  return (
    <g className="axis-group">
      <LinearVerticalAxis {...ySettings} />
      {xLabel ? (
        <text
          x={width / 2}
          y={height + 40}
          textAnchor="middle"
          style={labelStyle}
        >
          {xLabel}
        </text>
      ) : null}
      <LinearHorizontalAxis {...xSettings} />
      {yLabel ? (
        <VerticalText
          label={yLabel}
          transform={`translate(-45, ${height / 2})`}
          style={labelStyle}
        />
      ) : null}
    </g>
  );
}

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

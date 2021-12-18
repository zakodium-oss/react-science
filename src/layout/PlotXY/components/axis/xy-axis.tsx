import React, { CSSProperties, ReactNode, SVGProps } from 'react';

import { PlotContextType, usePlotContext } from '../../../hooks/plotXY';

import Axis from './axis';

export default function XYAxis({
  xLabel,
  yLabel,
  labelStyle,
}: {
  xLabel?: string;
  yLabel?: string;
  labelStyle?: CSSProperties;
}) {
  const { width, height, xScale, yScale, ticks } =
    usePlotContext() as PlotContextType;
  const xSettings = {
    scale: xScale,
    orient: 'bottom',
    transform: `translate(0, ${height})`,
  };
  const ySettings = {
    scale: yScale,
    orient: 'left',
    transform: 'translate(0, 0)',
    ticks: ticks,
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

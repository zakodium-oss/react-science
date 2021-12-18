import { ScaleLinear } from 'd3-scale';
import { curveMonotoneX, line } from 'd3-shape';
import React, { CSSProperties, useMemo } from 'react';

import { Data } from '..';

interface LineSerieProps {
  xScale?: ScaleLinear<number, number>;
  yScale?: ScaleLinear<number, number>;
  data: Data[];
  lineStyle?: CSSProperties;
  color?: string;
}
export default function LineSerie(props: LineSerieProps) {
  const { xScale, yScale, lineStyle, data, color = 'black' } = props;
  const style = {
    stroke: color,
    strokeWidth: 2,
    ...lineStyle,
  };
  const path = useMemo(() => {
    if (xScale === undefined || yScale === undefined) {
      return null;
    }
    const lineGenerator = line<Data>()
      .x((d) => xScale(d.name))
      .y((d) => yScale(d.value))
      .curve(curveMonotoneX);
    return lineGenerator(data);
  }, [data, xScale, yScale]);
  if (!path) return null;
  return <path style={style} d={path} fill="none" />;
}

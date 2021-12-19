import { line } from 'd3-shape';
import React, { CSSProperties, useMemo } from 'react';

import { Data } from '..';
import { usePlotContext } from '../../hooks/plotXY';

interface LineSerieProps {
  data: Data[];
  lineStyle?: CSSProperties;
  color?: string;
}
export default function LineSerie(props: LineSerieProps) {
  const { lineStyle, data, color = 'black' } = props;

  const { xScale, yScale } = usePlotContext();
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
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    return lineGenerator(data);
  }, [data, xScale, yScale]);
  if (!path) return null;
  return <path style={style} d={path} fill="none" />;
}

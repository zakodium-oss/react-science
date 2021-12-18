import { extent } from 'd3-array';
import { scaleLinear, NumberValue } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { transition } from 'd3-transition';
import React from 'react';

import XYAxis from './components/axis/xy-axis';
import Line from './components/line/line';

export interface Data {
  name: number;
  value: number;
}
export default function PlotXY() {
  const data: Data[] = [
    { name: 1, value: 30 },
    { name: 2, value: 10 },
    { name: 3, value: 50 },
    { name: 4, value: 20 },
    { name: 5, value: 80 },
    { name: 6, value: 30 },
    { name: 7, value: 0 },
    { name: 8, value: 20 },
    { name: 9, value: 100 },
    { name: 10, value: 55 },
    { name: 11, value: 60 },
    { name: 20, value: 80 },
  ];
  const parentWidth = 500;

  const margins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
  };

  const width = parentWidth - margins.left - margins.right;
  const height = 200 - margins.top - margins.bottom;

  const ticks = 5;
  const t = transition().duration(1000);

  const xScale = scaleLinear<number>()
    .domain(extent<Data, number>(data, (d) => d.name) as Iterable<NumberValue>)
    .rangeRound([0, width]);

  const yScale = scaleLinear<number>()
    .domain(extent<Data, number>(data, (d) => d.value) as Iterable<NumberValue>)
    .range([height, 0])
    .nice();

  const lineGenerator = line<Data>()
    .x((d) => xScale(d.name))
    .y((d) => yScale(d.value))
    .curve(curveMonotoneX);

  return (
    <div>
      <svg
        className="lineChartSvg"
        width={width + margins.left + margins.right}
        height={height + margins.top + margins.bottom}
      >
        <g transform={`translate(${margins.left}, ${margins.top})`}>
          <XYAxis {...{ xScale, yScale, height, ticks, t }} />
          <Line
            data={data}
            xScale={xScale}
            yScale={yScale}
            lineGenerator={lineGenerator}
            width={width}
            height={height}
          />
        </g>
      </svg>
    </div>
  );
}

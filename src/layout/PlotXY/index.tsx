import { extent } from 'd3-array';
import { scaleLinear, NumberValue } from 'd3-scale';
import { Transition, transition } from 'd3-transition';
import React from 'react';

import { PlotContext } from '../hooks/plotXY';

import LineSerie from './components/LineSerie';
import XYAxis from './components/axis/xy-axis';

export interface Data {
  name: number;
  value: number;
}
export type TransitionType = Transition<HTMLElement, unknown, null, undefined>;
export interface Margins {
  top?: 20;
  right?: 20;
  bottom?: 50;
  left?: 50;
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
  const margins: Margins = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
  };
  const { top = 0, left = 0, right = 0, bottom = 0 } = margins;
  const width = parentWidth - left - right;
  const height = 200 - top - bottom;

  const ticks = 5;
  const t: TransitionType = transition().duration(1000);

  const xScale = scaleLinear<number>()
    .domain(extent<Data, number>(data, (d) => d.name) as Iterable<NumberValue>)
    .rangeRound([0, width]);

  const yScale = scaleLinear<number>()
    .domain(extent<Data, number>(data, (d) => d.value) as Iterable<NumberValue>)
    .range([height, 0])
    .nice();

  return (
    <PlotContext.Provider
      value={{
        width,
        height,
        margins,
        xScale,
        yScale,
        ticks,
        t,
      }}
    >
      <svg
        className="lineChartSvg"
        width={width + left + right}
        height={height + top + bottom}
      >
        <g transform={`translate(${left}, ${top})`}>
          <XYAxis
            xLabel="labelx"
            yLabel="labely"
            labelStyle={{ fontSize: '18px' }}
          />
          <LineSerie data={data} xScale={xScale} yScale={yScale} color="red" />
        </g>
      </svg>
    </PlotContext.Provider>
  );
}

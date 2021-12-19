import { Meta } from '@storybook/react';
import React from 'react';

import data from '../src/data/variables.json';
import PlotXY, { Data, Margins, XmlPlotXY } from '../src/layout/PlotXY';
import LineSerie from '../src/layout/PlotXY/components/LineSerie';
import XYAxis from '../src/layout/PlotXY/components/axis/xy-axis';

export default {
  title: 'Layout/PlotXY',
} as Meta;

export function MultiLines() {
  const data1 = [
    { x: 1, y: 100 },
    { x: 2, y: 10 },
    { x: 3, y: 50 },
    { x: 4, y: 20 },
    { x: 5, y: 80 },
    { x: 6, y: 30 },
    { x: 7, y: 0 },
    { x: 8, y: 20 },
    { x: 9, y: 100 },
    { x: 10, y: 55 },
    { x: 11, y: 60 },
    { x: 20, y: 80 },
  ];
  const data2 = [
    { x: 1, y: 100 },
    { x: 2, y: 10 },
    { x: 3, y: 20 },
    { x: 4, y: 20 },
    { x: 5, y: 80 },
    { x: 6, y: 200 },
    { x: 7, y: 0 },
    { x: 8, y: 20 },
    { x: 9, y: 5 },
    { x: 10, y: 8 },
    { x: 11, y: 60 },
    { x: 20, y: 20 },
  ];
  const margins: Margins = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
  };
  return (
    <PlotXY
      dataArray={[data1, data2]}
      margins={margins}
      width={400}
      height={200}
      ticks={5}
    >
      <XYAxis
        xLabel="Xlabel"
        yLabel="Ylabel"
        labelStyle={{ fontSize: '18px' }}
      />
      <LineSerie data={data1} color="red" />
      <LineSerie data={data2} color="blue" />
    </PlotXY>
  );
}
export function PlotFromXML() {
  const x = data.x;
  const y = data.y;
  const dataOff: Data[] = [];
  x.data.forEach((x, key) => {
    dataOff.push({ x: x, y: y.data[key] });
  });
  const margins: Margins = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
  };
  return (
    <XmlPlotXY
      data={data}
      margins={margins}
      width={400}
      height={200}
      ticks={5}
    />
  );
}

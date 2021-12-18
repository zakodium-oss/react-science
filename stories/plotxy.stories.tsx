import { Meta } from '@storybook/react';
import React from 'react';

import PlotXY, { Margins } from '../src/layout/PlotXY';
import LineSerie from '../src/layout/PlotXY/components/LineSerie';
import XYAxis from '../src/layout/PlotXY/components/axis/xy-axis';

export default {
  title: 'Layout/PlotXY',
} as Meta;

export function Test() {
  const data = [
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
  const data2 = [
    { name: 1, value: 100 },
    { name: 2, value: 10 },
    { name: 3, value: 20 },
    { name: 4, value: 20 },
    { name: 5, value: 80 },
    { name: 6, value: 90 },
    { name: 7, value: 0 },
    { name: 8, value: 20 },
    { name: 9, value: 5 },
    { name: 10, value: 8 },
    { name: 11, value: 60 },
    { name: 20, value: 20 },
  ];
  const margins: Margins = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 50,
  };
  return (
    <PlotXY data={data} margins={margins} width={400} height={200} ticks={5}>
      <XYAxis
        xLabel="labelx"
        yLabel="labely"
        labelStyle={{ fontSize: '18px' }}
      />
      <LineSerie data={data} color="red" />
      <LineSerie data={data2} color="blue" />
    </PlotXY>
  );
}

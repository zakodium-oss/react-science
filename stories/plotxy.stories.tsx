import { Meta } from '@storybook/react';
import React from 'react';

/*
import Plot from '../src/layout/PlotOld';
import Axis from '../src/layout/PlotOld/Axis';
import Heading from '../src/layout/PlotOld/Heading';
import LineSeries from '../src/layout/PlotOld/LineSeries';
import data from './covid-cases.json';
*/
import PlotXY from '../src/layout/PlotXY';

export default {
  title: 'Layout/PlotXY',
} as Meta;

/**
export function TestPlot() {
  return (
    <Plot
      height={540}
      width={900}
      margin={{ bottom: 50, left: 100, top: 50, right: 10 }}
      seriesViewportStyle={{
        stroke: 'black',
        strokeWidth: 0.3,
      }}
    >
      <Heading title="COVID-19 cases in USA (2020)" />
      <LineSeries
        data={data}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'red', strokeWidth: 2 }}
      />
      <Axis
        id="x"
        position="bottom"
        label="Week"
        labelSpace={30}
        paddingStart={0}
        paddingEnd={0}
      />
      <Axis
        id="y"
        position="left"
        label="Number of cases"
        labelSpace={68}
        paddingEnd={0.1}
        paddingStart={0}
      />
    </Plot>
  );
}*/
export function Test() {
  return <PlotXY />;
}

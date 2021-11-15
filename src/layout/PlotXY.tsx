import * as d3 from 'd3';
import React, { useEffect } from 'react';

import './index.css';

function LineChart(props: { data: number[]; width: number; height: number }) {
  const { data, width, height } = props;

  useEffect(() => {
    const svg = d3
      .select('#container')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]).domain([0, height]);
    const generateScaledLine = d3
      .line()
      .x((_d: any, i: number) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    drawChart();
  }, [data]);

  function drawChart() {
    // Add logic to draw the chart here
  }
  return <div id="container" />;
}

export default LineChart;

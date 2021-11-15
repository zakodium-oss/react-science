import * as d3 from 'd3';
import React, {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';

function LineChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const data = [65, 50, 40, 90, 15, 20, 8, 90, 65];
    const w = 400;
    const h = 100;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3');

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);
    const generateScaledLine = d3
      .line<number[]>()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('d', (d) => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'black');
    drawChart();
  }, [data]);

  function drawChart() {
    // Add logic to draw the chart here
  }
  return (
    <div className="PlotXY">
      <svg ref={svgRef}>test</svg>
    </div>
  );
}

export default LineChart;

import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

function LineChart() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = [
    65, 50, 40, 90, 15, 20, 8, 90, 65, 50, 40, 90, 15, 20, 8, 90, 65, 90, 15,
    20, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90,
    65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90,
    65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90,
    65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90,
    65, 8, 90, 65, 8, 90, 70, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90,
    65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65, 8, 90, 65,
  ];
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const w = 700;
    const h = 100;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('overflow', 'visible')
      .style('margin', '50px');

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length / 10)
      .tickFormat((i) => i);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append('g').call(xAxis).attr('transform', `translate(0,${h})`);
    svg.append('g').call(yAxis);
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

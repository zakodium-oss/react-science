import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

interface MyData {
  x: number;
  y: number;
}
function LineChart() {
  const createData = (dataX: number[], dataY: number[]): MyData[] => {
    const data: MyData[] = [];
    if (dataX.length !== dataY.length) return [];
    let length = dataX.length;
    for (let i = 0; i < length; i++) {
      data[i] = { x: dataX[i], y: dataY[i] };
    }
    return data;
  };
  //data
  const [dataX] = useState<number[]>([
    4, 5, 12, 13, 20, 25, 31, 32, 37, 41, 50, 52, 55,
  ]);
  //const MonotoneX = true;
  const minX = 4;
  const maxX = 55;
  const [dataY] = useState<number[]>([
    55, 41, 451, 45, 555, 55, 85, 105, 150, 190, 100, 616, 65,
  ]);
  const [data] = useState<MyData[]>(createData(dataX, dataY));
  //const MonotoneY = false;
  const minY = 0;
  const maxY = 700;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const w = 700;
    const h = 300;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('overflow', 'visible')
      .style('margin', '40px');

    const xScale = d3.scaleLinear<number>().domain([minX, maxX]).range([0, w]);
    const yScale = d3.scaleLinear<number>().domain([minY, maxY]).range([h, 0]);
    const generateScaledLine = d3
      .line<MyData>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveMonotoneX);
    const xAxis = d3.axisBottom(xScale);
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
  }, [data, minX, maxX, minY, maxY]);

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

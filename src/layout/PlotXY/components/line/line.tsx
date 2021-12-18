import { ScaleLinear } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
import React, { CSSProperties } from 'react';

import { Data } from '../..';

class Line extends React.Component<{
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  data: Data[];
  lineGenerator: any;
  width: number;
  height: number;
  lineStyle?: CSSProperties;
  color?: string;
}> {
  // eslint-disable-next-line react/sort-comp
  public ref: React.RefObject<SVGGElement> = React.createRef<SVGGElement>();

  public componentDidMount() {
    const node = this.ref.current;
    const { xScale, yScale, data, lineGenerator } = this.props;

    const initialData = data.map((d) => ({
      name: d.name,
      value: 0,
    }));

    select(node)
      .append('path')
      .datum(initialData)
      .attr('id', 'line')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', lineGenerator);

    // select(node)
    //   .selectAll('circle')
    //   .data(data)
    //   .enter()
    //   .append('circle')
    //   .attr('class', 'circle')
    //   .attr('stroke', '#ECC417')
    //   .attr('stroke-width', '2')
    //   .attr('fill', '#333')
    //   .attr('r', 3)
    //   .attr('cx', (d, key) => xScale(key))
    //   .attr('cy', d => yScale(d.count));

    this.updateChart();
  }
  public componentDidUpdate() {
    this.updateChart();
  }
  public updateChart() {
    const { lineGenerator, xScale, yScale, data } = this.props;

    const t: any = transition().duration(1000);

    const line = select('#line');
    const dot = selectAll('.circle');

    line.datum(data).transition(t).attr('d', lineGenerator);

    // dot
    //   .data(data)
    //   .transition(t)
    //   .attr('cx', (d, key) => xScale(key))
    //   .attr('cy', d => yScale(d.count));
  }
  public render() {
    return <g className="line-group" ref={this.ref} />;
  }
}

export default Line;

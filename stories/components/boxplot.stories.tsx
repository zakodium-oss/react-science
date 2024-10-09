import { ComponentType } from 'react';

import { BoxPlot } from '../../src/components/value-renderers/BoxPlot';

Control.args = {};

export default {
  title: 'Components / BoxPlot',
  decorators: [
    (Story: ComponentType) => (
      <div style={{ margin: 12, height: '100%', overflowY: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

const props = {
  min: 1,
  q1: 2,
  median: 3,
  q3: 4,
  max: 7,
  outliers: [1.2, 9.5],
  markers: [2.5, 7.5],
  scaleMin: 0,
  scaleMax: 10,
  whiskerStyle: {},
  medianStyle: {},
  lineStyle: {},
};

export function Control() {
  return <BoxPlot {...props} />;
}

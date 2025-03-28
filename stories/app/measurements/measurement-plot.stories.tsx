import type { MeasurementPlotProps } from '../../../src/app/helpers/index.js';
import { MeasurementPlot } from '../../../src/app/helpers/index.js';
import { irMeasurement } from '../../data/data.js';

export default {
  title: 'Layout/MeasurementPlot',
};

export function Control(
  props: Omit<MeasurementPlotProps, 'measurement' | 'measurementDisplay'> & {
    color: string;
  },
) {
  const { color, ...rest } = props;
  return (
    <MeasurementPlot
      measurement={irMeasurement}
      measurementDisplay={{
        color: { kind: 'fixed', color },
        visible: true,
      }}
      {...rest}
    />
  );
}

Control.args = {
  dataIndex: 0,
  xVariableName: 'x',
  yVariableName: 'y',
  width: '100%',
  height: 300,
  crossHair: true,
  showHorizontalAxis: true,
  showVerticalAxis: true,
  showHorizontalGrid: true,
  showVerticalGrid: true,
  flipHorizontalAxis: false,
  color: 'red',
};

Control.argTypes = {
  xVariableName: {
    defaultValue: 'x',
    options: ['x', 'y', 't', 'a'],
    control: { type: 'select' },
  },
  yVariableName: {
    defaultValue: 'y',
    options: ['x', 'y', 't', 'a'],
    control: { type: 'select' },
  },
  zoom: {
    defaultValue: 'horizontal',
    options: ['horizontal', 'vertical', 'rectangular', ''],
    control: { type: 'select' },
  },
  wheelZoom: {
    defaultValue: 'vertical',
    options: ['horizontal', 'vertical', ''],
    control: { type: 'select' },
  },
};

import measurement from '../../data/irMeasurement.json';

import {
  MeasurementMassPlot,
  MeasurementPlot,
  MeasurementPlotProps,
} from '@/app/components';
import type { IRMeasurement } from '@/app/data/IRMeasurement';

let irMeasurement = measurement as IRMeasurement;

export default {
  title: 'Layout/MeasurementPlot',
};

export function Control(props: Omit<MeasurementPlotProps, 'measurement'>) {
  return <MeasurementPlot measurement={irMeasurement} {...props} />;
}
export function Mass(props: Omit<MeasurementPlotProps, 'measurement'>) {
  return <MeasurementMassPlot measurement={irMeasurement} {...props} />;
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

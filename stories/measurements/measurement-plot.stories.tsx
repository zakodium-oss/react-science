import { MeasurementPlot, MeasurementPlotProps } from '../../src';
import data from '../data/irMeasurement.json';

export default {
  title: 'Layout/MeasurementPlot',
};

export function Control(props: Omit<MeasurementPlotProps, 'measurement'>) {
  return <MeasurementPlot measurement={data} {...props} />;
}

Control.args = {
  dataIndex: 0,
  xVariableName: 'x',
  yVariableName: 'y',
  width: 800,
  height: 400,
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
    control: 'select',
  },
  yVariableName: {
    defaultValue: 'y',
    options: ['x', 'y', 't', 'a'],
    control: 'select',
  },
  zoom: {
    defaultValue: 'horizontal',
    options: ['horizontal', 'vertical', 'rectangular', ''],
    control: 'select',
  },
  wheelZoom: {
    defaultValue: 'vertical',
    options: ['horizontal', 'vertical', ''],
    control: 'select',
  },
};

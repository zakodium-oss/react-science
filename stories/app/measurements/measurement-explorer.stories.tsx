import type { MeasurementExplorerProps } from '../../../src/app/index.js';
import { MeasurementExplorer } from '../../../src/app/index.js';
import type { IrMeasurement } from '../../../src/app-data/index.js';
import measurement from '../../data/irMeasurement.json' with { type: 'json' };

const irMeasurement = measurement as IrMeasurement;

export default {
  title: 'Measurements / Measurement explorer',
};

export function Control(props: Omit<MeasurementExplorerProps, 'measurement'>) {
  return <MeasurementExplorer measurement={irMeasurement} {...props} />;
}

Control.args = {
  width: 800,
  height: 400,
  zoom: 'horizontal',
  wheelZoom: 'vertical',
  crossHair: true,
  showHorizontalAxis: true,
  showVerticalAxis: true,
  showHorizontalGrid: true,
  showVerticalGrid: true,
  flipHorizontalAxis: false,
  measurementDisplay: {
    color: {
      kind: 'fixed',
      color: 'red',
    },
    visible: true,
  },
};

import type { IRMeasurement } from '../../../src/app-data/index';
import {
  MeasurementExplorer,
  MeasurementExplorerProps,
} from '../../../src/app/index';
import measurement from '../../data/irMeasurement.json';

let irMeasurement = measurement as IRMeasurement;

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
};

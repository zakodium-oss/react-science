import measurement from '../../data/irMeasurement.json';

import {
  MeasurementExplorer,
  MeasurementExplorerProps,
} from '@/app/components';
import type { IRMeasurement } from '@/app/data/IRMeasurement';

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

import { MeasurementExplorer, MeasurementExplorerProps } from '../src';

import data from './data/measurement.json';

export default {
  title: 'Layout/MeasurementExplorer',
  component: MeasurementExplorer,
  args: {
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
  },
};

export function control(props: Omit<MeasurementExplorerProps, 'measurement'>) {
  return <MeasurementExplorer measurement={data} {...props} />;
}

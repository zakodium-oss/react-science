import { MeasurementExplorer, MeasurementExplorerProps } from '../../src';
import data from '../data/measurements.json';

export default {
  title: 'Measurements / Measurement explorer',
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

export function Basic(props: Omit<MeasurementExplorerProps, 'measurement'>) {
  return (
    <MeasurementExplorer
      measurement={data.measurements.ir.entries[0]}
      {...props}
    />
  );
}

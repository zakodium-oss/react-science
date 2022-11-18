import { getTestFileCollection } from '../../../../test-utils';
import {
  loadMeasurements,
  jcampLoader,
  IrMeasurement,
  getIrAutoPeakPickingEnhancer,
  irMeasurementEnhancer,
} from '../../../index';

const loaders = [jcampLoader];
const enhancers = {
  ir: [
    irMeasurementEnhancer,
    getIrAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
  ],
};

export async function getIrMeasurement() {
  const fileCollection = await getTestFileCollection('jdx');
  const filteredFileCollection = fileCollection.filter(
    (file) => file.name === 'ir.jdx',
  );

  const { measurements } = await loadMeasurements(filteredFileCollection, {
    loaders,
    enhancers,
  });
  return measurements.ir?.entries[0] as IrMeasurement;
}

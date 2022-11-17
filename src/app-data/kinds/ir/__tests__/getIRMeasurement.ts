import { getTestFileCollection } from '../../../../test-utils';
import {
  loadMeasurements,
  jcampLoader,
  IRMeasurement,
  getIRAutoPeakPickingEnhancer,
  irMeasurementEnhancer,
} from '../../../index';

const loaders = [jcampLoader];
const enhancers = {
  ir: [
    irMeasurementEnhancer,
    getIRAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
  ],
};

export async function getIRMeasurement() {
  const fileCollection = await getTestFileCollection('jdx');
  const filteredFileCollection = fileCollection.filter(
    (file) => file.name === 'ir.jdx',
  );

  const { measurements } = await loadMeasurements(filteredFileCollection, {
    loaders,
    enhancers,
  });
  return measurements.ir?.entries[0] as IRMeasurement;
}

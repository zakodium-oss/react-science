import { getTestFileCollection } from '../../utils/test-utils';
import type { IRMeasurement } from '../IRMeasurement';
import { getIRAutoPeakPickingEnhancer } from '../enhancers/irAutoPeakPickingEnhancer';
import { irMeasurementEnhancer } from '../enhancers/irMeasurementEnhancer';
import { loadMeasurements } from '../loadMeasurements';
import { jcampLoader } from '../loaders/jcampLoader';

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

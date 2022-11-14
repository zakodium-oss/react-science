import { expect, test } from 'vitest';

import { getTestFileCollection } from '../../../../utils/test-utils';
import { getMeasurementInfoFromFile } from '../getMeasurementInfoFromFile';

const files = getTestFileCollection('jdx/1h.jdx');
test('getMeasurementInfoFromFile', () => {
  expect(getMeasurementInfoFromFile(files[0])).toMatchObject({
    filename: '1h.jdx',
    path: 'jdx/1h.jdx',
    info: {
      lastModified: 1629200000000,
      size: 1000,
    },
  });
});

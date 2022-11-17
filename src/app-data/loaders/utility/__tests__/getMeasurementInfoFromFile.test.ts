import type { FileCollectionItem } from 'filelist-utils';
import { expect, test } from 'vitest';

import { getTestFileCollection } from '../../../../test-utils';
import { getMeasurementInfoFromFile } from '../getMeasurementInfoFromFile';

test('getMeasurementInfoFromFile', async () => {
  const { files } = await getTestFileCollection('jdx');
  const jdx = files.find((f) => f.name === '1h.jdx') as FileCollectionItem;
  expect(getMeasurementInfoFromFile(jdx)).toMatchObject({
    filename: '1h.jdx',
    relativePath: 'jdx/1h.jdx',
    info: {
      size: 175555,
    },
  });
});

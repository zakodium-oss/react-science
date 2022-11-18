import type { FileCollectionItem } from 'filelist-utils';
import { expect, test } from 'vitest';

import { getTestFileCollection } from '../../../../test-utils';
import { getMeasurementInfoFromFile } from '../getMeasurementInfoFromFile';

test('getMeasurementInfoFromFile', async () => {
  const { files } = await getTestFileCollection('jdx');
  const jdx = files.find((f) => f.name === '1h.jdx') as FileCollectionItem;
  expect(getMeasurementInfoFromFile(jdx, 'jdx title')).toMatchObject({
    info: {
      title: 'jdx title',
      file: {
        name: '1h.jdx',
        path: 'jdx/1h.jdx',
        size: 175555,
      },
    },
  });
});

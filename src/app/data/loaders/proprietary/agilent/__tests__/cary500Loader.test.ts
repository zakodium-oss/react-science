import { join } from 'path';

import { fileCollectionFromPath } from 'filelist-utils';

import { cary500Loader } from '../cary500Loader';

test('cary500Loader', async () => {
  const fileCollection = await fileCollectionFromPath(join(__dirname, 'data'));
  // we should filter to keep only the right data
  const results = await cary500Loader(fileCollection);

  expect(results.uvvis.entries).toHaveLength(8);
});

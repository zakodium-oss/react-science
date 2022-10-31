import path from 'node:path';

import { fileCollectionFromPath } from 'filelist-utils';
import { expect, test } from 'vitest';

import { getEmptyDataState } from '../DataState';
import { append } from '../append';
import { biologicLoader } from '../loaders/biologicLoader';

test('getIVMeasurement', async () => {
  const result = await getIVMeasurement();

  expect(result.entries).toHaveLength(2);
});

const loaders = [biologicLoader];

export async function getIVMeasurement() {
  const dataState = getEmptyDataState();
  const fileCollection = await fileCollectionFromPath(
    path.join(__dirname, 'data/biologic/'),
  );
  const appended = await append(fileCollection, dataState, { loaders });
  return appended.dataState.measurements.iv;
}

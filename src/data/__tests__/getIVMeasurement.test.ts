import { join } from 'path';

import { fileListFromPath } from 'filelist-utils';
import { expect, test } from 'vitest';

import { append } from '../append';
import { getEmptyDataState } from '../getEmptyDataState';
import { biologicLoader } from '../loaders/biologicLoader';

test('getIVMeasurement', async () => {
  const result = await getIVMeasurement();

  expect(result.entries).toHaveLength(2);
});

const loaders = [biologicLoader];

export async function getIVMeasurement() {
  const dataState = getEmptyDataState();
  const fileList = await fileListFromPath(join(__dirname, 'data/biologic/'));
  const ivEntries = (await append(fileList, dataState, { loaders })).dataState
    .measurements.iv;
  return ivEntries;
}

//@ts-nocheck

import { join } from 'path';

import { fileListFromPath } from 'filelist-utils';

import { append } from '../append';
import { getEmptyDataState } from '../getEmptyDataState';

test('append', async () => {
  const dataState = getEmptyDataState();
  const fileList = fileListFromPath(join(__dirname, 'data'));
  const { dataState: newDataState } = await append(fileList, dataState);

  const { measurements } = newDataState;
  expect(Object.keys(measurements)).toStrictEqual([
    'ir',
    'raman',
    'uv',
    'nmr1h',
    'mass',
    'other',
  ]);
  const { ir, raman, uv } = measurements;
  expect(ir.entries).toHaveLength(2);
  expect(raman.entries).toHaveLength(36);
  expect(uv.entries).toHaveLength(2);
});

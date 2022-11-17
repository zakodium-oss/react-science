import path from 'node:path';

import { fileCollectionFromPath } from 'filelist-utils';

export function getTestDataPath(...subpaths: string[]) {
  return path.join(__dirname, '..', 'test-data', ...subpaths);
}

export function getTestFileCollection(...subpaths: string[]) {
  return fileCollectionFromPath(getTestDataPath(...subpaths));
}

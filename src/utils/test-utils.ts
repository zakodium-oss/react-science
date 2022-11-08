import path from 'node:path';

import { fileCollectionFromPath } from 'filelist-utils';

export function getDemoDataPath(...subpaths: string[]) {
  return path.join(__dirname, '..', '..', 'test-data', ...subpaths);
}

export function getDemoFileCollection(...subpaths: string[]) {
  return fileCollectionFromPath(getDemoDataPath(...subpaths));
}

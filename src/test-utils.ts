import path from 'node:path';

import { FileCollection } from 'file-collection';

export function getTestDataPath(...subpaths: string[]) {
  return path.join(__dirname, '..', 'test-data', ...subpaths);
}

export function getTestFileCollection(...subpaths: string[]) {
  return FileCollection.fromPath(getTestDataPath(...subpaths));
}

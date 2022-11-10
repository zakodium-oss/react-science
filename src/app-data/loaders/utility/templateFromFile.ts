import { v4 } from '@lukeed/uuid';
import type { FileCollectionItem } from 'filelist-utils';

/**
 * loaders accepting a FileCollectionItem as input can use this function
 * to create a template for the MeasurementBase (part)
 */
export function templateFromFile({
  name,
  relativePath,
  lastModified,
  size,
}: FileCollectionItem) {
  return {
    id: v4(),
    filename: name,
    path: relativePath,
    info: { lastModified, size },
  };
}

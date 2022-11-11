import { v4 } from '@lukeed/uuid';
import type { FileCollectionItem } from 'filelist-utils';

/**
 * creates a template for the MeasurementBase (part)
 * generated from just the file metadata only and id
 * @param obj - file as collection item.
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
import { v4 } from '@lukeed/uuid';
import type { FileCollectionItem } from 'filelist-utils';

/**
 * creates a template for the MeasurementBase (part)
 * generated from just the file metadata only and id
 * @param obj - file as collection item.
 */
export function getMeasurementInfoFromFile(
  { name, relativePath, lastModified, size }: FileCollectionItem,
  title: string,
) {
  return {
    id: v4(),
    info: {
      title,
      file: { name, path: relativePath, lastModified, size },
    },
  };
}

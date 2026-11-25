import type { FileItem } from 'file-collection';

/**
 * creates a template for the MeasurementBase (part)
 * generated from just the file metadata only and id
 * @param obj - file as collection item.
 * @param title
 */
export function getMeasurementInfoFromFile(
  { name, relativePath, lastModified, size }: FileItem,
  title: string,
) {
  return {
    id: crypto.randomUUID(),
    info: {
      title,
      file: { name, path: relativePath, lastModified, size },
    },
  };
}

import { v4 } from '@lukeed/uuid';
import { convert } from 'biologic-converter';
import { PartialFileList } from 'filelist-utils';

import { DataState, Loader } from '../DataState';

export const biologicLoader: Loader = async function wdfLoader(
  fileList: PartialFileList,
  dataState: DataState,
) {
  const results = await convert(fileList);
  for (const result of results) {
    // for now WDF file format is always expected to be Raman
    dataState.measurements.iv.entries.push({
      id: v4(),
      meta: result.mps ? { ...result.mps } : {},
      filename: '',
      path: result.dir,
      info: {},
      title: '',
      data: [],
    });
  }
};

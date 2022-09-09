import { v4 } from '@lukeed/uuid';
import { PartialFileList } from 'filelist-utils';
import { parse } from 'spc-parser';

import { DataState, Loader } from '../DataState';

export const spcLoader: Loader = async function jcampLoader(
  fileList: PartialFileList,
  dataState: DataState,
) {
  for (const file of fileList) {
    if (file.name.match(/\.spc$/i)) {
      const parsed = parse(await file.arrayBuffer());

      // todo currently only SPC for IR. How to find out the kind it is ????
      dataState.measurements.ir.entries.push({
        id: v4(),
        meta: parsed.meta,
        filename: file.name,
        path: file.webkitRelativePath,
        info: {},
        title: parsed.meta.memo,
        data: parsed.spectra,
      });
    }
  }
};
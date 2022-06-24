import { PartialFileList } from 'filelist-utils';
import { produce } from 'immer';

import { DataState, Processor } from './DataState';
import { jcampProcessor } from './processors/jcampProcessor';

const defaultProcessors = [jcampProcessor];

interface AppendOptions {
  processors?: Processor[];
}
/**
 * Adds in the state the information that can be extracted from the fileList
 * We can add 'processors' that based on the extension, filename, path or content
 * could process the data before adding it in the state
 */
export async function append(
  fileList: PartialFileList,
  baseState: DataState,
  options: AppendOptions,
) {
  const { processors = defaultProcessors } = options;

  const nextDataState = await produce(baseState, async (draft) => {
    for (const processor of processors) {
      await processor(fileList, draft);
    }
  });

  return { logs: [], dataState: nextDataState };
}

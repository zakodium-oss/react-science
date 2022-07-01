import { ReactNode } from 'react';

import { DropZoneContainer } from '..';
import { append } from '../components/context/data/append';
import { getEmptyDataState } from '../components/context/data/getEmptyDataState';

export default function DropFile(props: { children: ReactNode }) {
  //  const updateState = useUpdateState();
  return (
    <DropZoneContainer
      onDrop={(items) => onDrop(items, updateState).catch(reportError)}
    >
      {props.children}
    </DropZoneContainer>
  );
}

async function onDrop(items: File[], updateState) {
  const newState = await append(items, getEmptyDataState());
  updateState((oldState) => {
    return newState;
  });
}

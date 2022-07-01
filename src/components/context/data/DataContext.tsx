import { createContext, ReactNode, useContext, useReducer } from 'react';

import { getEmptyDataState } from './getEmptyDataState';

const dataContext = createContext(getEmptyDataState());
const dispatchContext = createContext();

export function useDataState() {
  return useContext(dataContext);
}

export function DataContext(props: { children: ReactNode }) {
  const [dataState, dispatch] = useReducer(
    (state, action) => {
      return action;
    },
    undefined,
    getEmptyDataState,
  );

  console.log({ dataState });

  return (
    <dataContext.Provider value={dataState}>
      {props.children}
    </dataContext.Provider>
  );
}

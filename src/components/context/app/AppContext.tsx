import { createContext, ReactNode, useContext, useReducer } from 'react';

const appContext = createContext(getEmptyAppState());

export function useLayoutState() {
  return useContext(appContext);
}

function getEmptyAppState() {
  return {};
}

export function AppContext(props: { children: ReactNode }) {
  const [appState, dispatch] = useReducer(
    (state, action) => {
      return action;
    },
    undefined,
    getEmptyAppState,
  );

  console.log({ appState });

  return (
    <appContext.Provider value={appState}>{props.children}</appContext.Provider>
  );
}

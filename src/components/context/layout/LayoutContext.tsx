import { createContext, ReactNode, useContext, useReducer } from 'react';

const layoutContext = createContext(getEmptyLayoutState());

function getEmptyLayoutState() {
  return {};
}

export function useLayoutState() {
  return useContext(layoutContext);
}

export function LayoutContext(props: { children: ReactNode }) {
  const [layoutState, dispatch] = useReducer(
    (state, action) => {
      return action;
    },
    undefined,
    getEmptyLayoutState,
  );

  console.log({ layoutState });

  return (
    <layoutContext.Provider value={layoutState}>
      {props.children}
    </layoutContext.Provider>
  );
}

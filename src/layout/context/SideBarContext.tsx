import { produce } from 'immer';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from 'react';

import { ToolbarOrientation } from '../SideBarLayout';

export type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };

export interface FormEditorUtils {}
export interface SideBarState {
  orientation: ToolbarOrientation;
}

type SideBarActions = ActionType<''>;

type SideBarDispatch = Dispatch<SideBarActions>;
type SideBarContext = [SideBarState, SideBarDispatch];

const sideBarcontext = createContext<SideBarContext | null>(null);

const reducer: Reducer<SideBarState, SideBarActions> = produce(
  (draft: SideBarState, action: SideBarActions) => {
    switch (action.type) {
      default:
        break;
    }
  },
);

export function useSideBarContext() {
  const context = useContext(sideBarcontext);
  if (!context) {
    throw new Error('SideBarContext was not found');
  }

  return context;
}

export function SideBarProvider(props: {
  children: ReactNode;
  initialState: SideBarState;
}) {
  const context = useReducer(reducer, props.initialState);

  return (
    <sideBarcontext.Provider value={context}>
      {props.children}
    </sideBarcontext.Provider>
  );
}

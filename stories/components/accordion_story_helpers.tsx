import type { Dispatch, ReactNode } from 'react';
import { createContext, useContext, useMemo, useReducer } from 'react';
import { match } from 'ts-pattern';

import { Accordion, assert } from '../../src/components/index.js';

type AccordionStoryItemId = 'first' | 'second' | 'third';

interface AccordionStoryState {
  openItems: AccordionStoryItemId[];
}

type AccordionStoryAction =
  | { type: 'add'; id: AccordionStoryItemId }
  | { type: 'remove'; id: AccordionStoryItemId };

function accordionStoryReducer(
  state: AccordionStoryState,
  action: AccordionStoryAction,
) {
  return match(action)
    .with({ type: 'add' }, ({ id }) => {
      return {
        openItems: Array.from(new Set([...state.openItems, id])),
      };
    })
    .with({ type: 'remove' }, ({ id }) => {
      return {
        openItems: state.openItems.filter((item) => item !== id),
      };
    })
    .exhaustive();
}

const accordionStoryContext = createContext<{
  state: AccordionStoryState;
  dispatch: Dispatch<AccordionStoryAction>;
} | null>(null);

export function AccordionStoryProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(accordionStoryReducer, {
    openItems: ['first'],
  });
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <accordionStoryContext.Provider value={value}>
      {props.children}
    </accordionStoryContext.Provider>
  );
}

interface AccordionStoryItemProps {
  id: AccordionStoryItemId;
  title: string;
  children: ReactNode;
}

export function AccordionStoryItem(props: AccordionStoryItemProps) {
  const { id, title, children } = props;
  const contextValue = useContext(accordionStoryContext);
  assert(contextValue, 'AccordionStoryItem must be used within AccordionStory');
  const { state, dispatch } = contextValue;
  if (!state) {
    throw new Error('AccordionStoryItem must be used within AccordionStory');
  }

  return (
    <Accordion.Item<AccordionStoryItemId>
      id={id}
      title={title}
      open={state.openItems.includes(id)}
      onOpenChange={(isOpen) =>
        isOpen
          ? dispatch({ type: 'add', id })
          : dispatch({ type: 'remove', id })
      }
    >
      {children}
    </Accordion.Item>
  );
}

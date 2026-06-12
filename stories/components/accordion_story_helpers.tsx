import type { Dispatch, ReactNode } from 'react';
import { createContext, useContext, useMemo, useReducer } from 'react';
import { match } from 'ts-pattern';

import type { AccordionItemProps } from '../../src/components/index.js';
import { Accordion, assert } from '../../src/components/index.js';

interface AccordionStoryState<T extends string> {
  openItems: readonly T[];
}

type AccordionStoryAction<T extends string> =
  | { type: 'add'; id: T }
  | { type: 'remove'; id: T };

function accordionStoryReducer<T extends string>(
  state: AccordionStoryState<T>,
  action: AccordionStoryAction<T>,
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

interface AccordionStoryContextValue {
  state: AccordionStoryState<string>;
  dispatch: Dispatch<AccordionStoryAction<string>>;
}

const accordionStoryContext = createContext<AccordionStoryContextValue | null>(
  null,
);

export function AccordionStoryProvider(props: {
  children: ReactNode;
  initialOpenItems: readonly string[];
}) {
  const [state, dispatch] = useReducer(accordionStoryReducer, {
    openItems: props.initialOpenItems,
  });
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <accordionStoryContext.Provider value={value}>
      {props.children}
    </accordionStoryContext.Provider>
  );
}

type AccordionStoryItemProps<T extends string = string> = Pick<
  AccordionItemProps,
  'title' | 'children' | 'renderToolbar'
> & {
  id: T;
};

export function AccordionStoryItem<T extends string = string>(
  props: AccordionStoryItemProps<T>,
) {
  const { id, ...otherProps } = props;
  const contextValue = useContext(accordionStoryContext);
  assert(contextValue, 'AccordionStoryItem must be used within AccordionStory');
  const { state, dispatch } = contextValue;
  if (!state) {
    throw new Error('AccordionStoryItem must be used within AccordionStory');
  }

  return (
    <Accordion.Item<T>
      id={id}
      open={state.openItems.includes(id)}
      onOpenChange={(isOpen) =>
        isOpen
          ? dispatch({ type: 'add', id })
          : dispatch({ type: 'remove', id })
      }
      {...otherProps}
    />
  );
}

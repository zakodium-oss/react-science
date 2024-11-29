import type { Placement } from '@popperjs/core';
import type { HTMLAttributes } from 'react';
import { useState } from 'react';
import type { Modifier } from 'react-popper';
import { usePopper } from 'react-popper';

const sameWidthModifier: Modifier<'sameWidth'> = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${
      state.elements.reference.getBoundingClientRect().width
    }px`;
  },
};

function getOffsetModifier(offset: number): Modifier<'offset'> {
  return {
    name: 'offset',
    options: {
      offset: [0, offset],
    },
  };
}

export interface UseModifiedPopperReturn<
  R extends Element = HTMLDivElement,
  P extends HTMLElement = HTMLDivElement,
> {
  setReferenceElement: (ref: R | null) => void;
  setPopperElement: (popper: P | null) => void;
  popperProps: HTMLAttributes<P>;
}

export function useModifiedPopper<
  R extends Element = HTMLDivElement,
  P extends HTMLElement = HTMLDivElement,
>(options: {
  placement?: Placement;
  offset?: number;
  sameWidth?: boolean;
}): UseModifiedPopperReturn<R, P> {
  const { offset, placement, sameWidth } = options;

  const [referenceElement, setReferenceElement] = useState<R | null>(null);
  const [popperElement, setPopperElement] = useState<P | null>(null);

  const modifiers: Array<Modifier<'sameWidth' | 'offset'>> = [];

  if (sameWidth) {
    modifiers.push(sameWidthModifier);
  }

  if (offset) {
    modifiers.push(getOffsetModifier(offset));
  }

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers,
  });

  return {
    setReferenceElement,
    setPopperElement,
    popperProps: {
      style: styles.popper,
      ...attributes.popper,
    },
  };
}

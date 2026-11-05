/**
 * ArrowUp / ArrowDown navigation for a list or a table with one selected row.
 *
 * Several such lists can share a page — a list of items beside a chart and a
 * table under it — so each one is marked with `data-keyboard-list` and a key
 * press only ever moves one of them: the list holding the focus, or else the
 * one listening on the whole document.
 */

import type { RefCallback } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Where a list listens to the arrow keys.
 */
export type ListKeyboardScope = 'container' | 'document';

/**
 * Options of {@link useListKeyboardNavigation}.
 */
export interface ListKeyboardNavigationOptions {
  /**
   * Number of rows in the list.
   */
  count: number;
  /**
   * Index of the selected row, `-1` when nothing is selected.
   */
  selectedIndex: number;
  /**
   * Called with the index of the row to select.
   */
  onSelect: (index: number) => void;
  /**
   * Where the arrow keys are listened to.
   *
   * - `'container'`: only while the focus is inside the list. The container
   *   is made focusable, so clicking any of its rows is enough.
   * - `'document'`: anywhere on the page, so the user never has to click the
   *   list first — except while a text field has the focus, or while the
   *   focus is inside another keyboard navigable list.
   *
   * At most one list of a page should use `'document'`.
   * @default 'container'
   */
  scope?: ListKeyboardScope;
  /**
   * Listen to the keys at all.
   * @default true
   */
  enabled?: boolean;
}

/**
 * Attribute marking the container of a keyboard navigable list.
 */
export const KEYBOARD_LIST_ATTRIBUTE = 'data-keyboard-list';

/**
 * Move the selection of a list with the arrow keys and keep it in view.
 *
 * @param options - See {@link ListKeyboardNavigationOptions}.
 * @returns Callback ref to put on the scrollable container holding the rows;
 * the selected row must carry `data-selected="true"` or `aria-selected="true"`.
 */
export function useListKeyboardNavigation<
  ElementType extends HTMLElement = HTMLDivElement,
>(options: ListKeyboardNavigationOptions): RefCallback<ElementType> {
  const { selectedIndex, scope = 'container', enabled = true } = options;
  // State rather than a ref object: a list that first renders an empty state
  // mounts its container later, and the listener must follow it.
  const [container, setContainer] = useState<ElementType | null>(null);
  const latestOptionsRef = useRef(options);

  // Refreshed after every render so the listener, which is installed once per
  // scope, never reads a stale closure.
  useLayoutEffect(() => {
    latestOptionsRef.current = options;
  });

  useEffect(() => {
    if (!enabled || container === null) return;
    const list: HTMLElement = container;

    list.setAttribute(KEYBOARD_LIST_ATTRIBUTE, scope);
    const isMadeFocusable =
      scope === 'container' && !list.hasAttribute('tabindex');
    if (isMadeFocusable) list.setAttribute('tabindex', '0');

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.defaultPrevented ||
        isTextField(event.target)
      ) {
        return;
      }
      if (scope === 'document' && isInsideOtherList(event.target, list)) {
        return;
      }
      const {
        count,
        selectedIndex: current,
        onSelect,
      } = latestOptionsRef.current;
      if (count === 0) return;
      event.preventDefault();
      const next =
        event.key === 'ArrowDown'
          ? Math.min(current + 1, count - 1)
          : Math.max(current - 1, 0);
      if (next !== current) onSelect(next);
    }

    const target: HTMLElement | Document =
      scope === 'document' ? document : list;
    target.addEventListener('keydown', handleKeyDown as EventListener);
    return () => {
      target.removeEventListener('keydown', handleKeyDown as EventListener);
      list.removeAttribute(KEYBOARD_LIST_ATTRIBUTE);
      if (isMadeFocusable) list.removeAttribute('tabindex');
    };
  }, [container, scope, enabled]);

  useEffect(() => {
    container
      ?.querySelector('[data-selected="true"], [aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [container, selectedIndex]);

  return setContainer;
}

/**
Inputs that never take the arrow keys, so a row may carry one.
*/
const NON_TEXT_INPUT_TYPES = new Set([
  'button',
  'checkbox',
  'color',
  'file',
  'image',
  'radio',
  'reset',
  'submit',
]);

function isTextField(target: EventTarget | null): boolean {
  if (target instanceof HTMLInputElement) {
    return !NON_TEXT_INPUT_TYPES.has(target.type);
  }
  return (
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}

function isInsideOtherList(
  target: EventTarget | null,
  container: HTMLElement,
): boolean {
  if (!(target instanceof Element)) return false;
  const list = target.closest(`[${CSS.escape(KEYBOARD_LIST_ATTRIBUTE)}]`);
  return list !== null && list !== container;
}

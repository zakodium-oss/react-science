import { assertNotNull } from '@/utils/assert';
import { Menu } from '@headlessui/react';
import type { Placement } from '@popperjs/core';
import { ReactNode, Ref, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { useOnOff } from '../hooks/useOnOff';

import { Portal } from '../Portal';

import { MenuItems, MenuOption, MenuOptions } from './MenuItems';
import { useContextMenuPlacement } from './useContextMenuPlacement';

interface DropdownMenuBaseProps<T> {
  /**
   * Placement for react-popper
   */
  placement?: Placement;

  options: MenuOptions<T>;
  onSelect: (selected: MenuOption<T>) => void;
}

interface DropdownMenuClickProps<T> extends DropdownMenuBaseProps<T> {
  /**
   * Node to be inside the Button
   */
  children: ReactNode;
  trigger: 'click';
}

interface DropdownMenuContextProps<T> extends DropdownMenuBaseProps<T> {
  trigger: 'contextMenu';
  children: ReactNode;
}

export type DropdownMenuProps<T> =
  | DropdownMenuContextProps<T>
  | DropdownMenuClickProps<T>;

export default function DropdownMenu<T>(props: DropdownMenuProps<T>) {
  const { trigger, ...otherProps } = props;

  if (trigger === 'contextMenu') {
    return <DropdownContextMenu {...otherProps} />;
  }

  return (
    <DropdownClickMenu {...otherProps}>{props.children}</DropdownClickMenu>
  );
}

function DropdownContextMenu<T>(props: Omit<DropdownMenuProps<T>, 'trigger'>) {
  const { children, ...otherProps } = props;

  const {
    isPopperElementOpen,
    closePopperElement,
    handleContextMenu,
    setPopperElement,
    styles,
    attributes,
  } = useContextMenuPlacement();

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, closePopperElement);

  console.log(isPopperElementOpen);
  return (
    <div
      id="test"
      onContextMenu={handleContextMenu}
      style={{ display: 'contents' }}
    >
      {isPopperElementOpen && (
        <div ref={ref}>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <Menu>
              <MenuItems itemsStatic {...otherProps} />
            </Menu>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}

function DropdownClickMenu<T>(
  props: Omit<DropdownMenuProps<T>, 'trigger'> & { children: ReactNode },
) {
  const { placement = 'bottom-start', ...otherProps } = props;

  const [isOpened, , closeItems, toggle] = useOnOff(false);
  const [targetRef, setTargetRef] = useState<HTMLButtonElement | null>(null);
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const { styles: popperStyles, attributes: popperAttribues } = usePopper(
    targetRef,
    contentRef,
    {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 6],
          },
        },
      ],
    },
  );

  useOnClickOutside(ref, () => {
    closeItems();
  });

  return (
    <div ref={ref}>
      <Menu>
        <Menu.Button ref={setTargetRef} onClick={toggle}>
          {props.children}
        </Menu.Button>
        {isOpened && (
          <Portal>
            <div
              ref={setContentRef}
              style={popperStyles.popper}
              {...popperAttribues.popper}
            >
              <MenuItems itemsStatic {...otherProps} />
            </div>
          </Portal>
        )}
      </Menu>
    </div>
  );
}

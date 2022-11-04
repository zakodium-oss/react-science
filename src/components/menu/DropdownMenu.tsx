import { Menu } from '@headlessui/react';
import type { Placement } from '@popperjs/core';
import { ReactNode, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import { Portal } from '../Portal';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { useOnOff } from '../hooks/useOnOff';

import { MenuItems, MenuOption, MenuOptions } from './MenuItems';

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
}

export type DropdownMenuProps<T> =
  // | DropdownMenuContextProps<T>
  DropdownMenuClickProps<T>;

export default function DropdownMenu<T>(props: DropdownMenuProps<T>) {
  return <DropdownClickMenu {...props}>{props.children}</DropdownClickMenu>;
}

function DropdownClickMenu<T>(
  props: DropdownMenuProps<T> & { children: ReactNode },
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

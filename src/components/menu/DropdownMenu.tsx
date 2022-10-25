/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { Menu } from '@headlessui/react';
import type { Placement } from '@popperjs/core';
import { ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';

import { Portal } from '../Portal';

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

  /**
   * [STILL IN PROGRESS]
   * [click]: the User have to define children (this will be the ref to popper)
   */
  trigger: 'click';
}

interface DropdownMenuContextProps<T> extends DropdownMenuBaseProps<T> {
  /**
   * [STILL IN PROGRESS]
   * [contextMenu]: Children's will act as the Zone wich respond to the context menu event
   */
  trigger: 'contextMenu';
}

export type DropdownMenuProps<T> =
  | DropdownMenuContextProps<T>
  | DropdownMenuClickProps<T>;

const styles: Record<'button', SerializedStyles> = {
  button: css({
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    backgroundColor: 'rgb(107 114 128)',
    borderColor: 'transparent',
    borderRadius: '0.375rem',
    borderWidth: 1,
  }),
};

export default function DropdownMenu<T>(props: DropdownMenuProps<T>) {
  const { trigger, placement, ...otherProps } = props;

  const [targetRef, setTargetRef] = useState<HTMLButtonElement | null>(null);
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
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

  if (trigger === 'contextMenu') {
    return null;
  }

  return (
    <Menu>
      <Menu.Button ref={setTargetRef} css={styles.button}>
        {props.children}
      </Menu.Button>
      <Portal>
        <div
          ref={setContentRef}
          style={popperStyles.popper}
          {...popperAttribues.popper}
        >
          <MenuItems {...otherProps} />
        </div>
      </Portal>
    </Menu>
  );
}

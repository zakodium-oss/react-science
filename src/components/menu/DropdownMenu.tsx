/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { Menu } from '@headlessui/react';
import { createPopper, Placement } from '@popperjs/core';
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
  const { trigger, ...otherProps } = props;

  if (trigger === 'contextMenu') {
    return <DropdownContextMenu {...otherProps} />;
  }

  return (
    <DropdownClickMenu {...otherProps}>{props.children}</DropdownClickMenu>
  );
}

function DropdownContextMenu<T>(props: Omit<DropdownMenuProps<T>, 'trigger'>) {
  const virtualElement = {
    getBoundingClientRect: generateGetBoundingClientRect(),
  };

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(virtualElement, popperElement);
  const popper = createPopper(virtualElement, popperElement);

  return (
    <Menu>
      <Portal>
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <MenuItems {...props} />
        </div>
      </Portal>
    </Menu>
  );
}

function DropdownClickMenu<T>(
  props: Omit<DropdownMenuProps<T>, 'trigger'> & { children: ReactNode },
) {
  const { placement, ...otherProps } = props;

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

function generateGetBoundingClientRect(x = 0, y = 0) {
  return () => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
    x,
    y,
    toJson: () => {},
  });
}

/*
const virtualElement = {
      getBoundingClientRect: generateGetBoundingClientRect(),
    };

    const instance = createPopper(virtualElement, contentRef);

    document.addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
      virtualElement.getBoundingClientRect = generateGetBoundingClientRect(
        x,
        y,
      );

      void instance.update();
    });
*/

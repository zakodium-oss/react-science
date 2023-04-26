import { Menu } from '@headlessui/react';
import type { Placement } from '@popperjs/core';
import { ReactNode, useRef, ElementType, ComponentProps } from 'react';

import { useModifiedPopper } from '../hooks/useModifiedPopper';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { useOnOff } from '../hooks/useOnOff';
import { Portal } from '../root-layout/Portal';

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

type ElementProps<T = unknown> = T extends ElementType
  ? ComponentProps<T>
  : never;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: ElementType | React.ComponentType<any>;
}

export type DropdownMenuProps<T> =
  | DropdownMenuContextProps<T>
  | DropdownMenuClickProps<T>;

export function DropdownMenu<T = unknown, E extends ElementType = 'div'>(
  props: DropdownMenuProps<T> &
    Omit<ElementProps<E>, keyof DropdownMenuProps<T>>,
) {
  const { trigger, ...otherProps } = props;

  if (trigger === 'contextMenu') {
    return <DropdownContextMenu<T, E> {...props} />;
  }
  return (
    <DropdownClickMenu {...otherProps}>{props.children}</DropdownClickMenu>
  );
}

function DropdownContextMenu<T, E extends ElementType = 'div'>(
  props: Omit<DropdownMenuContextProps<T>, 'trigger'> &
    Omit<ElementProps<E>, keyof DropdownMenuProps<T>>,
) {
  const {
    children,
    onSelect,
    as: Wrapper = 'div',
    placement = 'right-start',
    options,
    ...otherProps
  } = props;

  const {
    isPopperElementOpen,
    closePopperElement,
    handleContextMenu,
    setPopperElement,
    styles,
    attributes,
  } = useContextMenuPlacement(placement);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, closePopperElement);

  const { style = {}, ...otherWrapperProps } = otherProps as ElementProps<E>;

  return (
    <Wrapper
      style={{ ...(!props?.as && { display: 'contents' }), ...style }}
      {...otherWrapperProps}
      onContextMenu={handleContextMenu}
    >
      <>
        {isPopperElementOpen && (
          <Portal>
            <div ref={ref}>
              <div
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
              >
                <Menu>
                  <MenuItems
                    itemsStatic
                    onSelect={(selected) => {
                      closePopperElement();
                      onSelect(selected);
                    }}
                    options={options}
                  />
                </Menu>
              </div>
            </div>
          </Portal>
        )}

        {children}
      </>
    </Wrapper>
  );
}

function DropdownClickMenu<T>(
  props: Omit<DropdownMenuProps<T>, 'trigger'> & { children: ReactNode },
) {
  const { placement = 'bottom-start', onSelect, ...otherProps } = props;

  const [isOpened, , closeItems, toggle] = useOnOff(false);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, closeItems);

  const { setReferenceElement, setPopperElement, popperProps } =
    useModifiedPopper<HTMLButtonElement>({ placement, offset: 6 });

  return (
    <Menu>
      <Menu.Button ref={setReferenceElement} onClick={toggle}>
        {props.children}
      </Menu.Button>
      {isOpened && (
        <Portal>
          <div ref={ref}>
            <div ref={setPopperElement} {...popperProps}>
              <MenuItems
                itemsStatic
                onSelect={(selected) => {
                  closeItems();
                  onSelect(selected);
                }}
                {...otherProps}
              />
            </div>
          </div>
        </Portal>
      )}
    </Menu>
  );
}

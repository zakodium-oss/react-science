import { Menu } from '@headlessui/react';
import { useMemo } from 'react';
import { FaMeteor } from 'react-icons/fa';

import { MenuItems, MenuOptions } from '@/components/menu/MenuItems';

export default {
  title: 'Components / MenuItems',
};

const defaultOptions: MenuOptions<string> = [
  { label: 'Default workspace', type: 'option' },
];

export function WithIcon() {
  const options = useMemo<MenuOptions<string>>(() => {
    return [
      ...defaultOptions,
      { label: 'Exercise', type: 'option', icon: <FaMeteor /> },
    ];
  }, []);

  return (
    <Menu>
      <MenuItems itemsStatic options={options} onSelect={() => {}} />
    </Menu>
  );
}

export function WithoutIcon() {
  const options = useMemo<MenuOptions<string>>(() => {
    return [...defaultOptions, { label: 'Exercise', type: 'option' }];
  }, []);

  return (
    <Menu>
      <MenuItems itemsStatic options={options} onSelect={() => {}} />
    </Menu>
  );
}

export function WithDisabled() {
  const options = useMemo<MenuOptions<string>>(() => {
    return [
      ...defaultOptions,
      { label: 'Exercise', type: 'option', disabled: true },
    ];
  }, []);

  return (
    <Menu>
      <MenuItems itemsStatic options={options} onSelect={() => {}} />
    </Menu>
  );
}

export function WithDivider() {
  const options = useMemo<MenuOptions<string>>(() => {
    return [
      ...defaultOptions,
      { type: 'divider' },
      { label: 'Exercise', type: 'option' },
    ];
  }, []);

  return (
    <Menu>
      <MenuItems itemsStatic options={options} onSelect={() => {}} />
    </Menu>
  );
}

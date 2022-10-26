import { Menu } from '@headlessui/react';
import { useMemo } from 'react';
import {
  FaMeteor,
  FaAddressBook,
  FaAccessibleIcon,
  Fa500Px,
  FaAccusoft,
  FaAcquisitionsIncorporated,
  FaAd,
  FaAddressCard,
  FaAdjust,
} from 'react-icons/fa';
import { icons } from 'react-icons/lib';

import DropdownMenu from '@/components/menu/DropdownMenu';
import { MenuItems, MenuOptions } from '@/components/menu/MenuItems';

export default {
  title: 'Components / DropdownMenu',
};

const defaultOptions: MenuOptions<string> = [
  { label: 'Default workspace', type: 'option' },
];

export function Dropdown() {
  const options = useMemo<MenuOptions<string>>(() => {
    return [
      { label: 'Default workspace', type: 'option' },
      { label: 'Exercise', type: 'option', icon: <FaMeteor /> },
      { type: 'divider' },
      { label: 'Test', type: 'option', disabled: true },
      { label: 'Test 2', type: 'option' },
    ];
  }, []);

  return (
    <DropdownMenu onSelect={() => {}} options={options} trigger="click">
      Default workspace
    </DropdownMenu>
  );
}

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

export function Complex() {
  const options = useMemo<MenuOptions<string>>(() => {
    return [
      { label: 'Back', type: 'option', icon: <FaAddressBook /> },
      {
        label: 'Forward',
        type: 'option',
        disabled: true,
        icon: <FaAccessibleIcon />,
      },
      { label: 'Refresh', type: 'option', icon: <Fa500Px /> },
      { type: 'divider' },
      { label: 'Save as', type: 'option', icon: <FaAccusoft /> },
      { label: 'Print', type: 'option', icon: <FaAcquisitionsIncorporated /> },
      { label: 'Cast media to device', type: 'option', icon: <FaAd /> },
      { type: 'divider' },
      {
        label: 'Send page to your devices',
        type: 'option',
        icon: <FaAddressCard />,
      },
      {
        label: 'Create QR Code for this page',
        type: 'option',
        icon: <FaAdjust />,
      },
    ];
  }, []);

  return (
    <Menu>
      <MenuItems itemsStatic options={options} onSelect={() => {}} />
    </Menu>
  );
}

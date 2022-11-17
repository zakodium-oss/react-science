import styled from '@emotion/styled';
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

import {
  MenuItems,
  MenuOptions,
} from '../../src/components/dropdown-menu/MenuItems';
import { DropdownMenu } from '../../src/components/index';

export default {
  title: 'Components / DropdownMenu',
};

const defaultOptions: MenuOptions<string> = [
  { label: 'Default workspace', type: 'option' },
];

const ButtonStyled = styled.div`
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: rgb(107 114 128);
  border-color: transparent;
  border-radius: 0.375rem;
  border-width: 1px;
`;

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
    <DropdownMenu trigger="click" onSelect={() => {}} options={options}>
      <ButtonStyled>Default workspace</ButtonStyled>
    </DropdownMenu>
  );
}

const DivContextDropdown = styled.div`
  height: 500px;
  width: 500px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function ContextDropdown() {
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
    <DropdownMenu trigger="contextMenu" onSelect={() => {}} options={options}>
      <DivContextDropdown tabIndex={1}>
        <p>Hello, World!</p>
      </DivContextDropdown>
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

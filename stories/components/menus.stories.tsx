/** @jsxImportSource @emotion/react */
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { css } from '@emotion/react';
import { useMemo } from 'react';

export default {
  title: 'Components / Menus',
};

export function WithIcon() {
  const options = [
    defaultOptions,
    <MenuItem key="1" text="Exercise" icon="person" />,
  ];

  return (
    <Menu
      css={css`
        width: 300px;
        padding: 0;
        border: 1px solid black;
      `}
    >
      {options}
    </Menu>
  );
}

const defaultOptions = <MenuItem text="Default workspace" />;
export function WithoutIcon() {
  const options = [defaultOptions, <MenuItem key="1" text="Exercise" />];

  return (
    <Menu
      css={css`
        width: 300px;
        padding: 0;
        border: 1px solid black;
      `}
    >
      {options}
    </Menu>
  );
}

export function WithDisabled() {
  const options = [
    defaultOptions,
    <MenuItem key="1" text="Exercise" disabled />,
  ];

  return (
    <Menu
      css={css`
        width: 300px;
        padding: 0;
        border: 1px solid black;
      `}
    >
      {options}
    </Menu>
  );
}

export function WithDivider() {
  const options = useMemo(() => {
    return [
      defaultOptions,
      <MenuDivider key="0" />,
      <MenuItem key="1" text="Exercise" />,
    ];
  }, []);

  return (
    <Menu
      css={css`
        width: 300px;
        padding: 0;
        border: 1px solid black;
      `}
    >
      {options}
    </Menu>
  );
}

export function Complex() {
  return (
    <Menu
      css={css`
        width: 300px;
        padding: 0;
        border: 1px solid black;
      `}
    >
      <MenuItem text="Back" icon="book" />
      <MenuItem text="Forward" icon="step-forward" disabled />
      <MenuItem text="Refresh" icon="refresh" />
      <MenuDivider />
      <MenuItem text="Save as" icon="saved" />
      <MenuItem text="Print" icon="print" />
      <MenuItem text="Cast media to device" icon="video" />
      <MenuDivider />
      <MenuItem text="Send page to your devices" icon="add" />
      <MenuItem text="Create QR Code for this page" icon="settings" />
    </Menu>
  );
}

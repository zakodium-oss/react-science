import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useMemo } from 'react';

export default {
  title: 'Components / Menus',
};

const StyledMenu = styled(Menu)`
  width: 300px;
  padding: 0;
  border: 1px solid black;
`;

/*
 This is a styled version of MenuDivider.
 By default, Blueprint adds a negative x-axis margin of -5px, which causes the Divider to overflow the Menu on the left and right.
 We need to override this margin to 0 to prevent it from exceeding the Menu boundaries.
 */
const StyledMenuDivider = styled(MenuDivider)`
  margin: 5px 0;
`;

export function WithIcon() {
  const options = [
    defaultOptions,
    <MenuItem key="1" text="Exercise" icon="person" />,
  ];

  return <StyledMenu>{options}</StyledMenu>;
}

const defaultOptions = <MenuItem text="Default workspace" />;
export function WithoutIcon() {
  const options = [defaultOptions, <MenuItem key="1" text="Exercise" />];

  return <StyledMenu>{options}</StyledMenu>;
}

export function WithDisabled() {
  const options = [
    defaultOptions,
    <MenuItem key="1" text="Exercise" disabled />,
  ];

  return <StyledMenu>{options}</StyledMenu>;
}

export function WithDivider() {
  const options = useMemo(() => {
    return [
      defaultOptions,
      <StyledMenuDivider key="0" />,
      <MenuItem key="1" text="Exercise" />,
    ];
  }, []);

  return <StyledMenu>{options}</StyledMenu>;
}

export function Complex() {
  return (
    <StyledMenu>
      <MenuItem text="Back" icon="book" />
      <MenuItem text="Forward" icon="step-forward" disabled />
      <MenuItem text="Refresh" icon="refresh" />
      <StyledMenuDivider />
      <MenuItem text="Save as" icon="saved" />
      <MenuItem text="Print" icon="print" />
      <MenuItem text="Cast media to device" icon="video" />
      <StyledMenuDivider />
      <MenuItem text="Send page to your devices" icon="add" />
      <MenuItem text="Create QR Code for this page" icon="settings" />
    </StyledMenu>
  );
}

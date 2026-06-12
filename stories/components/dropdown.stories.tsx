import { Menu, MenuDivider, MenuItem, PopoverNext } from '@blueprintjs/core';

import { Button } from '../../src/components/index.js';

export default {
  title: 'Components / DropdownMenu',
};

export function Dropdown() {
  const content = (
    <Menu>
      <MenuItem text="Default workspace" />
      <MenuItem text="Exercise" icon="person" />
      <MenuDivider />
      <MenuItem text="Tests">
        <MenuItem text="Test" disabled />
        <MenuItem text="Test 2" />
      </MenuItem>
    </Menu>
  );

  return (
    <PopoverNext content={content}>
      <Button alignText="start" endIcon="caret-down" text="Default workspace" />
    </PopoverNext>
  );
}

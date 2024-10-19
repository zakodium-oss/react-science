import { Menu, MenuDivider, MenuItem, Popover } from '@blueprintjs/core';

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
    <Popover content={content}>
      <Button
        alignText="left"
        rightIcon="caret-down"
        text="Default workspace"
      />
    </Popover>
  );
}

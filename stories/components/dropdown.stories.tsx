import { useMemo } from 'react';
import { FaMeteor } from 'react-icons/fa';

import DropdownMenu from '@/components/menu/DropdownMenu';
import type { MenuOptions } from '@/components/menu/MenuItems';

export default {
  title: 'Components / Dropdown',
};

export function Dropdown() {
  const options = useMemo<MenuOptions<string>>(() => {
    return [
      { label: 'Default workspace', type: 'option' },
      { label: 'Exercise', type: 'option', icon: <FaMeteor /> },
      { type: 'divider' },
      { label: 'Test', type: 'option' },
      { label: 'Test 2', type: 'option' },
    ];
  }, []);

  return (
    <DropdownMenu onSelect={() => {}} options={options} trigger="click">
      Default workspace
    </DropdownMenu>
  );
}

import { useState } from 'react';

import { ColorPickerDropdown } from '../../src/components/index';

export default {
  title: 'Components / Color Pickers Dropdown',
};

export function ColorPickerDropdownStory() {
  const [color, setColor] = useState<string>('#BD6565');

  return (
    <div>
      <p>Hex color: {color}</p>
      <div style={{ width: 50 }}>
        <ColorPickerDropdown
          color={{ hex: color }}
          onChange={(element) => {
            setColor(element.hex);
          }}
        />
      </div>
    </div>
  );
}

ColorPickerDropdownStory.storyName = 'Color Picker Dropdown';

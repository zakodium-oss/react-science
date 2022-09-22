import { useState } from 'react';

import { ColorPicker } from '../../src';

export default {
  title: 'Components / Color Picker',
};

export function Basic() {
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });

  const backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        height: '100vh',
      }}
    >
      <ColorPicker
        color={color}
        onChange={(color) => {
          setColor(color.rgb);
        }}
      />
    </div>
  );
}

import React, { useState } from 'react';

import { ColorPicker } from '../src/layout/color-picker';
import { RGB } from '../src/layout/color-picker/sketch/ColorPicker';

export default {
  title: 'Layout/Color Picker',
};
const getBrightness = (rgb: RGB) =>
  (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

export function ColorPickerStories() {
  const [color, setColor] = useState({
    hex: 'white',
    rgb: { r: 255, g: 255, b: 255, a: 1 },
  });

  const backgroundColor =
    color.hex + Math.round(color.rgb.a * 255).toString(16);
  const textColor =
    getBrightness(color.rgb) > 128 || color.rgb.a < 0.5 ? '#000' : '#FFF';

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
        onChange={(color) => {
          setColor(color);
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '20px',
          alignItems: 'flex-start',
          color: textColor,
        }}
      >
        <p style={{ fontSize: 30 }}>React Color picker 🎨</p>
        <p style={{ fontSize: 14, margin: '0 20px 0 5px' }}>
          A clone version of react-color Sketch component
        </p>

        <a
          style={{
            padding: '5px',
            border: '1px solid gray',
            borderRadius: '5px',
            marginTop: '10px',
            color: textColor,
          }}
          href="http://casesandberg.github.io/react-color/"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

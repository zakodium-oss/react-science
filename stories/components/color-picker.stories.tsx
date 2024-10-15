import { useState } from 'react';

import {
  ColorPicker,
  type GradientScaleName,
  GradientSelect,
} from '../../src/components/index.js';

export default {
  title: 'Components / Color Pickers',
};

export function ColorPickerStory() {
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

ColorPickerStory.storyName = 'Color Picker';

export function GradientSelectStory() {
  const [scale, setScale] = useState<GradientScaleName>('inferno');
  return (
    <div style={{ marginTop: 30, marginInline: 60 }}>
      <GradientSelect value={scale} onChange={setScale} />
    </div>
  );
}

GradientSelectStory.storyName = 'Gradient Select';

import { Dialog, DialogBody } from '@blueprintjs/core';
import { useState } from 'react';

import {
  Button,
  ColorPickerDropdown,
  useOnOff,
} from '../../src/components/index.js';

export default {
  title: 'Components / Color Pickers',
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

export function InDialog() {
  const [isOpen, open, close] = useOnOff();

  const [color, setColor] = useState<string>('#BD6565');
  return (
    <>
      <Button onClick={open}>Open Dialog</Button>
      <Dialog
        shouldReturnFocusOnClose={false}
        title="General Settings"
        icon="cog"
        isOpen={isOpen}
        onClose={close}
        style={{ width: 800, height: 400 }}
        isCloseButtonShown
        canOutsideClickClose
        canEscapeKeyClose
      >
        <DialogBody>
          <div style={{ width: 50 }}>
            <ColorPickerDropdown
              popoverProps={{
                positioningStrategy: 'fixed',
                position: 'bottom-left',
              }}
              color={{ hex: color }}
              onChange={(element) => {
                setColor(element.hex);
              }}
            />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

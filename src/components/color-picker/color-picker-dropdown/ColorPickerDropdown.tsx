import { Popover, type PopoverProps } from '@blueprintjs/core';
import styled from '@emotion/styled';

import FixedColorPreview from '../preview/FixedColorPreview.js';
import {
  ColorPicker,
  type ColorPickerProps,
} from '../react-color/ColorPicker.js';
import * as colorHelper from '../react-color/helpers/color.js';

interface ColorPickerDropdownProps
  extends Pick<
    ColorPickerProps,
    'color' | 'presetColors' | 'disableAlpha' | 'onChange' | 'onChangeComplete'
  > {
  popoverProps?: Omit<PopoverProps, 'content'>;
}

const ColorPickerRoot = styled.button`
  position: relative;
  width: 100%;
  border: 1px solid darkgray;
  border-radius: 0.25rem;
  height: 30px;
  padding: 5px;
`;

const ColorPickerPreview = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 0.125rem;
`;

export function ColorPickerDropdown(props: ColorPickerDropdownProps) {
  const { color, popoverProps, ...otherProps } = props;

  const { hex } = colorHelper.toState(color || 'white');

  return (
    <Popover
      targetProps={{ style: { width: '100%' } }}
      content={<ColorPicker color={color} {...otherProps} />}
      minimal
      {...popoverProps}
    >
      <ColorPickerRoot type="button">
        <ColorPickerPreview>
          <FixedColorPreview color={hex} />
        </ColorPickerPreview>
      </ColorPickerRoot>
    </Popover>
  );
}

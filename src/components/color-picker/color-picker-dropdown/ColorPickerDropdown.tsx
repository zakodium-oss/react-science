/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef } from 'react';

import { useModifiedPopper } from '../../hooks/useModifiedPopper';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useOnOff } from '../../hooks/useOnOff';
import { ColorPicker, ColorPickerProps } from '../react-color/ColorPicker';
import * as colorHelper from '../react-color/helpers/color';

type ColorPickerDopdpownProps = Pick<
  ColorPickerProps,
  'color' | 'presetColors' | 'disableAlpha' | 'onChange' | 'onChangeComplete'
>;

const colorPickerDropdownCss = {
  root: css`
    position: relative;
    width: 100%;
    border: 1px solid darkgray;
    border-radius: 0.25rem;
    height: 30px;
    padding: 5px;
  `,
  preview: css`
    height: 100%;
    width: 100%;
    border-radius: 0.125rem;
  `,
};

export function ColorPickerDropdown(props: ColorPickerDopdpownProps) {
  const { color, ...otherProps } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [isOpened, , closeMenu, toggleMenu] = useOnOff(false);

  const { hex } = colorHelper.toState(color || 'white');

  const { setReferenceElement, setPopperElement, popperProps } =
    useModifiedPopper({ placement: 'bottom-start', offset: 6 });

  useOnClickOutside(ref, closeMenu);

  return (
    <div>
      <div
        ref={setReferenceElement}
        css={colorPickerDropdownCss.root}
        onClick={toggleMenu}
      >
        <div
          css={colorPickerDropdownCss.preview}
          style={{ backgroundColor: hex }}
        />
      </div>
      {isOpened && (
        <div ref={setPopperElement} {...popperProps}>
          <div ref={ref}>
            <ColorPicker color={color} {...otherProps} />
          </div>
        </div>
      )}
    </div>
  );
}

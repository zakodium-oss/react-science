/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef } from 'react';

import { useModifiedPopper } from '../../hooks/useModifiedPopper';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useOnOff } from '../../hooks/useOnOff';
import { Portal } from '../../root-layout/Portal';
import FixedColorPreview from '../preview/FixedColorPreview';
import { ColorPicker, ColorPickerProps } from '../react-color/ColorPicker';
import * as colorHelper from '../react-color/helpers/color';

type ColorPickerDropdownProps = Pick<
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

export function ColorPickerDropdown(props: ColorPickerDropdownProps) {
  const { color, ...otherProps } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpened, , close, toggle] = useOnOff(false);

  const { hex } = colorHelper.toState(color || 'white');

  const { setReferenceElement, setPopperElement, popperProps } =
    useModifiedPopper<HTMLButtonElement>({
      placement: 'bottom-start',
      offset: 6,
    });

  useOnClickOutside(ref, close);

  return (
    <>
      <button
        type="button"
        ref={setReferenceElement}
        css={colorPickerDropdownCss.root}
        onClick={toggle}
      >
        <div css={colorPickerDropdownCss.preview}>
          <FixedColorPreview color={hex} />
        </div>
      </button>
      {isOpened && (
        <Portal>
          <div
            ref={(div) => {
              setPopperElement(div);
              ref.current = div;
            }}
            {...popperProps}
          >
            <ColorPicker color={color} {...otherProps} />
          </div>
        </Portal>
      )}
    </>
  );
}

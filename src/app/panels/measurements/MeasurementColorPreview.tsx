import styled from '@emotion/styled';
import { useRef } from 'react';

import type { ColorConfig, MeasurementKind } from '../../../app-data/index.js';
import { useAppDispatch } from '../../../app-data/index.js';
import {
  ColorPicker,
  ColorPreview,
  useModifiedPopper,
  useOnClickOutside,
  useOnOff,
} from '../../../components/index.js';

interface MeasurementColorPreviewProps {
  measurementId: string;
  kind: MeasurementKind;
  color: ColorConfig;
}

const ColorPreviewButton = styled.button`
  width: 1em;
  height: 1em;
  & > div {
    border-radius: 0.5em;
  }
`;

export function MeasurementColorPreview(props: MeasurementColorPreviewProps) {
  const { measurementId, kind, color } = props;

  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpened, , close, toggle] = useOnOff(false);
  const { setReferenceElement, setPopperElement, popperProps } =
    useModifiedPopper<HTMLButtonElement>({
      placement: 'bottom-start',
      offset: 6,
    });

  useOnClickOutside(ref, close);

  return (
    <>
      <ColorPreviewButton
        type="button"
        ref={setReferenceElement}
        onClick={toggle}
      >
        <ColorPreview color={color} />
      </ColorPreviewButton>
      {isOpened && (
        <div
          ref={(div) => {
            setPopperElement(div);
            ref.current = div;
          }}
          {...popperProps}
        >
          {color.kind === 'fixed' ? (
            <FixedColorPicker
              color={color.color}
              onChange={(newColor) =>
                dispatch({
                  type: 'CHANGE_MEASUREMENT_DISPLAY',
                  payload: {
                    display: {
                      color: {
                        kind: 'fixed',
                        color: newColor,
                      },
                    },
                    measurement: { id: measurementId, kind },
                  },
                })
              }
            />
          ) : null}
        </div>
      )}
    </>
  );
}

function FixedColorPicker(props: {
  color: string;
  onChange: (rgb: string) => void;
}) {
  const { color, onChange } = props;
  return (
    <ColorPicker
      style={{ fontSize: '0.875em' }}
      color={{ hex: color }}
      onChangeComplete={(color) => {
        onChange(color.hex);
      }}
    />
  );
}

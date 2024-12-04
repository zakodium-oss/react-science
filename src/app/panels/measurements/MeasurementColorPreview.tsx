import styled from '@emotion/styled';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useRole,
} from '@floating-ui/react';

import type { MeasurementKind } from '../../../app-data/index.js';
import { useAppDispatch } from '../../../app-data/index.js';
import type { ColorConfig } from '../../../components/index.js';
import {
  assert,
  ColorPicker,
  ColorPreview,
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

  assert(color.kind === 'fixed', 'Only fixed colors are supported');

  const dispatch = useAppDispatch();
  const [isOpened, , close, toggle] = useOnOff(false);

  const { context, refs, floatingStyles } = useFloating({
    strategy: 'fixed',
    placement: 'bottom-start',
    open: isOpened,
    whileElementsMounted: autoUpdate,
    onOpenChange: (open: boolean, event?: Event) => {
      if (!open && event) {
        return close();
      }
    },
    middleware: [offset(6), flip(), shift()],
  });

  const focus = useFocus(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePress: true });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    focus,
    role,
    dismiss,
  ]);

  return (
    <>
      <ColorPreviewButton
        type="button"
        ref={refs.setReference}
        onClick={toggle}
        {...getReferenceProps()}
      >
        <ColorPreview color={color} />
      </ColorPreviewButton>
      {isOpened && (
        <FloatingPortal>
          <FloatingOverlay>
            <FloatingFocusManager context={context}>
              <div
                style={floatingStyles}
                ref={refs.setFloating}
                {...getFloatingProps()}
              >
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
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
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

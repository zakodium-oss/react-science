// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_ARROW_OFFSET = 1;

const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;
const VALID_KEY_CODES = new Set([UP_KEY_CODE, DOWN_KEY_CODE]);
const isValidKeyCode = (keyCode) => VALID_KEY_CODES.has(keyCode);
const getNumberValue = (value) => Number(String(value).replaceAll('%', ''));

let idCounter = 1;

const styles = {
  wrap: {
    position: 'relative',
  },
};

const EditableInput = (props) => {
  const [state, setState] = useState({
    value: String(props.value).toUpperCase(),
    blurValue: String(props.value).toUpperCase(),
  });
  const inputRef = useRef();
  const valueRef = useRef<number>(props.value);

  const inputId = useRef(`rc-editable-input-${idCounter++}`).current;

  useEffect(() => {
    valueRef.current = props.value;
    if (inputRef.current === document.activeElement) {
      setState({ blurValue: String(props.value).toUpperCase() });
    } else {
      setState((prevState) => ({
        value: String(props.value).toUpperCase(),
        blurValue: !prevState.blurValue && String(props.value).toUpperCase(),
      }));
    }
  }, [props.value]);

  const getValueObjectWithLabel = useCallback(
    (value) => {
      return {
        [props.label]: value,
      };
    },
    [props.label],
  );

  const handleBlur = useCallback(() => {
    if (state.blurValue) {
      setState({ value: state.blurValue, blurValue: null });
    }
  }, [state.blurValue]);

  const setUpdatedValue = useCallback(
    (value, e) => {
      const onChangeValue = props.label
        ? getValueObjectWithLabel(value)
        : value;
      if (props.onChange) {
        props.onChange(onChangeValue, e);
      }

      setState({ value });
    },
    [getValueObjectWithLabel, props],
  );
  const handleChange = useCallback(
    (e) => {
      setUpdatedValue(e.target.value, e);
    },
    [setUpdatedValue],
  );

  const handleKeyDown = useCallback(
    (e) => {
      // In case `e.target.value` is a percentage remove the `%` character
      // and update accordingly with a percentage
      // https://github.com/casesandberg/react-color/issues/383
      const value = getNumberValue(e.target.value);
      const offset: number = props.arrowOffset || DEFAULT_ARROW_OFFSET;
      if (!Number.isNaN(value) && isValidKeyCode(e.keyCode)) {
        const updatedValue =
          e.keyCode === UP_KEY_CODE ? value + offset : value - offset;

        setUpdatedValue(updatedValue, e);
      }
    },
    [props.arrowOffset, setUpdatedValue],
  );

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (props.dragLabel) {
        const newValue = Math.round(valueRef.current + e.movementX);
        if (newValue >= 0 && newValue <= props.dragMax) {
          valueRef.current = newValue;

          if (props.onChange) {
            props.onChange(getValueObjectWithLabel(newValue), e);
          }
        }
      }
    },
    [props, getValueObjectWithLabel],
  );

  const handleMouseDown = useCallback(
    (e) => {
      function mouseUp() {
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', mouseUp);
      }

      if (props.dragLabel) {
        e.preventDefault();
        handleDrag(e);
        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', mouseUp);
      }
    },
    [handleDrag, props.dragLabel],
  );

  const { wrap = {}, input = {}, label = {} } = props.style || {};

  return (
    <div style={{ ...styles.wrap, ...wrap }}>
      <input
        id={inputId}
        style={input}
        ref={inputRef}
        value={state.value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={props.placeholder}
        spellCheck="false"
      />
      {props.label && !props.hideLabel ? (
        <label
          htmlFor={inputId}
          style={{
            ...label,
            ...(props.dragLabel === 'true' && {
              cursor: 'ew-resize',
              userSelect: 'none',
            }),
          }}
          onMouseDown={handleMouseDown}
        >
          {props.label}
        </label>
      ) : null}
    </div>
  );
};

export default EditableInput;

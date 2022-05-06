import React, { useState, useRef, useCallback, useEffect } from 'react';
import reactCSS from 'reactcss';

const DEFAULT_ARROW_OFFSET = 1;

const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;
const VALID_KEY_CODES = [UP_KEY_CODE, DOWN_KEY_CODE];
const isValidKeyCode = (keyCode) => VALID_KEY_CODES.indexOf(keyCode) > -1;
const getNumberValue = (value) => Number(String(value).replace(/%/g, ''));

let idCounter = 1;

const EditableInput = (props) => {
  const [state, setState] = useState({
    value: String(props.value).toUpperCase(),
    blurValue: String(props.value).toUpperCase(),
  });
  const inputRef = useRef();

  const inputId = useRef(`rc-editable-input-${idCounter++}`).current;

  useEffect(() => {
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
      const offset = props.arrowOffset || DEFAULT_ARROW_OFFSET;
      if (!isNaN(value) && isValidKeyCode(e.keyCode)) {
        const updatedValue =
          e.keyCode === UP_KEY_CODE ? value + offset : value - offset;

        setUpdatedValue(updatedValue, e);
      }
    },
    [props.arrowOffset, setUpdatedValue],
  );

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

  const handleDrag = useCallback(
    (e) => {
      if (props.dragLabel) {
        const newValue = Math.round(props.value + e.movementX);

        if (newValue >= 0 && newValue <= props.dragMax) {
          if (props.onChange) {
            props.onChange(getValueObjectWithLabel(newValue), e);
          }
        }
      }
    },
    [getValueObjectWithLabel, props],
  );

  const handleMouseDown = useCallback(
    (e) => {
      function mouseUp() {
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', mouseUp);
      }

      if (props.dragLabel) {
        // e.preventDefault();
        handleDrag(e);
        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', mouseUp);
      }
    },
    [handleDrag, props.dragLabel],
  );

  const styles = reactCSS(
    {
      default: {
        wrap: {
          position: 'relative',
        },
      },
      'user-override': {
        wrap: props.style && props.style.wrap ? props.style.wrap : {},
        input: props.style && props.style.input ? props.style.input : {},
        label: props.style && props.style.label ? props.style.label : {},
      },
      'dragLabel-true': {
        label: {
          cursor: 'ew-resize',
          userSelect: 'none',
        },
      },
    },
    {
      'user-override': true,
    },
    props,
  );

  return (
    <div style={styles.wrap}>
      <input
        id={inputId}
        style={styles.input}
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
          style={styles.label}
          onMouseDown={handleMouseDown}
        >
          {props.label}
        </label>
      ) : null}
    </div>
  );
};

export default EditableInput;

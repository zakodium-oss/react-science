import lodashDebounce from 'lodash/debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import * as colorHelper from '../helpers/color';

const defaultColor = {
  h: 250,
  s: 0.5,
  l: 0.2,
  a: 1,
};
const ColorWrap = (Picker) => {
  return function ColorPicker(props) {
    const {
      color = defaultColor,
      onChangeComplete,
      onChange,
      onSwatchHover,
    } = props;

    const [state, setState] = useState(colorHelper.toState(color, 0));
    const debounce = useRef(
      lodashDebounce((fn, data, event) => {
        fn(data, event);
      }, 100),
    ).current;

    useEffect(() => {
      setState((prevState) => colorHelper.toState(color, prevState.oldHue));
    }, [color]);

    const handleChange = useCallback(
      (data, event) => {
        const isValidColor = colorHelper.simpleCheckForValidColor(data);
        if (isValidColor) {
          const colors = colorHelper.toState(data, data.h || state.oldHue);
          setState(colors);
          if (onChangeComplete) {
            debounce(onChangeComplete, colors, event);
          }
          if (onChange) {
            onChange(colors, event);
          }
        }
      },
      [debounce, onChange, onChangeComplete, state.oldHue],
    );

    const handleSwatchHover = useCallback(
      (data, event) => {
        const isValidColor = colorHelper.simpleCheckForValidColor(data);
        if (isValidColor) {
          const colors = colorHelper.toState(data, data.h || state.oldHue);
          if (onSwatchHover) {
            onSwatchHover(colors, event);
          }
        }
      },
      [onSwatchHover, state.oldHue],
    );

    const optionalEvents = {};
    if (onSwatchHover) {
      optionalEvents.onSwatchHover = handleSwatchHover;
    }

    return (
      <Picker
        {...props}
        {...state}
        onChange={handleChange}
        {...optionalEvents}
      />
    );
  };
};

export default ColorWrap;

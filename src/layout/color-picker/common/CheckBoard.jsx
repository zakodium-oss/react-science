import React from 'react';

import * as checkBoard from '../helpers/checkboard';

const styles = {
  grid: (props) => {
    const {
      size = 8,
      white = 'transparent',
      grey = 'rgba(0,0,0,.08)',
      renderers = {},
      borderRadius,
      boxShadow,
    } = props;

    return {
      borderRadius,
      boxShadow,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `url(${checkBoard.get(
        white,
        grey,
        size,
        renderers.canvas,
      )}) center left`,
    };
  },
};

const CheckBoard = (props) => {
  const { children } = props;

  if (!React.isValidElement(children)) {
    return <div style={styles.grid(props)} />;
  }

  return React.cloneElement(children, {
    ...children.props,
    style: { ...children.props.style, ...styles.grid(props) },
  });
};

export default CheckBoard;

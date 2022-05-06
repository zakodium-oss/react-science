import React, { isValidElement } from 'react';
import reactCSS from 'reactcss';

import * as checkboard from '../helpers/checkboard';

const CheckBoard = (props) => {
  const {
    size = 8,
    white = 'transparent',
    grey = 'rgba(0,0,0,.08)',
    renderers = {},
    borderRadius,
    boxShadow,
    children,
  } = props;

  const styles = reactCSS({
    default: {
      grid: {
        borderRadius,
        boxShadow,
        absolute: '0px 0px 0px 0px',
        background: `url(${checkboard.get(
          white,
          grey,
          size,
          renderers.canvas,
        )}) center left`,
      },
    },
  });
  return isValidElement(children) ? (
    React.cloneElement(children, {
      ...children.props,
      style: { ...children.props.style, ...styles.grid },
    })
  ) : (
    <div style={styles.grid} />
  );
};

export default CheckBoard;

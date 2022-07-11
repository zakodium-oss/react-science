import { CSSProperties, MouseEvent } from 'react';

export { Color } from './Color';
export { Boolean } from './Boolean';
export { Number } from './Number';
export { Text } from './Text';
export { Title } from './Title';
export { Object } from './Object';
export { Component } from './Component';
export interface ValueRenderersProps {
  onClick?: (event: MouseEvent) => void;
  style?: CSSProperties;
}

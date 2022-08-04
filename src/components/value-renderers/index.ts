import { CSSProperties, MouseEvent } from 'react';

export { Color } from './Color';
export { Boolean } from './Boolean';
export { Number } from './Number';
export { Text } from './Text';
export { Title } from './Title';
export { ObjectRenderer as Object } from './ObjectRenderer';
export interface ValueRenderersProps {
  onClick?: (event: MouseEvent) => void;
  style?: CSSProperties;
}

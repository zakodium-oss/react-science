import type { CSSProperties, MouseEvent } from 'react';

export { Color } from './Color.js';
export { Boolean } from './Boolean.js';
export { Number } from './Number.js';
export { Text } from './Text.js';
export { Title } from './Title.js';
export { Component } from './Component.js';

export { ObjectRenderer as Object } from './ObjectRenderer.js';
export interface ValueRenderersProps {
  onClick?: (event: MouseEvent) => void;
  style?: CSSProperties;
}

import type { Meta } from '@storybook/react-vite';
import { CanvasMoleculeEditor } from 'react-ocl';

export default {
  title: 'Debug',
} as Meta;

export function ReactOCL() {
  return <CanvasMoleculeEditor width={600} height={400} fragment />;
}

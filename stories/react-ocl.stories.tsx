import { Meta } from '@storybook/react';
import React from 'react';
import { StructureEditor } from 'react-ocl/full';

export default {
  title: 'Debug/React OCL',
} as Meta;

export function ReactOCL() {
  return <StructureEditor width={600} height={400} svgMenu fragment />;
}

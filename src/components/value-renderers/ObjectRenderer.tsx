import { ObjectInspector } from 'react-inspector';

import type { ValueRenderersProps } from './index.js';

interface ObjectRendererProps extends ValueRenderersProps {
  value?: object;
}

export function ObjectRenderer({ value, ...other }: ObjectRendererProps) {
  return <ObjectInspector data={value} {...other} />;
}

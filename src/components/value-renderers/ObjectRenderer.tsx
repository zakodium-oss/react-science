import { ObjectInspector } from 'react-inspector';

import type { ValueRenderersProps } from '.';

interface ObjectRendererProps extends ValueRenderersProps {
  value?: object;
}

export function ObjectRenderer({ value, ...other }: ObjectRendererProps) {
  return <ObjectInspector data={value} {...other} />;
}

import { Inspector } from 'react-inspector';

import { ValueRenderersProps } from '.';

interface ObjectProps extends ValueRenderersProps {
  value?: object;
}

export function Object({ value, ...other }: ObjectProps) {
  return <Inspector data={value} {...other} />;
}

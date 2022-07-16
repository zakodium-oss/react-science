import { ReactElement } from 'react';

import { ValueRenderersProps } from '.';

interface ComponentProps extends ValueRenderersProps {
  children?: ReactElement | ReactElement[];
}

export function Component({ children, ...other }: ComponentProps) {
  return <div {...other}>{children}</div>;
}

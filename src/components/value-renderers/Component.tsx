import type { ReactElement } from 'react';

import type { ValueRenderersProps } from './index.js';

interface ComponentProps extends ValueRenderersProps {
  children?: ReactElement | ReactElement[];
}

export function Component({ children, ...other }: ComponentProps) {
  return <div {...other}>{children}</div>;
}

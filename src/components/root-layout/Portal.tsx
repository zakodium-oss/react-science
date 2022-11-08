import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useRootLayoutContext } from './RootLayoutContext';

interface PortalProps {
  children: ReactNode;
}

export function Portal(props: PortalProps) {
  const element = useRootLayoutContext();
  return createPortal(props.children, element);
}

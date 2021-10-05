import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { useRootLayoutContext } from './context/RootLayoutContext';

interface PortalProps {
  children: ReactNode;
}

export function Portal(props: PortalProps) {
  const element = useRootLayoutContext();
  return ReactDOM.createPortal(props.children, element);
}

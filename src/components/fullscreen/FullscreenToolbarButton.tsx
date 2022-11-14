import { FaExpand } from 'react-icons/fa';

import { Toolbar } from '../toolbar/Toolbar';

import { useFullscreen } from './FullscreenContext';

export function FullscreenToolbarButton() {
  const { toggle } = useFullscreen();
  return (
    <Toolbar.Item title="Full screen" onClick={toggle}>
      <FaExpand />
    </Toolbar.Item>
  );
}

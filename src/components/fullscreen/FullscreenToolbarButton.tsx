import { Toolbar } from '../toolbar';

import { useFullscreen } from './FullscreenContext';

export function FullscreenToolbarButton() {
  const { toggle } = useFullscreen();
  return (
    <Toolbar.Item
      icon="fullscreen"
      hoverContent="Full screen"
      onClick={toggle}
    />
  );
}

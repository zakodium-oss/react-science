import { Toolbar } from '../toolbar';

import { useFullscreen } from './fullscreen_context';

export function FullscreenToolbarButton() {
  const { toggle } = useFullscreen();
  return (
    <Toolbar.Item icon="fullscreen" tooltip="Full screen" onClick={toggle} />
  );
}

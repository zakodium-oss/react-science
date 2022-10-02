/* eslint-disable no-alert */
import { ReactNode, useEffect } from 'react';

import { FullScreenProvider, useFullscreen } from './context/FullscreenContext';

interface FullscreenProps {
  children: ReactNode;
}
export function Fullscreen(props: FullscreenProps) {
  return (
    <FullScreenProvider>
      <FullscreenInner {...props} />
    </FullScreenProvider>
  );
}
function FullscreenInner(props: FullscreenProps) {
  const { children } = props;
  const { isFullScreen } = useFullscreen();
  useEffect(() => {
    if (isFullScreen && document.fullscreenElement === null) {
      document.body.requestFullscreen().catch(() => {
        alert('Fullscreen is not supported');
      });
    } else if (document.fullscreenElement !== null) {
      document.exitFullscreen().catch(() => {
        alert("Can't exit fullscreen");
      });
    }
  }, [isFullScreen]);
  return <>{children}</>;
}

/* eslint-disable no-alert */
import { ReactNode, useEffect, useMemo, useReducer, useRef } from 'react';

import { fullscreenContext, useFullscreen } from './fullscreen_context';

type ElementType = HTMLDivElement & {
  webkitRequestFullscreen(): Promise<void>;
};

type DocumentType = Document & {
  webkitExitFullscreen(): Promise<void>;
  webkitFullscreenElement: Element | null;
};
interface FullscreenProps {
  children: ReactNode;
}

export function FullScreenProvider(props: FullscreenProps) {
  const [isFullScreen, toggle] = useReducer((value: boolean) => !value, false);

  const value = useMemo(
    () => ({ isFullScreen, toggle }),
    [isFullScreen, toggle],
  );
  return (
    <fullscreenContext.Provider value={value}>
      <FullscreenInner {...props} />
    </fullscreenContext.Provider>
  );
}
function FullscreenInner(props: FullscreenProps) {
  const { children } = props;
  const { isFullScreen, toggle } = useFullscreen();
  const ref = useRef<ElementType>(null);
  useEffect(() => {
    function onFullscreenChange() {
      const document = window.document as DocumentType;
      const value = Boolean(
        document.fullscreenElement || document.webkitFullscreenElement,
      );
      if (!value && isFullScreen) toggle();
    }
    const div = ref.current;
    if (!div) {
      return;
    }
    div.addEventListener('fullscreenchange', onFullscreenChange);
    div.addEventListener('webkitfullscreenchange', onFullscreenChange);

    return () => {
      div.removeEventListener('fullscreenchange', onFullscreenChange);
      div.removeEventListener('webkitfullscreenchange', onFullscreenChange);
    };
  }, [isFullScreen, toggle]);
  useEffect(() => {
    if (isFullScreen && ref.current) {
      if (ref.current.requestFullscreen) {
        ref.current.requestFullscreen().catch(() => {
          window.alert('Fullscreen is not supported');
        });
      } else if (ref.current.webkitRequestFullscreen) {
        ref.current.webkitRequestFullscreen()?.catch(() => {
          window.alert('Fullscreen is not supported');
        });
      }
    }
    const document = window.document as DocumentType;
    if (!isFullScreen && document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          window.alert("Can't exit fullscreen");
        });
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().catch(() => {
          window.alert("Can't exit fullscreen");
        });
      }
    }
  }, [isFullScreen]);
  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}
    >
      {children}
    </div>
  );
}

/* eslint-disable no-alert */
import type { ReactNode, RefObject } from 'react';
import { useEffect, useMemo, useReducer, useRef } from 'react';

import { fullscreenContext, useFullscreen } from './fullscreen_context.js';

type ElementType = HTMLDivElement & {
  webkitRequestFullscreen(): Promise<void>;
};

type DocumentType = Document & {
  webkitExitFullscreen(): Promise<void>;
  webkitFullscreenElement: Element | null;
};
interface FullscreenProps {
  /**
   * Callback providing the ref which should be passed to the element that can be displayed fullscreen.
   * @param ref
   */
  children: (ref: RefObject<HTMLDivElement>) => ReactNode;
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
  return children(ref);
}

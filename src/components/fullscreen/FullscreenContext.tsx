/* eslint-disable no-alert */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

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
interface FullscreenState {
  isFullScreen: boolean;
}

interface ContextType extends FullscreenState {
  toggle: () => void;
}
const fullscreenContextInit = {
  isFullScreen: false,
  toggle: () => {
    // empty
  },
};
const FullscreenContext = createContext<ContextType>(fullscreenContextInit);

export function useFullscreen() {
  return useContext(FullscreenContext);
}
export function FullScreenProvider(props: FullscreenProps) {
  const [isFullScreen, toggle] = useReducer((value: boolean) => !value, false);

  const value = useMemo(
    () => ({ isFullScreen, toggle }),
    [isFullScreen, toggle],
  );
  return (
    <FullscreenContext.Provider value={value}>
      <FullscreenInner {...props} />
    </FullscreenContext.Provider>
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
          alert('Fullscreen is not supported');
        });
      } else if (ref.current.webkitRequestFullscreen) {
        ref.current.webkitRequestFullscreen()?.catch(() => {
          alert('Fullscreen is not supported');
        });
      }
    }
    const document = window.document as DocumentType;
    if (!isFullScreen && document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          alert("Can't exit fullscreen");
        });
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().catch(() => {
          alert("Can't exit fullscreen");
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

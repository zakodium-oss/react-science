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
  toggle: () => {},
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
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onFullscreenChange() {
      const value = Boolean(document.fullscreenElement);
      if (!value && isFullScreen) toggle();
    }
    const div = ref.current;
    div?.addEventListener('fullscreenchange', onFullscreenChange);
    div?.addEventListener('mozfullscreenchange', onFullscreenChange);
    div?.addEventListener('MSFullscreenChange', onFullscreenChange);
    div?.addEventListener('webkitfullscreenchange', onFullscreenChange);

    return () => {
      div?.removeEventListener('fullscreenchange', onFullscreenChange);
      div?.addEventListener('mozfullscreenchange', onFullscreenChange);
      div?.addEventListener('MSFullscreenChange', onFullscreenChange);
      div?.addEventListener('webkitfullscreenchange', onFullscreenChange);
    };
  }, [isFullScreen, toggle]);
  useEffect(() => {
    if (isFullScreen) {
      ref.current?.requestFullscreen().catch(() => {
        alert('Fullscreen is not supported');
      });
    }
    if (!isFullScreen && document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {
        alert("Can't exit fullscreen");
      });
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

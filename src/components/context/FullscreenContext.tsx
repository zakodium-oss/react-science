/* eslint-disable no-alert */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
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

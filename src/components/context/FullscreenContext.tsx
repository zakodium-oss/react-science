import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

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
export function FullScreenProvider({ children }: { children: ReactNode }) {
  const [isFullScreen, setFullScreen] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setFullScreen(!isFullScreen);
  }, [isFullScreen]);

  const value = useMemo(
    () => ({ isFullScreen, toggle }),
    [isFullScreen, toggle],
  );
  return (
    <FullscreenContext.Provider value={value}>
      {children}
    </FullscreenContext.Provider>
  );
}

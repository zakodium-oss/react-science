import { createContext, useContext } from 'react';

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

export const fullscreenContext = createContext<ContextType>(
  fullscreenContextInit,
);

export function useFullscreen() {
  return useContext(fullscreenContext);
}

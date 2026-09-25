import { createContext, use } from 'react';

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

export const FullscreenContext = createContext<ContextType>(
  fullscreenContextInit,
);

export function useFullscreen() {
  return use(FullscreenContext);
}

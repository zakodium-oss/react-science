import { useSyncExternalStore } from 'react';

const emptySearchParams = new URLSearchParams();

const lastValue = {
  hash: '',
  searchParams: emptySearchParams,
};

export function useHashSearchParams() {
  return useSyncExternalStore(
    (onStoreChange) => {
      function onHashChange() {
        onStoreChange();
      }
      window.addEventListener('hashchange', onHashChange);
      return () => {
        window.removeEventListener('hashchange', onHashChange);
      };
    },
    getHashSearchParams,
    getHashSearchParamsServer,
  );
}

function getHashSearchParams(): URLSearchParams {
  const hash = window.location.hash;

  if (lastValue.hash === hash) {
    return lastValue.searchParams;
  }

  lastValue.hash = hash;
  if (hash.startsWith('#?')) {
    lastValue.searchParams = new URLSearchParams(hash.slice(1));
  } else if (hash.startsWith('#%3F') || hash.startsWith('#%3f')) {
    lastValue.searchParams = new URLSearchParams(
      decodeURIComponent(hash.slice(1)),
    );
  } else {
    lastValue.searchParams = emptySearchParams;
  }

  return lastValue.searchParams;
}

function getHashSearchParamsServer(): URLSearchParams {
  return emptySearchParams;
}

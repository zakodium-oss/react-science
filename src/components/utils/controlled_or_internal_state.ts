import { useCallback, useEffect, useRef, useState } from 'react';

function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function useWarnControlled(value: unknown, name: string) {
  const previousValue = usePrevious(value);
  useEffect(() => {
    if (value !== undefined && previousValue === undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        `SplitPane: "${name}" prop changes from being uncontrolled to being controlled. This may lead to unexpected behavior.`,
      );
    }
    if (value === undefined && previousValue !== undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        `SplitPane: "${name}" prop changes from being controlled to being uncontrolled. This may lead to unexpected behavior.`,
      );
    }
  }, [value, previousValue, name]);
}

export function useControlledOrInternalState<T>(
  controlled: T | undefined,
  defaultValue: T,
  name: string,
): [T, (value: T) => void] {
  useWarnControlled(controlled, name);
  const [value, setValue] = useState(defaultValue);
  const safeSetValue = useCallback(
    (value: T) => {
      if (controlled === undefined) {
        // The component is in uncontrolled mode.
        setValue(value);
      }
    },
    [controlled],
  );
  const finalValue = controlled === undefined ? value : controlled;
  return [finalValue, safeSetValue];
}

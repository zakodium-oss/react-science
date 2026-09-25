// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useCallback, useState } from 'react';

export function handleFocus(WrappedComponent: any, Span = 'span'): any {
  return function Focus(props: any) {
    const [focus, setFocus] = useState(false);
    const handleFocus = useCallback(() => setFocus(true), []);
    const handleBlur = useCallback(() => setFocus(false), []);

    return (
      <Span onFocus={handleFocus} onBlur={handleBlur}>
        <WrappedComponent {...props} focus={focus} />
      </Span>
    );
  };
}

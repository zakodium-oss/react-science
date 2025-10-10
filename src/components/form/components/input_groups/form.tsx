import type { FormHTMLAttributes, ReactNode } from 'react';
import { useMemo } from 'react';

import type { Layout } from './form_context.js';
import { formContext } from './form_context.js';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  layout?: Layout;
}

export function Form(props: FormProps) {
  const { children, layout = 'stacked', ...otherProps } = props;

  const contextValue = useMemo(() => {
    return { layout };
  }, [layout]);

  return (
    <formContext.Provider value={contextValue}>
      <form {...otherProps}>{children}</form>
    </formContext.Provider>
  );
}

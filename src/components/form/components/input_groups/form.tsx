import type { FormHTMLAttributes, ReactNode } from 'react';
import { useMemo } from 'react';

import type { Layout } from './form_context.js';
import { formContext } from './form_context.js';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  layout?: Layout;
}

/**
 * @param props
 * @deprecated Use `AppForm` instead.
 * This component will be merged into `AppForm` and removed in a next major release.
 * During migration, consider removing the `onSubmit` props.
 * If you did not bound `noValidate` props, you will have to bound `domValidate` to `AppForm`.
 */
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

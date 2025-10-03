import type { FormHTMLAttributes, ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

export type Layout = 'inline' | 'stacked';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  layout?: Layout;
}

const formContext = createContext<{ layout: Layout }>({
  layout: 'stacked',
});

// eslint-disable-next-line react-refresh/only-export-components
export function useFormContext() {
  return useContext(formContext);
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

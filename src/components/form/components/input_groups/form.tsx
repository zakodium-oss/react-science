import type { FormHTMLAttributes, ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  inline?: boolean;
}

const formContext = createContext<{ inline: boolean }>({ inline: false });

// eslint-disable-next-line react-refresh/only-export-components
export function useFormContext() {
  return useContext(formContext);
}

export function Form(props: FormProps) {
  const { children, inline = false, ...otherProps } = props;

  const contextValue = useMemo(() => {
    return { inline };
  }, [inline]);

  return (
    <formContext.Provider value={contextValue}>
      <form {...otherProps}>{children}</form>
    </formContext.Provider>
  );
}

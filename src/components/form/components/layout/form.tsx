import type { SyntheticEvent } from 'react';

import { withForm } from '../../context/use_ts_form.js';
import type { FormProps as DomFormProps } from '../input_groups/form.js';
import { Form as DomForm } from '../input_groups/form.js';

export interface AppFormProps extends Omit<DomFormProps, 'noValidate'> {
  domValidate?: boolean;
  /**
   * should return meta to pass to `form.handleSubmit`
   */
  // Generic meta-result is not possible with higher order component pattern
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmitMeta?: (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => any;
}

const props: AppFormProps = { children: null };

// AppForm is a generic component for all forms
// it will not touch to values inside the form,
// and unknown is not possible.
// <AppForm form={form}> would throw an error like "unknown is not compatible with <inferred values type>"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultValues: any = undefined;

/**
 * Mount `form.AppForm` and `Form` with default onSubmit.
 * It reduces the boilerplate code.
 */
export const AppForm = withForm({
  defaultValues,
  props,
  render: function FormRender(props) {
    const { form, children, domValidate, onSubmitMeta, ...domProps } = props;
    const { AppForm } = form;

    return (
      <AppForm>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <DomForm
          onSubmit={(event) => {
            event.preventDefault();

            const meta = onSubmitMeta?.(
              // onSubmit event is not typed properly.
              // It uses Event instead of SubmitEvent.
              event as SyntheticEvent<HTMLFormElement, SubmitEvent>,
            );

            void form.handleSubmit(meta);
          }}
          {...domProps}
          noValidate={!domValidate}
        >
          {children}
        </DomForm>
      </AppForm>
    );
  },
});

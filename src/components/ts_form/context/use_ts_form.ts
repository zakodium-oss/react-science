import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { Input } from '../components/input.js';
import { ResetButton } from '../components/reset_button.js';
import { SubmitButton } from '../components/submit_button.js';

const { useFormContext, useFieldContext, formContext, fieldContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  formComponents: {
    SubmitButton,
    ResetButton,
  },
  fieldComponents: {
    Input,
  },
});

export const useTSForm = useAppForm;
export { useFieldContext, useFormContext };

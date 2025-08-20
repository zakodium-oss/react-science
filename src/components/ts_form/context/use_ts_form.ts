import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { Input } from '../components/input.js';
import { ResetButton } from '../components/reset_button.js';
import { SubmitButton } from '../components/submit_button.js';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
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

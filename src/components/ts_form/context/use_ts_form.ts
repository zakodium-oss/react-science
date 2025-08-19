import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { TSInput } from '../ts_input.js';
import { TSResetButton } from '../ts_reset_button.js';
import { TSSubmitButton } from '../ts_submit_button.js';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  formComponents: {
    TSSubmitButton,
    TSResetButton,
  },
  fieldComponents: {
    TSInput,
  },
});

export const useTSForm = useAppForm;

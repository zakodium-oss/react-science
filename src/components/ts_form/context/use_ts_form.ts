import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { Checkbox } from '../components/checkbox.js';
import { Input } from '../components/input.js';
import { NumericInput } from '../components/numeric_input.js';
import { ResetButton } from '../components/reset_button.js';
import { Select } from '../components/select.js';
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
    NumericInput,
    Checkbox,
    Select,
  },
});

export const useForm = useAppForm;
export { useFieldContext, useFormContext };

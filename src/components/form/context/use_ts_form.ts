import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { Checkbox } from '../components/input/checkbox.js';
import { Input } from '../components/input/input.js';
import { NumericInput } from '../components/input/numeric_input.js';
import { ResetButton } from '../components/input/reset_button.js';
import { Select } from '../components/input/select.js';
import { SubmitButton } from '../components/input/submit_button.js';
import { Switch } from '../components/input/switch.js';

const { useFormContext, useFieldContext, formContext, fieldContext } =
  createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
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
    Switch,
  },
});

export const useForm = useAppForm;
export { useFieldContext, useFormContext, withForm };

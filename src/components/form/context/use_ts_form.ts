import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { Checkbox } from '../components/input/checkbox.js';
import { ColorPicker } from '../components/input/color_picker.tsx';
import { Input } from '../components/input/input.js';
import { NumericInput } from '../components/input/numeric_input.js';
import { RadioGroup } from '../components/input/radio_group.js';
import { ResetButton } from '../components/input/reset_button.js';
import { Select } from '../components/input/select.js';
import { SubmitButton } from '../components/input/submit_button.js';
import { Switch } from '../components/input/switch.js';
import { Section } from '../components/layout/Section.js';

const { useFormContext, useFieldContext, formContext, fieldContext } =
  createFormHookContexts();

/*
 * formComponents and fieldComponents components MUST have their types
 * exported from the `../components/input/index.ts`
 * or `../components/layout/index.ts` file.
 *
 * It is necessary for `withForm` usage.
 */
const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  formComponents: {
    SubmitButton,
    ResetButton,
    Section,
  },
  fieldComponents: {
    Input,
    NumericInput,
    Checkbox,
    Select,
    Switch,
    ColorPicker,
    RadioGroup,
  },
});

export const useForm = useAppForm;
export { useFieldContext, useFormContext, withFieldGroup, withForm };

import { revalidateLogic } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { z } from 'zod';

import { useForm } from '../../../src/components/index.js';

export default {
  title: 'Forms / Form',
};

const blurSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters long'),
});

export function BlurValidation() {
  const form = useForm({
    validationLogic: revalidateLogic({ modeAfterSubmission: 'blur' }),
    validators: { onDynamic: blurSchema },
    defaultValues: {
      name: '',
    },
    onSubmit: ({ value }) => {
      return blurSchema.parse(value);
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <form.AppField name="name">
        {(field) => (
          <field.Input label="Name" required placeholder="min 5 length" />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

import styled from '@emotion/styled';
import { revalidateLogic } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { action } from 'storybook/actions';
import { z } from 'zod';

import { useForm } from '../../../src/components/index.js';

export default {
  title: 'Forms / Form',
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 2rem 1.25rem;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  & > * {
    flex: 1 1 0;
  }
`;

const Alert = styled.div`
  background-color: #d3d6da;
  border-left: 5px solid #6d6d6e;
  padding: 0.5rem 0 0.5rem 1.25rem;
`;

const formSchema = z.object({
  firstName: z.string().min(1, 'first name is required'),
  lastName: z.string().min(1, 'last name is required'),
  city: z
    .string()
    .optional()
    .transform((value) => {
      if (value === '') return undefined;
      return value;
    }),
  age: z
    .string()
    .transform((value) => {
      if (value === '') return undefined;
      return Number(value);
    })
    .refine((value) => value !== undefined, { error: 'age is required' })
    .refine((value) => value && value >= 18 && value <= 100, {
      error: 'age must be between 18 and 100',
    }),
  agree: z.boolean().refine((value) => value, {
    message: 'You must agree to the terms and conditions',
  }),
  favorite: z.string({ error: 'favorite food is required' }),
  developerMode: z
    .boolean()
    .refine((value) => value, { error: 'This field should be true' }),
});

type Schema = z.input<typeof formSchema>;

const defaultValues: Partial<Schema> = {
  firstName: '',
  lastName: '',
  city: '',
  age: '18',
  agree: false,
  favorite: undefined,
  developerMode: false,
};

// TODO : add example with 1/2 champs for onBlur
export function Example() {
  const form = useForm({
    defaultValues,
    onSubmitInvalid: ({ value }) => {
      action('onSubmitInvalid')(formSchema.parse(value));
    },
    onSubmit: ({ value }) => action('onSubmit')(formSchema.parse(value)),
    validationLogic: revalidateLogic({
      modeAfterSubmission: 'change',
    }),
    validators: {
      onDynamic: formSchema,
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormWrapper>
        <form.AppField name="firstName">
          {(field) => <field.Input label="First name" required />}
        </form.AppField>

        <form.AppField name="lastName">
          {(field) => <field.Input label="Last name" required />}
        </form.AppField>

        <form.AppField name="city">
          {(field) => <field.Input label="City" />}
        </form.AppField>
      </FormWrapper>

      <FormWrapper>
        <form.AppField name="favorite">
          {(field) => (
            <field.Select
              label="Favorite food"
              required
              items={[
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Orange', value: 'orange' },
                { label: 'Carrot', value: 'carrot' },
                { label: 'Potato', value: 'potato' },
                { label: 'Tomato', value: 'tomato' },
              ]}
            />
          )}
        </form.AppField>

        <form.AppField name="age">
          {(field) => (
            <field.NumericInput label="Age" required min={18} max={100} />
          )}
        </form.AppField>
      </FormWrapper>

      <form.AppField name="agree">
        {(field) => <field.Checkbox label="Agree term of service" />}
      </form.AppField>

      <form.AppField name="developerMode">
        {(field) => <field.Switch label="In developer mode" />}
      </form.AppField>

      <form.Subscribe selector={(state) => state.isDirty}>
        {(isDirty) => (
          <Alert>Your form {isDirty ? 'is' : "isn't"} dirty.</Alert>
        )}
      </form.Subscribe>

      <form.AppForm>
        <FormWrapper>
          <form.SubmitButton>Submit</form.SubmitButton>
          <form.ResetButton>Reset</form.ResetButton>
        </FormWrapper>
      </form.AppForm>
    </Form>
  );
}

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

import styled from '@emotion/styled';
import { revalidateLogic } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { action } from 'storybook/actions';
import { z } from 'zod';

import { useForm } from '../../src/components/index.js';

export default {
  title: 'Forms / Form / Tanstack',
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
  city: z.string().optional(),
});

type Schema = z.input<typeof formSchema>;

const defaultValues: Schema = {
  firstName: '',
  lastName: '',
  city: undefined,
};

// TODO: Add example with number NumericInput
// TODO: Add example with select, (checkbox ?)
export function ProofOfConcept() {
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => action('onSubmit')(value),
    validationLogic: revalidateLogic({
      modeAfterSubmission: 'blur',
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

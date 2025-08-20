import { FormGroup } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { FormEvent } from 'react';
import { useCallback } from 'react';
import { action } from 'storybook/actions';
import { z } from 'zod';

import { useTSForm } from '../../src/components/index.js';

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
});

export function ProofOfConcept() {
  const form = useTSForm({
    onSubmit: ({ value }) => action('onSubmit')(value),
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
    },
  });

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void form.handleSubmit();
    },
    [form],
  );

  return (
    <Form onSubmit={handleSubmit}>
      <FormWrapper>
        <form.AppField name="firstName">
          {(field) => (
            <FormGroup
              label="First name"
              labelFor="firstName"
              labelInfo={<span style={{ color: 'red' }}>*</span>}
              intent="danger"
            >
              <field.Input id="firstName" />
            </FormGroup>
          )}
        </form.AppField>

        <form.AppField name="lastName">
          {(field) => (
            <FormGroup
              label="Last name"
              labelFor="lastName"
              labelInfo={<span style={{ color: 'red' }}>*</span>}
              intent="danger"
            >
              <field.Input id="lastName" />
            </FormGroup>
          )}
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

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
  margin: 2rem 1.25rem 2rem 1.25rem;
`;

const FormActions = styled.div`
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
  text: z.string().min(1, 'Text is required'),
});

export function ProofOfConcept() {
  const form = useTSForm({
    onSubmit: ({ value }) => action('onSubmit')(value),
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      text: 'Hello, World!',
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
      <form.AppField name="text">
        {(field) => (
          <FormGroup
            label="Text"
            labelFor="name"
            labelInfo={<span style={{ color: 'red' }}>*</span>}
            intent="danger"
          >
            <field.TSInput id="name" />
          </FormGroup>
        )}
      </form.AppField>

      <form.Subscribe selector={(state) => state.isDirty}>
        {(isDirty) => (
          <Alert>Your form {isDirty ? 'is' : "isn't"} dirty.</Alert>
        )}
      </form.Subscribe>

      <form.AppForm>
        <FormActions>
          <form.TSSubmitButton>Submit</form.TSSubmitButton>
          <form.TSResetButton>Reset</form.TSResetButton>
        </FormActions>
      </form.AppForm>
    </Form>
  );
}

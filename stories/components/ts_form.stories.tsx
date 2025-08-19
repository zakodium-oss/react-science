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

      <form.AppForm>
        <form.TSSubmitButton>Submit</form.TSSubmitButton>
      </form.AppForm>
    </Form>
  );
}

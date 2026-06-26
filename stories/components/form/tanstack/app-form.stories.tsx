import styled from '@emotion/styled';
import type { Meta } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { z } from 'zod';

import type { AppFormProps } from '../../../../src/components/index.ts';
import { AppForm, useForm } from '../../../../src/components/index.ts';

type Props = Pick<AppFormProps, 'layout'>;

export default {
  title: 'Forms/Form/Tanstack/AppForm',
  argTypes: {
    layout: {
      control: 'select',
      options: ['inline', 'stacked'],
    },
  },
  args: {
    layout: 'inline',
  },
} as Meta<Props>;

const schema = z.object({
  name: z.string().min(1),
  // coerce number must be annotated, otherwise tanstack form inference will throw error
  // due to `age: unknown` in defaultValues
  age: z.coerce.number<string>().min(18),
});

const defaultValues: z.input<typeof schema> = {
  name: '',
  age: '',
};

export function SimpleAppForm(props: Pick<AppFormProps, 'layout'>) {
  const form = useForm({
    defaultValues,
    validators: { onDynamic: schema, onSubmit: schema },
    onSubmit: ({ value }) => {
      const parsedValue = schema.parse(value);
      action('onSubmit')(parsedValue);
    },
    onSubmitInvalid({ value }) {
      action('onSubmitInvalid')(value);
    },
  });
  const { AppField, SubmitButton, ResetButton } = form;

  return (
    <AppForm form={form} layout={props.layout}>
      <AppField name="name">
        {({ Input }) => <Input label="Name" required />}
      </AppField>
      <AppField name="age">
        {({ NumericInput }) => <NumericInput label="Age" required />}
      </AppField>

      <Actions>
        <ResetButton>Reset</ResetButton>
        <SubmitButton>Submit</SubmitButton>
      </Actions>
    </AppForm>
  );
}

const onSubmitMetaSchema = z.enum(['apply', 'submit']);
const onSubmitMeta: z.output<typeof onSubmitMetaSchema> = 'submit';

export function MetaAppForm(props: Pick<AppFormProps, 'layout'>) {
  const form = useForm({
    defaultValues,
    validators: { onDynamic: schema, onSubmit: schema },
    onSubmitMeta,
    onSubmit: ({ value, meta }) => {
      const parsedValue = schema.parse(value);
      action('onSubmit')({ parsedValue, meta });
    },
    onSubmitInvalid({ value, meta }) {
      action('onSubmitInvalid')({ value, meta });
    },
  });
  const { AppField, SubmitButton, ResetButton } = form;

  return (
    <AppForm
      form={form}
      layout={props.layout}
      onSubmitMeta={(event) => {
        const submitter = event.nativeEvent.submitter;
        const parsed = onSubmitMetaSchema.safeParse(submitter?.dataset.meta);
        return parsed.success ? parsed.data : 'submit';
      }}
    >
      <AppField name="name">
        {({ Input }) => <Input label="Name" required />}
      </AppField>
      <AppField name="age">
        {({ NumericInput }) => <NumericInput label="Age" required />}
      </AppField>

      <Actions>
        <ResetButton>Reset</ResetButton>
        <SubmitButton data-meta="apply">Apply</SubmitButton>
        <SubmitButton data-meta="submit">Submit</SubmitButton>
      </Actions>
    </AppForm>
  );
}

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25em;
`;

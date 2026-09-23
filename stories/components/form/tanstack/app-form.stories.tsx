import styled from '@emotion/styled';
import type { Meta } from '@storybook/react-vite';
import { revalidateLogic } from '@tanstack/react-form';
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

const tableSchema = z.array(z.object({ id: z.string() }));

const schema = z.object({
  name: z.string().min(1),
  // coerce number must be annotated, otherwise tanstack form inference will throw error
  // due to `age: unknown` in defaultValues
  age: z.coerce.number<string>().min(18),
  // ensure no errors in types with `<AppForm form` when schema contains z.array type.
  table: tableSchema,
});

const defaultValues: z.input<typeof schema> = {
  name: '',
  age: '',
  table: [],
};

export function SimpleAppForm(props: Props) {
  const form = useForm({
    defaultValues,
    validators: { onDynamic: schema, onSubmit: schema },
    validationLogic: revalidateLogic({ mode: 'change' }),
    onSubmit: ({ value }) => {
      const parsedValue = schema.parse(value);
      action('onSubmit')(parsedValue);
    },
    onSubmitInvalid({ value }) {
      action('onSubmitInvalid')(value);
    },
  });

  return (
    <AppForm form={form} layout={props.layout}>
      <form.AppField name="name">
        {({ Input }) => <Input label="Name" required />}
      </form.AppField>
      <form.AppField name="age">
        {({ NumericInput }) => <NumericInput label="Age" required />}
      </form.AppField>

      <Actions>
        <form.ResetButton>Reset</form.ResetButton>
        <form.SubmitButton>Submit</form.SubmitButton>
      </Actions>
    </AppForm>
  );
}

const onSubmitMetaSchema = z.enum(['apply', 'submit']);
const onSubmitMeta: z.output<typeof onSubmitMetaSchema> = 'submit';

export function MetaAppForm(props: Props) {
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
      <form.AppField name="name">
        {({ Input }) => <Input label="Name" required />}
      </form.AppField>
      <form.AppField name="age">
        {({ NumericInput }) => <NumericInput label="Age" required />}
      </form.AppField>

      <Actions>
        <form.ResetButton>Reset</form.ResetButton>
        <form.SubmitButton data-meta="apply">Apply</form.SubmitButton>
        <form.SubmitButton data-meta="submit">Submit</form.SubmitButton>
      </Actions>
    </AppForm>
  );
}

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25em;
`;

export function FormOnSubmitStopPropagation(
  props: Pick<AppFormProps, 'layout' | 'onSubmitStopPropagation'>,
) {
  const form = useForm({
    defaultValues,
    validators: { onDynamic: schema },
    validationLogic: revalidateLogic(),
    onSubmit({ value }) {
      action('onSubmit')(value);
    },
  });

  return (
    <div onSubmit={(event) => action('onSubmit parent')(event)}>
      <AppForm
        form={form}
        layout={props.layout}
        onSubmitStopPropagation={props.onSubmitStopPropagation}
      >
        <form.AppField name="name">
          {({ Input }) => <Input label="Name" required />}
        </form.AppField>
        <form.AppField name="age">
          {({ NumericInput }) => <NumericInput label="Age" required />}
        </form.AppField>

        <Actions>
          <form.ResetButton>Reset</form.ResetButton>
          <form.SubmitButton>Submit</form.SubmitButton>
        </Actions>
      </AppForm>
    </div>
  );
}
FormOnSubmitStopPropagation.argTypes = {
  onSubmitStopPropagation: {
    control: 'boolean',
  },
};
FormOnSubmitStopPropagation.args = {
  onSubmitStopPropagation: true,
};

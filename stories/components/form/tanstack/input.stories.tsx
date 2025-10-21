import type { Meta } from '@storybook/react-vite';
import { revalidateLogic } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { action } from 'storybook/actions';
import { z } from 'zod';

import type { Layout } from '../../../../src/components/form/components/input_groups/form_context.js';
import { Section } from '../../../../src/components/form/components/layout/Section.js';
import { useForm } from '../../../../src/components/index.js';

export default {
  title: 'Forms / Form / Tanstack / Inputs',
  args: {
    layout: 'stacked',
  },
  decorators: [
    (Story) => (
      <Section title="Form Inputs">
        <Story />
      </Section>
    ),
  ],
  argTypes: {
    layout: {
      control: 'select',
      options: ['inline', 'stacked'],
    },
  },
} as Meta;

interface InputProps {
  layout: Layout;
}

const numericInputSchema = z.object({
  numeric: z
    .string()
    .transform((value) => {
      if (value === '') return undefined;
      return Number(value);
    })
    .refine((value) => value && value >= 0 && value <= 100, {
      error: 'Value cannot be less than 0 or greater than 100',
    }),
});

export function NumericInput(props: InputProps) {
  const form = useForm({
    onSubmit: ({ value }) =>
      action('onSubmit')(numericInputSchema.parse(value)),
    validationLogic: revalidateLogic({ modeAfterSubmission: 'change' }),
    validators: { onDynamic: numericInputSchema },
    defaultValues: {
      numeric: '18',
    } as Partial<z.input<typeof numericInputSchema>>,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <form.AppField name="numeric">
        {(field) => (
          <field.NumericInput
            layout={props.layout}
            label="Numeric"
            required
            placeholder="18"
            helpText="Value must be between 0 and 100"
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

const inputSchema = z.object({
  input: z.string().min(1, 'Value must be at least 1 character'),
});

export function Input(props: InputProps) {
  const form = useForm({
    onSubmit: ({ value }) => action('onSubmit')(inputSchema.parse(value)),
    validationLogic: revalidateLogic({ modeAfterSubmission: 'change' }),
    validators: { onDynamic: inputSchema },
    defaultValues: {
      input: '',
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <form.AppField name="input">
        {(field) => (
          <field.Input
            layout={props.layout}
            label="Input"
            required
            placeholder="Hello, World!"
            helpText="a string"
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

const selectSchema = z.object({
  select: z.string({ error: 'At least one element is required' }),
});

export function Select(props: InputProps) {
  const form = useForm({
    onSubmit: ({ value }) => action('onSubmit')(selectSchema.parse(value)),
    validationLogic: revalidateLogic({ modeAfterSubmission: 'change' }),
    validators: { onDynamic: selectSchema },
    defaultValues: {
      select: undefined,
    } as Partial<z.input<typeof selectSchema>>,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <form.AppField name="select">
        {(field) => (
          <field.Select
            layout={props.layout}
            label="Favorite food"
            helpText="Whats your favorite food ?"
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

      <form.AppForm>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

const checkboxSchema = z.object({
  box: z.boolean().refine((value) => value, {
    message: 'You must check the box',
  }),
});

export function Checkbox() {
  const form = useForm({
    onSubmit: ({ value }) => action('onSubmit')(checkboxSchema.parse(value)),
    validationLogic: revalidateLogic({ modeAfterSubmission: 'change' }),
    validators: { onDynamic: checkboxSchema },
    defaultValues: {
      box: false,
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <form.AppField name="box">
        {(field) => <field.Checkbox label="Check this box" />}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

// We disable layout control for Checkbox as it doesn't support it
Checkbox.argTypes = {
  layout: {
    table: {
      disable: true,
    },
  },
};

const switchSchema = z.object({
  switch: z.literal(true, { error: 'You must turn on the switch' }),
});

export function Switch(props: InputProps) {
  const form = useForm({
    onSubmit: ({ value }) => action('onSubmit')(switchSchema.parse(value)),
    validationLogic: revalidateLogic({ modeAfterSubmission: 'change' }),
    validators: { onDynamic: switchSchema },
    defaultValues: {
      switch: false,
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <form.AppField name="switch">
        {(field) => (
          <field.Switch layout={props.layout} label="Switch this element" />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

const colorPickerSchema = z.object({
  color: z.string().optional(),
});

type ColorPickerSchema = z.input<typeof colorPickerSchema>;

export function ColorPicker() {
  const form = useForm({
    onSubmit: ({ value }) => action('onSubmit')(colorPickerSchema.parse(value)),
    validationLogic: revalidateLogic({ modeAfterSubmission: 'change' }),
    validators: { onDynamic: colorPickerSchema },
    defaultValues: {
      color: undefined,
    } as ColorPickerSchema,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <form.AppField name="color">
        {(field) => (
          <field.ColorPicker
            label="Choose a color that you want"
            helpText="This can be usefull to render your color"
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

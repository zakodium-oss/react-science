import { Classes } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { revalidateLogic } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { action } from 'storybook/actions';
import { match } from 'ts-pattern';
import { z } from 'zod';

import { useForm, useSelect, withForm } from '../../../src/components/index.js';

export default {
  title: 'Forms / Form / Tanstack',
};

const Fieldset = styled.fieldset`
  & legend {
    padding-right: 5px;
    background: white;
    font-weight: 550;
  }

  padding-top: 5px;
  padding-bottom: 10px;

  & + & {
    border-top: none;
    margin-top: calc(-8px + -10px);
  }

  &:has(+ &) {
    padding-bottom: 20px;
  }
`;

const cssColSpan = Array.from(
  { length: 6 },
  (_, i) => `& .col-span-${i} {
    grid-column: span ${i} / span ${i};
  }`,
).join('\n\n');

const GridGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5em;
  justify-items: stretch;

  ${cssColSpan}

  & > .contents {
    display: contents;
  }

  & > .${Classes.FORM_GROUP} {
    margin: 0;
  }

  /* tweaks styling for Select inline in a grid */
  & .${Classes.FORM_CONTENT} {
    flex: 1;

    .${Classes.POPOVER_TARGET} {
      width: 100%;

      .${Classes.BUTTON} {
        justify-content: space-between;
      }
    }
  }

  /* tweaks for inputs in cell grid */
  & .${Classes.FORM_CONTENT} .${Classes.CONTROL_GROUP} .${Classes.INPUT_GROUP} {
    flex-shrink: 1;
    flex-grow: 1;
  }
`;

enum AdvancedIonizationsMode {
  Neutral = 'neutral',
  Positive = 'positive',
  Negative = 'negative',
  Advanced = 'advanced',
}

const formSchema = z.object({
  advancedIonizationsMode: z.enum(AdvancedIonizationsMode),
  advancedIonizationsPositive: z
    .object({
      ion: z.string(),
      from: z.string(),
      to: z.string(),
    })
    .optional(),
  advancedIonizationsNegative: z
    .object({
      ion: z.string(),
      from: z.string(),
      to: z.string(),
    })
    .optional(),
  advancedIonizationsAdvanced: z
    .object({
      ionizations: z.string(),
    })
    .optional(),
});

const modes: Array<{ label: string; value: AdvancedIonizationsMode }> = [
  { value: AdvancedIonizationsMode.Neutral, label: 'Neutral' },
  { value: AdvancedIonizationsMode.Positive, label: 'Positive' },
  { value: AdvancedIonizationsMode.Negative, label: 'Negative' },
  { value: AdvancedIonizationsMode.Advanced, label: 'Advanced' },
];

const defaultValues: z.input<typeof formSchema> = {
  advancedIonizationsMode: AdvancedIonizationsMode.Neutral,
  advancedIonizationsNegative: {
    ion: '',
    from: '',
    to: '',
  },
  advancedIonizationsPositive: {
    ion: '',
    from: '',
    to: '',
  },
  advancedIonizationsAdvanced: {
    ionizations: '',
  },
};

export function FullExample() {
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      action('onSubmit')(formSchema.parse(value));
    },
    validationLogic: revalidateLogic({
      modeAfterSubmission: 'blur',
    }),
    validators: {
      onDynamic: formSchema,
    },
  });

  const { value, ...otherSelectProps } = useSelect<{
    label: string;
    value: string;
  }>({
    itemTextKey: 'label',
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <Fieldset>
        <legend>Ionization</legend>
        <GridGroup>
          <form.AppField name="advancedIonizationsMode">
            {(field) => (
              <field.Select
                {...otherSelectProps}
                label="Mode"
                items={modes}
                required
              />
            )}
          </form.AppField>

          <form.Subscribe
            selector={(state) => state.values.advancedIonizationsMode}
          >
            {(mode) =>
              match(mode)
                .with(AdvancedIonizationsMode.Neutral, () => null)
                .with(AdvancedIonizationsMode.Positive, () => (
                  <PositiveIonizationFields form={form} />
                ))
                .with(AdvancedIonizationsMode.Negative, () => (
                  <NegativeIonizationFields form={form} />
                ))
                .with(AdvancedIonizationsMode.Advanced, () => (
                  <AdvancedIonizationFields form={form} />
                ))
                .exhaustive()
            }
          </form.Subscribe>

          <form.AppForm>
            <form.SubmitButton>Submit</form.SubmitButton>
          </form.AppForm>
        </GridGroup>
      </Fieldset>
    </form>
  );
}

const positiveOptions = [
  { label: 'Append H+', value: 'H+' },
  { label: 'Append Na+', value: 'Na+' },
  { label: 'Append K+', value: 'K+' },
  { label: 'Append Cs+', value: 'Cs+' },
  { label: 'Remove electron', value: '-' },
];

const PositiveIonizationFields = withForm({
  defaultValues,
  render: ({ form }) => {
    const { value, ...otherSelectProps } = useSelect<{
      label: string;
      value: string;
    }>({ itemTextKey: 'label' });

    return (
      <>
        <form.AppField name="advancedIonizationsPositive.ion">
          {(field) => (
            <field.Select
              label="Ion"
              items={positiveOptions}
              {...otherSelectProps}
            />
          )}
        </form.AppField>

        <form.AppField name="advancedIonizationsPositive.from">
          {(field) => <field.Input label="From" inline />}
        </form.AppField>

        <form.AppField name="advancedIonizationsPositive.to">
          {(field) => <field.Input label="To" inline />}
        </form.AppField>
      </>
    );
  },
});

const negativeOptions = [
  { label: 'Append H+', value: 'H+' },
  { label: 'Append Na+', value: 'Na+' },
  { label: 'Append K+', value: 'K+' },
  { label: 'Append Cs+', value: 'Cs+' },
  { label: 'Remove electron', value: '-' },
];

const NegativeIonizationFields = withForm({
  defaultValues,
  render: ({ form }) => {
    const { value, ...otherSelectProps } = useSelect<{
      label: string;
      value: string;
    }>({ itemTextKey: 'label' });

    return (
      <>
        <form.AppField name="advancedIonizationsNegative.ion">
          {(field) => (
            <field.Select
              label="Ion"
              items={negativeOptions}
              {...otherSelectProps}
            />
          )}
        </form.AppField>

        <form.AppField name="advancedIonizationsNegative.from">
          {(field) => <field.Input label="From" inline />}
        </form.AppField>

        <form.AppField name="advancedIonizationsNegative.to">
          {(field) => <field.Input label="To" inline />}
        </form.AppField>
      </>
    );
  },
});

const AdvancedIonizationFields = withForm({
  defaultValues,
  render: ({ form }) => {
    return (
      <form.AppField name="advancedIonizationsAdvanced.ionizations">
        {(field) => <field.Input placeholder="E.g. H+, (H+)2, (H+)-2" inline />}
      </form.AppField>
    );
  },
});

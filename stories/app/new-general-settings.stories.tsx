import styled from '@emotion/styled';
import type { Meta } from '@storybook/react-vite';
import { revalidateLogic } from '@tanstack/react-form';
import { action } from 'storybook/actions';
import { z } from 'zod';

import { Form } from '../../src/components/form/components/input_groups/form.js';
import { useForm } from '../../src/components/index.js';

import { Section } from './components/Section.js';

export default {
  title: 'Forms/Example/GeneralSettings/Proposal',
} as Meta;

const StyledForm = styled(Form)`
  max-width: 762px;
`;

const formSchema = z.object({
  general: z.object({
    opacityDimmedSpectra: z
      .string()
      .transform((value) => {
        if (value === '') return undefined;
        return Number(value);
      })
      .refine((value) => value && value >= 0 && value <= 1, {
        error: 'Value cannot be less than 0 or greater than 1',
      }),
    invertActions: z.boolean(),
    invertScroll: z.boolean(),
  }),
  experimentalFeatures: z.object({
    enableExperimentalFeatures: z.boolean(),
    checkbox: z.boolean(),
  }),
  rendering: z.object({
    spectraRendering: z.enum([
      'auto',
      'optimize-speed',
      'crisp-edges',
      'geometric-precision',
    ]),
  }),
  loggingSettings: z.object({
    level: z.enum([
      'fatal',
      'error',
      'warn',
      'info',
      'debug',
      'trace',
      'silent',
    ]),
    popupLoggingLevel: z.enum([
      'fatal',
      'error',
      'warn',
      'info',
      'debug',
      'trace',
      'silent',
    ]),
  }),
  peaksLabel: z.object({
    marginTop: z.string().transform((value) => {
      if (value === '') return undefined;
      return Number(value);
    }),
  }),
});

const defaultValues: z.input<typeof formSchema> = {
  general: {
    opacityDimmedSpectra: '0.4',
    invertActions: false,
    invertScroll: false,
  },
  experimentalFeatures: {
    enableExperimentalFeatures: false,
    checkbox: true,
  },
  rendering: {
    spectraRendering: 'auto',
  },
  loggingSettings: {
    level: 'info',
    popupLoggingLevel: 'error',
  },
  peaksLabel: {
    marginTop: '0.5',
  },
};

export function GeneralSettings() {
  const form = useForm({
    defaultValues,
    validators: { onDynamic: formSchema },
    validationLogic: revalidateLogic({ modeAfterSubmission: 'change' }),
    onSubmit: ({ value }) => {
      const parsedValue = formSchema.parse(value);
      action('onSubmit')(parsedValue);
    },
  });

  return (
    <StyledForm
      noValidate
      inline
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
      <Section
        title="General"
        description="These settings affect the entire application."
      >
        <form.AppField name="general.opacityDimmedSpectra">
          {(field) => (
            <field.NumericInput
              fill
              label="Opacity of dimmed spectra"
              helpText="Value should be between 0 and 1"
              step={0.1}
            />
          )}
        </form.AppField>
        <form.AppField name="general.invertActions">
          {(field) => <field.Switch label="Invert Actions" fill />}
        </form.AppField>
        <form.AppField name="general.invertScroll">
          {(field) => <field.Switch label="Invert Scroll" fill />}
        </form.AppField>
      </Section>

      <Section
        title="Experimental features"
        description="These features are experimental."
      >
        <form.AppField name="experimentalFeatures.enableExperimentalFeatures">
          {(field) => (
            <field.Switch label="Enable experimental features" fill />
          )}
        </form.AppField>

        <form.AppField name="experimentalFeatures.checkbox">
          {(field) => (
            <field.Checkbox label="Allow drag and drop of files onto the app (may cause issues on some browsers)" />
          )}
        </form.AppField>
      </Section>

      <Section
        title="Rendering"
        description="Settings related to how spectra are rendered."
      >
        <form.AppField name="rendering.spectraRendering">
          {(field) => (
            <field.Select
              label="Spectra Rendering"
              fill
              items={[
                { label: 'Auto', value: 'auto' },
                { label: 'Optimize speed', value: 'optimize-speed' },
                { label: 'Crisp edges', value: 'crisp-edges' },
                {
                  label: 'Geometric precision',
                  value: 'geometric-precision',
                },
              ]}
            />
          )}
        </form.AppField>
      </Section>

      <Section
        title="Logging settings"
        description="Settings related to application logging."
      >
        <form.AppField name="loggingSettings.level">
          {(field) => (
            <field.Select
              label="Level"
              fill
              items={[
                { label: 'Fatal', value: 'fatal' },
                { label: 'Error', value: 'error' },
                { label: 'Warn', value: 'warn' },
                { label: 'Info', value: 'info' },
                { label: 'Debug', value: 'debug' },
                { label: 'Trace', value: 'trace' },
                { label: 'Silent', value: 'silent' },
              ]}
            />
          )}
        </form.AppField>

        <form.AppField name="loggingSettings.popupLoggingLevel">
          {(field) => (
            <field.Select
              label="Popup logging level"
              fill
              items={[
                { label: 'Fatal', value: 'fatal' },
                { label: 'Error', value: 'error' },
                { label: 'Warn', value: 'warn' },
                { label: 'Info', value: 'info' },
                { label: 'Debug', value: 'debug' },
                { label: 'Trace', value: 'trace' },
                { label: 'Silent', value: 'silent' },
              ]}
            />
          )}
        </form.AppField>
      </Section>

      <Section
        title="Peaks label"
        description="Settings for peaks label. Exprimed in pixel."
      >
        <form.AppField name="peaksLabel.marginTop">
          {(field) => <field.NumericInput label="Margin top" fill />}
        </form.AppField>
      </Section>

      <form.AppForm>
        <form.SubmitButton>Apply</form.SubmitButton>
      </form.AppForm>
    </StyledForm>
  );
}

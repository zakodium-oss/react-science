import styled from '@emotion/styled';
import type { Meta } from '@storybook/react-vite';
import { revalidateLogic } from '@tanstack/react-form';
import { action } from 'storybook/actions';
import { z } from 'zod';

import { Form } from '../../../../src/components/form/components/input_groups/form.js';
import type { Layout } from '../../../../src/components/form/components/input_groups/form_context.js';
import {
  FieldGroupSVGTextStyleFields,
  svgTextStyleFieldsSchema,
  useForm,
} from '../../../../src/components/index.js';

export default {
  title: 'Forms/Form/Tanstack/GeneralSettings',
  argTypes: {
    layout: {
      control: 'select',
      options: ['inline', 'stacked'],
    },
  },
  args: {
    layout: 'inline',
  },
} as Meta;

const StyledForm = styled(Form)`
  max-width: 762px;
  display: flex;
  flex-direction: column;
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
    autoSaveInterval: z
      .string()
      .transform((value) => (value === '' ? undefined : Number(value)))
      .refine((value) => value !== undefined && value >= 1 && value <= 60, {
        error: 'Interval must be between 1 and 60 minutes',
      }),
  }),
  experimentalFeatures: z.object({
    enableExperimentalFeatures: z.boolean(),
    checkbox: z.boolean(),
    betaUI: z.boolean(),
  }),
  rendering: z.object({
    spectraColor: z.string().optional(),
    spectraRendering: z.enum([
      'auto',
      'optimize-speed',
      'crisp-edges',
      'geometric-precision',
    ]),
    resolution: z.enum(['low', 'medium', 'high']),
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
    fileLogging: z.boolean(),
  }),
  peaksLabel: z.object({
    marginTop: z.string().transform((value) => {
      if (value === '') return undefined;
      return Number(value);
    }),
    fontSize: z
      .string()
      .transform((value) => (value === '' ? undefined : Number(value)))
      .refine((value) => value !== undefined && value >= 8 && value <= 32, {
        error: 'Font size must be between 8 and 32',
      }),
    textStyle: svgTextStyleFieldsSchema,
  }),
});

const defaultValues: z.input<typeof formSchema> = {
  general: {
    opacityDimmedSpectra: '0.4',
    invertActions: false,
    invertScroll: false,
    autoSaveInterval: '5',
  },
  experimentalFeatures: {
    enableExperimentalFeatures: false,
    checkbox: true,
    betaUI: false,
  },
  rendering: {
    spectraRendering: 'auto',
    resolution: 'high',
  },
  loggingSettings: {
    level: 'info',
    popupLoggingLevel: 'error',
    fileLogging: true,
  },
  peaksLabel: {
    marginTop: '0.5',
    fontSize: '14',
    textStyle: {
      fill: '#000000',
      fontSize: '16',
      fontStyle: 'normal',
      fontWeight: 'normal',
    },
  },
};

interface GeneralSettingsProps {
  layout?: Layout;
}

export function GeneralSettings(props: GeneralSettingsProps) {
  const { layout = 'inline' } = props;

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
      layout={layout}
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
      <form.Section
        title="General"
        description="These settings affect the entire application."
      >
        <form.AppField name="general.opacityDimmedSpectra">
          {(field) => (
            <field.NumericInput
              label="Opacity of dimmed spectra"
              helpText="Value should be between 0 and 1."
              step={0.1}
            />
          )}
        </form.AppField>
        <form.AppField name="general.invertActions">
          {(field) => (
            <field.Checkbox
              label="Invert Actions"
              helpText="Invert each action you do"
            />
          )}
        </form.AppField>
        <form.AppField name="general.invertScroll">
          {(field) => <field.Checkbox label="Invert Scroll" />}
        </form.AppField>

        <form.AppField name="general.autoSaveInterval">
          {(field) => (
            <field.NumericInput
              label="Auto-save interval (minutes)"
              helpText="Between 1 and 60"
              step={1}
            />
          )}
        </form.AppField>
      </form.Section>

      <form.Section
        title="Experimental features"
        description="These features are experimental."
      >
        <form.AppField name="experimentalFeatures.enableExperimentalFeatures">
          {(field) => <field.Checkbox label="Enable experimental features" />}
        </form.AppField>

        <form.AppField name="experimentalFeatures.checkbox">
          {(field) => (
            <field.Checkbox
              helpText="You should no click this checkbox"
              label="Allow drag and drop of files onto the app. This is a way longer text that should be on multiple lines"
            />
          )}
        </form.AppField>

        <form.AppField name="experimentalFeatures.betaUI">
          {(field) => (
            <field.Checkbox
              label="Enable new Beta UI"
              helpText="Try new UI design"
            />
          )}
        </form.AppField>
      </form.Section>

      <form.Section
        title="Rendering"
        description="Settings related to how spectra are rendered."
      >
        <form.AppField name="rendering.spectraColor">
          {(field) => <field.ColorPicker label="Color of mass spectra" />}
        </form.AppField>

        <form.AppField name="rendering.spectraRendering">
          {(field) => (
            <field.Select
              label="Spectra Rendering"
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

        <form.AppField name="rendering.resolution">
          {(field) => (
            <field.Select
              label="Resolution"
              items={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
              ]}
            />
          )}
        </form.AppField>
      </form.Section>

      <form.Section
        title="Logging settings"
        description="Settings related to application logging."
      >
        <form.AppField name="loggingSettings.level">
          {(field) => (
            <field.Select
              label="Level"
              helpText="Set the minimum level of messages to log."
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

        <form.AppField name="loggingSettings.fileLogging">
          {(field) => (
            <field.Checkbox
              label="Enable file logging"
              helpText="Save logs to file"
            />
          )}
        </form.AppField>
      </form.Section>

      <form.Section
        title="Peaks label"
        description="Settings for peaks label. Exprimed in pixel."
      >
        <form.AppField name="peaksLabel.marginTop">
          {(field) => <field.NumericInput label="Margin top" />}
        </form.AppField>

        <form.AppField name="peaksLabel.fontSize">
          {(field) => (
            <field.NumericInput label="Font size" helpText="Between 8 and 32" />
          )}
        </form.AppField>

        <FieldGroupSVGTextStyleFields
          form={form}
          fields="peaksLabel.textStyle"
          label="Text style"
        />
      </form.Section>

      <form.AppForm>
        <form.SubmitButton>Apply</form.SubmitButton>
      </form.AppForm>
    </StyledForm>
  );
}

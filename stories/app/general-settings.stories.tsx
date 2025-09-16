import { Button } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { revalidateLogic } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { action } from 'storybook/actions';
import { z } from 'zod';

import { useForm } from '../../src/components/index.js';

export default {
  title: 'Forms/Example/GeneralSettings',
};

const SplitContainer = styled.div`
  display: flex;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Tab = styled.div<{ active?: boolean }>`
  align-items: center;
  border-radius: 2px;
  display: flex;
  padding: 0 10px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  line-height: 30px;

  :hover {
    color: #215db0;
  }

  ${(props) => props.active && 'background-color: #dbe4f5;'}
  ${(props) => props.active && 'color: #215db0;'}
`;

const Content = styled.div`
  padding-left: 20px;
  width: 100%;
`;

const SectionTitle = styled.p`
  font-size: 13px;
  color: rgb(44, 168, 255);
  margin-bottom: 10px;
  border-bottom: 0.55px solid rgb(249, 249, 249);
  padding: 6px 2px;
  margin-top: 2rem;
`;

const Container = styled.div``;

const ContainerFooter = styled.div`
  align-items: center;
  border-radius: 0 0 4px 4px;
  border-top: 1px solid rgba(17, 20, 24, 0.15);
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 10px 10px 10px 16px;
`;

const ContainerFooterContent = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 10px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const formSchema = z.object({
  general: z.object({
    opacityDimmedSpectra: z.number().min(0).max(1),
    invertActions: z.boolean(),
    invertScroll: z.boolean(),
  }),
  experimentalFeatures: z.object({
    enableExperimentalFeatures: z.boolean(),
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
    marginTop: z.number(),
  }),
});

const defaultValues: z.input<typeof formSchema> = {
  general: {
    opacityDimmedSpectra: 0.4,
    invertActions: false,
    invertScroll: false,
  },
  experimentalFeatures: {
    enableExperimentalFeatures: false,
  },
  rendering: {
    spectraRendering: 'auto',
  },
  loggingSettings: {
    level: 'info',
    popupLoggingLevel: 'error',
  },
  peaksLabel: {
    marginTop: 0,
  },
};

export function GeneralSettings() {
  const form = useForm({
    defaultValues,
    validators: { onDynamic: formSchema },
    validationLogic: revalidateLogic({ modeAfterSubmission: 'change' }),
    onSubmit: ({ value }) => action('onSubmit')(formSchema.parse(value)),
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Container>
        <SplitContainer>
          <Tabs>
            <Tab active>General</Tab>
            <Tab>Nuclei</Tab>
            <Tab>Panels</Tab>
            <Tab>Tools</Tab>
            <Tab>Databases</Tab>
            <Tab>Import filters</Tab>
            <Tab>Tile block</Tab>
            <Tab>Auto processing</Tab>
            <Tab>Spectra colors</Tab>
            <Tab>Export</Tab>
          </Tabs>
          <Content>
            <Section>
              <SectionTitle>General</SectionTitle>

              <form.AppField name="general.opacityDimmedSpectra">
                {(field) => (
                  <field.NumericInput
                    label="Opacity of dimmed spectra [0-1]"
                    inline
                  />
                )}
              </form.AppField>

              <form.AppField name="general.invertActions">
                {(field) => <field.Switch label="Invert actions" fill />}
              </form.AppField>

              <form.AppField name="general.invertScroll">
                {(field) => <field.Switch label="Invert scroll" fill />}
              </form.AppField>
            </Section>

            <Section>
              <SectionTitle>Experimental features</SectionTitle>
              <form.AppField name="experimentalFeatures.enableExperimentalFeatures">
                {(field) => (
                  <field.Switch label="Enable experimental features" fill />
                )}
              </form.AppField>
            </Section>

            <Section>
              <SectionTitle>Rendering</SectionTitle>
              <form.AppField name="rendering.spectraRendering">
                {(field) => (
                  <field.Select
                    label="Spectra Rendering"
                    inline
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

            <Section>
              <SectionTitle>Logging settings</SectionTitle>
              <form.AppField name="loggingSettings.level">
                {(field) => (
                  <field.Select
                    label="Level"
                    inline
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
                    inline
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

            <Section>
              <SectionTitle>Peaks label</SectionTitle>
              <form.AppField name="peaksLabel.marginTop">
                {(field) => <field.NumericInput label="Margin top" inline />}
              </form.AppField>
            </Section>
          </Content>
        </SplitContainer>

        <ContainerFooter>
          <ContainerFooterContent>
            <Button intent="danger">Cancel</Button>
            <form.AppForm>
              <form.SubmitButton intent="success">
                Apply and Save
              </form.SubmitButton>

              <form.SubmitButton intent="primary">Apply</form.SubmitButton>
            </form.AppForm>
          </ContainerFooterContent>
        </ContainerFooter>
      </Container>
    </form>
  );
}

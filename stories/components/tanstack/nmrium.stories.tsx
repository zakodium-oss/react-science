import { revalidateLogic } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { action } from 'storybook/actions';
import { z } from 'zod';

import { useForm } from '../../../src/components/index.js';

export default {
  title: 'Forms / Form / Tanstack',
};

export function NMRiumPrediction() {
  const form = useForm({
    defaultValues: {
      smiles: 'O=C(C)Oc1ccccc1C(=O)O',
    },
    validators: {
      onDynamic: z.object({
        smiles: z.string().min(1, 'SMILES is required'),
      }),
    },
    validationLogic: revalidateLogic({
      modeAfterSubmission: 'blur',
    }),
    onSubmit: ({ value }) => action('onSubmit')(value),
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <h1>Predict spectra from SMILES</h1>
      <p>
        Please enter the SMILES code to predict 1D and 2D NMR spectra. You are
        also free to direct your visitors to the prediction page by appending an
        encoded SMILES to the following URL: <br />
        <span className="link-preview">
          https://app.nmrium.com/predict?smiles=
        </span>
      </p>
      <p className="text-sm">
        {'You can click for example on: '}
        <a href={'/predict?smiles=c1ccccc1CC'}>
          https://app.nmrium.com/predict?smiles=c1ccccc1CC
        </a>
      </p>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <form.AppField name="smiles">
          {(field) => (
            <field.Input placeholder="Enter any valid SMILES" required />
          )}
        </form.AppField>

        <form.AppForm>
          <form.SubmitButton>Predict</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}

NMRiumPrediction.storyName = 'NMRium prediction form';

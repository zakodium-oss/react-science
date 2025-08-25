import { Classes } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { revalidateLogic } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { z } from 'zod';

import { useForm, useSelect } from '../../../src/components/index.js';

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
});

const modes: Array<{ label: string; value: AdvancedIonizationsMode }> = [
  { value: AdvancedIonizationsMode.Neutral, label: 'Neutral' },
  { value: AdvancedIonizationsMode.Positive, label: 'Positive' },
  { value: AdvancedIonizationsMode.Negative, label: 'Negative' },
  { value: AdvancedIonizationsMode.Advanced, label: 'Advanced' },
];

export function FullExample() {
  const form = useForm({
    defaultValues: {
      advancedIonizationsMode: 'neutral',
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
    value: AdvancedIonizationsMode;
  }>({
    itemTextKey: 'label',
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form onSubmit={onSubmit}>
      <Fieldset>
        <legend>Ionization</legend>
        <GridGroup>
          <form.AppField name="advancedIonizationsMode">
            {(field) => (
              <field.Select
                {...otherSelectProps}
                label="Mode"
                required
                items={modes}
                itemsEqual="value"
                getValue={(item) => item.value}
              />
            )}
          </form.AppField>
          <p>BBB</p>
          <p>CCC</p>
        </GridGroup>
      </Fieldset>
    </form>
  );
}

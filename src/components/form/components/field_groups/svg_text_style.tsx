import { z } from 'zod';

import { withFieldGroup } from '../../context/use_ts_form.js';

export const svgTextStyleFieldsSchema = z.object({
  fill: z.string(),
  fontSize: z.coerce.number(),
  fontStyle: z.enum(['normal', 'italic']),
  fontWeight: z.enum(['normal', 'bold']),
});

// https://tanstack.com/form/latest/docs/framework/react/guides/form-composition#reusing-groups-of-fields-in-multiple-forms
// Default values are not used at runtime.
const defaultValues: z.input<typeof svgTextStyleFieldsSchema> = {
  fill: '#',
  fontSize: '16',
  fontStyle: 'normal',
  fontWeight: 'normal',
};

export const FieldGroupSVGTextStyleFields = withFieldGroup({
  defaultValues,
  props: {
    label: '',
  },
  render: function SVGTextStyleFields({ group, label }) {
    return (
      <>
        <div>{label}</div>
        {/* TODO: indent */}
        <group.AppField name="fill">
          {(field) => <field.Input label="Color" />}
        </group.AppField>
        <group.AppField name="fontSize">
          {(field) => <field.NumericInput label="Font size" />}
        </group.AppField>
        <div>TODO: preview</div>
      </>
    );
  },
});

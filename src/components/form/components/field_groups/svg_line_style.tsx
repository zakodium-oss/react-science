import type { z } from 'zod';

import { withFieldGroup } from '../../context/use_ts_form.ts';

import { Fieldset, Legend } from './fieldset.tsx';
import type { svgLineStyleFieldsSchema } from './svg_line_style.schema.ts';

type SvgLineStyleFields = z.input<typeof svgLineStyleFieldsSchema>;

// https://tanstack.com/form/latest/docs/framework/react/guides/form-composition#reusing-groups-of-fields-in-multiple-forms
// Default values are not used at runtime (same for props).
const defaultValues: SvgLineStyleFields = {
  color: '#000000FF',
  style: '1',
  width: '1',
};

export interface SVGLineStyleFieldsProps {
  label: string;
}

const inferSVGLineStyleFieldsProps: SVGLineStyleFieldsProps = {
  label: '',
};

export const FieldGroupSVGLineStyleFields = withFieldGroup({
  defaultValues,
  props: inferSVGLineStyleFieldsProps,
  render({ group, label }) {
    return (
      <Fieldset>
        <Legend>{label}</Legend>
      </Fieldset>
    );
  },
});

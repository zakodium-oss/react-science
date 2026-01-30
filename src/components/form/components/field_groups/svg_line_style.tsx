import styled from '@emotion/styled';
import { memo } from 'react';
import type { z } from 'zod';

import type { SVGStyledLineStrokePattern } from '../../../svg/index.js';
import { SVGStyledLine } from '../../../svg/index.js';
import { withFieldGroup } from '../../context/use_ts_form.js';
import { FormGroup } from '../input_groups/form_group.js';

import { Fieldset, Legend } from './fieldset.js';
import { svgLineStyleFieldsSchema } from './svg_line_style.schema.js';

type SvgLineStyleFields = z.input<typeof svgLineStyleFieldsSchema>;

// https://tanstack.com/form/latest/docs/framework/react/guides/form-composition#reusing-groups-of-fields-in-multiple-forms
// Default values are not used at runtime (same for props).
const defaultValues: SvgLineStyleFields = {
  stroke: '#000000',
  strokeOpacity: '1',
  strokeWidth: '1',
  strokeDasharray: 'solid',
};

interface PatternsOptionType {
  label: string;
  value: SVGStyledLineStrokePattern;
}

export interface SVGLineStyleFieldsProps {
  label: string;
}

const inferSVGLineStyleFieldsProps: SVGLineStyleFieldsProps = {
  label: '',
};

const patternsOptions: PatternsOptionType[] = [
  { label: 'Solid', value: 'solid' },
  { label: 'Dotted', value: 'dotted' },
  { label: 'Dashed', value: 'dashed' },
  { label: 'Dashed Dot', value: 'dashed-dot' },
];

export const FieldGroupSVGLineStyleFields = withFieldGroup({
  defaultValues,
  props: inferSVGLineStyleFieldsProps,
  render({ group, label }) {
    return (
      <Fieldset>
        <Legend>{label}</Legend>
        <group.AppField name="stroke">
          {(field) => <field.ColorPicker label="Color" disableAlpha />}
        </group.AppField>
        <group.AppField name="strokeOpacity">
          {(field) => (
            <field.NumericInput
              label="Opacity"
              min={0}
              max={1}
              minorStepSize={0.01}
              step={0.05}
              majorStepSize={0.1}
            />
          )}
        </group.AppField>
        <group.AppField name="strokeWidth">
          {(field) => <field.NumericInput label="Width" />}
        </group.AppField>
        <group.AppField name="strokeDasharray">
          {(field) => <field.Select label="Style" items={patternsOptions} />}
        </group.AppField>

        <FormGroup label="Preview">
          <group.Subscribe selector={(state) => state.values}>
            {(values) => <LineStyleFieldPreview {...values} />}
          </group.Subscribe>
        </FormGroup>
      </Fieldset>
    );
  },
});

const LineStyleFieldPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 30px;
`;

const LineStyleFieldPreview = memo(function TextStyleFieldPreview(
  props: SvgLineStyleFields,
) {
  const parsedValues = svgLineStyleFieldsSchema.parse(props);

  return (
    <LineStyleFieldPreviewContainer>
      <svg viewBox="0 0 180 30">
        <SVGStyledLine
          x1={0}
          x2={180}
          y1={15}
          y2={15}
          {...parsedValues}
          opacity={1}
        />
      </svg>
    </LineStyleFieldPreviewContainer>
  );
});

import { Checkbox } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { memo } from 'react';
import type { z } from 'zod';

import { SVGStyledText } from '../../../svg/index.js';
import { withFieldGroup } from '../../context/use_ts_form.js';
import { FormGroup } from '../input_groups/form_group.tsx';

import { Fieldset, Legend } from './fieldset.tsx';
import { svgTextStyleFieldsSchema } from './svg_text_style_fields.schema.ts';

const TextStyleSwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

type SvgTextStyleFields = z.input<typeof svgTextStyleFieldsSchema>;

// https://tanstack.com/form/latest/docs/framework/react/guides/form-composition#reusing-groups-of-fields-in-multiple-forms
// Default values are not used at runtime (same for props).
const defaultValues: SvgTextStyleFields = {
  fill: '#000000',
  fontSize: '16',
  fontStyle: 'normal',
  fontWeight: 'normal',
};

export interface SVGTextStyleFieldsProps {
  label: string;
  previewText?: string;
}

const inferSVGTextStyleFieldsProps: SVGTextStyleFieldsProps = {
  label: '',
};

export const FieldGroupSVGTextStyleFields = withFieldGroup({
  defaultValues,
  props: inferSVGTextStyleFieldsProps,
  render: function SVGTextStyleFields({
    group,
    label,
    previewText = 'Placeholder',
  }) {
    return (
      <Fieldset>
        <Legend>{label}</Legend>
        <group.AppField name="fill">
          {(field) => <field.ColorPicker label="Color" />}
        </group.AppField>
        <group.AppField name="fontSize">
          {(field) => <field.NumericInput label="Font size" />}
        </group.AppField>
        <FormGroup name="" label="Font modifiers">
          <TextStyleSwitchContainer>
            <group.Field name="fontWeight">
              {(field) => (
                <Checkbox
                  labelElement={<BoldLabel>Bold</BoldLabel>}
                  name={field.name}
                  checked={fontWeightToBoolean(field.state.value)}
                  onChange={(e) =>
                    field.handleChange(booleanToFontWeight(e.target.checked))
                  }
                  onBlur={field.handleBlur}
                />
              )}
            </group.Field>
            <group.Field name="fontStyle">
              {(field) => (
                <Checkbox
                  labelElement={<ItalicLabel>Italic</ItalicLabel>}
                  name={field.name}
                  checked={fontStyleToBoolean(field.state.value)}
                  onChange={(e) =>
                    field.handleChange(booleanToFontStyle(e.target.checked))
                  }
                  onBlur={field.handleBlur}
                />
              )}
            </group.Field>
          </TextStyleSwitchContainer>
        </FormGroup>

        <FormGroup name="" label="Preview">
          <group.Subscribe selector={(state) => state.values}>
            {(values) => (
              <TextStyleFieldPreview {...values}>
                {previewText}
              </TextStyleFieldPreview>
            )}
          </group.Subscribe>
        </FormGroup>
      </Fieldset>
    );
  },
});

const TextStyleFieldPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 30px;
`;

interface TextStyleFieldPreviewProps extends SvgTextStyleFields {
  children?: ReactNode;
}

const TextStyleFieldPreview = memo(function TextStyleFieldPreview(
  props: TextStyleFieldPreviewProps,
) {
  const parsedValues = svgTextStyleFieldsSchema.parse(props);
  const svgHeight = Math.round(parsedValues.fontSize * 1.5);
  const textY = Math.round(svgHeight / 4);

  return (
    <TextStyleFieldPreviewContainer>
      <svg height={svgHeight} width="auto">
        <SVGStyledText
          dominantBaseline="hanging"
          x={0}
          y={textY}
          {...parsedValues}
        >
          {props.children}
        </SVGStyledText>
      </svg>
    </TextStyleFieldPreviewContainer>
  );
});

const BoldLabel = styled.span`
  font-weight: bold;
`;
const ItalicLabel = styled.span`
  font-style: italic;
`;

function fontWeightToBoolean(
  weight: SvgTextStyleFields['fontWeight'],
): boolean {
  return weight === 'bold';
}

function booleanToFontWeight(
  weight: boolean,
): SvgTextStyleFields['fontWeight'] {
  return weight ? 'bold' : 'normal';
}

function fontStyleToBoolean(weight: SvgTextStyleFields['fontStyle']): boolean {
  return weight === 'italic';
}

function booleanToFontStyle(weight: boolean): SvgTextStyleFields['fontStyle'] {
  return weight ? 'italic' : 'normal';
}

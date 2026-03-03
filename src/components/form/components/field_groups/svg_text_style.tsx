import { Callout, Checkbox } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import type { z } from 'zod';

import { SVGStyledText } from '../../../svg/index.js';
import { withFieldGroup } from '../../context/use_ts_form.js';
import { FormGroup } from '../input_groups/form_group.js';

import { Fieldset, Legend } from './fieldset.js';
import { svgTextStyleFieldsSchema } from './svg_text_style.schema.js';

const TextStyleSwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

type SvgTextStyleFields = z.input<typeof svgTextStyleFieldsSchema>;

// https://tanstack.com/form/latest/docs/framework/react/guides/form-composition#reusing-groups-of-fields-in-multiple-forms
// Default values are not used at runtime (same for props).
const defaultValues: SvgTextStyleFields = {};

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
          {(field) => <field.NumericInput label="Font size" min={1} />}
        </group.AppField>
        <FormGroup label="Font style">
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

        <FormGroup label="Preview">
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

const TextStyleFieldPreviewErrorContainer = styled.ul`
  & > li {
    margin-left: 15px;
    list-style: disc;
  }
`;

const TextStyleFieldPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 30px;
`;

interface TextStyleFieldPreviewProps extends SvgTextStyleFields {
  children?: ReactNode;
}

function TextStyleFieldPreview(props: TextStyleFieldPreviewProps) {
  const safeResult = svgTextStyleFieldsSchema.safeParse(props);

  if (!safeResult.success) {
    return (
      <Callout
        title="Cannot render preview with invalid values"
        intent="danger"
      >
        <TextStyleFieldPreviewErrorContainer>
          {safeResult.error.issues.map((error) => (
            <li key={`${error.path.join('.')}-${error.code}`}>
              {error.path.join('.')}: ${error.message}
            </li>
          ))}
        </TextStyleFieldPreviewErrorContainer>
      </Callout>
    );
  }

  const fontSize = safeResult.data.fontSize ?? 16;
  const svgHeight = Math.round(fontSize * 1.5);
  const textY = Math.round(svgHeight / 4);

  return (
    <TextStyleFieldPreviewContainer>
      <svg height={svgHeight} width="auto">
        <SVGStyledText
          dominantBaseline="hanging"
          x={0}
          y={textY}
          {...safeResult.data}
        >
          {props.children}
        </SVGStyledText>
      </svg>
    </TextStyleFieldPreviewContainer>
  );
}

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

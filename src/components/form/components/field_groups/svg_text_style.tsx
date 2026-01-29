import styled from '@emotion/styled';
import { memo } from 'react';
import type { z } from 'zod';

import type { ButtonProps } from '../../../button/index.js';
import { Button } from '../../../button/index.js';
import { SVGStyledText } from '../../../svg/index.js';
import { withFieldGroup } from '../../context/use_ts_form.js';

import { Fieldset, Legend } from './fieldset.tsx';
import { svgTextStyleFieldsSchema } from './svg_text_style_fields.schema.ts';

const TextStyleSwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
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

export const FieldGroupSVGTextStyleFields = withFieldGroup({
  defaultValues,
  props: {
    label: '',
  },
  render: function SVGTextStyleFields({ group, label }) {
    return (
      <Fieldset>
        <Legend>{label}</Legend>
        <group.AppField name="fill">
          {(field) => <field.ColorPicker label="Color" />}
        </group.AppField>
        <group.AppField name="fontSize">
          {(field) => <field.NumericInput label="Font size" />}
        </group.AppField>
        <TextStyleSwitchContainer>
          <group.Field name="fontWeight">
            {(field) => (
              <TextStyleSwitch
                icon="bold"
                tooltip="Bold"
                active={field.state.value === 'bold'}
                onToggle={() =>
                  field.setValue((currentValue) =>
                    currentValue === 'normal' ? 'bold' : 'normal',
                  )
                }
              />
            )}
          </group.Field>
          <group.Field name="fontStyle">
            {(field) => (
              <TextStyleSwitch
                icon="italic"
                tooltip="Italic"
                active={field.state.value === 'italic'}
                onToggle={() =>
                  field.setValue((currentValue) =>
                    currentValue === 'normal' ? 'italic' : 'normal',
                  )
                }
              />
            )}
          </group.Field>
        </TextStyleSwitchContainer>

        <group.Subscribe selector={(state) => state.values}>
          {(values) => <TextStyleFieldPreview {...values} />}
        </group.Subscribe>
      </Fieldset>
    );
  },
});

interface TextStyleSwitchProps {
  icon: ButtonProps['icon'];
  tooltip: Exclude<ButtonProps['tooltipProps'], undefined>['content'];
  active: boolean;
  onToggle: () => void;
}

function TextStyleSwitch(props: TextStyleSwitchProps) {
  const { icon, tooltip, active, onToggle } = props;
  return (
    <Button
      icon={icon}
      fill={false}
      active={active}
      onClick={onToggle}
      tooltipProps={{
        content: tooltip,
      }}
    />
  );
}

const TextStyleFieldPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 30px;
`;

const TextStyleFieldPreview = memo(function TextStyleFieldPreview(
  props: SvgTextStyleFields,
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
          Preview
        </SVGStyledText>
      </svg>
    </TextStyleFieldPreviewContainer>
  );
});

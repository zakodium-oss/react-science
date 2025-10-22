import styled from '@emotion/styled';
import { z } from 'zod';

import { Button } from '../../../button/index.js';
import { SVGStyledText } from '../../../svg/index.js';
import { withFieldGroup } from '../../context/use_ts_form.js';
import { FormGroup } from '../input_groups/form_group.js';

const TextStyleSwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const svgTextStyleFieldsSchema = z.object({
  fill: z.string(),
  fontSize: z.coerce.number(),
  fontStyle: z.enum(['normal', 'italic']),
  fontWeight: z.enum(['normal', 'bold']),
});

type SvgTextStyleFields = z.input<typeof svgTextStyleFieldsSchema>;

// https://tanstack.com/form/latest/docs/framework/react/guides/form-composition#reusing-groups-of-fields-in-multiple-forms
// Default values are not used at runtime (same for props).
const defaultValues: SvgTextStyleFields = {
  fill: '',
  fontSize: '',
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
        {/* TODO: refactor so name is not necessary (extract grid wrapper component) */}
        {/* TODO: find out why `group.state.values` is not reactive */}
        <FormGroup name="" label={label}>
          <TextStyleFieldPreview values={group.state.values} />
        </FormGroup>
        <group.AppField name="fill">
          {(field) => (
            <field.Input label="Color (TODO: change to ColorPicker)" />
          )}
        </group.AppField>
        <group.AppField name="fontSize">
          {(field) => <field.NumericInput label="Font size" />}
        </group.AppField>
        <TextStyleSwitchContainer>
          <group.Field name="fontWeight">
            {(field) => (
              <TextStyleSwitch
                fieldName="fontWeight"
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
                fieldName="fontStyle"
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
      </>
    );
  },
});

interface TextStyleSwitchProps<FieldName extends 'fontWeight' | 'fontStyle'> {
  fieldName: FieldName;
  active: boolean;
  onToggle: () => void;
}

function TextStyleSwitch<FieldName extends 'fontWeight' | 'fontStyle'>(
  props: TextStyleSwitchProps<FieldName>,
) {
  const { fieldName, active, onToggle } = props;
  return (
    <Button
      icon={fieldName === 'fontWeight' ? 'bold' : 'italic'}
      fill={false}
      active={active}
      onClick={onToggle}
      tooltipProps={{
        content: fieldName === 'fontWeight' ? 'Bold' : 'Italic',
      }}
    />
  );
}

interface TextStyleFieldPreviewProps {
  values: SvgTextStyleFields;
}

function TextStyleFieldPreview(props: TextStyleFieldPreviewProps) {
  const { values } = props;
  console.log(values);
  const parsedValues = svgTextStyleFieldsSchema.parse(values);
  return (
    <svg height={parsedValues.fontSize} width="auto">
      <SVGStyledText dominantBaseline="hanging" {...parsedValues}>
        Preview
      </SVGStyledText>
    </svg>
  );
}

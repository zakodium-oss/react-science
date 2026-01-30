import type { Meta, StoryObj } from '@storybook/react-vite';
import { revalidateLogic } from '@tanstack/react-form';
import type { ReactNode } from 'react';
import { action } from 'storybook/actions';
import { z } from 'zod';

import { svgLineStyleFieldsSchema } from '../../../../src/components/form/components/field_groups/svg_line_style.schema.ts';
import type { SVGLineStyleFieldsProps } from '../../../../src/components/form/components/field_groups/svg_line_style.tsx';
import { FieldGroupSVGLineStyleFields } from '../../../../src/components/form/components/field_groups/svg_line_style.tsx';
import type { FormProps } from '../../../../src/components/form/components/input_groups/form.tsx';
import { Form } from '../../../../src/components/form/components/input_groups/form.tsx';
import type { SVGTextStyleFieldsProps } from '../../../../src/components/index.ts';
import {
  FieldGroupSVGTextStyleFields,
  svgTextStyleFieldsSchema,
  useForm,
} from '../../../../src/components/index.ts';

const meta: Meta = {
  title: 'Forms / Form / Tanstack / FieldGroups',
  argTypes: {
    layout: {
      control: 'select',
      options: ['inline', 'stacked'],
    },
  },
};
export default meta;

const svgTextStyleFormSchema = z.object({
  textStyle: svgTextStyleFieldsSchema,
});
const svgTextStyleDefaultValues: z.input<typeof svgTextStyleFormSchema> = {
  textStyle: {
    fill: '#000000',
    fontSize: '16',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
};

export const SVGTextStyle: StoryObj<
  (props: Pick<FormProps, 'layout'> & SVGTextStyleFieldsProps) => ReactNode
> = {
  args: {
    layout: 'inline',
    label: 'Text style',
    previewText: 'Hello World!',
  },
  render: (props) => {
    const { layout, label, previewText } = props;

    const form = useForm({
      defaultValues: svgTextStyleDefaultValues,
      validators: { onDynamic: svgTextStyleFormSchema },
      validationLogic: revalidateLogic({ modeAfterSubmission: 'change' }),
      onSubmit: ({ value }) => {
        const parsedValue = svgTextStyleFormSchema.parse(value);
        action('onSubmit')(parsedValue);
      },
    });

    return (
      <Form layout={layout} style={{ margin: '5px' }}>
        <FieldGroupSVGTextStyleFields
          form={form}
          fields="textStyle"
          label={label}
          previewText={previewText}
        />
      </Form>
    );
  },
};

const svgLineStyleFormSchema = z.object({
  lineStyle: svgLineStyleFieldsSchema,
});
const svgLineStyleDefaultValues: z.input<typeof svgLineStyleFormSchema> = {
  lineStyle: {
    stroke: '#000000',
    strokeOpacity: '1',
    strokeWidth: '1',
    strokeDasharray: 'solid',
  },
};

export const SVGLineStyle: StoryObj<
  (props: Pick<FormProps, 'layout'> & SVGLineStyleFieldsProps) => ReactNode
> = {
  args: {
    layout: 'inline',
    label: 'Line style',
  },
  render: (props) => {
    const { layout, label } = props;

    const form = useForm({
      defaultValues: svgLineStyleDefaultValues,
      validators: { onDynamic: svgLineStyleFormSchema },
      validationLogic: revalidateLogic({ modeAfterSubmission: 'change' }),
      onSubmit: ({ value }) => {
        const parsedValue = svgTextStyleFormSchema.parse(value);
        action('onSubmit')(parsedValue);
      },
    });

    return (
      <Form layout={layout} style={{ margin: '5px' }}>
        <FieldGroupSVGLineStyleFields
          form={form}
          fields="lineStyle"
          label={label}
        />
      </Form>
    );
  },
};

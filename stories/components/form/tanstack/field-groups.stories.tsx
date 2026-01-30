import type { Meta, StoryObj } from '@storybook/react-vite';
import { revalidateLogic } from '@tanstack/react-form';
import type { ReactNode } from 'react';
import { action } from 'storybook/actions';
import { z } from 'zod';

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

const formSchema = z.object({
  textStyle: svgTextStyleFieldsSchema,
});
const defaultValues: z.input<typeof formSchema> = {
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
      defaultValues,
      validators: { onDynamic: formSchema },
      validationLogic: revalidateLogic({ modeAfterSubmission: 'change' }),
      onSubmit: ({ value }) => {
        const parsedValue = formSchema.parse(value);
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

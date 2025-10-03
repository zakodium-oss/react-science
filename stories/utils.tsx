import type { Decorator } from '@storybook/react';

import { AccordionProvider, RootLayout } from '../src/components/index.js';
import { RootLayoutProvider } from '../src/components/root-layout/root_layout_context.provider.js';

export const AccordionDecorator: Decorator = (Story) => (
  <AccordionProvider>
    <Story />
  </AccordionProvider>
);

const excludeDecorator = new Set([
  'forms-form-tanstack-generalsettings--general-settings',
]);

export const RootLayoutDecorator: Decorator = (Story, ctx) => {
  return (
    <RootLayoutProvider innerRef={document.body}>
      <RootLayout
        style={
          excludeDecorator.has(ctx.id)
            ? undefined
            : {
                boxSizing: 'border-box',
                borderStyle: 'solid',
                borderColor: 'rgb(213, 213, 213)',
                borderWidth: '1px',
              }
        }
      >
        <Story />
      </RootLayout>
    </RootLayoutProvider>
  );
};

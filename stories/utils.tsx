import { Decorator } from '@storybook/react';

import { AccordionProvider, RootLayout } from '../src/components/index';
import { RootLayoutProvider } from '../src/components/root-layout/RootLayoutContext.provider';

export const AccordionDecorator: Decorator = (Story) => (
  <AccordionProvider>
    <Story />
  </AccordionProvider>
);

export const RootLayoutDecorator: Decorator = (Story) => {
  return (
    <RootLayoutProvider innerRef={document.body}>
      <RootLayout
        style={{
          boxSizing: 'border-box',
          borderStyle: 'solid',
          borderColor: 'rgb(213, 213, 213)',
          borderWidth: '1px',
        }}
      >
        <Story />
      </RootLayout>
    </RootLayoutProvider>
  );
};

import { Decorator } from '@storybook/react';

import { AccordionProvider } from '../src/components/index';
import { RootLayoutProvider } from '../src/components/root-layout/RootLayoutContext';

export const AccordionDecorator: Decorator = (Story) => (
  <AccordionProvider>
    <Story />
  </AccordionProvider>
);

export const RootLayoutDecorator: Decorator = (Story) => {
  return (
    <RootLayoutProvider innerRef={document.body}>
      <Story />
    </RootLayoutProvider>
  );
};

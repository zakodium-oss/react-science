import { DecoratorFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const QueryDecorator: DecoratorFn = (Story) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);

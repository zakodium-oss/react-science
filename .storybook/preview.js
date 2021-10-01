import { configureActions } from '@storybook/addon-actions';
import { RootLayout } from '../src/layout/RootLayout';

configureActions({
  limit: 5,
});

export const decorators = [
  (Story) => (
    <RootLayout
      style={{
        borderStyle: 'solid',
        borderColor: 'rgb(213, 213, 213)',
        borderWidth: '1px',
      }}
    >
      <Story />
    </RootLayout>
  ),
];
